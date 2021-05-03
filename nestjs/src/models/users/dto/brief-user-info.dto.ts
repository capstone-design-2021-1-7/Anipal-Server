import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BriefUserInfo } from '../schemas/brief-user-info.schema';

export class BriefUserInfoDto {
  constructor(briefUserInfo?: BriefUserInfo) {
    if (briefUserInfo) {
      this.user_id = briefUserInfo.user_id.toHexString();
      this.name = briefUserInfo.name;
      this.country = briefUserInfo.country;
      this.favorites = briefUserInfo.favorites;
    }
  }
  @ApiProperty({
    type: String,
    example: '6071ad8d4f29c9d6f5393309',
    description: 'user의 고유 id 값',
  })
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty({
    type: String,
    example: 'isabella',
    description: 'user의 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Korea', description: 'user의 국적' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    type: [String],
    example: ['Movie'],
    description: 'user의 관심사',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  favorites: string[];
}
