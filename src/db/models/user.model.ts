import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude } from 'class-transformer';
import { Task } from './task.model';

export type UserDocument = User & Document;

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
export class User {
  @Prop({ required: true })
  username: string;

  @Prop()
  @Exclude()
  password: string;

  @Prop({ enum: ['admin', 'manager', 'user'], required: true })
  role: string;
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('tasks', {
  ref: Task.name,
  localField: '_id',
  foreignField: 'user',
  justOne: false,
});

// UserSchema.index({ title: 'text', content: 'text' });

export { UserSchema };

// import { Model } from 'objection';
// import { Task } from './task.model';

// export class UserModel extends Model {
//   static tableName = 'users';

//   id!: number;
//   username!: string;
//   password!: string;
//   role!: 'admin' | 'manager' | 'user';

//   // Define JSON schema for validation
//   static jsonSchema = {
//     type: 'object',
//     required: ['username', 'password', 'role'],
//     properties: {
//       id: { type: 'integer' },
//       username: { type: 'string' },
//       password: { type: 'string' },
//       role: { type: 'string', enum: ['admin', 'manager', 'user'] },
//     },
//   };
// }
