import * as mongoose from 'mongoose';
import { LanguageWithLevel } from '../../languages/schemas/language-with-level.schema';

export interface BriefUserInfoInterface {
  user_id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  favorites: string[];
  languages: LanguageWithLevel[];
}
