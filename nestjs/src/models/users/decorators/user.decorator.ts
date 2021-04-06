import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const DUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User | string | number | Date => {
    const request = ctx.switchToHttp().getRequest();
    return !data ? request.user : request.user[data];
  },
);
