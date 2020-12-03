import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateFieldTaskDto } from './dto/update-field-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  // getTasks
  async getTasks(tasksFilter: GetTaskFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(tasksFilter);
  }

  // getTasksWithFilters
  async getTasksWithFilters(tasksFilter: GetTaskFilterDto): Promise<Task[]> {
    const { search, status } = tasksFilter;

    let tasks = await this.taskRepository.find();

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    return tasks;
  }

  // createTask
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // getTaskById
  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return task;
  }

  // updateTaskById
  async updateTaskById(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.status = updateTaskDto.status;
    await task.save();

    return task;
  }

  // updateFieldTaskById
  async updateFieldTaskById(
    id: string,
    updateFieldTaskDto: UpdateFieldTaskDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);

    if (updateFieldTaskDto.title) {
      task.title = updateFieldTaskDto.title;
    }

    if (updateFieldTaskDto.description) {
      task.description = updateFieldTaskDto.description;
    }

    if (updateFieldTaskDto.status) {
      task.status = updateFieldTaskDto.status;
    }

    task.save();

    return task;
  }

  // deleteTaskById
  async deleteTaskById(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }
  }
}
