import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class MissionsService {
  async checkPostMission(user: User) {}
}
