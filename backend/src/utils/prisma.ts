import { PrismaClient } from '@prisma/client';

/**
 * Singleton Pattern for PrismaClient
 * Ensures only one instance of PrismaClient is created to manage database connections efficiently.
 */
class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}

export const prisma = PrismaSingleton.getInstance();
