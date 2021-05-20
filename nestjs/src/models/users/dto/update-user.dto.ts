import { UserInterface } from '../interfaces/user.interface';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageWithLevelDto } from '../../languages/dto/language-with-level.dto';
import { Type } from 'class-transformer';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';

export class UpdateUserDto {
  @ApiProperty({
    required: false,
    type: String,
    example: '캡스톤',
    description: '유저의 이름',
  })
  @IsOptional()
  @IsString()
  name?: UserInterface['name'];

  @ApiProperty({
    required: false,
    type: [String],
    example: ['Movie', 'Dance'],
    description: '유저 관심사',
  })
  @IsOptional()
  @IsString({ each: true })
  favorites?: string[];

  @ApiProperty({
    required: false,
    type: [LanguageWithLevelDto],
    description: '유저가 사용할 수 있는 언어들',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => LanguageWithLevelDto)
  languages?: LanguageWithLevelDto[];

  @ApiProperty({
    required: false,
    type: DecoratedInfoDto,
    description: '유저의 대표 동물',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DecoratedInfoDto)
  favorite_animal?: DecoratedInfoDto;
}
