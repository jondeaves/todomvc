import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field(() => String, { description: 'User-facing label for the Todo item' })
  title: string;
}
