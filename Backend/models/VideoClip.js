const prisma = require('../config/database');

/**
 * Create a new video clip
 */
const createVideoClip = async (data) => {
  return await prisma.videoClip.create({
    data,
  });
};

/**
 * Get video clip by ID
 */
const getVideoClipById = async (id) => {
  return await prisma.videoClip.findUnique({
    where: { id },
  });
};

/**
 * Search video clips with filters
 */
const searchVideoClips = async (filters = {}) => {
  const {
    game,
    mood,
    duration,
    resolution,
    aspectRatio,
    isPremium,
    page = 1,
    limit = 20,
  } = filters;

  const where = {};
  if (game) where.game = game;
  if (mood) where.mood = mood;
  if (duration) where.duration = duration;
  if (resolution) where.resolution = resolution;
  if (aspectRatio) where.aspectRatio = aspectRatio;
  if (typeof isPremium === 'boolean') where.isPremium = isPremium;

  return await prisma.videoClip.findMany({
    where,
    orderBy: { uploadDate: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
};

/**
 * Update video clip
 */
const updateVideoClip = async (id, data) => {
  return await prisma.videoClip.update({
    where: { id },
    data,
  });
};

/**
 * Delete video clip
 */
const deleteVideoClip = async (id) => {
  return await prisma.videoClip.delete({
    where: { id },
  });
};

/**
 * Get all available games
 */
const getAvailableGames = async () => {
  const games = await prisma.videoClip.groupBy({
    by: ['game'],
    _count: {
      game: true,
    },
    orderBy: {
      _count: {
        game: 'desc',
      },
    },
  });

  return games.map((g) => ({
    game: g.game,
    count: g._count.game,
  }));
};

/**
 * Get all available moods
 */
const getAvailableMoods = async () => {
  const moods = await prisma.videoClip.groupBy({
    by: ['mood'],
    _count: {
      mood: true,
    },
  });

  return moods.map((m) => ({
    mood: m.mood,
    count: m._count.mood,
  }));
};

module.exports = {
  createVideoClip,
  getVideoClipById,
  searchVideoClips,
  updateVideoClip,
  deleteVideoClip,
  getAvailableGames,
  getAvailableMoods,
};
