import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Unique identifier' })
  id: number;

  @Column()
  @Field(() => String, { description: 'User-facing label for the Todo item' })
  title: string;

  @Column()
  @Field(() => Boolean, {
    description: 'Flag that can be toggled to mark item as completed',
  })
  completed: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
