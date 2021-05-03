import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { Type } from 'class-transformer';
import { ComingAnimalDto } from '../../animals/dto/coming-animal.dto';

export class SendLetterDto {
  @ApiProperty({
    type: String,
    example: 'Help me, please~',
    description: '편지의 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
    example: '6071d41ce20a181710e1fedb',
    description: '수신자의 고유 id',
  })
  @IsNotEmpty()
  @IsString()
  receiver: string;

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
