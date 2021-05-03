import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { OwnAnimalInterface } from '../interfaces/own-animal.interface';
import { Document } from 'mongoose';
import { BriefAnimalInfo } from '../../animals/schemas/brief-animal-info.schema';
import { ComingAnimal } from '../../animals/schemas/coming-animal.schema';

export type OwnAnimalDocument = OwnAnimal & Document;

@Schema({ autoCreate: true, versionKey: false })
export class OwnAnimal implements OwnAnimalInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id?: mongoose.Types.ObjectId;

  @Prop({ required: true, type: BriefAnimalInfo })
  animal: BriefAnimalInfo;

  @Prop({ required: true, type: String })
  delay_time: string;

  @Prop({ required: true, type: String })
  animal_url: string;

  @Prop({ type: String, default: '' })
  head_url?: string;

  @Prop({ type: String, default: '' })
  top_url?: string;

  @Prop({ type: String, default: '' })
  pants_url?: string;

  @Prop({ type: String, default: '' })
  shoes_url?: string;

  @Prop({ type: String, default: '' })
  gloves_url?: string;

  @Prop({ type: Date, default: null })
  arrive_time?: Date;

  @Prop({ required: true, type: ComingAnimal })
  coming_animal: ComingAnimal;

  @Prop({ type: Boolean, default: false })
  is_favorite?: boolean;
}

export const OwnAnimalSchema = SchemaFactory.createForClass(OwnAnimal);
