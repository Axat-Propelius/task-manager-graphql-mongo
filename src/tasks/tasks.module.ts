import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/db/models/task.model';
import { User, UserSchema } from 'src/db/models/user.model';
import { TasksService } from './tasks.service';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [TasksService, TaskResolver],
  exports: [TasksService],
})
export class TasksModule {}
