import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Fight } from '../../fights/domain/fight.entity';

@ObjectType()
@Entity('events')
export class Event {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ type: 'date' })
  eventDate: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  promotion?: string;

  @OneToMany(() => Fight, fight => fight.event)
  fights: Fight[];
}
