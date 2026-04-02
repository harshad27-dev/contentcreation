const videoService = require('../services/videoService');
const { incrementVideoCount } = require('../models/User');

/**
 * Create a new video project
 * POST /api/videos
 */
const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      format,
      resolution,
      scriptId,
      projectId,
      selectedClips,
      voiceoverStyle,
      exportSettings,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    const video = await videoService.createVideo({
      userId: req.user.id,
      projectId,
      scriptId,
      title,
      description,
      format: format || '16:9',
      resolution: resolution || '1080p',
      status: 'processing',
      selectedClips: selectedClips || [],
      voiceoverStyle,
      exportSettings,
    });

    res.status(201).json({
      success: true,
      data: video,
      message: 'Video creation started. Processing in background.',
    });
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create video',
    });
  }
};

/**
 * Get all videos for user
 * GET /api/videos
 */
const getUserVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, format } = req.query;

    const videos = await videoService.getVideosByUserId(req.user.id, {
      page: parseInt(page),
      limit: parseInt(limit),
      status,
      format,
    });

    const total = await videoService.getVideoCount(req.user.id);

    res.json({
      success: true,
      data: videos,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch videos',
    });
  }
};

/**
 * Get video by ID
 * GET /api/videos/:id
 */
const getVideoById = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this video',
      });
    }

    res.json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch video',
    });
  }
};

/**
 * Update video
 * PUT /api/videos/:id
 */
const updateVideo = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this video',
      });
    }

    const updatedVideo = await videoService.updateVideo(req.params.id, req.body);

    res.json({
      success: true,
      data: updatedVideo,
    });
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update video',
    });
  }
};

/**
 * Delete video
 * DELETE /api/videos/:id
 */
const deleteVideo = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this video',
      });
    }

    await videoService.deleteVideo(req.params.id);

    res.json({
      success: true,
      message: 'Video deleted successfully',
    });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete video',
    });
  }
};

/**
 * Export video (trigger rendering)
 * POST /api/videos/:id/export
 */
const exportVideo = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to export this video',
      });
    }

    // Trigger background video processing job
    await videoService.queueVideoExport(video.id);

    res.json({
      success: true,
      message: 'Video export started. You will be notified when ready.',
    });
  } catch (error) {
    console.error('Export video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start video export',
    });
  }
};

/**
 * Publish to YouTube
 * POST /api/videos/:id/publish
 */
const publishToYouTube = async (req, res) => {
  try {
    const video = await videoService.getVideoById(req.params.id);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    if (video.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to publish this video',
      });
    }

    if (video.status !== 'ready') {
      return res.status(400).json({
        success: false,
        message: 'Video must be fully rendered before publishing',
      });
    }

    // Trigger YouTube upload
    const result = await videoService.publishToYouTube(video.id);

    res.json({
      success: true,
      data: result,
      message: 'Video published to YouTube successfully',
    });
  } catch (error) {
    console.error('Publish video error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish video to YouTube',
    });
  }
};

module.exports = {
  createVideo,
  getUserVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  exportVideo,
  publishToYouTube,
};
