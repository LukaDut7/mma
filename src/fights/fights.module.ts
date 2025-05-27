import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fight } from './domain/fight.entity';
import { FightsService } from './application/fights.service';
import { FightsResolver } from './presentation/fights.resolver';
import { EventsModule } from '../events/events.module';
import { FightersModule } from '../fighters/fighters.module';
import { RankingsModule } from '../rankings/rankings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fight]),
    EventsModule,
    FightersModule,
    RankingsModule,
  ],
  providers: [FightsService, FightsResolver],
  exports: [FightsService],
})
export class FightsModule {}
