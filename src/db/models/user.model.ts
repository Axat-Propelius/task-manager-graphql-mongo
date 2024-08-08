import { Model } from 'objection';

export class UserModel extends Model {
  static tableName = 'users';

  id!: number;
  username!: string;
  password!: string;
  role!: 'admin' | 'manager' | 'user';

  // Define JSON schema for validation
  static jsonSchema = {
    type: 'object',
    required: ['username', 'password', 'role'],
    properties: {
      id: { type: 'integer' },
      username: { type: 'string' },
      password: { type: 'string' },
      role: { type: 'string', enum: ['admin', 'manager', 'user'] },
    },
  };
}
