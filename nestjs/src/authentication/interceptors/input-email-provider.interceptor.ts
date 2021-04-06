import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class InputEmailProviderInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const { email } = context.switchToHttp().getRequest().userinfo;
    context.switchToHttp().getRequest().body['email'] = email;
    return next.handle();
  }
}
