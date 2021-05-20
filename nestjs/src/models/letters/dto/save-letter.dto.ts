import * as mongoose from 'mongoose';
import { SendLetterDto } from './send-letter.dto';
import { DecoratedInfoDto } from '../../animals/dto/decorated-info.dto';
import { ComingAnimalDto } from '../../animals/dto/coming-animal.dto';
import { BriefUserInfo } from '../../users/schemas/brief-user-info.schema';
import { RandomSendLetterDto } from './random-send-letter.dto';
import { OwnAnimal } from '../../users/schemas/own-animal.schema';
import { ReplyRandomLetterDto } from './reply-random-letter.dto';

export class SaveLetterDto {
  constructor(
    sendLetter: SendLetterDto | RandomSendLetterDto | ReplyRandomLetterDto,
    ownAnimal: OwnAnimal,
  ) {
    this.content = sendLetter.content;
    const {
      animal_url,
      head_url,
      top_url,
      pants_url,
      shoes_url,
      gloves_url,
      coming_animal,
      delay_time,
    } = ownAnimal;
    this.post_animal = {
      animal_url,
      head_url,
      top_url,
      pants_url,
      shoes_url,
      gloves_url,
    };
    const [hour, minute, second] = delay_time
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
    this.coming_animal = new ComingAnimalDto(coming_animal);
  }

  content: string;
  send_time: Date;
  arrive_time: Date;
  sender: BriefUserInfo;
  receiver_id: mongoose.Types.ObjectId;
  post_animal: DecoratedInfoDto;
  coming_animal: ComingAnimalDto;
}
