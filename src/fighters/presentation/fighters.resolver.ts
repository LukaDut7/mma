import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FightersService } from '../application/fighters.service';
import { Fighter } from '../domain/fighter.entity';
import { CreateFighterInput } from './dto/create-fighter.input';

@Resolver(() => Fighter)
export class FightersResolver {
  constructor(private service: FightersService) {}

  @Query(() => [Fighter])
  fighters() {
    return this.service.findAll();
  }

  @Query(() => Fighter, { nullable: true })
  fighter(@Args('id', { type: () => Int }) id: number) {
    return this.service.findOne(id);
  }

  @Mutation(() => Fighter)
  createFighter(@Args('input') input: CreateFighterInput) {
    return this.service.create(input);
  }
}
