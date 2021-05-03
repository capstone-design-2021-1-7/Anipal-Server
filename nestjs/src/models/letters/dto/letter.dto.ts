import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { Type } from 'class-transformer';
import { Letter } from '../schemas/letter.schema';
import { ApiProperty } from '@nestjs/swagger';
import { BriefUserInfoDto } from '../../users/dto/brief-user-info.dto';

export class LetterDto {
  constructor(letter?: Letter) {
    if (letter) {
      this._id = letter._id.toHexString();
      this.content = letter.content;
      this.send_time = letter.send_time;
      this.arrive_time = letter.arrive_time;
      this.sender = new BriefUserInfoDto(letter.sender);
      this.post_animal = new DecoratedInfoDto(letter.post_animal);
    }
  }
  @ApiProperty({
    type: String,
    example: '6071ad8d4f29c9d6f5393309',
    description: '편지의 고유 id',
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    type: String,
    example: 'Help me, please~',
    description: '편지의 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: Date,
    example: new Date('2021-04-04T14:25:57.075+00:00'),
    description: '편지의 발송 시간',
  })
  @IsNotEmpty()
  @IsDate()
  send_time: Date;

  @ApiProperty({
    type: Date,
    example: new Date('2021-04-04T16:25:57.075+00:00'),
    description: '편지가 도착하는 시간',
  })
  @IsNotEmpty()
  @IsDate()
  arrive_time: Date;

  @ApiProperty({
    type: BriefUserInfoDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => BriefUserInfoDto)
  sender?: BriefUserInfoDto;

  @ApiProperty({
    type: DecoratedInfoDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DecoratedInfoDto)
  post_animal: DecoratedInfoDto;
}
