import { ObtainedAccessory } from '../../accessories/schemas/obtained-accessory.schema';

export interface OwnAccessoryInterface {
  head: ObtainedAccessory[];
  top: ObtainedAccessory[];
  pants: ObtainedAccessory[];
  shoes: ObtainedAccessory[];
  gloves: ObtainedAccessory[];
}
