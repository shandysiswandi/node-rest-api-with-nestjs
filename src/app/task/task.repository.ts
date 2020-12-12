import { EntityRepository, Repository } from 'typeorm';
import { Task } from 'src/entities';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
