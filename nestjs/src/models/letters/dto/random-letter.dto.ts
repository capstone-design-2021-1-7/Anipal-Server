import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { Type } from 'class-transformer';
import { RandomLetter } from '../schemas/random-letter.schema';
import { ApiProperty } from '@nestjs/swagger';

export class RandomLetterDto {
  constructor(randomLetter?: RandomLetter) {
    if (randomLetter) {
      this._id = randomLetter._id.toHexString();
      this.post_animal = new DecoratedInfoDto(randomLetter.post_animal);
    }
  }

  @ApiProperty({
    type: String,
    description: '랜덤 편지의 고유 id값',
    example: '60680be281b87e19745e7f0a',
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    type: DecoratedInfoDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DecoratedInfoDto)
  post_animal: DecoratedInfoDto;
}
