import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../generated/prisma/client.ts";

declare global {
  var __prisma: PrismaClient | undefined;
}

const adapter = new PrismaLibSql({ url: process.env.DATABASE_URL! });

const prisma = globalThis.__prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

export default prisma;
