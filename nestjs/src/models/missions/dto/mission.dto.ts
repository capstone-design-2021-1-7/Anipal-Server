import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Mission } from '../schemas/mission.schema';

export class MissionDto {
  constructor(mission?: Mission) {
    if (mission) {
      this.title = mission.title;
      this.content = mission.content;
    }
  }
  @ApiProperty({
    type: String,
    example: '편지보내기',
    description: '미션의 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: '편지 많이 보내기',
    description: '미션의 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
