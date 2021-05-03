import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { DecoratedInfo } from '../schemas/decorated-info.schema';

export class DecoratedInfoDto {
  constructor(decoratedInfo?: DecoratedInfo) {
    if (decoratedInfo) {
      this.animal_url = decoratedInfo.animal_url;
      this.head_url = decoratedInfo.head_url;
      this.top_url = decoratedInfo.top_url;
      this.pants_url = decoratedInfo.pants_url;
      this.shoes_url = decoratedInfo.shoes_url;
      this.gloves_url = decoratedInfo.gloves_url;
    }
  }

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '동물의 사진 url',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  animal_url: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '모자의 사진 url',
    required: false,
  })
  @IsOptional()
  @IsString()
  head_url?: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '상의의 사진 url',
    required: false,
  })
  @IsOptional()
  @IsString()
  top_url?: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '하의의 사진 url',
    required: false,
  })
  @IsOptional()
  @IsString()
  pants_url?: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '신발의 사진 url ',
    required: false,
  })
  @IsOptional()
  @IsString()
  shoes_url?: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '장갑의 사진 url ',
    required: false,
  })
  @IsOptional()
  @IsString()
  gloves_url?: string;
}
