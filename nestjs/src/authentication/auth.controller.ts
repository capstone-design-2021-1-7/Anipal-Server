import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SocialUser } from './decorators/social-user.decorator';
import { LoginUserDto } from '../models/users/dto/login-user.dto';
import { UserDto } from '../models/users/dto/user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../models/users/dto/create-user.dto';
import { InputEmailProviderInterceptor } from './interceptors/input-email-provider.interceptor';
import { Public } from '../common/decorators/public.decorator';
import { JwtRefreshAuthGuard } from './guards/jwt.refresh-auth.guard';
import { DUser } from '../models/users/decorators/user.decorator';
import { User } from '../models/users/schemas/user.schema';
import { AccessTokenDto } from './dto/access-token.dto';

@ApiTags('auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: 'Refresh Token이 없거나 만료된 경우 발생합니다.',
  })
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refresh(@DUser() user: User, @Res({ passthrough: true }) res) {
    const {
      accessToken,
      ...accessOptions
    } = this.authService.getCookieWithAccessToken(user);
    res.cookie('Authorization', accessToken, accessOptions);
    return { status: HttpStatus.OK };
  }

  @Get(':provider')
  @ApiOkResponse({ type: UserDto })
  @ApiNotFoundResponse({
    description: 'email에 해당하는 유저가 존재하지 않을 때 발생합니다.',
  })
  @ApiBadRequestResponse({
    description: 'email에 해당하는 유저가 다른 소셜 계정일 때 발생합니다.',
  })
  @ApiHeader({
    required: true,
    name: 'Authorization',
    example: 'Bearer access_token',
  })
  async login(
    @SocialUser() loginUser: LoginUserDto,
    @Param('provider') provider: string,
    @Res({ passthrough: true }) res,
  ): Promise<UserDto> {
    const user = await this.authService.login(loginUser, provider);
    const {
      accessToken,
      ...accessOptions
    } = this.authService.getCookieWithAccessToken(user);
    const {
      refreshToken,
      ...refreshOptions
    } = this.authService.getCookieWithRefreshToken(user);
    res.cookie('Authorization', accessToken, accessOptions);
    res.cookie('Refresh', refreshToken, refreshOptions);
    return new UserDto(user);
  }

  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse({
    description: 'email에 해당하는 계정이 이미 존재할 때 발생합니다.',
  })
  @ApiHeader({
    required: true,
    name: 'Authorization',
    example: 'Bearer access_token',
  })
  @Post('/register')
  @UseInterceptors(InputEmailProviderInterceptor)
  async register(
    @Body() user: CreateUserDto,
    @Res({ passthrough: true }) res,
  ): Promise<UserDto> {
    const registeredUser = await this.authService.register(user);
    const {
      accessToken,
      ...accessOptions
    } = this.authService.getCookieWithAccessToken(registeredUser);
    const {
      refreshToken,
      ...refreshOptions
    } = this.authService.getCookieWithRefreshToken(registeredUser);
    res.cookie('Authorization', accessToken, accessOptions);
    res.cookie('Refresh', refreshToken, refreshOptions);
    return registeredUser;
  }

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    description: '테스트를 위한 임시 login route입니다.',
    type: AccessTokenDto,
  })
  @ApiNotFoundResponse({
    description: 'email에 해당하는 유저가 존재하지 않을 때 발생합니다.',
  })
  async test_login(@Body() user: LoginUserDto): Promise<AccessTokenDto> {
    const loginUser = await this.authService.login(user, user.provider);
    return this.authService.getCookieWithAccessToken(loginUser);
  }
}
