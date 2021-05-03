import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { Type } from 'class-transformer';
import { ComingAnimalDto } from '../../animals/dto/coming-animal.dto';

export class ReplyRandomLetterDto {
  @ApiProperty({
    type: String,
    example: 'Help me, please~',
    description: '편지의 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: DecoratedInfoDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DecoratedInfoDto)
  post_animal: DecoratedInfoDto;

  @ApiProperty({
    type: ComingAnimalDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ComingAnimalDto)
  coming_animal: ComingAnimalDto;

  @ApiProperty({
    type: String,
    example: '1h 0m 0s',
    description: '동물의 전송 시간',
  })
  @IsNotEmpty()
  @IsString()
  delay_time: string;
}
