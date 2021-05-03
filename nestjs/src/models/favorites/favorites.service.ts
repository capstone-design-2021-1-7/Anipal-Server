import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { Favorite } from './schemas/favorite.schema';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async findAll(): Promise<Favorite[]> {
    const favorites = this.favoritesRepository.findAll();
    return favorites;
  }
}
