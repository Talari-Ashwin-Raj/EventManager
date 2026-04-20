import { BaseRepository } from './BaseRepository';
import { Event } from '@prisma/client';

export class EventRepository extends BaseRepository<Event> {
  constructor() {
    super('event');
  }

  async atomicIncrementRegistration(eventId: number): Promise<boolean> {
    try {
      // In a real database, we would use an atomic transaction with locking 
      // or Prisma's atomic increment/decrement operations.
      const event = await this.findById(eventId);
      if (!event) return false;
      
      const currentRegsCount = await this.model.findUnique({
        where: { id: eventId },
        select: { registrations: true }
      });
      
      if (currentRegsCount.registrations.length >= event.capacity) {
        return false;
      }
      
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
