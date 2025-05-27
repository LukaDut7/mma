import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../domain/event.entity';
import { CreateEventInput } from '../presentation/dto/create-event.input';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private events: Repository<Event>,
  ) {}

  create(input: CreateEventInput) {
    const event = this.events.create(input);
    return this.events.save(event);
  }

  findAll() {
    return this.events.find({ relations: ['fights'] });
  }

  findOne(id: number) {
    return this.events.findOne({ where: { id }, relations: ['fights'] });
  }
}
