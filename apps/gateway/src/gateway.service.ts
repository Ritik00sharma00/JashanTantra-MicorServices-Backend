import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  constructor(
    @Inject('Service Client') private readonly serviceClient: ClientRMQ,
    @Inject('User Client') private readonly userClient: ClientRMQ,
  ) {}

  async getServiceHealth(): Promise<string> {
    const response = await firstValueFrom(
      this.serviceClient.send('service.health', {}),
    );
    return response;
  }

  async getUserHealth(): Promise<string> {
    const response = await firstValueFrom(
      this.userClient.send('user.health', {}),
    );
    return response;
  }

  async getUserHello(): Promise<string> {
    const response = await firstValueFrom(
      this.userClient.send('user.getHello', {}),
    );
    return response;
  }

  async createUser(user: any): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.create-user', user),
    );
    return response;
  }

  async loginUser(data: { email: string; password: string }): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.login', data),
    );
    return response;
  }

  async getUserById(id: string): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.get-public-profile', { id }),
    );
    return response;
  }

  async getUserByEmail(email: string): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.get-by-email', { email }),
    );
    return response;
  }

  async getAllUsers(): Promise<any> {
    const response = await firstValueFrom(this.userClient.send('user.get-all-users', {}));
    return response;
  }

  async getAllEvents(): Promise<any> {
    const response = await firstValueFrom(this.serviceClient.send('service.get-all-events', {}));
    return response;
  }

  async editUserProfile(id: string, updates: any): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.edit-profile', { id, updates }),
    );
    return response;
  }

  async verifyEmail(email: string): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.verify-email', { email }),
    );
    return response;
  }

  async findOrganizers(filter: {
    state?: string;
    city?: string;
    category?: string;
    t?: string;
  }): Promise<any> {
    const response = await firstValueFrom(
      this.userClient.send('user.find-organizers', filter),
    );
    return response;
  }
}
