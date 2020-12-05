import { IsIn, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../types/task-status.enum';

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
