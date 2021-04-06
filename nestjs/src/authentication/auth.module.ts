import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SocialLoginMiddleware } from './middlewares/social-login.middleware';
import { AuthConfigModule } from '../config/auth/config.module';
import { UsersRepository } from '../models/users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/users/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthConfigService } from '../config/auth/config.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt.refresh.strategy';
import { UsersService } from '../models/users/users.service';

@Module({
  imports: [
    AuthConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [AuthConfigModule],
      useFactory: async (authConfigService: AuthConfigService) => ({
        secret: authConfigService.jwt_access_secret,
        signOptions: {
          expiresIn: authConfigService.jwt_access_expire,
        },
      }),
      inject: [AuthConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    JwtStrategy,
    JwtRefreshStrategy,
    UsersService,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SocialLoginMiddleware)
      .forRoutes(
        { path: 'auth/:provider', method: RequestMethod.GET },
        { path: 'auth/register', method: RequestMethod.POST },
      );
  }
}
