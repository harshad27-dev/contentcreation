const scriptModel = require('../models/Script');

/**
 * Create a new script
 */
const createScript = async (data) => {
  return await scriptModel.createScript(data);
};

/**
 * Get script by ID
 */
const getScriptById = async (id) => {
  return await scriptModel.getScriptById(id);
};

/**
 * Get all scripts for a user
 */
const getScriptsByUserId = async (userId, options) => {
  return await scriptModel.getScriptsByUserId(userId, options);
};

/**
 * Update script
 */
const updateScript = async (id, data) => {
  return await scriptModel.updateScript(id, data);
};

/**
 * Delete script
 */
const deleteScript = async (id) => {
  return await scriptModel.deleteScript(id);
};

/**
 * Get script count
 */
const getScriptCount = async (userId) => {
  return await scriptModel.getScriptCount(userId);
};

module.exports = {
  createScript,
  getScriptById,
  getScriptsByUserId,
  updateScript,
  deleteScript,
  getScriptCount,
};
