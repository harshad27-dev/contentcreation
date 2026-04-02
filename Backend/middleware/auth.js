const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

/**
 * Protect routes - Verify JWT token
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

/**
 * Check if user has required subscription plan
 * @param {string[]} plans - Allowed plan types
 */
const requireSubscription = (...plans) => {
  return async (req, res, next) => {
    try {
      const subscription = await prisma.subscription.findFirst({
        where: {
          userId: req.user.id,
          status: 'ACTIVE',
        },
      });

      if (!subscription || !plans.includes(subscription.planType)) {
        return res.status(403).json({
          success: false,
          message: `This feature requires one of these plans: ${plans.join(', ')}`,
        });
      }

      req.subscription = subscription;
      next();
    } catch (error) {
      console.error('Subscription check error:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to verify subscription',
      });
    }
  };
};

module.exports = {
  protect,
  requireSubscription,
};
