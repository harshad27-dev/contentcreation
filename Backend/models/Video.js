const prisma = require('../config/database');

/**
 * Create a new video
 */
const createVideo = async (data) => {
  return await prisma.video.create({
    data,
  });
};

/**
 * Get video by ID
 */
const getVideoById = async (id) => {
  return await prisma.video.findUnique({
    where: { id },
    include: {
      project: true,
      script: true,
      videoClips: true,
    },
  });
};

/**
 * Get all videos for a user
 */
const getVideosByUserId = async (userId, options = {}) => {
  const { page = 1, limit = 10, status, format } = options;
  
  const where = { userId };
  if (status) where.status = status;
  if (format) where.format = format;

  return await prisma.video.findMany({
    where,
    include: {
      project: true,
      script: true,
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
};

/**
 * Update video
 */
const updateVideo = async (id, data) => {
  return await prisma.video.update({
    where: { id },
    data,
  });
};

/**
 * Delete video
 */
const deleteVideo = async (id) => {
  return await prisma.video.delete({
    where: { id },
  });
};

/**
 * Get video count for user
 */
const getVideoCount = async (userId) => {
  return await prisma.video.count({
    where: { userId },
  });
};

/**
 * Get videos by status
 */
const getVideosByStatus = async (status) => {
  return await prisma.video.findMany({
    where: { status },
    include: {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
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
  getVideosByStatus,
};
