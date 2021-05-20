import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { Mailbox } from '../schemas/mailbox.schema';
import { ApiProperty } from '@nestjs/swagger';
import { BriefUserInfoDto } from '../../users/dto/brief-user-info.dto';
import * as mongoose from 'mongoose';

export class MailboxDto {
  constructor(mailbox?: Mailbox, user?: mongoose.Types.ObjectId) {
    if (mailbox) {
      this._id = mailbox._id.toHexString();
      this.letters_count = mailbox.letters_count;
      if (
        !user.equals(mailbox.recent_sender) &&
        mailbox.arrive_time <= new Date() &&
        !mailbox.is_opened
      ) {
        this.thumbnail_animal = new DecoratedInfoDto(mailbox.thumbnail_animal);
      }
      this.arrive_date = mailbox.arrive_time;
      this.is_opened = mailbox.is_opened;
      this.is_connected = mailbox.owner_users.length == 2;
      this.partner = new BriefUserInfoDto(mailbox.owner_users[0]);
    }
  }

  @ApiProperty({
    type: String,
    example: '6071ad8d4f29c9d6f5393309',
    description: 'mailbox의 고유 id',
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'mailbox에 들어잇는 편지의 총 개수',
  })
  @IsNotEmpty()
  @IsNumber()
  letters_count: number;

  @ApiProperty({
    type: BriefUserInfoDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => BriefUserInfoDto)
  partner: BriefUserInfoDto;

  @ApiProperty({
    type: Date,
    example: new Date('2021-04-04T14:25:57.075+00:00'),
    description: '최근에 보내진 편지의 도착 시간',
  })
  @IsNotEmpty()
  @IsDate()
  arrive_date: Date;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: '편지를 받은 사람이 mailbox를 확인하였는지 여부',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_opened: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'mailbox가 서로 연결되어 있는지 여부',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_connected: boolean;

  @ApiProperty({
    type: DecoratedInfoDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DecoratedInfoDto)
  thumbnail_animal?: DecoratedInfoDto;
}
