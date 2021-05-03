import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { OwnAnimal, OwnAnimalSchema } from './schemas/own-animal.schema';
import { OwnAnimalsRepository } from './own-animals.repository';
import { OwnAnimalsService } from './own-animals.service';
import { OwnAnimalsController } from './own-animals.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: OwnAnimal.name, schema: OwnAnimalSchema },
    ]),
  ],
  controllers: [OwnAnimalsController],
  providers: [
    UsersRepository,
    UsersService,
    OwnAnimalsService,
    OwnAnimalsRepository,
  ],
})
export class UsersModule {}
