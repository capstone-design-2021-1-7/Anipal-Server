import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RandomSendLetterDto {
  @ApiProperty({
    type: String,
    example: 'Help me, please~',
    description: '편지의 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
    description: '선택된 동물읜 고유 id',
    example: '6071d41ce20a181710e1fedb',
  })
  @IsNotEmpty()
  @IsString()
  own_animal_id: string;
}
