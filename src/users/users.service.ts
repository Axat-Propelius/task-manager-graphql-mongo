import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserModel } from '../db/models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor() {}

  async findUserByUsername(username: string): Promise<any> {
    const user = await UserModel.query().where('username', username).first();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findUserByUsername(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async createUser(
    username: string,
    password: string,
    role: 'admin' | 'manager' | 'user',
  ): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return UserModel.query().insert({
      username,
      password: hashedPassword,
      role,
    });
  }
}
