import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Favorite } from '../schemas/favorite.schema';

export class FavoriteDto {
  constructor(favorite?: Favorite) {
    if (favorite) {
      this.name = favorite.name;
    }
  }

  @ApiProperty({
    type: String,
    example: 'Movie',
    examples: ['Movie', 'Dance', 'Travel', 'Sing'],
    description: '유저가 선택할 수 있는 관심사',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
