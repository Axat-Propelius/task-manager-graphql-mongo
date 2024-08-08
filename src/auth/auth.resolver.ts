import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserLoginType } from 'src/graphql/types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserLoginType) // Specify the return type as String for the access token
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<{ access_token: string }> {
    return this.authService.login(username, password);
  }
}
