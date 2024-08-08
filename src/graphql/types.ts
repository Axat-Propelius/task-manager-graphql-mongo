import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  role: string;
}

@ObjectType()
export class UserLoginType {
  @Field()
  access_token: string;
}

@ObjectType()
export class TaskType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => UserType)
  user: UserType; // Adjust if needed

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;
}
