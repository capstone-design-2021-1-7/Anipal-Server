import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Accessory } from '../schemas/accessory.schema';
import { ObtainedAccessory } from '../schemas/obtained-accessory.schema';

export class BriefOwnAccessoryDto {
  constructor(ownAccessory?: ObtainedAccessory, accessory?: Accessory) {
    if (ownAccessory) {
      this.accessory_id = ownAccessory.accessory_id._id.toHexString();
      this.img_url = ownAccessory.img_url;
      this.is_own = true;
    } else if (accessory) {
      this.accessory_id = accessory._id.toHexString();
      this.img_url = accessory.img_url;
      this.is_own = false;
    }
  }

  @ApiProperty({
    type: String,
    example: '6071ad8d4f29c9d6f5393309',
    description: '액세서리의 고유 id',
  })
  @IsNotEmpty()
  @IsString()
  accessory_id: string;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '액세서리의 사진 url ',
  })
  @IsNotEmpty()
  @IsString()
  img_url: string;

  @ApiProperty({
    type: Boolean,
    example: true,
    description: '동물의 소유 여부',
  })
  @IsNotEmpty()
  @IsString()
  is_own: boolean;
}
