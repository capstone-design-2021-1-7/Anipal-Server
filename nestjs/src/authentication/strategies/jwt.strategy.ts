import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../models/users/users.service';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { User } from '../../models/users/schemas/user.schema';
import { AuthConfigService } from '../../config/auth/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private usersService: UsersService,
    private authConfigService: AuthConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfigService.jwt_access_secret,
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    return await this.usersService.findByEmail(payload.email);
  }
}
