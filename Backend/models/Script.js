const prisma = require('../config/database');

/**
 * Create a new script
 */
const createScript = async (data) => {
  return await prisma.script.create({
    data,
  });
};

/**
 * Get script by ID
 */
const getScriptById = async (id) => {
  return await prisma.script.findUnique({
    where: { id },
    include: {
      project: true,
      videos: true,
    },
  });
};

/**
 * Get all scripts for a user
 */
const getScriptsByUserId = async (userId, options = {}) => {
  const { page = 1, limit = 10, format, status } = options;
  
  const where = { userId };
  if (format) where.format = format;
  if (status) where.status = status;

  return await prisma.script.findMany({
    where,
    include: {
      project: true,
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  });
};

/**
 * Update script
 */
const updateScript = async (id, data) => {
  return await prisma.script.update({
    where: { id },
    data,
  });
};

/**
 * Delete script
 */
const deleteScript = async (id) => {
  return await prisma.script.delete({
    where: { id },
  });
};

/**
 * Get script count for user
 */
const getScriptCount = async (userId) => {
  return await prisma.script.count({
    where: { userId },
  });
};

module.exports = {
  createScript,
  getScriptById,
  getScriptsByUserId,
  updateScript,
  deleteScript,
  getScriptCount,
};
