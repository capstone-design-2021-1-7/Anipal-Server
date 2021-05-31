import { Injectable } from '@nestjs/common';
import { OwnAnimalsRepository } from '../users/own-animals.repository';
import { User } from '../users/schemas/user.schema';
import { AccessoriesRepository } from '../accessories/accessories.repository';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class MissionsService {
  constructor(
    private readonly ownAnimalsRepository: OwnAnimalsRepository,
    private readonly accessoriesRepository: AccessoriesRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async changeFavoriteAnimalMission(user: User) {
    const sunglasses = await this.accessoriesRepository.findByName(
      'sunglasses',
    );
    if (
      user.own_accessories['head'].find((accessory) =>
        sunglasses._id.equals(accessory.accessory_id._id),
      )
    ) {
      return null;
    } else {
      this.usersRepository.getAccessory(user._id, sunglasses);
      return sunglasses;
    }
  }

  async postFirstRandomLetterMission(user: User) {
    const pencil = await this.accessoriesRepository.findByName('pencil');
    if (
      user.own_accessories['gloves'].find((accessory) =>
        pencil._id.equals(accessory.accessory_id._id),
      )
    ) {
      return null;
    } else {
      this.usersRepository.getAccessory(user._id, pencil);
      return pencil;
    }
  }
}
