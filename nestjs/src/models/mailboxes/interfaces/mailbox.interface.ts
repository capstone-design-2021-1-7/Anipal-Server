import { Letter } from '../../letters/schemas/letter.schema';
import * as mongoose from 'mongoose';
import { DecoratedInfo } from '../../animals/schemas/decorated-info.schema';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';

export interface MailboxInterface {
  _id: mongoose.Types.ObjectId;
  owner_users: BriefUserInfo[];
  letters_count: number;
  letters_id: Letter[];
  recent_sender: mongoose.Types.ObjectId;
  arrive_time: Date;
  is_opened: boolean;
  thumbnail_animal: DecoratedInfo;
}
