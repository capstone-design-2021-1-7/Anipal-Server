import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
import { OwnAnimal, OwnAnimalSchema } from './schemas/own-animal.schema';
import { OwnAnimalsRepository } from './own-animals.repository';
import { OwnAnimalsService } from './own-animals.service';
import { OwnAnimalsController } from './own-animals.controller';
import { UsersController } from './users.controller';
import { MissionsModule } from '../missions/missions.module';
import { Mailbox, MailboxSchema } from '../mailboxes/schemas/mailbox.schema';
import { MailboxesRepository } from '../mailboxes/mailboxes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: OwnAnimal.name, schema: OwnAnimalSchema },
      { name: Mailbox.name, schema: MailboxSchema },
    ]),
    MissionsModule,
  ],
  controllers: [UsersController, OwnAnimalsController],
  providers: [
    UsersRepository,
    UsersService,
    OwnAnimalsService,
    OwnAnimalsRepository,
    MailboxesRepository,
  ],
})
export class UsersModule {}
