import { BriefAnimalInfoInterface } from '../interfaces/brief-animal-info.interface';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class BriefAnimalInfo implements BriefAnimalInfoInterface {
  @Prop({ type: String, required: true })
  localized: string;

  @Prop({ type: String, required: true })
  delay_time: string;
}
