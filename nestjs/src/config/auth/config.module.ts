import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AuthConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET: Joi.string().default('access'),
        JWT_ACCESS_EXPIRE: Joi.string().default('86400s'),
        JWT_REFRESH_SECRET: Joi.string().default('refresh'),
        JWT_REFRESH_EXPIRE: Joi.string().default('20d'),
        ANIPAL_GOOGLE_CLIENT_ID: Joi.string(),
        ANIPAL_GOOGLE_SECRET_KEY: Joi.string(),
        ANIPAL_GOOGLE_REDIRECT_URL: Joi.string(),
        ANIPAL_FACEBOOK_APP_KEY: Joi.string(),
        ANIPAL_FACEBOOK_SECRET_KEY: Joi.string(),
        ANIPAL_FACEBOOK_REDIRECT_URL: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, AuthConfigService],
  exports: [ConfigService, AuthConfigService],
})
export class AuthConfigModule {}
