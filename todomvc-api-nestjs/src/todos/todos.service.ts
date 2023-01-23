import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoInput: CreateTodoInput) {
    const result = await this.todoRepository.insert({
      title: createTodoInput.title,
      completed: false,
    });

    return this.findOne(result.generatedMaps[0].id);
  }

  async findAll() {
    return await this.todoRepository.find();
  }

  findOne(id: number) {
    return this.todoRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTodoInput: UpdateTodoInput) {
    const matched = await this.findOne(id);
    if (!matched) {
      return null;
    }

    console.log(updateTodoInput);

    return await this.todoRepository.save(updateTodoInput);
  }

  async remove(id: number) {
    const matched = await this.findOne(id);
    if (!matched) {
      return null;
    }

    this.todoRepository.remove([matched]);
    return { id };
  }
}
