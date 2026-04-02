const { generateScript, AI_MODELS } = require('../config/openrouter');
const scriptService = require('../services/scriptService');
const { incrementScriptCount } = require('../models/User');

/**
 * Generate AI Script
 * POST /api/scripts/generate
 */
const generateAIScript = async (req, res) => {
  try {
    const {
      topic,
      tone,
      duration,
      audience,
      format,
      model,
      projectId,
    } = req.body;

    // Validate required fields
    if (!topic || !model || !format) {
      return res.status(400).json({
        success: false,
        message: 'Topic, model, and format are required',
      });
    }

    // Build prompt based on format
    const prompt = buildScriptPrompt({ topic, tone, duration, audience, format });

    // Generate script using AI
    const aiResult = await generateScript(model, prompt, 2500);

    if (!aiResult.success) {
      return res.status(500).json({
        success: false,
        message: aiResult.error,
      });
    }

    // Parse AI response into structured format
    const structuredScript = parseScriptContent(aiResult.content, { topic, tone, duration, format });

    // Save to database
    const script = await scriptService.createScript({
      userId: req.user.id,
      projectId,
      title: topic,
      topic,
      content: aiResult.content,
      tone: tone || 'Energetic',
      duration: duration || '8min',
      audience: audience || 'General',
      format,
      aiModel: model,
      scenes: structuredScript.scenes,
    });

    // Increment user's script count
    await incrementScriptCount(req.user.id);

    res.status(201).json({
      success: true,
      data: script,
      model: aiResult.model,
      usage: aiResult.usage,
    });
  } catch (error) {
    console.error('Generate script error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate script',
    });
  }
};

/**
 * Get all scripts for user
 * GET /api/scripts
 */
const getUserScripts = async (req, res) => {
  try {
    const { page = 1, limit = 10, format, status } = req.query;

    const scripts = await scriptService.getScriptsByUserId(req.user.id, {
      page: parseInt(page),
      limit: parseInt(limit),
      format,
      status,
    });

    const total = await scriptService.getScriptCount(req.user.id);

    res.json({
      success: true,
      data: scripts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get scripts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scripts',
    });
  }
};

/**
 * Get script by ID
 * GET /api/scripts/:id
 */
const getScriptById = async (req, res) => {
  try {
    const script = await scriptService.getScriptById(req.params.id);

    if (!script) {
      return res.status(404).json({
        success: false,
        message: 'Script not found',
      });
    }

    // Verify ownership
    if (script.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this script',
      });
    }

    res.json({
      success: true,
      data: script,
    });
  } catch (error) {
    console.error('Get script error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch script',
    });
  }
};

/**
 * Update script
 * PUT /api/scripts/:id
 */
const updateScript = async (req, res) => {
  try {
    const script = await scriptService.getScriptById(req.params.id);

    if (!script) {
      return res.status(404).json({
        success: false,
        message: 'Script not found',
      });
    }

    if (script.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this script',
      });
    }

    const updatedScript = await scriptService.updateScript(req.params.id, req.body);

    res.json({
      success: true,
      data: updatedScript,
    });
  } catch (error) {
    console.error('Update script error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update script',
    });
  }
};

/**
 * Delete script
 * DELETE /api/scripts/:id
 */
const deleteScript = async (req, res) => {
  try {
    const script = await scriptService.getScriptById(req.params.id);

    if (!script) {
      return res.status(404).json({
        success: false,
        message: 'Script not found',
      });
    }

    if (script.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this script',
      });
    }

    await scriptService.deleteScript(req.params.id);

    res.json({
      success: true,
      message: 'Script deleted successfully',
    });
  } catch (error) {
    console.error('Delete script error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete script',
    });
  }
};

/**
 * Build prompt for AI script generation
 */
function buildScriptPrompt({ topic, tone, duration, audience, format }) {
  const formatInstructions = {
    YouTube: 'Create a detailed script for a 16:9 landscape YouTube video',
    Shorts: 'Create a fast-paced, engaging script for a 9:16 vertical YouTube Short (under 60 seconds)',
    TikTok: 'Create a trendy, hook-driven script for TikTok',
    Podcast: 'Create a conversational, in-depth script for a podcast episode',
  };

  return `
${formatInstructions[format] || 'Create a YouTube script'}

Topic: ${topic}
Tone: ${tone || 'Energetic and engaging'}
Target Duration: ${duration || '8 minutes'}
Target Audience: ${audience || 'General audience'}

Structure Requirements:
1. HOOK (First 5-10 seconds): Grab attention immediately with a shocking fact, question, or bold statement
2. INTRO: Briefly introduce the topic and what viewers will learn
3. MAIN CONTENT: Break into 5-10 scenes/sections with clear transitions
4. CALL TO ACTION: Encourage likes, comments, and subscriptions

Format the response as JSON with this structure:
{
  "title": "Catchy video title",
  "hook": "Opening hook text",
  "intro": "Introduction text",
  "scenes": [
    {
      "sceneNumber": 1,
      "narration": "What the voiceover says",
      "visualTags": ["tag1", "tag2"],
      "duration": 30
    }
  ],
  "cta": "Call to action text"
}
`;
}

/**
 * Parse AI response into structured format
 */
function parseScriptContent(content, metadata) {
  try {
    // Try to parse JSON from AI response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Failed to parse AI response as JSON');
  }

  // Fallback: Create basic structure
  return {
    title: metadata.topic,
    hook: content.split('\n')[0] || 'Welcome to this video!',
    scenes: [
      {
        sceneNumber: 1,
        narration: content,
        visualTags: [metadata.topic],
        duration: 30,
      },
    ],
    cta: 'Thanks for watching! Like and subscribe for more.',
  };
}

module.exports = {
  generateAIScript,
  getUserScripts,
  getScriptById,
  updateScript,
  deleteScript,
};
