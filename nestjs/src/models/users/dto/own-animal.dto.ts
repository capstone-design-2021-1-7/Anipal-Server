import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OwnAnimal } from '../schemas/own-animal.schema';
import { BriefAnimalInfoDto } from '../../animals/dto/brief-animal-info.dto';
import { ComingAnimalDto } from '../../animals/dto/coming-animal.dto';

export class OwnAnimalDto {
  constructor(ownAnimal?: OwnAnimal) {
    if (ownAnimal) {
      this._id = ownAnimal._id.toHexString();
      this.animal = new BriefAnimalInfoDto(ownAnimal.animal);
      this.animal_url = ownAnimal.animal_url;
      this.top_url = ownAnimal.top_url;
      this.pants_url = ownAnimal.pants_url;
      this.head_url = ownAnimal.head_url;
      this.shoes_url = ownAnimal.shoes_url;
      this.gloves_url = ownAnimal.gloves_url;
      this.is_used = ownAnimal.arrive_time > new Date();
      this.delay_time = ownAnimal.delay_time;
      this.coming_animal = new ComingAnimalDto(ownAnimal.coming_animal);
      this.is_favorite = ownAnimal.is_favorite;
    }
  }
  @ApiProperty({
    type: String,
    example: '60680be281b87e19745e7f0a',
    description: '유저가 가진 동물의 고유 id 값',
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    type: String,
    description: '동물 정보',
  })
  @ValidateNested()
  @Type(() => BriefAnimalInfoDto)
  animal: BriefAnimalInfoDto;

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
    description: '동물의 배송 사용 여부',
  })
  @IsNotEmpty()
  @IsString()
  is_used: boolean;

  @ApiProperty({
    type: String,
    example: '1h 0m 0s',
    description: '동물의 배송 지연 시간',
  })
  @IsNotEmpty()
  @IsString()
  delay_time: string;

  @ApiProperty({
    type: ComingAnimalDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ComingAnimalDto)
  coming_animal: ComingAnimalDto;

  @ApiProperty({
    type: Boolean,
    example: false,
    description: '대표 동물 여부',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_favorite: boolean;
}
