import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fight } from '../domain/fight.entity';
import { ScheduleFightInput } from '../presentation/dto/schedule-fight.input';
import { EventsService } from '../../events/application/events.service';
import { FightersService } from '../../fighters/application/fighters.service';
import { RankingService } from '../../rankings/application/ranking.service';

@Injectable()
export class FightsService {
  constructor(
    @InjectRepository(Fight)
    private fights: Repository<Fight>,
    private eventsService: EventsService,
    private fightersService: FightersService,
    private rankingService: RankingService,
  ) {}

  async scheduleFight(input: ScheduleFightInput) {
    const event = await this.eventsService.findOne(input.eventId);
    const fighterA = await this.fightersService.findOne(input.fighterAId);
    const fighterB = await this.fightersService.findOne(input.fighterBId);
    const fight = this.fights.create({
      event,
      fighterA,
      fighterB,
      method: input.method,
    });
    return this.fights.save(fight);
  }

  async submitResult(
    fightId: number,
    result: { winnerId?: number; method: string; round?: number; time?: string }
  ) {
    const fight = await this.fights.findOne({ where: { id: fightId }, relations: ['fighterA', 'fighterB', 'event'] });
    if (!fight) return null;
    fight.method = result.method;
    fight.outcomeRound = result.round;
    fight.outcomeTime = result.time;
    const draw = !result.winnerId;
    if (result.winnerId) {
      const winner = await this.fightersService.findOne(result.winnerId);
      fight.winner = winner;
    }
    await this.fights.save(fight);

    const weightClass = fight.fighterA.weightClass;
    const loserId = fight.winner?.id === fight.fighterA.id ? fight.fighterB.id : fight.fighterA.id;
    await this.rankingService.updateRankingsForFight({
      weightClass,
      winnerId: fight.winner?.id,
      loserId,
      method: result.method,
      draw,
    });
    return fight;
  }
}
