const userModel = require('../models/User');
const prisma = require('../config/database');

/**
 * Get user by ID
 */
const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

/**
 * Get user with subscription
 */
const getUserWithSubscription = async (userId) => {
  return await userModel.getUserWithSubscription(userId);
};

/**
 * Update user subscription
 */
const updateSubscription = async (userId, planType, razorpayData = {}) => {
  // Deactivate existing subscription
  await prisma.subscription.updateMany({
    where: { userId, status: 'ACTIVE' },
    data: { status: 'CANCELLED' },
  });

  // Create new subscription
  const subscription = await prisma.subscription.create({
    data: {
      userId,
      planType,
      status: 'ACTIVE',
      razorpaySubscriptionId: razorpayData.subscriptionId,
      razorpayCustomerId: razorpayData.customerId,
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  return subscription;
};

/**
 * Check if user can generate script based on plan limits
 */
const canGenerateScript = async (userId) => {
  const user = await getUserWithSubscription(userId);
  if (!user || !user.subscriptions.length) {
    return { allowed: false, reason: 'No active subscription' };
  }

  const subscription = user.subscriptions[0];
  const limits = {
    FREE: 3,
    STARTER: 20,
    CREATOR: 100,
    PRO: Infinity,
  };

  const limit = limits[subscription.planType] || 0;
  const allowed = user.scriptsGenerated < limit;

  return {
    allowed,
    reason: allowed ? null : 'Script generation limit reached',
    used: user.scriptsGenerated,
    limit: limit === Infinity ? 'Unlimited' : limit,
    planType: subscription.planType,
  };
};

/**
 * Check if user can export video based on plan limits
 */
const canExportVideo = async (userId) => {
  const user = await getUserWithSubscription(userId);
  if (!user || !user.subscriptions.length) {
    return { allowed: false, reason: 'No active subscription' };
  }

  const subscription = user.subscriptions[0];
  const limits = {
    FREE: 0,
    STARTER: 10,
    CREATOR: 50,
    PRO: Infinity,
  };

  const limit = limits[subscription.planType] || 0;
  const allowed = user.videosExported < limit && limit > 0;

  return {
    allowed,
    reason: allowed ? null : 'Video export limit reached',
    used: user.videosExported,
    limit: limit === Infinity ? 'Unlimited' : limit,
    planType: subscription.planType,
  };
};

module.exports = {
  getUserById,
  getUserWithSubscription,
  updateSubscription,
  canGenerateScript,
  canExportVideo,
};
