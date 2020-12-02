import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   * Get all tasks
   *
   * @Route GET /tasks
   * @Code 200
   * @return Task[]
   */
  @Get()
  getAllTasks(): Task[] {
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
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    console.log('ID: ', id);
    console.log('data: ', updateTaskDto);

    return this.tasksService.updateTaskById(id, updateTaskDto);
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
