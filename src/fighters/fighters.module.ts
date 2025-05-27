import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fighter } from './domain/fighter.entity';
import { FightersService } from './application/fighters.service';
import { FightersResolver } from './presentation/fighters.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Fighter])],
  providers: [FightersService, FightersResolver],
  exports: [FightersService],
})
export class FightersModule {}
