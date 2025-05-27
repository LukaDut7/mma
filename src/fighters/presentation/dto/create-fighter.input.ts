import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  weightClass: string;

  @Field({ nullable: true })
  dob?: string;
}
