import { PrismaClient } from "@prisma/client";
import { isDev } from "@src/config";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (isDev) globalForPrisma.prisma = db;
