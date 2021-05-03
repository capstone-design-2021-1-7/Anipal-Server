import {
  BadRequestException,
  Body,
  Controller,
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

@ApiTags('own')
@ApiBearerAuth('bearer')
@Controller('own')
export class OwnAnimalsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly ownAnimalsService: OwnAnimalsService,
  ) {}

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
    @DUser('own_animals_id') ownAnimalsList: string[],
  ): Promise<OwnAnimalDto> {
    if (
      !ownAnimalsList.find(
        (userOwnAnimal) => ownAnimalId.toHexString() == userOwnAnimal,
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
    return new OwnAnimalDto(updatedOwnAnimal);
  }
}
