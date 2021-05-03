import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { LanguageDto } from './dto/language.dto';

@ApiTags('languages')
@ApiBearerAuth('bearer')
@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get()
  @ApiOkResponse({ type: [LanguageDto] })
  async findAll(): Promise<LanguageDto[]> {
    const languages = await this.languagesService.findAll();
    return languages.map((language) => new LanguageDto(language));
  }
}
