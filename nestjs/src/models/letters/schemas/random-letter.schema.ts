import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';
import { RandomLetterInterface } from '../interfaces/random-letter.interface';
import { Letter } from './letter.schema';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';

export type RandomLetterDocument = RandomLetter & Document;

@Schema({ autoCreate: true, versionKey: false })
export class RandomLetter implements RandomLetterInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Letter' })
  letter_id: Letter;

  @Prop({ required: true, type: Date })
  arrive_time: Date;

  @Prop([{ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
  receivers_id: User[];

  @Prop({ required: true, type: DecoratedInfo })
  post_animal: DecoratedInfo;

  @Prop({ required: true, type: BriefUserInfo })
  sender: BriefUserInfo;
}

export const RandomLetterSchema = SchemaFactory.createForClass(RandomLetter);
