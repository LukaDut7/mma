import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class ScheduleFightInput {
  @Field(type => Int)
  @IsInt()
  eventId: number;

  @Field(type => Int)
  @IsInt()
  fighterAId: number;

  @Field(type => Int)
  @IsInt()
  fighterBId: number;

  @Field()
  method: string;
}
