import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Letter } from '../schemas/letter.schema';
import { ApiProperty } from '@nestjs/swagger';
import { ComingAnimalDto } from '../../animals/dto/coming-animal.dto';

export class ComingLetterDto {
  constructor(comingLetter?: Letter) {
    if (comingLetter) {
      this.arrive_time = comingLetter.arrive_time;
      this.sender_name = comingLetter.sender.name;
      this.coming_animal = new ComingAnimalDto(comingLetter.coming_animal);
    }
  }

  @ApiProperty({
    type: Date,
    example: new Date('2021-04-04T16:25:57.075+00:00'),
    description: '편지가 도착하는 시간',
  })
  @IsNotEmpty()
  @IsDate()
  arrive_time: Date;

  @ApiProperty({
    type: String,
    example: 'isabella',
    description: '보낸 user의 이름',
  })
  @IsNotEmpty()
  @IsString()
  sender_name: string;

  @ApiProperty({
    type: ComingAnimalDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ComingAnimalDto)
  coming_animal: ComingAnimalDto;
}
