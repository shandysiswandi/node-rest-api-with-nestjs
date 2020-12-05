import { Column, Entity } from 'typeorm';
import { TaskStatus } from '../app/types/task-status.enum';
import Base from './entity';

@Entity('tasks')
export class Task extends Base {
  @Column({ length: 100 })
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
