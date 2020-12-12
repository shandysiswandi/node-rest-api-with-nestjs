import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from 'src/entities/task.entity';
import { CreateTaskPayload, OptionalFieldTaskPayload, UpdateTaskPayload } from '../payloads/task.payload';
import { entityFields, isCanDelete, isCanGetID } from 'src/common';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepo: TaskRepository,
  ) { }

  async getTasks(): Promise<Task[]> {
    return await this.taskRepo.find();
  }

  async filterTasks(payload: OptionalFieldTaskPayload): Promise<Task[]> {
    const where = entityFields(payload);
    return await this.taskRepo.find({ where });
  }

  async createOne(payload: CreateTaskPayload): Promise<Task> {
    return await this.taskRepo.save(payload);
  }

  async getById(id: string): Promise<Task> {
    const one = await this.taskRepo.findOne(id);
    isCanGetID(one, id);
    return one;
  }

  async updateById(id: string, payload: UpdateTaskPayload): Promise<Task> {
    const task = await this.getById(id);
    await task.save(entityFields(payload));
    return task;
  }

  async updateFieldById(id: string, payload: OptionalFieldTaskPayload): Promise<Task> {
    const task = await this.getById(id);
    await task.save(entityFields(payload));
    return task;
  }

  async deleteById(id: string): Promise<boolean> {
    const del = await this.taskRepo.softDelete(id);
    isCanDelete(del, id);
    return true;
  }
}
