const axios = require('axios');

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

const openrouter = axios.create({
  baseURL: OPENROUTER_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.BASE_URL || 'http://localhost:5000',
    'X-Title': 'ScriptAI',
  },
});

// Available AI Models
const AI_MODELS = {
  LLAMA_3_1_8B: 'meta-llama/llama-3.1-8b-instruct:free',
  LLAMA_3_1_70B: 'meta-llama/llama-3.1-70b-instruct',
  MISTRAL_7B: 'mistralai/mistral-7b-instruct:free',
  GEMMA_3_4B: 'google/gemma-3-4b-it:free',
  DEEPSEEK_V3: 'deepseek/deepseek-chat',
  CLAUDE_HAIKU: 'anthropic/claude-3-haiku',
  CLAUDE_3_5_SONNET: 'anthropic/claude-3.5-sonnet',
  GPT_4O_MINI: 'openai/gpt-4o-mini',
  MIXTRAL_8X7B: 'mistralai/mixtral-8x7b-instruct',
  GEMINI_FLASH_1_5: 'google/gemini-flash-1.5',
  QWEN_2_5_72B: 'alibaba/qwen-2.5-72b-instruct',
};

/**
 * Generate script using OpenRouter AI
 * @param {string} model - AI model key from AI_MODELS
 * @param {string} prompt - The prompt for script generation
 * @param {number} maxTokens - Maximum tokens to generate
 */
const generateScript = async (model, prompt, maxTokens = 2000) => {
  try {
    const response = await openrouter.post('/chat/completions', {
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional YouTube script writer. Create engaging, well-structured scripts with hooks, main content, and CTAs.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
      temperature: 0.7,
    });

    return {
      success: true,
      content: response.data.choices[0]?.message?.content || '',
      model: response.data.model,
      usage: response.data.usage,
    };
  } catch (error) {
    console.error('OpenRouter API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Failed to generate script',
    };
  }
};

module.exports = {
  openrouter,
  AI_MODELS,
  generateScript,
};
