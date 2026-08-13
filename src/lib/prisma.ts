import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const globalForPrismaDb = globalThis as unknown as {
  prismaDb: PrismaClient | undefined;
};

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl || dbUrl === "undefined" || String(dbUrl) === "undefined") {
  dbUrl = "file:./dev.db";
}

const adapter = new PrismaLibSql({
  url: dbUrl,
});

export const prisma = globalForPrismaDb.prismaDb ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrismaDb.prismaDb = prisma;
