export interface INotification {
  send(message: string, recipient: string): void;
}

class EmailNotification implements INotification {
  send(message: string, recipient: string): void {
    console.log(`[Email] Sending to ${recipient}: ${message}`);
  }
}

class DashboardNotification implements INotification {
  send(message: string, recipient: string): void {
    console.log(`[DashboardAlert] User ${recipient} alert: ${message}`);
  }
}

export class NotificationFactory {
  /**
   * Factory Pattern to generate appropriate notification objects
   */
  static createNotification(type: 'EMAIL' | 'DASHBOARD'): INotification {
    if (type === 'EMAIL') {
      return new EmailNotification();
    } else if (type === 'DASHBOARD') {
      return new DashboardNotification();
    }
    throw new Error('Invalid notification type');
  }
}
