import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { LoginResponse } from './types/login-response.type';
import { LoginInput } from './inputs/login.input';
import { GqlAuthGuard } from './gql-auth.guard';
import { AdminType } from './types/admin.type';
import { CurrentUser } from '../../auth/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => AdminType)
  async me(@CurrentUser() user: any) {
    return this.authService.getMe(user.id);
  }
}
