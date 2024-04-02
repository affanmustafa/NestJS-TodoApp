import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Status, Priority } from './enums';
import { TodoEntity } from './entity/todo.entity';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: {
            todo: {
              findMany: jest.fn().mockResolvedValue([]),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should return an array of todos', async () => {
    const result = [];
    const limit = '5';
    const offset = '0';
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll(limit, offset)).toBe(result);
  });

  it('should create a todo', async () => {
    const createTodoDto: CreateTodoDto = {
      name: 'Test Todo',
      dueDate: new Date(),
    };
    const result: TodoEntity = {
      id: 1,
      name: 'Test Todo',
      dueDate: new Date(),
      isActive: false,
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
    };
    jest.spyOn(service, 'create').mockResolvedValue(result);
    expect(await controller.create(createTodoDto)).toBe(result);
  });

  it('should return a todo', async () => {
    const id = '1';
    const result: TodoEntity = {
      id: 1,
      name: 'Test Todo',
      dueDate: new Date(),
      isActive: false,
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne(id)).toBe(result);
  });

  it('should return a todo', async () => {
    const id = '1';
    const result: TodoEntity = {
      id: 1,
      name: 'Test Todo',
      dueDate: new Date(),
      isActive: false,
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne(id)).toBe(result);
  });

  it('should update a todo', async () => {
    const id = '1';
    const updateTodoDto: UpdateTodoDto = {
      name: 'Updated Test Todo',
      dueDate: new Date(),
      isActive: true,
      status: Status.DONE,
      priority: Priority.HIGH,
    };
    const result: TodoEntity = {
      id: 1,
      name: 'Updated Test Todo',
      dueDate: new Date(),
      isActive: true,
      status: Status.DONE,
      priority: Priority.HIGH,
      dateOfCreation: new Date(),
    };
    jest.spyOn(service, 'update').mockResolvedValue(result);
    expect(await controller.update(id, updateTodoDto)).toBe(result);
  });

  it('should delete a todo', async () => {
    const id = '1';
    const result: TodoEntity = {
      id: 1,
      name: 'Test Todo',
      dueDate: new Date(),
      isActive: false,
      status: Status.PENDING,
      priority: Priority.NORMAL,
      dateOfCreation: new Date(),
    };
    jest.spyOn(service, 'remove').mockResolvedValue(result);
    expect(await controller.remove(id)).toBe(result);
  });
});
