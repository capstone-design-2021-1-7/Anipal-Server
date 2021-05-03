import * as mongoose from 'mongoose';
import { SendLetterDto } from './send-letter.dto';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { ComingAnimalDto } from '../../animals/dto/coming-animal.dto';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';
import { RandomSendLetterDto } from './random-send-letter.dto';

export class SaveLetterDto {
  constructor(sendLetter: SendLetterDto | RandomSendLetterDto) {
    this.content = sendLetter.content;
    this.post_animal = sendLetter.post_animal;

    const [hour, minute, second] = sendLetter.delay_time
      .split(' ')
      .map((time) => parseInt(time.slice(0, time.length - 1)));
    const send_time = new Date();
    const arrive_time = new Date(
      send_time.getTime() +
        hour * 60 * 60 * 1000 +
        minute * 60 * 1000 +
        second * 1000,
    );
    this.send_time = send_time;
    this.arrive_time = arrive_time;
  }

  content: string;
  send_time: Date;
  arrive_time: Date;
  sender: BriefUserInfo;
  receiver_id: mongoose.Types.ObjectId;
  post_animal: DecoratedInfoDto;
  coming_animal: ComingAnimalDto;
}
