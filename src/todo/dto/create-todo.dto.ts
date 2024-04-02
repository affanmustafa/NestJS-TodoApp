import {
  IsNotEmpty,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Status, Priority } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    example: 'Buy groceries',
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: false,
    description:
      'Due date in ISO 8601 format (YYYY-MM-DDTHH:MM:SSZ). Default value is 24 hours time of creation.',
    default: new Date(Date.now() + 24 * 60 * 60 * 1000),
  })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;

  @ApiProperty({
    enum: Status,
    required: false,
    default: Status.PENDING,
  })
  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  @ApiProperty({
    required: false,
    enum: Priority,
    default: Priority.NORMAL,
  })
  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
