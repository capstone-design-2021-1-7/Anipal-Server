import * as mongoose from 'mongoose';
import { BriefUserInfoInterface } from '../interfaces/brief-user-info.interface';
import { Prop, Schema } from '@nestjs/mongoose';
import { LanguageWithLevel } from '../../languages/schemas/language-with-level.schema';

@Schema({ versionKey: false })
export class BriefUserInfo implements BriefUserInfoInterface {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  user_id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  country: string;

  @Prop([{ required: true, type: String }])
  favorites: string[];

  @Prop([{ required: true, type: LanguageWithLevel }])
  languages: LanguageWithLevel[];
}
