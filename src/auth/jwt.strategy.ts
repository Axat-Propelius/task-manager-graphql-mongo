import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDocument } from '../db/models/user.model';
import { JwtPayload } from './jwt.payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<UserDocument> {
    // Implement user fetching logic here, e.g., from a database
    const user = await this.userService.findUserByID(payload.userId);

    if (!user) {
      // Optionally throw an exception if user is not found
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
