import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fighter } from '../domain/fighter.entity';
import { CreateFighterInput } from '../presentation/dto/create-fighter.input';

@Injectable()
export class FightersService {
  constructor(
    @InjectRepository(Fighter)
    private fighters: Repository<Fighter>,
  ) {}

  create(input: CreateFighterInput) {
    const fighter = this.fighters.create(input);
    return this.fighters.save(fighter);
  }

  findAll() {
    return this.fighters.find();
  }

  findOne(id: number) {
    return this.fighters.findOne({ where: { id } });
  }
}
