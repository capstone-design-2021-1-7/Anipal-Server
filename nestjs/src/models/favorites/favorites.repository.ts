import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoritesRepository {
  constructor(
    @InjectModel(Favorite.name)
    private favoriteModel: mongoose.Model<FavoriteDocument>,
  ) {}

  async findAll(): Promise<Favorite[]> {
    const favorites = this.favoriteModel.find().exec();
    return favorites;
  }
}
