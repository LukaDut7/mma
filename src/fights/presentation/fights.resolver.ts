import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FightsService } from '../application/fights.service';
import { Fight } from '../domain/fight.entity';
import { ScheduleFightInput } from './dto/schedule-fight.input';

@Resolver(() => Fight)
export class FightsResolver {
  constructor(private service: FightsService) {}

  @Mutation(() => Fight)
  scheduleFight(@Args('input') input: ScheduleFightInput) {
    return this.service.scheduleFight(input);
  }

  @Mutation(() => Fight, { nullable: true })
  submitFightResult(
    @Args('fightId', { type: () => Int }) fightId: number,
    @Args('winnerId', { type: () => Int, nullable: true }) winnerId: number,
    @Args('method') method: string,
    @Args('round', { type: () => Int, nullable: true }) round?: number,
    @Args('time', { nullable: true }) time?: string,
  ) {
    return this.service.submitResult(fightId, { winnerId, method, round, time });
  }
}
