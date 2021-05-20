import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Language, LanguageDocument } from './schemas/language.schema';

@Injectable()
export class LanguagesRepository {
  constructor(
    @InjectModel(Language.name)
    private languageModel: mongoose.Model<LanguageDocument>,
  ) {}

  async findAll(): Promise<Language[]> {
    return this.languageModel.find().exec();
  }
}
