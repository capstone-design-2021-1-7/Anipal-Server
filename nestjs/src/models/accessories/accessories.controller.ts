import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AccessoriesService } from './accessories.service';
import { AccessoryDto } from './dto/accessory.dto';
import * as mongoose from 'mongoose';
import { TransformObjectidPipe } from '../../common/pipes/transform-objectid.pipe';
import { DUser } from '../users/decorators/user.decorator';
import { BriefOwnAccessoryDto } from './dto/brief-own-accessory.dto';

@ApiTags('accessories')
@ApiBearerAuth('bearer')
@Controller('accessories')
export class AccessoriesController {
  constructor(private readonly accessoriesService: AccessoriesService) {}

  @Get('all/:category')
  @ApiOkResponse({ type: [BriefOwnAccessoryDto] })
  async findAll(
    @DUser() user,
    @Param('category') category: string,
  ): Promise<BriefOwnAccessoryDto[]> {
    const { own_accessories: ownAccessories } = user;

    const accessories = (
      await this.accessoriesService.findAll(category)
    ).filter(
      (accessory) =>
        !ownAccessories[category].find((ownAccessory) =>
          ownAccessory.accessory_id.equals(accessory._id),
        ),
    );

    return ownAccessories[category]
      .map((ownAccessory) => new BriefOwnAccessoryDto(ownAccessory))
      .concat(
        accessories.map(
          (accessory) => new BriefOwnAccessoryDto(null, accessory),
        ),
      );
  }

  @Get(':_id')
  @ApiParam({ name: '_id', type: String })
  @ApiOkResponse({ type: AccessoryDto })
  async find(
    @Param('_id', TransformObjectidPipe) _id: mongoose.Types.ObjectId,
  ): Promise<AccessoryDto> {
    const accessory = await this.accessoriesService.find(_id);
    return new AccessoryDto(accessory);
  }
}
