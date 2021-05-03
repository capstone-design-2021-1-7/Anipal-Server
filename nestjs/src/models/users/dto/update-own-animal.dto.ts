import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateOwnAnimalDto {
  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '모자의 사진 url ',
  })
  @IsNotEmpty()
  @IsOptional()
  head_url?: string;
  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '상의의 사진 url ',
  })
  @IsOptional()
  @IsString()
  top_url?: string;
  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '하의의 사진 url ',
  })
  @IsOptional()
  @IsString()
  pants_url?: string;
  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '신발의 사진 url ',
  })
  @IsOptional()
  @IsString()
  shoes_url?: string;
  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '장갑의 사진 url ',
  })
  @IsOptional()
  @IsString()
  gloves_url?: string;
}
