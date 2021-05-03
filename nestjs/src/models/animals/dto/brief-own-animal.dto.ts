import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OwnAnimal } from '../../users/schemas/own-animal.schema';
import { Animal } from '../schemas/animal.schema';

export class BriefOwnAnimalDto {
  constructor(ownAnimal?: OwnAnimal, animal?: Animal) {
    if (ownAnimal) {
      this.animal_url = ownAnimal.animal_url;
      this.top_url = ownAnimal.top_url;
      this.pants_url = ownAnimal.pants_url;
      this.head_url = ownAnimal.head_url;
      this.shoes_url = ownAnimal.shoes_url;
      this.gloves_url = ownAnimal.gloves_url;
      this.is_own = true;
    } else if (animal) {
      this.animal_url = animal.img_url;
      this.top_url = null;
      this.pants_url = null;
      this.head_url = null;
      this.shoes_url = null;
      this.gloves_url = null;
      this.is_own = false;
    }
  }

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '동물의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  animal_url: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '모자의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  head_url: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '상의의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  top_url: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '하의의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  pants_url: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '신발의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  shoes_url: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '장갑의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  gloves_url: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: '동물의 소유 여부',
  })
  @IsNotEmpty()
  @IsString()
  is_own: boolean;
}
