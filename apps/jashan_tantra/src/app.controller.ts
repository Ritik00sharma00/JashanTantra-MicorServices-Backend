import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('service.health')
  getServiceHealth(): string {
    return this.appService.getHello();
  }

  @MessagePattern('service.getHello')
  getServiceHello(): string {
    return this.appService.getHello();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
