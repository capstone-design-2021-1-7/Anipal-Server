import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import * as mongoose from 'mongoose';
import { LanguageWithLevel } from '../../languages/schemas/language-with-level.schema';
import { OwnAccessory } from './own-accessory.schema';
import { OwnAnimal } from './own-animal.schema';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';

export type UserDocument = User & Document;

@Schema({ autoCreate: true, versionKey: false, timestamps: true })
export class User implements UserInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: Number })
  age: number;

  @Prop({ required: true, type: String })
  birthday: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  provider: string;

  @Prop([{ type: LanguageWithLevel, required: true }])
  languages: LanguageWithLevel[];

  @Prop([
    {
      required: true,
      type: String,
    },
  ])
  favorites: string[];

  @Prop({
    type: OwnAccessory,
    default: {
      head: [],
      top: [],
      pants: [],
      shoes: [],
      gloves: [],
    },
  })
  own_accessories: OwnAccessory;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'OwnAnimal' }])
  own_animals_id: OwnAnimal[];

  @Prop({ type: DecoratedInfo, required: true })
  favorite_animal: DecoratedInfo;

  @Prop({ type: Date })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
