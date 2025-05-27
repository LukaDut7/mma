import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranking } from './domain/ranking.entity';
import { RankingService } from './application/ranking.service';
import { Fighter } from '../fighters/domain/fighter.entity';
import { RankingsResolver } from './presentation/rankings.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Ranking, Fighter])],
  providers: [RankingService, RankingsResolver],
  exports: [RankingService],
})
export class RankingsModule {}
