import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fighter } from '../../fighters/domain/fighter.entity';

@ObjectType()
@Entity('rankings')
export class Ranking {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  weightClass: string;

  @ManyToOne(() => Fighter)
  fighter: Fighter;

  @Field()
  @Column({ default: 0 })
  points: number;

  @Field()
  @Column()
  rank: number;
}
