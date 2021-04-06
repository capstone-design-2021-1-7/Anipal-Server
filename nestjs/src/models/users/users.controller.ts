import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { TransformObjectidPipe } from './pipes/transform-objectid.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth('bearer')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, type: [UserDto] })
  @Get()
  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.usersService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @ApiResponse({ status: 200, type: UserDto })
  @ApiBadRequestResponse({
    description: 'id에 해당하는 유저가 없을 경우 발생합니다.',
  })
  @Get(':id')
  async find(
    @Param('id', TransformObjectidPipe) _id: mongoose.Types.ObjectId,
  ): Promise<UserDto> {
    const user: User = await this.usersService.find(_id);
    return new UserDto(user);
  }

  @ApiCreatedResponse({ type: UserDto })
  @ApiBadRequestResponse({
    description: 'email에 해당하는 유저가 이미 존재할 경우 발생합니다.',
  })
  @Post()
  async save(@Body() user: CreateUserDto): Promise<UserDto> {
    const createdUser: User = await this.usersService.save(user);
    return new UserDto(createdUser);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: UserDto })
  @ApiBadRequestResponse({
    description: 'id에 해당하는 유저가 없을 경우 발생합니다.',
  })
  async update(
    @Param('id', TransformObjectidPipe) _id: mongoose.Types.ObjectId,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    const updatedUser: User = await this.usersService.update(_id, user);
    return new UserDto(updatedUser);
  }
}
