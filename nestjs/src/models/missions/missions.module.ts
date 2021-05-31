import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissionsService } from './missions.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  Accessory,
  AccessorySchema,
} from '../accessories/schemas/accessory.schema';
import { OwnAnimal, OwnAnimalSchema } from '../users/schemas/own-animal.schema';
import { OwnAnimalsRepository } from '../users/own-animals.repository';
import { UsersRepository } from '../users/users.repository';
import { AccessoriesRepository } from '../accessories/accessories.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Accessory.name, schema: AccessorySchema },
      { name: OwnAnimal.name, schema: OwnAnimalSchema },
    ]),
  ],
  controllers: [],
  providers: [
    MissionsService,
    OwnAnimalsRepository,
    UsersRepository,
    AccessoriesRepository,
  ],
  exports: [MissionsService],
})
export class MissionsModule {}
