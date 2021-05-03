import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { OwnAnimalsRepository } from './own-animals.repository';
import { UpdateOwnAnimalDto } from './dto/update-own-animal.dto';
import { OwnAnimal } from './schemas/own-animal.schema';

@Injectable()
export class OwnAnimalsService {
  constructor(private readonly ownAnimalsRepository: OwnAnimalsRepository) {}
  async update(
    ownAnimalId: mongoose.Types.ObjectId,
    updateOwnAnimal: UpdateOwnAnimalDto,
  ): Promise<OwnAnimal> {
    return this.ownAnimalsRepository.update(ownAnimalId, updateOwnAnimal);
  }
}
