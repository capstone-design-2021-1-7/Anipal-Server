import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LettersService } from './letters.service';
import { DUser } from '../users/decorators/user.decorator';
import { TransformObjectidPipe } from '../../common/pipes/transform-objectid.pipe';
import * as mongoose from 'mongoose';
import { LetterDto } from './dto/letter.dto';
import { SendLetterDto } from './dto/send-letter.dto';
import { User } from '../users/schemas/user.schema';
import { ComingLetterDto } from './dto/coming-letter.dto';
import { UsersService } from '../users/users.service';
import { RandomSendLetterDto } from './dto/random-send-letter.dto';
import { RandomLetterDto } from './dto/random-letter.dto';
import { ReplyRandomLetterDto } from './dto/reply-random-letter.dto';
import { MissionsService } from '../missions/missions.service';

@ApiTags('letters')
@ApiBearerAuth('bearer')
@Controller('letters')
export class LettersController {
  constructor(
    private readonly lettersService: LettersService,
    private readonly usersService: UsersService,
    private readonly missionsService: MissionsService,
  ) {}

  @Get('coming')
  @ApiOkResponse({
    type: [ComingLetterDto],
    description: '나에게 오고 있는 편지들을 볼 때 사용합니다.',
  })
  async findComingLetters(
    @DUser('_id', TransformObjectidPipe) user: mongoose.Types.ObjectId,
  ): Promise<ComingLetterDto[]> {
    const letters = await this.lettersService.findComingLetters(user);
    return letters.map((letter) => new ComingLetterDto(letter));
  }

  @Get('random')
  @ApiOkResponse({
    type: [RandomLetterDto],
    description: '나에게 온 랜덤 편지들을 볼 때 사용합니다.',
  })
  async findRandomLetters(@DUser() user: User): Promise<RandomLetterDto[]> {
    return (await this.lettersService.findRandomLetters(user)).map(
      (letter) => new RandomLetterDto(letter),
    );
  }

  @Get('random/:random_id')
  @ApiOkResponse({
    type: LetterDto,
    description: '나에게 온 랜덤 편지의 내용을 볼 때 사용합니다.',
  })
  async findRandomLetter(
    @DUser('_id', TransformObjectidPipe) user: mongoose.Types.ObjectId,
    @Param('random_id', TransformObjectidPipe)
    random_id: mongoose.Types.ObjectId,
  ): Promise<LetterDto> {
    const { letter_id: letter } = await this.lettersService.findRandomLetter(
      random_id,
    );
    return new LetterDto(letter);
  }

  @Get(':letter_id')
  @ApiParam({ name: 'letter_id', type: String })
  @ApiOkResponse({
    type: LetterDto,
    description: '특정 편지를 가져올 때 사용합니다.',
  })
  @ApiBadRequestResponse({
    description: '편지의 수신자가 아닌 경우 발생합니다.',
  })
  async findLetter(
    @Param('letter_id', TransformObjectidPipe)
    letter_id: mongoose.Types.ObjectId,
    @DUser('_id') user: mongoose.Types.ObjectId,
  ): Promise<LetterDto> {
    const letter = await this.lettersService.findLetter(letter_id);
    if (!letter.receiver_id.equals(user)) {
      throw new BadRequestException({
        detail: '해당 편지의 수신자가 아닙니다.',
      });
    }
    return new LetterDto(letter);
  }

  @Post()
  @ApiCreatedResponse({
    description: '편지를 보낼 때 사용합니다.',
  })
  async send(@DUser() user: User, @Body() sendLetter: SendLetterDto) {
    await this.lettersService.send(user, sendLetter);
    return;
  }

  @Post('random')
  @ApiCreatedResponse({
    description: '랜덤 편지를 보낼 때 사용합니다.',
    type: RandomLetterDto,
  })
  async randomSend(
    @DUser() user: User,
    @Body() randomSendLetter: RandomSendLetterDto,
  ): Promise<RandomLetterDto> {
    const pencil = this.missionsService.postFirstRandomLetterMission(user);
    const randomLetter = await this.lettersService.randomSend(
      user,
      randomSendLetter,
      await this.usersService.findClosestUsers(user),
    );

    return new RandomLetterDto(randomLetter, await pencil);
  }

  @Post('random/:randomLetter_id')
  @ApiCreatedResponse({
    description: '랜덤 편지에 답장할 때 사용합니다.',
  })
  @ApiParam({ name: 'randomLetter_id', type: String })
  @ApiBadRequestResponse({
    description: '랜덤 편지가 없을 때 발생합니다.',
  })
  async replyRandomLetter(
    @DUser() user: User,
    @Body() sendLetter: ReplyRandomLetterDto,
    @Param('randomLetter_id', TransformObjectidPipe)
    randomLetter_id: mongoose.Types.ObjectId,
  ) {
    await this.lettersService.replyRandomLetter(
      user,
      randomLetter_id,
      sendLetter,
    );
  }

  @Put('random/:randomLetter_id')
  @ApiOkResponse({
    description: '특정 랜덤 편지를 더 이상 보고 싶지 않을 때 사용합니다.',
  })
  @ApiParam({ name: 'randomLetter_id', type: String })
  async deleteRandomLetter(
    @DUser('id', TransformObjectidPipe) user: mongoose.Types.ObjectId,
    @Param('randomLetter_id', TransformObjectidPipe)
    random_id: mongoose.Types.ObjectId,
  ) {
    await this.lettersService.deleteRandomLetter(user, random_id);
  }
}
