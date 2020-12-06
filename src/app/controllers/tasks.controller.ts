import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { GetTaskFilterDto } from '../dto/task/get-tasks-filter.dto';
import { UpdateFieldTaskDto } from '../dto/task/update-field-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { Task } from '../../entities/task.entity';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(200)
  getTasks(@Query() taskFilter: GetTaskFilterDto) {
    return this.tasksService.getTasks(taskFilter);
  }

  @Post()
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  @HttpCode(200)
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  @Patch(':id')
  @HttpCode(200)
  updateFieldTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFieldTaskDto: UpdateFieldTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateFieldTaskById(id, updateFieldTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }
}
