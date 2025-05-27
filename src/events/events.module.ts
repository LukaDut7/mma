import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './domain/event.entity';
import { EventsService } from './application/events.service';
import { EventsResolver } from './presentation/events.resolver';
import { Fight } from '../fights/domain/fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Fight])],
  providers: [EventsService, EventsResolver],
  exports: [EventsService],
})
export class EventsModule {}
