import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Letter } from '../../letters/schemas/letter.schema';
import { MailboxInterface } from '../interfaces/mailbox.interface';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';

export type MailboxDocument = Mailbox & Document;

@Schema({
  autoCreate: true,
  versionKey: false,
})
export class Mailbox implements MailboxInterface {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop([{ type: BriefUserInfo, required: true }])
  owner_users: BriefUserInfo[];

  @Prop({ type: Number, required: true, default: 1 })
  letters_count: number;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Letter', required: true },
  ])
  letters_id: Letter[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  recent_sender: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true })
  arrive_time: Date;

  @Prop({ type: Boolean, required: true })
  is_opened: boolean;

  @Prop({ type: DecoratedInfo, required: true })
  thumbnail_animal: DecoratedInfo;
}

export const MailboxSchema = SchemaFactory.createForClass(Mailbox);
