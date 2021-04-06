import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ autoCreate: true, versionKey: false })
export class User implements UserInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  gender: string;

  @Prop({ required: true, type: Number })
  age: number;

  @Prop({ required: true, type: Date })
  birthday: Date;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  provider: string;

  @Prop({ required: true, type: String })
  concept: string;

  @Prop([
    raw({
      name: { type: String, required: true },
      level: { type: String, required: true },
    }),
  ])
  languages: Record<string, any>[];

  @Prop({ required: true, type: [String], default: [] })
  favorites: string[];

  accessories;

  animals;

  @Prop({ type: Date, default: Date.now })
  created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
