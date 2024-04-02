import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const dueDate =
      createTodoDto.dueDate || new Date(Date.now() + 24 * 60 * 60 * 1000);
    const status = createTodoDto.status || 'PENDING';
    const priority = createTodoDto.priority || 'BLUE';
    const isActive =
      createTodoDto.isActive !== undefined ? createTodoDto.isActive : true;

    const todo = await this.prisma.todo.create({
      data: {
        ...createTodoDto,
        status,
        priority,
        dueDate,
        isActive,
      },
    });
    return todo;
  }

  async findAll(limit: number, offset: number): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      take: limit,
      skip: offset,
    });
  }

  async findOne(id: number): Promise<Todo> {
    const todoFind = await this.prisma.todo.findUnique({
      where: { id },
    });

    if (!todoFind) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todoFind;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    let updatedTodoDto = updateTodoDto;

    if (updateTodoDto.status === 'DONE') {
      updatedTodoDto = {
        ...updateTodoDto,
        isActive: false,
      };
    }

    const todo = await this.prisma.todo.update({
      where: { id },
      data: updatedTodoDto,
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return todo;
  }

  async remove(id: number): Promise<Todo> {
    await this.findOne(id);
    return await this.prisma.todo.delete({
      where: { id: id },
    });
  }
}
