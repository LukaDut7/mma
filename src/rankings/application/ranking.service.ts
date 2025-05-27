import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ranking } from '../domain/ranking.entity';
import { Fighter } from '../../fighters/domain/fighter.entity';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Ranking)
    private rankings: Repository<Ranking>,
    @InjectRepository(Fighter)
    private fighters: Repository<Fighter>,
  ) {}

  getRankings(weightClass: string) {
    return this.rankings.find({ where: { weightClass }, relations: ["fighter"], order: { rank: "ASC" } });
  }

  async updateRankingsForFight(fight: {
    weightClass: string;
    winnerId?: number;
    loserId?: number;
    method: string;
    draw: boolean;
  }) {
    const { weightClass, winnerId, loserId, method, draw } = fight;
    if (draw) {
      await this.addPoints(weightClass, winnerId!, 1);
      await this.addPoints(weightClass, loserId!, 1);
    } else if (winnerId) {
      const points = method === 'Decision' ? 3 : 4;
      await this.addPoints(weightClass, winnerId, points);
    }
    await this.recalculateRanks(weightClass);
  }

  private async addPoints(weightClass: string, fighterId: number, points: number) {
    let ranking = await this.rankings.findOne({ where: { fighter: { id: fighterId }, weightClass }, relations: ['fighter'] });
    if (!ranking) {
      const fighter = await this.fighters.findOne({ where: { id: fighterId } });
      if (!fighter) return;
      ranking = this.rankings.create({ fighter, weightClass, points: 0, rank: 0 });
    }
    ranking.points += points;
    await this.rankings.save(ranking);
  }

  private async recalculateRanks(weightClass: string) {
    const entries = await this.rankings.find({ where: { weightClass }, order: { points: 'DESC' }, relations: ['fighter'] });
    for (let i = 0; i < entries.length; i++) {
      entries[i].rank = i + 1;
      await this.rankings.save(entries[i]);
    }
  }
}
