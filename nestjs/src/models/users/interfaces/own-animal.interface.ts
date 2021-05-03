import mongoose from 'mongoose';
import { BriefAnimalInfo } from '../../animals/schemas/brief-animal-info.schema';
import { ComingAnimal } from '../../animals/schemas/coming-animal.schema';

export interface OwnAnimalInterface {
  _id?: mongoose.Types.ObjectId;
  animal: BriefAnimalInfo;
  delay_time: string;
  animal_url: string;
  head_url?: string;
  top_url?: string;
  pants_url?: string;
  shoes_url?: string;
  gloves_url?: string;
  arrive_time?: Date;
  coming_animal: ComingAnimal;
  is_favorite?: boolean;
}
