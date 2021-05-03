import * as mongoose from 'mongoose';
import { LanguageWithLevel } from '../../languages/schemas/language-with-level.schema';
import { OwnAnimal } from '../schemas/own-animal.schema';
import { OwnAccessory } from '../schemas/own-accessory.schema';

export interface UserInterface {
  _id: mongoose.Types.ObjectId;
  name: string;
  age: number;
  birthday: string;
  gender: string;
  email: string;
  country: string;
  provider: string;
  favorites: string[];
  languages: LanguageWithLevel[];
  own_animals_id: OwnAnimal[];
  own_accessories: OwnAccessory;
}
