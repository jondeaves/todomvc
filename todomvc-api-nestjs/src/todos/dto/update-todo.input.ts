import { CreateTodoInput } from './create-todo.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => Int, { description: 'Unique identifier' })
  id: number;

  @Field(() => Boolean, {
    description: 'Flag that can be toggled to mark item as completed',
    nullable: true,
  })
  completed: boolean;
}
