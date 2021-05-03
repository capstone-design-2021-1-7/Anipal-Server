import { Mission } from '../../missions/schemas/mission.schema';
import * as mongoose from 'mongoose';

export interface AccessoryInterface {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  mission: Mission;
  img_url: string;
  category: string;
}
