import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateFieldTaskDto } from './dto/update-field-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

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
  getTasks(@Query(ValidationPipe) taskFilter: GetTaskFilterDto): Task[] {
    if (Object.keys(taskFilter).length) {
      return this.tasksService.getTasksWithFilters(taskFilter);
    }

    return this.tasksService.getAllTasks();
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
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
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
  getTaskById(@Param('id') id: string): Task {
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
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
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
    @Param('id') id: string,
    @Body() updateFieldTaskDto: UpdateFieldTaskDto,
  ): Task {
    return this.tasksService.updateFieldTaskById(id, updateFieldTaskDto);
  }

  /**
   * Get all tasks
   *
   * @Route DELETE /tasks/:id
   * @param string id
   * @Code 204
   * @return void
   */
  @Delete(':id')
  @HttpCode(204)
  deleteTaskById(@Param('id') id: string) {
    this.tasksService.deleteTaskById(id);
  }
}
