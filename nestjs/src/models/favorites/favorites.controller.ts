import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoriteDto } from './dto/favorite.dto';

@ApiTags('favorites')
@ApiBearerAuth('bearer')
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({ type: [FavoriteDto] })
  async findAll(): Promise<FavoriteDto[]> {
    const favorites = await this.favoritesService.findAll();
    return favorites.map((favorite) => new FavoriteDto(favorite));
  }
}
