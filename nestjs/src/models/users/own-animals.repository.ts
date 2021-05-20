import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { OwnAnimal, OwnAnimalDocument } from './schemas/own-animal.schema';
import { UpdateOwnAnimalDto } from './dto/update-own-animal.dto';
import { Animal } from '../animals/schemas/animal.schema';

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

  async useOwnAnimal(ownAnimalId: mongoose.Types.ObjectId, arrive_time: Date) {
    await this.ownAnimalModel.updateOne({ _id: ownAnimalId }, { arrive_time });
  }

  async changeFavoriteAnimal(
    newFavoriteAnimalUrl: string,
    oldFavoriteAnimalUrl: string,
  ) {
    await this.ownAnimalModel.findOneAndUpdate(
      { animal_url: newFavoriteAnimalUrl },
      { is_favorite: true },
    );
    await this.ownAnimalModel.findOneAndUpdate(
      { animal_url: oldFavoriteAnimalUrl },
      { is_favorite: false },
    );
  }

  createOwnAnimalFromAnimal(animal: Animal): OwnAnimal {
    const ownAnimal = new this.ownAnimalModel({
      animal: {
        localized: animal.localized,
        delay_time: animal.delay_time,
      },
      delay_time: animal.delay_time,
      animal_url: animal.img_url,
      coming_animal: animal.coming_animal,
    });
    ownAnimal.save().then();
    return ownAnimal;
  }
}
