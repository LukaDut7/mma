import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventsService } from '../application/events.service';
import { Event } from '../domain/event.entity';
import { CreateEventInput } from './dto/create-event.input';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private service: EventsService) {}

  @Query(() => [Event])
  events() {
    return this.service.findAll();
  }

  @Query(() => Event, { nullable: true })
  event(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Event)
  createEvent(@Args('input') input: CreateEventInput) {
    return this.service.create(input);
  }
}
