import mongoose from 'mongoose';
import { Letter } from '../schemas/letter.schema';
import { User } from '../../users/schemas/user.schema';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';

export class RandomLetterInterface {
  _id: mongoose.Types.ObjectId;
  letter_id: Letter;
  arrive_time: Date;
  receivers_id: User[];
  post_animal: DecoratedInfo;
  sender: BriefUserInfo;
}
