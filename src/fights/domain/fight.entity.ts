import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Fighter } from '../../fighters/domain/fighter.entity';
import { Event } from '../../events/domain/event.entity';

@ObjectType()
@Entity('fights')
export class Fight {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, event => event.fights)
  event: Event;

  @ManyToOne(() => Fighter)
  fighterA: Fighter;

  @ManyToOne(() => Fighter)
  fighterB: Fighter;

  @ManyToOne(() => Fighter, { nullable: true })
  winner?: Fighter;

  @Field()
  @Column()
  method: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  outcomeRound?: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  outcomeTime?: string;
}
