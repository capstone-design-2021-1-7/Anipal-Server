import { Injectable } from '@nestjs/common';
import { LanguagesRepository } from './languages.repository';
import { Language } from './schemas/language.schema';

@Injectable()
export class LanguagesService {
  constructor(private readonly languagesRepository: LanguagesRepository) {}

  async findAll(): Promise<Language[]> {
    const languages = this.languagesRepository.findAll();
    return languages;
  }
}
