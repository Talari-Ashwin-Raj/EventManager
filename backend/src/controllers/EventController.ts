import { Request, Response } from 'express';
import { EventService } from '../services/EventService';
import { NotificationFactory } from '../factories/NotificationFactory';

export class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  // Example of OOP encapsulation grouping HTTP methods
  createEvent = async (req: Request, res: Response) => {
    try {
      const eventData = req.body;
      const event = await this.eventService.createEvent(eventData);
      res.status(201).json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to create event" });
    }
  };

  registerStudent = async (req: Request, res: Response) => {
    try {
      const { eventId, userId } = req.body;
      const success = await this.eventService.registerForEvent(eventId, userId);
      
      if (success) {
        // Factory pattern utilized here
        const notification = NotificationFactory.createNotification('EMAIL');
        notification.send('Registration Confirmed', `User_${userId}`);
        
        res.status(200).json({ message: "Registration successful" });
      } else {
        res.status(400).json({ message: "Registration failed due to capacity or existing record." });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
