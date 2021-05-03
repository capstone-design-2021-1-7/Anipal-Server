import { Injectable } from '@nestjs/common';
import { MailboxesRepository } from '../mailboxes/mailboxes.repository';
import * as mongoose from 'mongoose';
import { Mailbox } from './schemas/mailbox.schema';

@Injectable()
export class MailboxesService {
  constructor(private readonly mailboxRepository: MailboxesRepository) {}

  async findMailboxes(user: mongoose.Types.ObjectId): Promise<Mailbox[]> {
    const mailboxes = this.mailboxRepository.findMailboxes(user);
    return mailboxes;
  }

  async findMailbox(mailbox_id: mongoose.Types.ObjectId): Promise<Mailbox> {
    const mailbox = this.mailboxRepository.findMailbox(mailbox_id);
    return mailbox;
  }

  async showLettersInMailbox(
    user: mongoose.Types.ObjectId,
    mailbox_id: mongoose.Types.ObjectId,
  ): Promise<Mailbox> {
    const mailbox = this.mailboxRepository.showLettersInMailbox(
      user,
      mailbox_id,
    );
    return mailbox;
  }

  leaveMailbox(
    user: mongoose.Types.ObjectId,
    mailbox_id: mongoose.Types.ObjectId,
  ) {
    this.mailboxRepository.leaveMailbox(user, mailbox_id);
  }
}
