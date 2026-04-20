import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

/**
 * Singleton Pattern for PrismaClient
 * Ensures only one instance of PrismaClient is created to manage database connections efficiently.
 */
class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      if (!process.env.DATABASE_URL) {
        throw new Error("DATABASE_URL must be provided.");
      }
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      const adapter = new PrismaPg(pool);
      PrismaSingleton.instance = new PrismaClient({ adapter });
    }
    return PrismaSingleton.instance;
  }
}

export const prisma = PrismaSingleton.getInstance();
