import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
  ApiTags,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';
import { TodoEntity } from './entity/todo.entity';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiCreatedResponse({
    status: 201,
    type: TodoEntity,
    description: 'The created todo object',
  })
  @ApiBody({
    description:
      'The data to create a new todo. If dueDate is not provided, it will be set to 24 hours from the time of creation by default.',
    type: CreateTodoDto,
  })
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiQuery({ name: 'limit', required: true })
  @ApiQuery({ name: 'offset', required: true })
  findAll(@Query('limit') limit: string, @Query('offset') offset: string) {
    return this.todoService.findAll(+limit, +offset);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a todo by id' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'The found todo object',
  })
  @ApiResponse({ status: 404, description: 'Todo with given ID not found.' })
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateTodoDto })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'The updated Todo object',
  })
  @ApiResponse({ status: 404, description: 'Todo with given ID not found.' })
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({
    type: TodoEntity,
    description: 'The deleted Todo object.',
  })
  @ApiResponse({ status: 404, description: 'Todo with given ID not found.' })
  remove(@Param('id') id: string): Promise<Todo> {
    return this.todoService.remove(+id);
  }
}
