import { Mission } from '../../missions/schemas/mission.schema';
import mongoose from 'mongoose';
import { ComingAnimal } from '../schemas/coming-animal.schema';

export interface AnimalInterface {
  _id: mongoose.Types.ObjectId;
  delay_time: string;
  img_url: string;
  price: number;
  mission: Mission;
  is_basic: boolean;
  localized: string;
  coming_animal: ComingAnimal;
}
