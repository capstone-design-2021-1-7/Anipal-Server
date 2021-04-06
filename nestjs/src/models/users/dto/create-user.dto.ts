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

export class CreateUserDto {
  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: UserInterface['name'];

  @ApiProperty({
    required: true,
    type: String,
    examples: ['male', 'female'],
    enum: ['male', 'female'],
  })
  @IsNotEmpty()
  @IsString()
  gender: UserInterface['gender'];

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  age: UserInterface['age'];

  @ApiProperty({ required: true, type: Date })
  @IsNotEmpty()
  @IsDateString()
  birthday: UserInterface['birthday'];

  @ApiProperty({
    required: false,
    type: String,
    description: 'email값은 자동으로 넣어집니다. 넣지 않아도 됩니다.',
  })
  @IsOptional()
  @IsEmail()
  email?: UserInterface['email'];

  @ApiProperty({
    required: true,
    type: String,
    description: 'Social login 제공업체',
    examples: ['google', 'facebook'],
    enum: ['google', 'facebook'],
  })
  @IsNotEmpty()
  @IsString()
  provider: UserInterface['provider'];

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  concept: UserInterface['concept'];

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  @IsString({ each: true })
  favorites?: UserInterface['favorites'];

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  languages?: UserInterface['languages'];
}
