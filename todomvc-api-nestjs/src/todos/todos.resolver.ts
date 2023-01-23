import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todosService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll() {
    return this.todosService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    const results = await this.todosService.findOne(id);
    if (results === null) {
      throw new NotFoundException();
    }

    return results;
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    const updatedRecord = await this.todosService.update(
      updateTodoInput.id,
      updateTodoInput,
    );
    if (updatedRecord === null) {
      throw new NotFoundException();
    }
    return updatedRecord;
  }

  @Mutation(() => Todo)
  async removeTodo(@Args('id', { type: () => Int }) id: number) {
    const deletedRecord = await this.todosService.remove(id);
    if (deletedRecord === null) {
      throw new NotFoundException();
    }

    return deletedRecord;
  }
}
