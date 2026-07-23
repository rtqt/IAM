import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminType {
  @Field(() => ID)
  id!: string;

  @Field()
  email!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
