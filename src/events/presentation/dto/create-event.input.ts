import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  eventDate: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  promotion?: string;
}
