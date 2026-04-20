import { BaseRepository } from './BaseRepository';
import { User } from '@prisma/client';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super('user');
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.model.findUnique({ where: { email } });
  }
}
