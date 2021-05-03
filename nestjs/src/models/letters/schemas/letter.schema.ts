import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { LetterInterface } from '../interfaces/letter.interface';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';
import { ComingAnimal } from '../../animals/schemas/coming-animal.schema';

export type LetterDocument = Letter & Document;

@Schema({ autoCreate: true, versionKey: false })
export class Letter implements LetterInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: true, type: Date })
  send_time: Date;

  @Prop({ required: true, type: Date })
  arrive_time: Date;

  @Prop({ required: true, type: BriefUserInfo })
  sender: BriefUserInfo;

  @Prop({ required: true, type: DecoratedInfo })
  post_animal: DecoratedInfo;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  receiver_id: mongoose.Types.ObjectId;

  @Prop({ type: ComingAnimal })
  coming_animal: ComingAnimal;
}

export const LetterSchema = SchemaFactory.createForClass(Letter);
