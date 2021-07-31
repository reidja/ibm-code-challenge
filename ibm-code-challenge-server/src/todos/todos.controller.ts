import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Controller('todos')
export class TodosController {
  constructor(private readonly todoService: TodosService) {}

  @Get(':id')
  async get(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.get(id);
  }

  @Get()
  async list(): Promise<Todo[]> {
    return await this.todoService.list();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatedTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return await this.todoService.update(id, updatedTodoDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(id);
  }
}
