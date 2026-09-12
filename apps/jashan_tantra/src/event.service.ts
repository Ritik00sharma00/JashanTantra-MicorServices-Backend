import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create({
      requestedBy: createEventDto.requestedBy,
      toOrganizer: createEventDto.toOrganizer,
      status: 'pending',
      eventDate: createEventDto.eventDate
        ? new Date(createEventDto.eventDate)
        : null,
      about: createEventDto.about ?? null,
      requirements: createEventDto.requirements ?? null,
      reviews: createEventDto.reviews ?? null,
      additionalDetails: createEventDto.additionalDetails ?? null,
    });
    return await this.eventRepository.save(event);
  }

  async updateEvent(eventId: string, updates: UpdateEventDto): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new Error('Event not found');
    }

    if (updates.eventDate) {
      event.eventDate = new Date(updates.eventDate);
    }

    if (updates.about !== undefined) {
      event.about = updates.about;
    }

    if (updates.requirements !== undefined) {
      event.requirements = updates.requirements;
    }

    if (updates.reviews !== undefined) {
      event.reviews = updates.reviews;
    }

    if (updates.additionalDetails !== undefined) {
      event.additionalDetails = updates.additionalDetails;
    }

    if (updates.status !== undefined) {
      event.status = updates.status;
    }

    return await this.eventRepository.save(event);
  }

  async cancelEvent(eventId: string): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new Error('Event not found');
    }

    event.status = 'cancelled';
    return await this.eventRepository.save(event);
  }

  async getAllEvents(): Promise<Event[]> {
    return await this.eventRepository.find();
  }

  async getEventById(eventId: string): Promise<any> {
    const event = await this.eventRepository.findOne({ where: { id: eventId } });
    if (!event) {
      throw new Error('Event not found');
    }

    return {
      ...event,
      organizerPhone: null,
    };
  }
}
