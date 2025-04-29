import { Todo } from './entities/todo.entity';
import { PrismaService } from '../prisma/prisma.service';
export declare class TodosService {
    private prisma;
    constructor(prisma: PrismaService);
    private todos;
    create(data: {
        title: string;
    }): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findOne(id: number): Promise<Todo>;
    update(id: number, data: {
        title?: string;
        isDone?: boolean;
    }): Promise<Todo>;
    remove(id: number): Promise<Todo>;
}
