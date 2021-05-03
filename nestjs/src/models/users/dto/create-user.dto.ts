import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { LanguageWithLevelDto } from '../../languages/dto/language-with-level.dto';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    type: String,
    example: '캡스톤',
    description: '유저의 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: UserInterface['name'];

  @ApiProperty({
    required: true,
    type: String,
    example: 'male',
    examples: ['male', 'female'],
    description: '유저의 성별',
  })
  @IsNotEmpty()
  @IsString()
  gender: UserInterface['gender'];

  @ApiProperty({
    required: true,
    type: Number,
    example: 30,
    description: '유저의 나이',
  })
  @IsNotEmpty()
  @IsNumber()
  age: UserInterface['age'];

  @ApiProperty({
    required: true,
    type: String,
    example: '2020-01-10',
    description: '유저의 생일, yyyy-mm-dd 형식으로 받는다.',
  })
  @IsNotEmpty()
  @IsDateString()
  birthday: UserInterface['birthday'];

  @ApiProperty({
    required: true,
    type: String,
    example: 'Korea',
    description: '유저의 국적',
  })
  @IsNotEmpty()
  @IsString()
  country: UserInterface['gender'];

  @ApiProperty({
    required: false,
    type: String,
    description: 'email값은 자동으로 넣어집니다. 넣지 않아도 됩니다.',
    example: 'capstone@gmail.com',
  })
  @IsOptional()
  @IsEmail()
  email?: UserInterface['email'];

  @ApiProperty({
    required: true,
    type: String,
    example: 'google',
    description: 'Social login 제공업체',
    examples: ['google', 'facebook', 'apple'],
  })
  @IsNotEmpty()
  @IsString()
  provider: UserInterface['provider'];

  @ApiProperty({
    required: true,
    type: [String],
    example: ['Movie', 'Dance'],
    description: '유저 초기 관심사',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  favorites: string[];

  @ApiProperty({
    required: true,
    type: [LanguageWithLevelDto],
    description: '유저가 사용할 수 있는 언어들',
  })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LanguageWithLevelDto)
  languages: LanguageWithLevelDto[];

  @ApiProperty({
    required: true,
    type: String,
    description: '유저가 선택한 대표 동물 id',
  })
  @IsNotEmpty()
  @IsString()
  favorite_animal: string;
}
