import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Mailbox, MailboxDocument } from './schemas/mailbox.schema';
import { Letter } from '../letters/schemas/letter.schema';

@Injectable()
export class MailboxesRepository {
  constructor(
    @InjectModel(Mailbox.name)
    private mailboxModel: mongoose.Model<MailboxDocument>,
  ) {}

  async findMailboxes(user: mongoose.Types.ObjectId): Promise<Mailbox[]> {
    const mailboxes = this.mailboxModel
      .find({ 'owner_users.user_id': user })
      .sort({ updated_at: -1 })
      .exec();
    return mailboxes;
  }

  async findMailbox(mailbox_id: mongoose.Types.ObjectId): Promise<Mailbox> {
    const mailbox = this.mailboxModel.findById(mailbox_id);
    return mailbox;
  }

  async showLettersInMailbox(
    user: mongoose.Types.ObjectId,
    mailbox_id: mongoose.Types.ObjectId,
  ): Promise<Mailbox> {
    const mailbox = this.mailboxModel
      .findById(mailbox_id, 'letters_id owner_users recent_sender')
      .populate({
        path: 'letters_id',
        match: { arrive_time: { $lt: new Date() } },
      })
      .sort({ arrive_time: -1 });
    mailbox.then((mailboxDoc) => {
      const { owner_users, recent_sender, arrive_time, is_opened } = mailboxDoc;
      console.log(owner_users, recent_sender, mailboxDoc);
      if (
        owner_users.map((owner_user) => owner_user.user_id).includes(user) &&
        recent_sender.equals(user) &&
        arrive_time <= new Date() &&
        !is_opened
      ) {
        mailboxDoc.is_opened = true;
        mailboxDoc.save();
      }
    });
    return mailbox.exec();
  }

  leaveMailbox(
    user: mongoose.Types.ObjectId,
    mailbox_id: mongoose.Types.ObjectId,
  ) {
    this.mailboxModel.updateOne(
      { _id: mailbox_id },
      {
        $pull: { owner_users: { user_id: user } },
      },
      {},
      (err, res) => {
        if (!err && res) {
          this.mailboxModel.findById(mailbox_id).then((mailboxDoc) => {
            const { owner_users } = mailboxDoc;
            if (owner_users.length == 0) {
              mailboxDoc.remove();
            }
          });
        }
      },
    );
  }

  async replyLetterPush(
    sender: mongoose.Types.ObjectId,
    receiver: mongoose.Types.ObjectId,
    letter: Letter,
  ) {
    const mailbox = new this.mailboxModel({
      owner_users: [sender, receiver],
      letters_count: 1,
      letters_id: [letter],
      thumbnail_animal: letter.post_animal,
      recent_sender: sender,
      arrive_time: letter.arrive_time,
      is_opened: false,
    });
    return mailbox.save();
  }

  async pushLetter(
    sender: mongoose.Types.ObjectId,
    receiver: mongoose.Types.ObjectId,
    letter: Promise<Letter>,
  ): Promise<Mailbox> {
    let updatedMailbox;
    if (
      await this.mailboxModel.findOne({
        'owner_users.user_id': [sender, receiver],
      })
    ) {
      const sentLetter = await letter;
      updatedMailbox = this.mailboxModel.findOneAndUpdate(
        { 'owner_users.user_id': [sender, receiver] },
        {
          $push: { letters_id: sentLetter },
          $set: {
            thumbnail_animal: sentLetter.post_animal,
            arrive_time: sentLetter.arrive_time,
            recent_sender: sender,
            is_opened: false,
          },
          $inc: { letters_count: 1 },
        },
      );
    } else {
      const sentLetter = await letter;
      updatedMailbox = new this.mailboxModel({
        owner_users: [sender, receiver],
        letters_count: 1,
        letters_id: [sentLetter],
        thumbnail_animal: sentLetter.post_animal,
        recent_sender: sender,
        arrive_time: sentLetter.arrive_time,
        is_opened: false,
      }).save();
    }
    return updatedMailbox;
  }
}
