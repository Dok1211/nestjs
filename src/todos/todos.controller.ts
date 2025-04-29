import { Controller, Get, Post, Param, Delete, Body, Patch} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './entities/todo.entity';
import { ParseIntPipe } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo | null> {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { title?: string; isDone?: boolean },
  ): Promise<Todo | null> {
    return this.todosService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todosService.remove(Number(id));
  }
}
