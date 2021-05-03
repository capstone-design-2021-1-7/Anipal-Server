import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AccessoryDto } from './accessory.dto';
import { Type } from 'class-transformer';
import { ObtainedAccessory } from '../schemas/obtained-accessory.schema';

export class ObtainedAccessoryDto {
  constructor(obtainedAccessory?: ObtainedAccessory) {
    if (obtainedAccessory) {
      this.accessory = new AccessoryDto(obtainedAccessory.accessory_id);
      this.img_url = obtainedAccessory.img_url;
    }
  }
  @ApiProperty({
    type: AccessoryDto,
    description: '액세서리',
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AccessoryDto)
  accessory: AccessoryDto;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '아이템의 사진 url',
  })
  @IsNotEmpty()
  @IsString()
  img_url: string;
}
