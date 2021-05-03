import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ObtainedAccessoryDto } from '../../accessories/dto/obtained-accessory.dto';
import { OwnAccessory } from '../schemas/own-accessory.schema';

export class OwnAccessoryDto {
  constructor(ownAccessory?: OwnAccessory) {
    if (ownAccessory) {
      this.head = ownAccessory.head.map(
        (head) => new ObtainedAccessoryDto(head),
      );
      this.top = ownAccessory.top.map((top) => new ObtainedAccessoryDto(top));
      this.pants = ownAccessory.pants.map(
        (pants) => new ObtainedAccessoryDto(pants),
      );
      this.shoes = ownAccessory.shoes.map(
        (shoes) => new ObtainedAccessoryDto(shoes),
      );
      this.gloves = ownAccessory.gloves.map(
        (gloves) => new ObtainedAccessoryDto(gloves),
      );
    }
  }
  @ApiProperty({
    type: [ObtainedAccessoryDto],
    description: '유저가 소유한 모자',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObtainedAccessoryDto)
  head?: ObtainedAccessoryDto[];

  @ApiProperty({
    type: [ObtainedAccessoryDto],
    description: '유저가 소유한 상의',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObtainedAccessoryDto)
  top?: ObtainedAccessoryDto[];

  @ApiProperty({
    type: [ObtainedAccessoryDto],
    description: '유저가 소유한 하의',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObtainedAccessoryDto)
  pants?: ObtainedAccessoryDto[];

  @ApiProperty({
    type: [ObtainedAccessoryDto],
    description: '유저가 소유한 신발',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObtainedAccessoryDto)
  shoes?: ObtainedAccessoryDto[];

  @ApiProperty({
    type: [ObtainedAccessoryDto],
    description: '유저가 소유한 장갑',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ObtainedAccessoryDto)
  gloves?: ObtainedAccessoryDto[];
}
