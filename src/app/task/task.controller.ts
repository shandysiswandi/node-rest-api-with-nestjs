import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task } from 'src/entities';
import {
  CreateTaskPayload,
  OptionalFieldTaskPayload,
  UpdateTaskPayload,
  TasksService,
} from 'src/app/task';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks() {
    return await this.tasksService.getTasks();
  }

  @Get('filter')
  async filterTasks(@Query() payload: OptionalFieldTaskPayload) {
    return await this.tasksService.filterTasks(payload);
  }

  @Get(':id')
  async getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return await this.tasksService.getById(id);
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskPayload): Promise<Task> {
    return await this.tasksService.createOne(createTaskDto);
  }

  @Put(':id')
  async updateTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTaskPayload,
  ): Promise<Task> {
    return await this.tasksService.updateById(id, payload);
  }

  @Patch(':id')
  async updateFieldTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: OptionalFieldTaskPayload,
  ): Promise<Task> {
    return await this.tasksService.updateFieldById(id, payload);
  }

  @Delete(':id')
  async deleteTaskById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<boolean> {
    return await this.tasksService.deleteById(id);
  }
}
