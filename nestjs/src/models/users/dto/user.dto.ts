import {
  IsDate,
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';
import { User } from '../schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class UserDto {
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.age = user.age;
    this.email = user.email;
    this.birthday = user.birthday;
    this.concept = user.concept;
    this.favorites = user.favorites;
    this.gender = user.gender;
    this.languages = user.languages;
  }

  @ApiProperty({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    example: '60681268ab645e32c4191cad',
  })
  @IsNotEmpty()
  @IsMongoId()
  _id: UserInterface['_id'];

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  name: UserInterface['name'];

  @ApiProperty({ required: true, type: Number })
  @IsNotEmpty()
  @IsNumber()
  age: UserInterface['age'];

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsEmail()
  email: UserInterface['email'];

  @ApiProperty({ required: true, type: Date, example: '2020-01-10' })
  @IsNotEmpty()
  @IsDate()
  birthday: UserInterface['birthday'];

  @ApiProperty({ required: true, type: String })
  @IsNotEmpty()
  @IsString()
  concept: UserInterface['concept'];

  @ApiProperty({ required: true, type: [String] })
  @IsNotEmpty()
  @IsString({ each: true })
  favorites: UserInterface['favorites'];

  @ApiProperty({
    required: true,
    type: String,
    examples: ['male', 'female'],
    enum: ['male', 'female'],
  })
  @IsNotEmpty()
  @IsString()
  gender: UserInterface['gender'];

  @ApiProperty({ required: true, type: Object })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  languages: UserInterface['languages'];

  accessories?: UserInterface['accessories'];
  animals?: UserInterface['animals'];
  // TODO: accessories와 animals schema가 생기면 추가해야 함.
}
