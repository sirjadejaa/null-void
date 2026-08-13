import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const globalForPrismaDb = globalThis as unknown as {
  prismaDb: PrismaClient | undefined;
};

let dbUrl = process.env.DATABASE_URL;

const pool = new pg.Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

export const prisma = globalForPrismaDb.prismaDb ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrismaDb.prismaDb = prisma;
