import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Mailbox, MailboxDocument } from './schemas/mailbox.schema';
import { Letter } from '../letters/schemas/letter.schema';
import { BriefUserInfo } from '../users/schemas/brief-user-info.schema';

@Injectable()
export class MailboxesRepository {
  constructor(
    @InjectModel(Mailbox.name)
    private mailboxModel: mongoose.Model<MailboxDocument>,
  ) {}

  async findMailboxes(user: mongoose.Types.ObjectId): Promise<Mailbox[]> {
    return this.mailboxModel
      .find({ 'owner_users.user_id': user })
      .sort({ updated_at: -1 })
      .exec();
  }

  async findMailbox(mailbox_id: mongoose.Types.ObjectId): Promise<Mailbox> {
    return this.mailboxModel.findById(mailbox_id);
  }

  async showLettersInMailbox(
    user: mongoose.Types.ObjectId,
    mailbox_id: mongoose.Types.ObjectId,
  ): Promise<Mailbox> {
    const mailbox = this.mailboxModel
      .findById(
        mailbox_id,
        'letters_id owner_users recent_sender arrive_time is_opened',
      )
      .populate({
        path: 'letters_id',
        match: { arrive_time: { $lt: new Date() } },
      })
      .sort({ arrive_time: -1 });
    mailbox.then((mailboxDoc) => {
      const { owner_users, recent_sender, arrive_time, is_opened } = mailboxDoc;
      if (
        owner_users.map((owner_user) => owner_user.user_id).includes(user) &&
        !recent_sender.equals(user) &&
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
    sender: BriefUserInfo,
    receiver: BriefUserInfo,
    letter: Letter,
  ) {
    const mailbox = new this.mailboxModel({
      owner_users: [sender, receiver],
      letters_count: 1,
      letters_id: [letter],
      thumbnail_animal: letter.post_animal,
      recent_sender: sender.user_id,
      arrive_time: letter.arrive_time,
      is_opened: false,
    });
    return mailbox.save();
  }

  async pushLetter(
    sender: mongoose.Types.ObjectId,
    receiver: mongoose.Types.ObjectId,
    letter: Letter,
  ): Promise<Mailbox> {
    await this.mailboxModel.updateOne(
      {
        $and: [
          { 'owner_users.user_id': sender },
          { 'owner_users.user_id': receiver },
        ],
      },
      {
        $push: { letters_id: letter },
        $set: {
          thumbnail_animal: letter.post_animal,
          arrive_time: letter.arrive_time,
          recent_sender: sender,
          is_opened: false,
        },
        $inc: { letters_count: 1 },
      },
    );
    return this.mailboxModel.findOne({
      $and: [
        { 'owner_users.user_id': sender },
        { 'owner_users.user_id': receiver },
      ],
    });
  }
}
