import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BriefAnimalInfo } from '../schemas/brief-animal-info.schema';

export class BriefAnimalInfoDto {
  constructor(briefAnimalInfo?: BriefAnimalInfo) {
    if (briefAnimalInfo) {
      this.localized = briefAnimalInfo.localized;
      this.delay_time = briefAnimalInfo.delay_time;
    }
  }

  @ApiProperty({
    type: String,
    example: 'cat',
    description: '동물의 localized를 위한 key 값',
  })
  @IsNotEmpty()
  @IsString()
  localized: string;

  @ApiProperty({
    type: String,
    example: '1h 0m 0s',
    examples: ['1h 0m 0s', '0h 30m 0s', '13h 20m 10s'],
    description: '동물의 배달 시간',
  })
  @IsNotEmpty()
  @IsString()
  delay_time: string;
}
