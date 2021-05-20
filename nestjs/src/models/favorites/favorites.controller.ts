import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoriteDto } from './dto/favorite.dto';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('favorites')
@Controller('favorites')
@Public()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOkResponse({ type: [FavoriteDto] })
  async findAll(): Promise<FavoriteDto[]> {
    const favorites = await this.favoritesService.findAll();
    return favorites.map((favorite) => new FavoriteDto(favorite));
  }
}
