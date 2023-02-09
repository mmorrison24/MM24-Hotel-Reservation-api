import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

if (!global.__db) {
    global.__db = new PrismaClient();
}

prismaClient = global.__db;

export { prismaClient };
