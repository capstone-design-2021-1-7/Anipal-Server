import * as mongoose from 'mongoose';

export interface BriefUserInfoInterface {
  user_id: mongoose.Types.ObjectId;
  name: string;
  country: string;
  favorites: string[];
}
