import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ObtainedAccessoryInterface } from '../interfaces/obtained-accessory.interface';
import { Accessory } from './accessory.schema';

@Schema({ versionKey: false })
export class ObtainedAccessory implements ObtainedAccessoryInterface {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Accessory',
  })
  accessory_id: Accessory;

  @Prop({ required: true, type: String })
  img_url: string;
}
