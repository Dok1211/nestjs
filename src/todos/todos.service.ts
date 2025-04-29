import { Injectable, NotFoundException} from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}
  private todos: Todo[] = [];

  async create(data: { title: string }): Promise<Todo> {
    return this.prisma.todo.create({
      data: {
        title: data.title,
        isDone: false,
      },
    });
  }

  async findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async update(
    id: number,
    data: { title?: string; isDone?: boolean },
  ): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({ where: { id } });
  }
}
