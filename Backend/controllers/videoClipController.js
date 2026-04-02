const videoClipService = require('../services/videoClipService');

/**
 * Search video clips
 * GET /api/video-clips/search
 */
const searchVideoClips = async (req, res) => {
  try {
    const {
      game,
      mood,
      duration,
      resolution,
      aspectRatio,
      isPremium,
      page = 1,
      limit = 20,
    } = req.query;

    const clips = await videoClipService.searchVideoClips({
      game,
      mood,
      duration: duration ? parseInt(duration) : undefined,
      resolution,
      aspectRatio,
      isPremium: isPremium === 'true' ? true : isPremium === 'false' ? false : undefined,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      data: clips,
    });
  } catch (error) {
    console.error('Search video clips error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search video clips',
    });
  }
};

/**
 * Get available games
 * GET /api/video-clips/games
 */
const getAvailableGames = async (req, res) => {
  try {
    const games = await videoClipService.getAvailableGames();

    res.json({
      success: true,
      data: games,
    });
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games',
    });
  }
};

/**
 * Get available moods
 * GET /api/video-clips/moods
 */
const getAvailableMoods = async (req, res) => {
  try {
    const moods = await videoClipService.getAvailableMoods();

    res.json({
      success: true,
      data: moods,
    });
  } catch (error) {
    console.error('Get moods error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch moods',
    });
  }
};

/**
 * Get video clip by ID
 * GET /api/video-clips/:id
 */
const getVideoClipById = async (req, res) => {
  try {
    const clip = await videoClipService.getVideoClipById(req.params.id);

    if (!clip) {
      return res.status(404).json({
        success: false,
        message: 'Video clip not found',
      });
    }

    res.json({
      success: true,
      data: clip,
    });
  } catch (error) {
    console.error('Get video clip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video clip',
    });
  }
};

/**
 * Upload video clip (Admin only)
 * POST /api/video-clips/upload
 */
const uploadVideoClip = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Video file is required',
      });
    }

    const {
      title,
      game,
      mood,
      resolution,
      aspectRatio,
      tags,
      isPremium,
    } = req.body;

    if (!title || !game || !mood) {
      return res.status(400).json({
        success: false,
        message: 'Title, game, and mood are required',
      });
    }

    // Parse tags if string
    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;

    // Upload to R2/S3 (handled by service)
    const clip = await videoClipService.createVideoClip({
      title,
      game,
      mood,
      duration: parseInt(req.body.duration) || 0,
      resolution: resolution || '1080p',
      aspectRatio: aspectRatio || '16:9',
      url: req.file.location, // From multer S3 storage
      thumbnailUrl: null,
      tags: parsedTags || [],
      isPremium: isPremium === 'true',
    });

    res.status(201).json({
      success: true,
      data: clip,
      message: 'Video clip uploaded successfully',
    });
  } catch (error) {
    console.error('Upload video clip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload video clip',
    });
  }
};

/**
 * Delete video clip (Admin only)
 * DELETE /api/video-clips/:id
 */
const deleteVideoClip = async (req, res) => {
  try {
    await videoClipService.deleteVideoClip(req.params.id);

    res.json({
      success: true,
      message: 'Video clip deleted successfully',
    });
  } catch (error) {
    console.error('Delete video clip error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete video clip',
    });
  }
};

module.exports = {
  searchVideoClips,
  getAvailableGames,
  getAvailableMoods,
  getVideoClipById,
  uploadVideoClip,
  deleteVideoClip,
};
