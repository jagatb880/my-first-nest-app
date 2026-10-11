import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
  private isConnected: boolean = false;

  onModuleInit() {
    this.isConnected = true;
    console.log('DatabaseService initialized and connected to the database.');
  }

  onApplicationShutdown(signal?: string) {
    this.isConnected = false;
    console.log(`DatabaseService is shutting down. Signal: ${signal}`);
  }

  getStatus(): string {
    return this.isConnected
      ? 'Connected to the database'
      : 'Disconnected from the database';
  }
}
