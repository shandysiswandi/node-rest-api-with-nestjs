import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/app/task';

// CreateTaskPayload
export class CreateTaskPayload {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

// UpdateTaskPayload
export class UpdateTaskPayload {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus;
}

// UpdateFieldTaskPayload
export class OptionalFieldTaskPayload {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status?: TaskStatus;
}
