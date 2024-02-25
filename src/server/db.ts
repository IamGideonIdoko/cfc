import { PrismaClient } from '@prisma/client';

import appConfig from '@/app/_config';

const createPrismaClient = () =>
  new PrismaClient({
    log: appConfig.env.isDev ? ['query', 'error', 'warn'] : ['error'],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (!appConfig.env.isProd) globalForPrisma.prisma = db;
