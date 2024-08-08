import { Model } from 'objection';

export class TaskModel extends Model {
  static tableName = 'tasks';

  id!: number;
  name!: string;
  description: string;
  userId: number;
  created_at: Date;
  updated_at: Date;

  // Define JSON schema for validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'description', 'userId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        userId: { type: 'integer' },
      },
    };
  }

  static relationMappings() {
    // const { UserModel } = require('src/db/models/user.model');
    const { UserModel } = require('./user.model');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${TaskModel.tableName}.userId`,
          to: `${UserModel.tableName}.${UserModel.idColumn}`,
        },
        filter: (query) => query.select('username', 'id'),
      },
    };
  }
}
