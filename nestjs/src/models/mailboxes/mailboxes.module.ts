import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mailbox, MailboxSchema } from '../mailboxes/schemas/mailbox.schema';
import { MailboxesRepository } from '../mailboxes/mailboxes.repository';
import { MailboxesController } from './mailboxes.controller';
import { MailboxesService } from './mailboxes.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mailbox.name, schema: MailboxSchema }]),
  ],
  controllers: [MailboxesController],
  providers: [MailboxesService, MailboxesRepository],
})
export class MailboxesModule {}
