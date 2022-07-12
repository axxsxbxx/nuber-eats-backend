import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(type => String)
  namse: string;
  @Field(type => Boolean, { nullable: true })
  isGood?: boolean;
}
