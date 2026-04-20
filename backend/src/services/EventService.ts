import { EventRepository } from '../repositories/EventRepository';
import { BaseRepository } from '../repositories/BaseRepository';
import { Registration } from '@prisma/client';
import { EventEntity } from '../domain/entities';

export interface IEventService {
  createEvent(data: any): Promise<any>;
  registerForEvent(userId: number, eventId: number): Promise<boolean>;
}

export class EventService implements IEventService {
  private eventRepository: EventRepository;
  private registrationRepository: BaseRepository<Registration>;

  constructor() {
    this.eventRepository = new EventRepository();
    this.registrationRepository = new class extends BaseRepository<Registration> {
      constructor() { super('registration'); }
    };
  }

  async createEvent(data: any) {
    return await this.eventRepository.create(data);
  }

  async registerForEvent(userId: number, eventId: number): Promise<boolean> {
    // Attempt an atomic check for capacity
    const canRegister = await this.eventRepository.atomicIncrementRegistration(eventId);
    if (!canRegister) {
      throw new Error("Event capacity reached or event does not exist.");
    }

    try {
      await this.registrationRepository.create({
        user: { connect: { id: userId } },
        event: { connect: { id: eventId } }
      });
      return true;
    } catch (error) {
       console.error("Registration failed", error);
       return false;
    }
  }
}
