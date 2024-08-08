import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { Transform, Type } from 'class-transformer';
import { User } from './user.model';

export type TaskDocument = Task & Document;
@Schema({
  timestamps: {
    currentTime: () => Date.now(),
    createdAt: 'created',
    updatedAt: 'updated',
  },
  collation: {
    locale: 'en',
    strength: 2,
    caseLevel: false,
  },
})
export class Task {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop({
    set: (content: string) => {
      return content.trim();
    },
  })
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  @Type(() => User)
  user: User;
}

const TaskSchema = SchemaFactory.createForClass(Task);

// TaskSchema.index({ title: 'text', content: 'text' });

export { TaskSchema };

// import { Model } from 'objection';

// export class TaskModel extends Model {
//   static tableName = 'tasks';

//   id!: number;
//   name!: string;
//   description: string;
//   userId: number;
//   created_at: Date;
//   updated_at: Date;

//   // Define JSON schema for validation
//   static get jsonSchema() {
//     return {
//       type: 'object',
//       required: ['name', 'description', 'userId'],
//       properties: {
//         id: { type: 'integer' },
//         name: { type: 'string' },
//         description: { type: 'string' },
//         userId: { type: 'integer' },
//       },
//     };
//   }

//   static relationMappings() {
//     const { UserModel } = require('./user.model');
//     return {
//       user: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: UserModel,
//         join: {
//           from: `${TaskModel.tableName}.userId`,
//           to: `${UserModel.tableName}.${UserModel.idColumn}`,
//         },
//         filter: (query) => query.select('username', 'id'),
//       },
//     };
//   }
// }
