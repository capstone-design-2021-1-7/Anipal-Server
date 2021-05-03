import * as mongoose from 'mongoose';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';
import { ComingAnimal } from '../../animals/schemas/coming-animal.schema';

export interface LetterInterface {
  _id: mongoose.Types.ObjectId;
  content: string;
  send_time: Date;
  arrive_time: Date;
  sender: BriefUserInfo;
  receiver_id: mongoose.Types.ObjectId;
  post_animal: DecoratedInfo;
  coming_animal: ComingAnimal;
}
