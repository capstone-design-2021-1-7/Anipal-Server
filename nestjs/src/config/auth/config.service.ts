import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
  constructor(private configService: ConfigService) {}

  get jwt_access_secret(): string {
    return this.configService.get<string>('auth.jwt_access_secret');
  }

  get jwt_access_expire(): string {
    return this.configService.get<string>('auth.jwt_access_expire');
  }

  get jwt_refresh_secret(): string {
    return this.configService.get<string>('auth.jwt_refresh_secret');
  }

  get jwt_refresh_expire(): string {
    return this.configService.get<string>('auth.jwt_refresh_expire');
  }

  get google_client_id(): string {
    return this.configService.get<string>('auth.google_client_id');
  }

  get google_secret_key(): string {
    return this.configService.get<string>('auth.google_secret_key');
  }

  get google_redirect_url(): string {
    return this.configService.get<string>('auth.google_redirect_url');
  }

  get facebook_app_key(): string {
    return this.configService.get<string>('auth.facebook_app_key');
  }

  get facebook_secret_key(): string {
    return this.configService.get<string>('auth.facebook_secret_key');
  }

  get facebook_redirect_url(): string {
    return this.configService.get<string>('auth.facebook_redirect_url');
  }
}
