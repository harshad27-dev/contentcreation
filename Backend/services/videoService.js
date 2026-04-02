const videoModel = require('../models/Video');
const prisma = require('../config/database');
const { Queue } = require('bullmq');
const redis = require('../config/redis');

// Video processing queue
const videoQueue = new Queue('video-processing', {
  connection: redis,
});

/**
 * Create a new video
 */
const createVideo = async (data) => {
  return await videoModel.createVideo(data);
};

/**
 * Get video by ID
 */
const getVideoById = async (id) => {
  return await videoModel.getVideoById(id);
};

/**
 * Get all videos for a user
 */
const getVideosByUserId = async (userId, options) => {
  return await videoModel.getVideosByUserId(userId, options);
};

/**
 * Update video
 */
const updateVideo = async (id, data) => {
  return await videoModel.updateVideo(id, data);
};

/**
 * Delete video
 */
const deleteVideo = async (id) => {
  return await videoModel.deleteVideo(id);
};

/**
 * Get video count
 */
const getVideoCount = async (userId) => {
  return await videoModel.getVideoCount(userId);
};

/**
 * Queue video export job
 */
const queueVideoExport = async (videoId) => {
  await videoQueue.add('export-video', {
    videoId,
    timestamp: new Date().toISOString(),
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 5000,
    },
  });
};

/**
 * Publish video to YouTube
 */
const publishToYouTube = async (videoId) => {
  const video = await getVideoById(videoId);
  
  if (!video) {
    throw new Error('Video not found');
  }

  // Add to YouTube publishing queue
  await videoQueue.add('publish-youtube', {
    videoId,
    title: video.title,
    description: video.description,
    filePath: video.filePath,
    timestamp: new Date().toISOString(),
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 10000,
    },
  });

  return {
    videoId,
    status: 'queued_for_publishing',
  };
};

/**
 * Update video status
 */
const updateVideoStatus = async (videoId, status, additionalData = {}) => {
  return await prisma.video.update({
    where: { id: videoId },
    data: {
      status,
      ...additionalData,
    },
  });
};

module.exports = {
  createVideo,
  getVideoById,
  getVideosByUserId,
  updateVideo,
  deleteVideo,
  getVideoCount,
  queueVideoExport,
  publishToYouTube,
  updateVideoStatus,
};
