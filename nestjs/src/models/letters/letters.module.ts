import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Letter, LetterSchema } from './schemas/letter.schema';
import { LettersController } from './letters.controller';
import { LettersService } from './letters.service';
import { LettersRepository } from './letters.repository';
import { Mailbox, MailboxSchema } from '../mailboxes/schemas/mailbox.schema';
import { MailboxesRepository } from '../mailboxes/mailboxes.repository';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { User, UserSchema } from '../users/schemas/user.schema';
import {
  RandomLetter,
  RandomLetterSchema,
} from './schemas/random-letter.schema';
import { OwnAnimalsRepository } from '../users/own-animals.repository';
import { OwnAnimal, OwnAnimalSchema } from '../users/schemas/own-animal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Letter.name, schema: LetterSchema },
      { name: Mailbox.name, schema: MailboxSchema },
      { name: User.name, schema: UserSchema },
      { name: RandomLetter.name, schema: RandomLetterSchema },
      { name: OwnAnimal.name, schema: OwnAnimalSchema },
    ]),
  ],
  controllers: [LettersController],
  providers: [
    LettersService,
    LettersRepository,
    MailboxesRepository,
    UsersService,
    UsersRepository,
    OwnAnimalsRepository,
  ],
})
export class LettersModule {}
