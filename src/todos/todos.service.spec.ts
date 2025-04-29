import { Test, TestingModule } from '@nestjs/testing';
import { Todo } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TodosService (with Prisma mock)', () => {
  let service: TodosService;
  const data = {
    id: 1,
    title: 'test title',
    isDone: false,
  };

  const mockPrisma = {
    todo: {
      create: jest.fn().mockResolvedValue(data),
      findMany: jest.fn().mockResolvedValue([data]),
      findUnique: jest.fn().mockResolvedValue(data),
      update: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Updated Todo',
        isDone: true,
      }),
      delete: jest.fn().mockResolvedValue(data),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should create todo using prisma mock', async () => {
    const result: Todo = await service.create({ title: 'test title' });
    expect(result.title).toBe('test title');
    expect(result.isDone).toBe(false);
    expect(mockPrisma.todo.create).toHaveBeenCalled();
  });

  it('should findAll todo using prisma mock', async () => {
    const result: Todo[] = await service.findAll();
    expect(result).toHaveLength(1);
    expect(mockPrisma.todo.findMany).toHaveBeenCalled();
  });

  it('should one todo using prisma mock', async () => {
    const result: Todo | null = await service.findOne(1);
    expect(result?.id).toBe(1);
    expect(mockPrisma.todo.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });

  it('should update todo using prisma mock', async () => {
    const result: Todo = await service.update(1, {
      title: 'Updated Todo',
      isDone: true,
    });
    expect(result.title).toBe('Updated Todo');
    expect(result.isDone).toBe(true);
    expect(mockPrisma.todo.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Updated Todo', isDone: true },
    });
  });

  it('should delete todo using prisma mock', async () => {
    const result: Todo | null = await service.remove(1);
    expect(result?.id).toBe(1);
    expect(mockPrisma.todo.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
