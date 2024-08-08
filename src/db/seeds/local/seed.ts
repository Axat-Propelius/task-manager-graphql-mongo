import { hashSync } from 'bcryptjs';

exports.seed = async function (knex) {
  await knex('users').del();
  await knex('tasks').del();

  await knex('users').insert([
    { username: 'admin', password: hashSync('adminpass', 10), role: 'admin' },
    {
      username: 'manager',
      password: hashSync('managerpass', 10),
      role: 'manager',
    },
    { username: 'user', password: hashSync('userpass', 10), role: 'user' },
  ]);

  await knex('tasks').insert([
    { name: 'Task 1', description: 'Description 1', userId: 3 },
    { name: 'Task 2', description: 'Description 2', userId: 3 },
  ]);
};
