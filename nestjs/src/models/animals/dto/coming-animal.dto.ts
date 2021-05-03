import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ComingAnimal } from '../schemas/coming-animal.schema';

export class ComingAnimalDto {
  constructor(comingAnimal?: ComingAnimal) {
    if (comingAnimal) {
      this.animal_url = comingAnimal.animal_url;
      this.background = comingAnimal.background;
      this.bar = comingAnimal.bar;
    }
  }

  @ApiProperty({
    type: String,
    example: 'https://aws.s3.domain.com/filename.png',
    description: '배송 중인 동물의 사진 링크',
  })
  @IsNotEmpty()
  @IsString()
  animal_url: string;

  @ApiProperty({
    type: String,
    example: '090909',
    description: '배송 중인 동물의 바 색깔',
  })
  @IsNotEmpty()
  @IsString()
  bar: string;

  @ApiProperty({
    type: String,
    example: '090909',
    description: '배송 중인 동물의 바 배경 색깔',
  })
  @IsNotEmpty()
  @IsString()
  background: string;
}
