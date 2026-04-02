const prisma = require('../config/database');
const bcrypt = require('bcryptjs');

/**
 * Create a new user
 */
const createUser = async (data) => {
  const { password, ...rest } = data;
  
  // Hash password if provided
  let hashedPassword = null;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  return await prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
  });
};

/**
 * Get user by ID
 */
const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      emailVerified: true,
      createdAt: true,
      scriptsGenerated: true,
      videosExported: true,
      subscriptions: {
        where: { status: 'ACTIVE' },
        select: {
          planType: true,
          currentPeriodEnd: true,
        },
      },
    },
  });
};

/**
 * Get user by email
 */
const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

/**
 * Update user
 */
const updateUser = async (id, data) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Delete user
 */
const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

/**
 * Verify user password
 */
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Increment script generation count
 */
const incrementScriptCount = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { scriptsGenerated: { increment: 1 } },
  });
};

/**
 * Increment video export count
 */
const incrementVideoCount = async (userId) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { videosExported: { increment: 1 } },
  });
};

/**
 * Get user with subscription details
 */
const getUserWithSubscription = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: {
        where: { status: 'ACTIVE' },
        orderBy: { createdAt: 'desc' },
      },
    },
  });
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  verifyPassword,
  incrementScriptCount,
  incrementVideoCount,
  getUserWithSubscription,
};
