import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { TaskType } from 'src/graphql/types'; // Adjust the import path if necessary
import { TasksService } from 'src/tasks/tasks.service';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [TaskType])
  @UseGuards(JwtAuthGuard)
  async getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Query(() => TaskType)
  async getTask(@Args('id') id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Query(() => [TaskType])
  @UseGuards(JwtAuthGuard)
  async myTasks(@Context() context) {
    const user = context.req.user; // Adjust based on your user extraction logic
    return this.tasksService.getTasksByUser(user.username);
  }

  @Mutation(() => TaskType)
  async createTask(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('userId') userId: number,
  ) {
    return this.tasksService.createTask(name, description, userId);
  }

  @Mutation(() => TaskType)
  async updateTask(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.tasksService.updateTask(id, name, description);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
