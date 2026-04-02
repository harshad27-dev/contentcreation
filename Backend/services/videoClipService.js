const videoClipModel = require('../models/VideoClip');

/**
 * Create a new video clip
 */
const createVideoClip = async (data) => {
  return await videoClipModel.createVideoClip(data);
};

/**
 * Get video clip by ID
 */
const getVideoClipById = async (id) => {
  return await videoClipModel.getVideoClipById(id);
};

/**
 * Search video clips
 */
const searchVideoClips = async (filters) => {
  return await videoClipModel.searchVideoClips(filters);
};

/**
 * Update video clip
 */
const updateVideoClip = async (id, data) => {
  return await videoClipModel.updateVideoClip(id, data);
};

/**
 * Delete video clip
 */
const deleteVideoClip = async (id) => {
  return await videoClipModel.deleteVideoClip(id);
};

/**
 * Get available games
 */
const getAvailableGames = async () => {
  return await videoClipModel.getAvailableGames();
};

/**
 * Get available moods
 */
const getAvailableMoods = async () => {
  return await videoClipModel.getAvailableMoods();
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
