import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('fighters')
export class Fighter {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  weightClass: string;

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  dob?: string;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  wins: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  losses: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  draws: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  koWins: number;

  @Field({ defaultValue: 0 })
  @Column({ default: 0 })
  submissionWins: number;
}
