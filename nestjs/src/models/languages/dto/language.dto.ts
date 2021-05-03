import { IsNotEmpty, IsString } from 'class-validator';
import { Language } from '../schemas/language.schema';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageDto {
  constructor(language?: Language) {
    if (language) {
      this.name = language.name;
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
}
