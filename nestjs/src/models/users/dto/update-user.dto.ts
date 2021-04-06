import { UserInterface } from '../interfaces/user.interface';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  name?: UserInterface['name'];

  @ApiProperty({ required: false, type: String })
  @IsOptional()
  @IsString()
  concept?: UserInterface['concept'];

  @ApiProperty({ required: false, type: String, isArray: true })
  @IsOptional()
  @IsString({ each: true })
  favorites?: UserInterface['favorites'];

  @ApiProperty({ required: false, type: Object, isArray: true })
  @IsOptional()
  @ValidateNested({ each: true })
  languages?: UserInterface['languages'];
}
