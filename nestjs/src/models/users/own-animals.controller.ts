import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { TransformObjectidPipe } from '../../common/pipes/transform-objectid.pipe';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { OwnAnimalDto } from './dto/own-animal.dto';
import { UpdateOwnAnimalDto } from './dto/update-own-animal.dto';
import { DUser } from './decorators/user.decorator';
import { OwnAnimalsService } from './own-animals.service';
import { User } from './schemas/user.schema';

@ApiTags('own')
@ApiBearerAuth('bearer')
@Controller('own')
export class OwnAnimalsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ownAnimalsService: OwnAnimalsService,
  ) {}

  @Get('animals')
  @ApiOkResponse({
    description: '유저가 소유한 동물을 가져올 때 사용합니다..',
    type: [OwnAnimalDto],
  })
  async findAllOwnAnimals(
    @DUser('_id', TransformObjectidPipe) userId: mongoose.Types.ObjectId,
  ): Promise<OwnAnimalDto[]> {
    const { own_animals_id: ownAnimals } = await this.usersService.find(userId);
    return ownAnimals.map((ownAnimal) => new OwnAnimalDto(ownAnimal));
  }

  @Put('animals/:id')
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    description: '유저가 소유한 동물의 커스터마이징에 사용합니다.',
    type: OwnAnimalDto,
  })
  @ApiBadRequestResponse({
    description: 'id에 해당하는 유저가 없을 경우 발생합니다.',
  })
  async ownAnimalUpdate(
    @Param('id', TransformObjectidPipe)
    ownAnimalId: mongoose.Types.ObjectId,
    @Body() updateOwnAnimal: UpdateOwnAnimalDto,
    @DUser() user: User,
  ): Promise<OwnAnimalDto> {
    const {
      own_animals_id: ownAnimalsList,
      favorite_animal: favoriteAnimal,
      _id: userId,
    } = user;
    if (
      !ownAnimalsList.find((userOwnAnimal) =>
        ownAnimalId.equals(userOwnAnimal._id),
      )
    ) {
      throw new BadRequestException({
        detail: '유저가 가지고 있지 않은 데이터입니다.',
      });
    }
    const updatedOwnAnimal = await this.ownAnimalsService.update(
      ownAnimalId,
      updateOwnAnimal,
    );

    if (updatedOwnAnimal.animal_url == favoriteAnimal.animal_url) {
      this.usersService.updateFavoriteAnimal(userId, updatedOwnAnimal);
    }
    return new OwnAnimalDto(updatedOwnAnimal);
  }
}
