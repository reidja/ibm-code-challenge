import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

  async get(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async list(): Promise<Todo[]> {
    return await this.todoModel
      .find()
      .sort({ completed: 'asc', priority: 'desc' })
      .exec();
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return createdTodo.save();
  }

  async update(id: string, updatedTodoDto: CreateTodoDto): Promise<Todo> {
    await this.todoModel.updateOne({ _id: id }, updatedTodoDto).exec();
    return this.todoModel.findById(id).exec();
  }

  async delete(id: string) {
    return this.todoModel.deleteOne({ _id: id }).exec();
  }
}
