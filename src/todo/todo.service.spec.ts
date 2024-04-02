import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Status, Priority } from './enums';
import { TodoEntity } from './entity/todo.entity';

describe('TodoService', () => {
  let service: TodoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, PrismaService],
    }).compile();

    service = module.get<TodoService>(TodoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', async () => {
    const createTodoDto: CreateTodoDto = {
      name: 'New Todo',
    };

    const todo: TodoEntity = {
      id: 1,
      name: 'New Todo',
      dueDate: new Date(),
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
      isActive: true,
    };

    jest.spyOn(prisma.todo, 'create').mockResolvedValue(todo);

    expect(await service.create(createTodoDto)).toEqual(todo);
  });

  it('should find all todos', async () => {
    const todos: TodoEntity[] = [
      {
        id: 1,
        name: 'Todo 1',
        dueDate: new Date(),
        status: Status.PENDING,
        priority: Priority.NORMAL,
        dateOfCreation: new Date(),
        isActive: true,
      },
      {
        id: 2,
        name: 'Todo 2',
        dueDate: new Date(),
        status: Status.PENDING,
        priority: Priority.NORMAL,
        dateOfCreation: new Date(),
        isActive: true,
      },
      // Add more todos as needed...
    ];

    jest.spyOn(prisma.todo, 'findMany').mockResolvedValue(todos);

    expect(await service.findAll(10, 0)).toEqual(todos);
  });

  it('should find one todo', async () => {
    const todo: TodoEntity = {
      id: 1,
      name: 'Todo 1',
      dueDate: new Date(),
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
      isActive: true,
    };

    jest.spyOn(prisma.todo, 'findUnique').mockResolvedValue(todo);

    expect(await service.findOne(1)).toEqual(todo);
  });

  it('should update a todo', async () => {
    const updateTodoDto: UpdateTodoDto = {
      name: 'Updated Todo',
    };

    const updatedTodo: TodoEntity = {
      id: 1,
      name: 'Updated Todo',
      dueDate: new Date(),
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
      isActive: true,
    };

    jest.spyOn(prisma.todo, 'update').mockResolvedValue(updatedTodo);

    expect(await service.update(1, updateTodoDto)).toEqual(updatedTodo);
  });

  it('should remove a todo', async () => {
    const todo: TodoEntity = {
      id: 1,
      name: 'Todo 1',
      dueDate: new Date(),
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
      isActive: true,
    };

    jest.spyOn(prisma.todo, 'delete').mockResolvedValue(todo);

    expect(await service.remove(1)).toEqual(todo);
  });
});
