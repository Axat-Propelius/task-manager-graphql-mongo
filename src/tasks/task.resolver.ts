import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { TaskType } from 'src/graphql/types'; // Adjust the import path if necessary
import { TasksService } from 'src/tasks/tasks.service';

@Resolver(() => TaskType)
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [TaskType])
  @Roles('admin')
  async getTasks() {
    return this.tasksService.getAllTasks();
  }

  @Query(() => TaskType)
  @Roles('admin', 'user')
  async getTask(@Args('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Query(() => [TaskType])
  @Roles('user')
  async myTasks(@Context() context) {
    const user = context.req.user; // Adjust based on your user extraction logic
    return this.tasksService.getTasksByUser(user._id);
  }

  @Mutation(() => TaskType)
  @Roles('user')
  async createTask(
    @Args('name') name: string,
    @Args('description') description: string,
    @Context() context,
  ) {
    const user = context.req.user; // Adjust based on your user extraction logic
    console.log(user._id);
    return this.tasksService.createTask(name, description, user._id);
  }

  @Mutation(() => TaskType)
  @Roles('admin', 'user')
  async updateTask(
    @Args('id') id: number,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.tasksService.updateTask(id, name, description);
  }

  @Mutation(() => Boolean)
  @Roles('admin', 'user')
  async deleteTask(@Args('id') id: number) {
    return this.tasksService.deleteTask(id);
  }
}
