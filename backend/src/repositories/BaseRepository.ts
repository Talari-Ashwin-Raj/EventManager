import { prisma } from '../utils/prisma';

export interface IRepository<T> {
  create(data: any): Promise<T>;
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: number, data: any): Promise<T>;
  delete(id: number): Promise<T>;
}

export abstract class BaseRepository<T> implements IRepository<T> {
  protected model: any;

  constructor(modelName: string) {
    // Dynamically access Prisma model. Warning: Works around Prisma strong typing for DRY abstraction.
    this.model = (prisma as any)[modelName];
  }

  async create(data: any): Promise<T> {
    return await this.model.create({ data });
  }

  async findById(id: number): Promise<T | null> {
    return await this.model.findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return await this.model.findMany();
  }

  async update(id: number, data: any): Promise<T> {
    return await this.model.update({ where: { id }, data });
  }

  async delete(id: number): Promise<T> {
    return await this.model.delete({ where: { id } });
  }
}
