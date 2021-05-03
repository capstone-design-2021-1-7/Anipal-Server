import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { OwnAnimal, OwnAnimalDocument } from './schemas/own-animal.schema';
import { UpdateOwnAnimalDto } from './dto/update-own-animal.dto';

@Injectable()
export class OwnAnimalsRepository {
  constructor(
    @InjectModel(OwnAnimal.name)
    private ownAnimalModel: mongoose.Model<OwnAnimalDocument>,
  ) {}

  async findOne(
    ownAnimal_id: mongoose.Types.ObjectId,
    isPopulate = false,
  ): Promise<OwnAnimal> {
    const ownAnimal = this.ownAnimalModel.findById(ownAnimal_id);
    if (isPopulate) {
      return ownAnimal.populate('animal_id').exec();
    }
    return ownAnimal.exec();
  }

  async update(
    ownAnimalId: mongoose.Types.ObjectId,
    updateOwnAnimal: UpdateOwnAnimalDto,
  ): Promise<OwnAnimal> {
    await this.ownAnimalModel.updateOne({ _id: ownAnimalId }, updateOwnAnimal);
    return this.findOne(ownAnimalId);
  }
}
