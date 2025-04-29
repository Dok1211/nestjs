import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto';
import { Todo } from './entities/todo.entity';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodoDto: CreateTodoDto): Promise<Todo>;
    findAll(): Promise<Todo[]>;
    findOne(id: number): Promise<Todo | null>;
    update(id: number, data: {
        title?: string;
        isDone?: boolean;
    }): Promise<Todo | null>;
    remove(id: number): Promise<Todo>;
}
