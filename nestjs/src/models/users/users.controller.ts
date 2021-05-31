import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { TransformObjectidPipe } from '../../common/pipes/transform-objectid.pipe';
import { UserDto } from './dto/user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { DUser } from './decorators/user.decorator';
import { MissionsService } from '../missions/missions.service';

@ApiTags('users')
@ApiBearerAuth('bearer')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly missionsService: MissionsService,
  ) {}

  @ApiResponse({ status: 200, type: [UserDto] })
  @Get()
  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.usersService.findAll();
    return users.map((user) => new UserDto(user));
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiBadRequestResponse({
    description: 'id에 해당하는 유저가 없을 경우 발생합니다.',
  })
  async find(
    @Param('id', TransformObjectidPipe) _id: mongoose.Types.ObjectId,
  ): Promise<UserDto> {
    const user: User = await this.usersService.find(_id);
    return new UserDto(user);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: UserDto })
  @ApiBadRequestResponse({
    description: 'id에 해당하는 유저가 없을 경우 발생합니다.',
  })
  async update(
    @DUser() user: User,
    @Body() updateUser: UpdateUserDto,
  ): Promise<UserDto> {
    let accessory;
    if (updateUser.favorite_animal) {
      accessory = this.missionsService.changeFavoriteAnimalMission(user);
    }
    const updatedUser: User = await this.usersService.update(user, updateUser);
    return new UserDto(updatedUser, await accessory);
  }

  @Put('ban/:bannedUserId')
  @ApiParam({ name: 'bannedUserId', type: String })
  @ApiOkResponse()
  async banUser(
    @DUser('_id', TransformObjectidPipe) userId: mongoose.Types.ObjectId,
    @Param('bannedUserId', TransformObjectidPipe)
    bannedUserId: mongoose.Types.ObjectId,
  ) {
    this.usersService.banUser(userId, bannedUserId);
  }

  @Delete('ban/:bannedUserId')
  @ApiParam({ name: 'bannedUserId', type: String })
  @ApiOkResponse()
  async cancelBanUser(
    @DUser('_id', TransformObjectidPipe) userId: mongoose.Types.ObjectId,
    @Param('bannedUserId', TransformObjectidPipe)
    bannedUserId: mongoose.Types.ObjectId,
  ) {
    this.usersService.cancelBanUser(userId, bannedUserId);
  }
}
