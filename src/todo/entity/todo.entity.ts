import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
} from 'class-validator';
import { Status, Priority } from '../enums';

export class TodoEntity {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty({ enum: Status })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({ enum: Priority })
  @IsEnum(Priority)
  priority: Priority;

  @ApiProperty()
  @IsDateString()
  dateOfCreation: Date;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
