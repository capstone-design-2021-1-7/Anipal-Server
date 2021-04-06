import {
  BadRequestException,
  HttpService,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SocialLoginMiddleware implements NestMiddleware {
  constructor(private readonly httpService: HttpService) {}

  private readonly OAUTH_USERINFO_URL = {
    google: 'https://www.googleapis.com/oauth2/v3/userinfo',
    facebook: 'https://graph.facebook.com/v10.0/me',
  };

  async use(req: Request, res: Response, next: NextFunction) {
    const { provider } = req.params['provider'] ? req.params : req.body;
    if (['google', 'facebook'].includes(provider)) {
      const access_token = req.headers['authorization'];
      const userInfoRes = await this.httpService
        .get(
          this.OAUTH_USERINFO_URL[provider] +
            (provider === 'facebook'
              ? '?fields=last_name,first_name,email'
              : ''),
          {
            headers: { Authorization: `${access_token}` },
          },
        )
        .toPromise();
      req['userinfo'] = userInfoRes.data;
      req['userinfo']['provider'] = provider;
      next();
    } else {
      throw new BadRequestException({
        detail: '현재 google, facebook login만 지원입니다.',
      });
    }
  }
}
