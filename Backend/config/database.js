const { PrismaClient } = require('@prisma/client');

const prismaLogLevels = process.env.PRISMA_LOG_QUERIES === 'true'
  ? ['query', 'error', 'warn']
  : ['error', 'warn'];

const prisma = new PrismaClient({
  log: prismaLogLevels,
});

module.exports = prisma;
