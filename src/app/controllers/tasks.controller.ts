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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from '../dto/task/create-task.dto';
import { GetTaskFilterDto } from '../dto/task/get-tasks-filter.dto';
import { UpdateFieldTaskDto } from '../dto/task/update-field-task.dto';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { Task } from '../../entities/task.entity';
import { TasksService } from '../services/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Get all tasks or get all tasks filter by query parameters
   *
   * @Route GET /tasks
   * @Query GetTaskFilterFto taskFilter
   * @Code 200
   * @return Task[]
   */
  @Get()
  getTasks(
    @Query(ValidationPipe) taskFilter: GetTaskFilterDto,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(taskFilter);
  }

  /**
   * Create new task
   *
   * @Route POST /tasks
   * @param CreateTaskDto createTaskDto
   * @Code 201
   * @return Task
   */
  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Get task by ID
   *
   * @Route GET /tasks/:id
   * @param string id
   * @Code 200
   * @return Task
   */
  @Get(':id')
  getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  /**
   * Update task by ID
   *
   * @Route PUT /tasks/:id
   * @param string id
   * @param UpdateTaskDto updateTaskDto
   * @Code 200
   * @return Task
   */
  @Put(':id')
  @UsePipes(ValidationPipe)
  updateTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, updateTaskDto);
  }

  /**
   * Update particular field of task
   *
   * @param id
   */
  @Patch(':id')
  @UsePipes(ValidationPipe)
  updateFieldTaskById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateFieldTaskDto: UpdateFieldTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateFieldTaskById(id, updateFieldTaskDto);
  }

  /**
   * Delete task by ID
   *
   * @Route DELETE /tasks/:id
   * @param string id
   * @Code 204
   * @return void
   */
  @Delete(':id')
  @HttpCode(204)
  deleteTaskById(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.deleteTaskById(id);
  }
}
