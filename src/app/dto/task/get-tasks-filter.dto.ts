import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../../types/task-status.enum';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  @IsString()
  search: string;
}
