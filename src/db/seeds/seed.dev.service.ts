import { connect, connection, model } from 'mongoose';
import { UserSchema } from '../models/user.model';
import { TaskSchema } from '../models/task.model';
import { hashSync } from 'bcryptjs';
import 'dotenv/config';

// Define models
const User = model('User', UserSchema);
const Task = model('Task', TaskSchema);

async function seedUsers() {
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create([
      { username: 'admin', password: hashSync('adminpass', 10), role: 'admin' },
      {
        username: 'manager',
        password: hashSync('managerpass', 10),
        role: 'manager',
      },
      { username: 'user', password: hashSync('userpass', 10), role: 'user' },
    ]);
    console.log('Test: users seeded');
  }
}

async function seedTasks() {
  const taskCount = await Task.countDocuments();
  if (taskCount === 0) {
    const users = await User.find();
    await Task.create([
      {
        name: 'Dev Task 1',
        description: 'Description for Dev Task 1',
        user: users[0]._id,
      },
      {
        name: 'Dev Task 2',
        description: 'Description for Dev Task 2',
        user: users[1]._id,
      },
    ]);
    console.log('Test: tasks seeded');
  }
}

async function seedDevDatabase() {
  await connect(`${process.env.MONGO_URL}/${process.env.MONGO_DATABASE}`);
  await seedUsers();
  await seedTasks();
  await connection.close();
}

export { seedDevDatabase };
