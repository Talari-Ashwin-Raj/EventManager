import { UserRole } from '@prisma/client';

export abstract class BaseUser {
  constructor(
    public id: number,
    public email: string,
    public name: string | null,
    public role: UserRole
  ) {}

  abstract getRegistrationLimit(): number;
  abstract canOrganizeEvents(): boolean;
}

export class Student extends BaseUser {
  constructor(id: number, email: string, name: string | null) {
    super(id, email, name, UserRole.STUDENT);
  }

  getRegistrationLimit(): number {
    return 3; // Students have standard limits
  }

  canOrganizeEvents(): boolean {
    return false;
  }
}

export class Volunteer extends BaseUser {
  constructor(id: number, email: string, name: string | null) {
    super(id, email, name, UserRole.VOLUNTEER);
  }

  getRegistrationLimit(): number {
    return 5; // Volunteers can register for more events
  }

  canOrganizeEvents(): boolean {
    return false;
  }
}

export class Organizer extends BaseUser {
  constructor(id: number, email: string, name: string | null) {
    super(id, email, name, UserRole.ORGANIZER);
  }

  getRegistrationLimit(): number {
    return 10; // Organizers usually just organize, but might register indefinitely
  }

  canOrganizeEvents(): boolean {
    return true;
  }
}

export class EventEntity {
  private capacity: number;
  private currentRegistrations: number;

  constructor(
    public id: number,
    public title: string,
    public eventDate: Date,
    capacity: number,
    currentRegistrations: number
  ) {
    this.capacity = capacity;
    this.currentRegistrations = currentRegistrations;
  }

  public isFull(): boolean {
    return this.currentRegistrations >= this.capacity;
  }

  public getCapacityLeft(): number {
    return this.capacity - this.currentRegistrations;
  }

  public addRegistration(): boolean {
    if (this.isFull()) return false;
    this.currentRegistrations++;
    return true;
  }
}

export class TaskEntity {
  constructor(
    public id: number,
    public description: string,
    public status: string,
    public assignedVolunteerId: number | null
  ) {}

  public markComplete() {
    this.status = "COMPLETED";
  }

  public isAssigned(): boolean {
    return this.assignedVolunteerId !== null;
  }
}
