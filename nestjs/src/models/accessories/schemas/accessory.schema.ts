import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccessoryInterface } from '../interfaces/accessory.interface';
import { Mission } from '../../missions/schemas/mission.schema';
import * as mongoose from 'mongoose';

export type AccessoryDocument = Accessory & Document;

@Schema({ autoCreate: true, versionKey: false })
export class Accessory implements AccessoryInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  img_url: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: String })
  category: string;

  @Prop({
    required: true,
    type: Mission,
  })
  mission: Mission;
}

export const AccessorySchema = SchemaFactory.createForClass(Accessory);
