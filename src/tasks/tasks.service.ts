import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskModel } from '../db/models/task.model';
import { UserModel } from '../db/models/user.model';

@Injectable()
export class TasksService {
  async getAllTasks(): Promise<TaskModel[]> {
    return TaskModel.query().withGraphFetched('user');
  }

  async getTaskById(id: number): Promise<TaskModel> {
    const task = await TaskModel.query().findById(id).withGraphFetched('user');
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async getTasksByUser(username: string): Promise<TaskModel[]> {
    const user = await UserModel.query().where('username', username).first();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return TaskModel.query().where('userId', user.id).withGraphFetched('user');
  }

  async createTask(
    name: string,
    description: string,
    userId: number,
  ): Promise<TaskModel> {
    return TaskModel.query().insert({
      name,
      description,
      userId,
    });
  }

  async updateTask(
    id: number,
    name?: string,
    description?: string,
  ): Promise<TaskModel> {
    const task = await TaskModel.query().findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return TaskModel.query().patchAndFetchById(id, {
      name,
      description,
    });
  }

  async deleteTask(id: number): Promise<boolean> {
    const task = await TaskModel.query().findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await TaskModel.query().deleteById(id);
    return true;
  }
}
