import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from 'src/app/task/task.service';
import { TaskRepository } from 'src/app/task/task.repository';
import { TasksController } from 'src/app/task/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
