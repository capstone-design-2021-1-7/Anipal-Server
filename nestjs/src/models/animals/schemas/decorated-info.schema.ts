import { Prop, Schema } from '@nestjs/mongoose';
import { DecoratedInfoInterface } from '../interfaces/decorated-info.interface';

@Schema({ versionKey: false, id: false })
export class DecoratedInfo implements DecoratedInfoInterface {
  @Prop({ type: String, required: true })
  animal_url: string;
  @Prop({ type: String, default: '' })
  gloves_url?: string;
  @Prop({ type: String, default: '' })
  head_url?: string;
  @Prop({ type: String, default: '' })
  pants_url?: string;
  @Prop({ type: String, default: '' })
  shoes_url?: string;
  @Prop({ type: String, default: '' })
  top_url?: string;
}
