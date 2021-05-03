import { Prop, Schema } from '@nestjs/mongoose';
import { LanguageWithLevelInterface } from '../interfaces/language-with-level.interface';

@Schema({ versionKey: false, id: false })
export class LanguageWithLevel implements LanguageWithLevelInterface {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  level: number;
}
