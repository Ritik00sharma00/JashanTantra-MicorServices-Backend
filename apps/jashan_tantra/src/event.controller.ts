import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('events/register')
  async registerEvent(@Body() data: CreateEventDto) {
    return this.eventService.createEvent(data);
  }

  @Patch('events/:id')
  async editEvent(@Param('id') id: string, @Body() updates: UpdateEventDto) {
    return this.eventService.updateEvent(id, updates);
  }

  @Post('events/:id/cancel')
  async cancelEvent(@Param('id') id: string) {
    return this.eventService.cancelEvent(id);
  }

  @Get('events/:id')
  async getEvent(@Param('id') id: string) {
    return this.eventService.getEventById(id);
  }

  @MessagePattern('service.get-all-events')
  async getAllEvents() {
    return this.eventService.getAllEvents();
  }
}
