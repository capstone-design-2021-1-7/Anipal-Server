import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Accessory } from '../schemas/accessory.schema';

export class AccessoryDto {
  constructor(accessory?: Accessory) {
    if (accessory) {
      this._id = accessory._id.toHexString();
      this.name = accessory.name;
      this.price = accessory.price;
      this.img_url = accessory.img_url;
      this.mission = accessory.mission;
      this.category = accessory.category;
    }
  }

  @ApiProperty({
    type: String,
    example: '60680be281b87e19745e7f0a',
    description: '아이템의 고유 id 값',
  })
  @IsNotEmpty()
  @IsString()
  _id: string;

  @ApiProperty({
    type: String,
    example: '허름한 상의',
    description: '아이템의 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    examples: [10000, 0],
    description: '아이템의 가격',
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    type: String,
    example: 'https://s3.domain/filename.png',
    description: '아이템의 사진 url',
  })
  @IsNotEmpty()
  @IsString()
  img_url: string;

  @ApiProperty({
    type: String,
    example: 'postFirstRandomLetter',
    description: '액세서리를 얻기 위한 mission localized key 값',
  })
  @IsNotEmpty()
  @IsString()
  mission: string;

  @ApiProperty({
    type: String,
    examples: ['head', 'top', 'pants', 'shoes', 'gloves'],
    description: '아이템의 카테고리',
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
