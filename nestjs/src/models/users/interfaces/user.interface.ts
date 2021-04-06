import * as mongoose from 'mongoose';

export interface UserInterface {
  _id: mongoose.Types.ObjectId;
  name: string;
  age: number;
  birthday: Date;
  gender: string;
  email: string;
  favorites: string[];
  languages: Record<string, any>[];
  concept: string;
  provider: string;
  animals;
  accessories;
}
