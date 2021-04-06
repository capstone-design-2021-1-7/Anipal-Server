import { UserInterface } from '../interfaces/user.interface';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ required: true, type: String, example: 'iloveauth@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: UserInterface['email'];

  @ApiProperty({
    required: true,
    type: String,
    examples: ['google', 'facebook', 'apple'],
  })
  @IsNotEmpty()
  @IsString()
  provider: UserInterface['provider'];
}
