import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskDocument } from '../db/models/task.model';
import { User, UserDocument } from '../db/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getAllTasks(): Promise<TaskDocument[]> {
    return this.taskModel.find().populate('user');
  }

  async getTaskById(id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id).populate('user');
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async getTasksByUser(userId: string): Promise<TaskDocument[]> {
    return this.taskModel.find({ user: userId }).populate('user');
  }

  async createTask(
    name: string,
    description: string,
    userId: string,
  ): Promise<TaskDocument> {
    return new this.taskModel({
      name,
      description,
      user: userId,
    }).save();
  }

  async updateTask(
    id: number,
    name?: string,
    description?: string,
  ): Promise<TaskDocument> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.taskModel.findByIdAndUpdate(id, {
      name,
      description,
    });
  }

  async deleteTask(id: number): Promise<boolean> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    await this.taskModel.findByIdAndDelete(id);
    return true;
  }
}
