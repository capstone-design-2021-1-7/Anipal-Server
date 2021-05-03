import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LanguageInterface } from '../interfaces/language.interface';

export type LanguageDocument = Language & Document;

@Schema({ autoCreate: true, versionKey: false })
export class Language implements LanguageInterface {
  @Prop({ required: true, type: String, unique: true })
  name: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
