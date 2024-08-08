import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskResolver } from './task.resolver';

@Module({
  providers: [TasksService, TaskResolver],
  exports: [TasksService],
})
export class TasksModule {}
