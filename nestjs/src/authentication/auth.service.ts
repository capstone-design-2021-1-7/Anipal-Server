import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../models/users/users.repository';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { User } from '../models/users/schemas/user.schema';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthConfigService } from '../config/auth/config.service';
import { AccessTokenDto } from './dto/access-token.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { RefreshTokenTdo } from './dto/refresh-token.tdo';
import { AnimalsRepository } from '../models/animals/animals.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly authConfigService: AuthConfigService,

    private readonly animalsRepository: AnimalsRepository,
  ) {}

  async login(loginUser: LoginUserDto, provider: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(loginUser.email);
    if (!user) {
      throw new NotFoundException({
        detail: `${loginUser.email}에 해당하는 유저가 존재하지 않습니다.`,
      });
    }
    if (user.provider !== provider) {
      throw new BadRequestException({
        detail: `${loginUser.email}와 같은 이메일을 가진 다른 소셜 계정이 존재합니다.`,
      });
    }
    return user;
  }

  async register(registeredUser: CreateUserDto): Promise<User> {
    if (await this.usersRepository.findByEmail(registeredUser.email)) {
      throw new BadRequestException({
        detail: `${registeredUser.email}와 같은 이메일을 가진 계정이 이미 존재합니다.`,
      });
    }
    const animals = this.animalsRepository.findBasic();
    return await this.usersRepository.save(registeredUser, await animals);
  }

  getCookieWithAccessToken(user: User): AccessTokenDto {
    const payload: JwtPayloadDto = {
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.authConfigService.jwt_access_secret,
      expiresIn: this.authConfigService.jwt_access_expire,
    });
    return {
      accessToken: token,
      domain: 'ec2-15-164-231-148.ap-northeast-2.compute.amazonaws.com',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.authConfigService.jwt_access_expire.slice(0, -1)) * 1000,
    };
  }

  getCookieWithRefreshToken(user: User): RefreshTokenTdo {
    const payload: JwtPayloadDto = {
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.authConfigService.jwt_refresh_secret,
      expiresIn: this.authConfigService.jwt_refresh_expire,
    });
    return {
      refreshToken: token,
      domain: 'ec2-15-164-231-148.ap-northeast-2.compute.amazonaws.com',
      path: '/',
      httpOnly: true,
      maxAge:
        Number(this.authConfigService.jwt_refresh_expire.slice(0, -1)) *
        86400 *
        1000,
    };
  }
}
