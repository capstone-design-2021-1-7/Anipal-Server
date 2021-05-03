import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageWithLevel } from '../schemas/language-with-level.schema';

export class LanguageWithLevelDto {
  constructor(languageWithLevel?: LanguageWithLevel) {
    if (languageWithLevel) {
      this.name = languageWithLevel.name;
      this.level = languageWithLevel.level;
    }
  }

  @ApiProperty({
    type: String,
    example: 'ja',
    examples: ['en-GB', 'ja', 'es', 'de'],
    description: '유저가 사용할 수 있는 언어 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    examples: [1, 2, 3],
    description: '유저가 사용할 수 있는 언어의 숙련도',
  })
  @IsNotEmpty()
  @IsNumber()
  level: number;
}
