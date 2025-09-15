import type { User } from '@prisma/client';

import { prisma } from '.';

export const getOrCreateUser = async (userId: string): Promise<User> =>
  await prisma.user.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
