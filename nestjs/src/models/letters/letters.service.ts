import { Injectable } from '@nestjs/common';
import { LettersRepository } from './letters.repository';
import * as mongoose from 'mongoose';
import { Letter } from './schemas/letter.schema';
import { SendLetterDto } from './dto/send-letter.dto';
import { SaveLetterDto } from './dto/save-letter.dto';
import { MailboxesRepository } from '../mailboxes/mailboxes.repository';
import { User } from '../users/schemas/user.schema';
import { RandomSendLetterDto } from './dto/random-send-letter.dto';
import { RandomLetter } from './schemas/random-letter.schema';
import { ReplyRandomLetterDto } from './dto/reply-random-letter.dto';

@Injectable()
export class LettersService {
  constructor(
    private readonly lettersRepository: LettersRepository,
    private readonly mailboxRepository: MailboxesRepository,
  ) {}

  async findLetter(letter_id: mongoose.Types.ObjectId): Promise<Letter> {
    return this.lettersRepository.findLetter(letter_id);
  }

  async findRandomLetters(
    user: mongoose.Types.ObjectId,
  ): Promise<RandomLetter[]> {
    return this.lettersRepository.findRandomLetters(user);
  }

  async findRandomLetter(
    random_id: mongoose.Types.ObjectId,
  ): Promise<RandomLetter> {
    return this.lettersRepository.findRandomLetter(random_id);
  }
  async send(user: User, sendLetter: SendLetterDto) {
    const saveLetter: SaveLetterDto = new SaveLetterDto(sendLetter);
    saveLetter.sender = {
      user_id: user._id,
      name: user.name,
      country: user.country,
      favorites: user.favorites,
    };
    saveLetter.receiver_id = mongoose.Types.ObjectId(sendLetter.receiver);
    saveLetter.coming_animal = sendLetter.coming_animal;
    try {
      await this.mailboxRepository.pushLetter(
        user._id,
        mongoose.Types.ObjectId(sendLetter.receiver),
        this.lettersRepository.send(saveLetter),
      );
    } catch {
      // TODO : 저장한 편지를 다시 지우는 작업을 해야함.
    }
  }

  async findComingLetters(user: mongoose.Types.ObjectId): Promise<Letter[]> {
    return this.lettersRepository.findComingLetters(user);
  }

  async randomSend(
    user: User,
    randomSendLetter: RandomSendLetterDto,
    receivers: User[],
  ): Promise<RandomLetter> {
    const saveLetter: SaveLetterDto = new SaveLetterDto(randomSendLetter);
    saveLetter.sender = {
      user_id: user._id,
      name: user.name,
      country: user.country,
      favorites: user.favorites,
    };
    return this.lettersRepository.sendRandomLetter(saveLetter, receivers);
  }

  async replyRandomLetter(
    user: User,
    randomLetter_id: mongoose.Types.ObjectId,
    sendLetter: ReplyRandomLetterDto,
  ) {
    const {
      letter_id: repliedLetter,
      sender: receiver,
    } = await this.lettersRepository.replyRandomLetter(randomLetter_id);
    const saveLetter: SaveLetterDto = new SaveLetterDto(sendLetter);
    saveLetter.sender = {
      user_id: user._id,
      name: user.name,
      country: user.country,
      favorites: user.favorites,
    };
    saveLetter.receiver_id = receiver.user_id;
    saveLetter.coming_animal = sendLetter.coming_animal;
    const newLetter = this.lettersRepository.send(saveLetter);

    try {
      this.mailboxRepository
        .replyLetterPush(user._id, receiver.user_id, repliedLetter)
        .then(() => {
          this.mailboxRepository.pushLetter(
            user._id,
            receiver.user_id,
            newLetter,
          );
        });
    } catch {
      // TODO : 저장한 편지를 다시 지우는 작업을 해야함.
    }
  }

  async deleteRandomLetter(
    user: mongoose.Types.ObjectId,
    random_id: mongoose.Types.ObjectId,
  ) {
    return this.lettersRepository.deleteRandomLetter(user, random_id);
  }
}
