import { Prop, Schema } from '@nestjs/mongoose';
import { ComingAnimalInterface } from '../interfaces/coming-animal.interface';

@Schema({ versionKey: false })
export class ComingAnimal implements ComingAnimalInterface {
  @Prop({ required: true, type: String })
  animal_url: string;

  @Prop({ required: true, type: String })
  background: string;

  @Prop({ required: true, type: String })
  bar: string;
}
