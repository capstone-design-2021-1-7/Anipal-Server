import * as mongoose from 'mongoose';

export interface AccessoryInterface {
  _id: mongoose.Types.ObjectId;
  name: string;
  price: number;
  img_url: string;
  category: string;
  mission: string;
}
