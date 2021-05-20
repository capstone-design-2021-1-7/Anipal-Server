import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { AnimalDto } from './dto/animal.dto';
import * as mongoose from 'mongoose';
import { TransformObjectidPipe } from '../../common/pipes/transform-objectid.pipe';
import { BriefOwnAnimalDto } from './dto/brief-own-animal.dto';
import { DUser } from '../users/decorators/user.decorator';
import { User } from '../users/schemas/user.schema';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('animals')
@ApiBearerAuth('bearer')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  @ApiOkResponse({ type: [BriefOwnAnimalDto] })
  async findAll(@DUser() user: User): Promise<BriefOwnAnimalDto[]> {
    const { own_animals_id: ownAnimals } = user;

    const animals = (await this.animalsService.findAll()).filter(
      (animal) =>
        !ownAnimals.find(
          (ownAnimal) => ownAnimal.animal.localized == animal.localized,
        ),
    );

    return ownAnimals
      .map((ownAnimal) => new BriefOwnAnimalDto(ownAnimal))
      .concat(animals.map((animal) => new BriefOwnAnimalDto(null, animal)));
  }

  @Get('/basic')
  @Public()
  @ApiOkResponse({
    type: [AnimalDto],
    description: '기본 동물을 얻을 때 사용합니다.',
  })
  async findBasic(): Promise<AnimalDto[]> {
    const basicAnimals = await this.animalsService.findBasic();
    return basicAnimals.map((animal) => new AnimalDto(animal));
  }

  @Get(':_id')
  @ApiParam({ name: '_id', type: String })
  @ApiOkResponse({ type: AnimalDto })
  async find(
    @Param('_id', TransformObjectidPipe) _id: mongoose.Types.ObjectId,
  ): Promise<AnimalDto> {
    const animal = await this.animalsService.find(_id);
    return new AnimalDto(animal);
  }
}
