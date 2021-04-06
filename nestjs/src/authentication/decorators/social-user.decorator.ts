import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginUserDto } from '../../models/users/dto/login-user.dto';
export const SocialUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): LoginUserDto => {
    const request = ctx.switchToHttp().getRequest();
    const user: LoginUserDto = {
      email: request.userinfo['email'],
      provider: request.userinfo['provider'],
    };
    return user;
  },
);
