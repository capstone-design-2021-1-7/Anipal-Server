import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Animal } from '../schemas/animal.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ComingAnimalDto } from './coming-animal.dto';

export class AnimalDto {
  constructor(animal?: Animal) {
    if (animal) {
      this._id = animal._id.toHexString();
      this.price = animal.price;
      this.img_url = animal.img_url;
      this.delay_time = animal.delay_time;
      this.mission = animal.mission;
      this.coming_animal = new ComingAnimalDto(animal.coming_animal);
      this.is_basic = animal.is_basic;
      this.localized = animal.localized;
    }
  }

  @ApiProperty({
    type: String,
    example: '60680be281b87e19745e7f0a',
    description: '동물의 고유 id 값',
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    type: Number,
    example: 0,
    examples: [10000, 0],
    description: '동물의 가격',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '동물의 사진 url',
  })
  @IsNotEmpty()
  @IsString()
  img_url: string;

  @ApiProperty({
    type: String,
    example: '1h 0m 0s',
    examples: ['1h 0m 0s', '0h 30m 0s', '13h 20m 10s'],
    description: '동물의 배달 시간',
  })
  @IsNotEmpty()
  @IsString()
  delay_time: string;

  @ApiProperty({
    type: String,
    example: 'changeFavoriteAnimal',
    description: '동물을 얻기 위한 mission localized key 값',
  })
  @IsNotEmpty()
  @IsString()
  mission: string;

  @ApiProperty({
    type: ComingAnimalDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ComingAnimalDto)
  coming_animal: ComingAnimalDto;

  @ApiProperty({
    type: String,
    example: true,
    description: '기본 동물 여부',
  })
  @IsNotEmpty()
  @IsString()
  is_basic: boolean;

  @ApiProperty({
    type: String,
    example: 'cat',
    description: '동물의 localized를 위한 key 값',
  })
  @IsNotEmpty()
  @IsString()
  localized: string;
}
