import { IsIn, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateFieldTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
}
