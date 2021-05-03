import { Prop, Schema } from '@nestjs/mongoose';
import { ObtainedAccessory } from '../../accessories/schemas/obtained-accessory.schema';
import { OwnAccessoryInterface } from '../interfaces/own-accessory.interface';

@Schema({ versionKey: false, id: false })
export class OwnAccessory implements OwnAccessoryInterface {
  @Prop([
    {
      type: ObtainedAccessory,
      default: [],
    },
  ])
  head: ObtainedAccessory[];

  @Prop([
    {
      type: ObtainedAccessory,
      default: [],
    },
  ])
  top: ObtainedAccessory[];

  @Prop([
    {
      type: ObtainedAccessory,
      default: [],
    },
  ])
  pants: ObtainedAccessory[];

  @Prop([
    {
      type: ObtainedAccessory,
      default: [],
    },
  ])
  shoes: ObtainedAccessory[];

  @Prop([
    {
      type: ObtainedAccessory,
      default: [],
    },
  ])
  gloves: ObtainedAccessory[];
}
