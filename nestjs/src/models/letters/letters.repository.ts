import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Letter, LetterDocument } from './schemas/letter.schema';
import { SaveLetterDto } from './dto/save-letter.dto';
import {
  RandomLetter,
  RandomLetterDocument,
} from './schemas/random-letter.schema';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class LettersRepository {
  constructor(
    @InjectModel(Letter.name)
    private letterModel: mongoose.Model<LetterDocument>,

    @InjectModel(RandomLetter.name)
    private randomLetterModel: mongoose.Model<RandomLetterDocument>,
  ) {}

  async findLetter(letter_id: mongoose.Types.ObjectId): Promise<Letter> {
    return this.letterModel
      .findOne({ _id: letter_id, arrive_time: { $lt: new Date() } })
      .populate('sender_id')
      .exec();
  }

  async findRandomLetters(
    user: mongoose.Types.ObjectId,
  ): Promise<RandomLetter[]> {
    return this.randomLetterModel
      .find({
        receivers_id: { $elemMatch: { $eq: user } },
        arrive_time: { $lt: new Date() },
      })
      .exec();
  }

  async findRandomLetter(
    random_id: mongoose.Types.ObjectId,
  ): Promise<RandomLetter> {
    return this.randomLetterModel
      .findOne(
        { _id: random_id, arrive_time: { $lt: new Date() } },
        'letter_id',
      )
      .populate('letter_id')
      .exec();
  }

  async send(saveLetter: SaveLetterDto): Promise<Letter> {
    const letter = new this.letterModel(saveLetter);
    return letter.save();
  }

  async findComingLetters(user: mongoose.Types.ObjectId): Promise<Letter[]> {
    return this.letterModel
      .find({
        receiver_id: user,
        arrive_time: { $gt: new Date() },
      })
      .select({
        coming_animal: 1,
        arrive_time: 1,
        'sender.name': 1,
      })
      .exec();
  }

  async sendRandomLetter(
    saveLetter: SaveLetterDto,
    receivers: User[],
  ): Promise<RandomLetter> {
    const randomLetter = new this.randomLetterModel(saveLetter);
    const letter = new this.letterModel(saveLetter);
    randomLetter.receivers_id = receivers;
    randomLetter.letter_id = letter;
    letter.save();
    return randomLetter.save();
  }

  async replyRandomLetter(
    randomLetter_id: mongoose.Types.ObjectId,
  ): Promise<RandomLetter> {
    const randomLetter = await this.randomLetterModel
      .findOneAndRemove({
        _id: randomLetter_id,
      })
      .populate('letter_id')
      .exec();
    if (randomLetter) {
      return randomLetter;
    } else {
      throw new BadRequestException({
        detail: '존재하지 않는 편지입니다.',
      });
    }
  }

  async deleteRandomLetter(
    user: mongoose.Types.ObjectId,
    random_id: mongoose.Types.ObjectId,
  ) {
    return this.randomLetterModel
      .findOneAndUpdate(
        {
          _id: random_id,
        },
        { $pull: { receivers_id: user } },
      )
      .exec();
  }
}
