import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AnimalInterface } from '../interfaces/animal.interface';
import * as mongoose from 'mongoose';
import { ComingAnimal } from './coming-animal.schema';

export type AnimalDocument = Animal & Document;

@Schema({ autoCreate: true, versionKey: false })
export class Animal implements AnimalInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  delay_time: string;

  @Prop({ required: true, type: String })
  img_url: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({
    required: false,
    type: String,
  })
  mission: string;

  @Prop({ required: true, type: Boolean })
  is_basic: boolean;

  @Prop({ required: true, type: String })
  localized: string;

  @Prop({ required: true, type: ComingAnimal })
  coming_animal: ComingAnimal;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
