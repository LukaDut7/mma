import { Args, Query, Resolver } from '@nestjs/graphql';
import { RankingService } from '../application/ranking.service';
import { Ranking } from '../domain/ranking.entity';

@Resolver(() => Ranking)
export class RankingsResolver {
  constructor(private service: RankingService) {}

  @Query(() => [Ranking])
  rankings(@Args('weightClass') weightClass: string) {
    return this.service.getRankings(weightClass);
  }
}
