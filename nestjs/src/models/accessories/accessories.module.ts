import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Accessory, AccessorySchema } from './schemas/accessory.schema';
import { AccessoriesController } from './accessories.controller';
import { AccessoriesService } from './accessories.service';
import { AccessoriesRepository } from './accessories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Accessory.name, schema: AccessorySchema },
    ]),
  ],
  controllers: [AccessoriesController],
  providers: [AccessoriesService, AccessoriesRepository],
})
export class AccessoriesModule {}
