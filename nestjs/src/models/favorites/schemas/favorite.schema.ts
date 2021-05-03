import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FavoriteInterface } from '../interfaces/favorite.interface';

export type FavoriteDocument = Favorite & Document;

@Schema({ autoCreate: true, versionKey: false })
export class Favorite implements FavoriteInterface {
  @Prop({ type: String, unique: true })
  name: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
