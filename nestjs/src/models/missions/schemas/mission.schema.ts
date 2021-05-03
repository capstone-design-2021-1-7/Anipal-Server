import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MissionInterface } from '../interfaces/mission.interface';

export type MissionDocument = Mission & Document;

@Schema({ autoCreate: true, versionKey: false })
export class Mission implements MissionInterface {
  @Prop({ required: true, type: String })
  _id: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  content: string;
}

export const MissionSchema = SchemaFactory.createForClass(Mission);
