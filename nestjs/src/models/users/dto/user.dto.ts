import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { User } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageWithLevelDto } from '../../languages/dto/language-with-level.dto';
import { Type } from 'class-transformer';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { Accessory } from '../../accessories/schemas/accessory.schema';
import { AccessoryDto } from '../../accessories/dto/accessory.dto';

export class UserDto {
  constructor(user: User, mission?: Accessory) {
    this._id = user._id.toHexString();
    this.name = user.name;
    this.age = user.age;
    this.email = user.email;
    this.birthday = user.birthday;
    this.country = user.country;
    this.favorites = user.favorites;
    this.gender = user.gender;
    this.banned_users_id = user.banned_users_id
      ? user.banned_users_id.map((user) => user.toHexString())
      : [];
    this.languages = user.languages.map(
      (language) => new LanguageWithLevelDto(language),
    );
    this.favorite_animal = new DecoratedInfoDto(user.favorite_animal);
    if (mission) {
      this.mission = new AccessoryDto(mission);
    }
  }

  @ApiProperty({
    required: true,
    type: String,
    example: '60681268ab645e32c4191cad',
    description: '유저의 고유 id 값',
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '캡스톤',
    description: '유저의 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: Number,
    example: 20,
    description: '유저의 나이',
  })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    required: true,
    type: String,
    example: 'capstone@gamil.com',
    description: '유저의 email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    type: String,
    example: 'Korean',
    description: '유저의 국적',
  })
  @IsNotEmpty()
  @IsEmail()
  country: string;

  @ApiProperty({
    required: true,
    type: String,
    example: '2020-01-10',
    description: '유저의 생일',
  })
  @IsNotEmpty()
  @IsDate()
  birthday: string;

  @ApiProperty({
    required: true,
    type: String,
    examples: ['male', 'female'],
    description: '유저의 성별',
  })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({
    required: false,
    type: [String],
    example: ['Movie', 'Dance'],
    description: '유저의 관심사',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  favorites: string[];

  @ApiProperty({
    required: false,
    type: [String],
    example: ['60922496b58ba001327134d6'],
    description: '유저가 차단한 유저들의 id',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  banned_users_id: string[];

  @ApiProperty({
    required: true,
    type: [LanguageWithLevelDto],
    description: '유저가 사용할 수 있는 언어',
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LanguageWithLevelDto)
  languages: LanguageWithLevelDto[];

  @ApiProperty({
    type: DecoratedInfoDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DecoratedInfoDto)
  favorite_animal: DecoratedInfoDto;

  @ApiProperty({
    type: AccessoryDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => AccessoryDto)
  mission?: AccessoryDto;
}
