import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MailboxesService } from './mailboxes.service';
import { TransformObjectidPipe } from '../../common/pipes/transform-objectid.pipe';
import * as mongoose from 'mongoose';
import { DUser } from '../users/decorators/user.decorator';
import { MailboxDto } from './dto/mailbox.dto';
import { LetterDto } from '../letters/dto/letter.dto';

@ApiTags('mailboxes')
@ApiBearerAuth('bearer')
@Controller('mailboxes')
export class MailboxesController {
  constructor(private readonly mailboxesService: MailboxesService) {}

  @Get('my')
  @ApiOkResponse({
    type: [MailboxDto],
    description: '유저가 속해잇는 모든 mailbox를 가져올 때 사용합니다.',
  })
  async findMailboxes(
    @DUser('_id', TransformObjectidPipe) user: mongoose.Types.ObjectId,
  ): Promise<MailboxDto[]> {
    const mailboxes = await this.mailboxesService.findMailboxes(user);
    return mailboxes.map((mailbox) => {
      mailbox.owner_users = [
        mailbox.owner_users.find(
          (owner_user) => !owner_user.user_id.equals(user),
        ),
      ];
      return new MailboxDto(mailbox);
    });
  }

  @Get('show/:mailbox_id')
  @ApiParam({ name: 'mailbox_id', type: String })
  @ApiOkResponse({
    type: [LetterDto],
    description: 'mailbox에 있는 모든 편지를 가져올 때 사용합니다.',
  })
  @ApiBadRequestResponse({
    description: '사용자가 속해있지 않은 mailbox를 요청한 경우 발생합니다.',
  })
  async showLettersInMailbox(
    @Param('mailbox_id', TransformObjectidPipe)
    mailbox_id: mongoose.Types.ObjectId,
    @DUser('_id', TransformObjectidPipe) user: mongoose.Types.ObjectId,
  ): Promise<LetterDto[]> {
    const {
      owner_users,
      letters_id,
    } = await this.mailboxesService.showLettersInMailbox(user, mailbox_id);
    if (
      !owner_users
        .map((owner_user) => owner_user.user_id)
        .find((user_id) => user_id.equals(user))
    ) {
      throw new BadRequestException({
        detail: '해당 mailbox의 사용자가 아닙니다.',
      });
    }
    return letters_id.map((letter) => new LetterDto(letter));
  }

  @Get('/leave/:mailbox_id')
  @ApiParam({ name: 'mailbox_id', type: String })
  @ApiOkResponse({ description: '유저가 mailbox에서 떠날 경우 사용합니다.' })
  @ApiNotFoundResponse({
    description: 'mailbox_id에 해당하는 mailbox가 없는 경우 발생합니다.',
  })
  @ApiBadRequestResponse({
    description: '유저가 mailbox에 속해있지 않았을 경우 발생합니다.',
  })
  async leaveMailbox(
    @DUser('_id', TransformObjectidPipe) user: mongoose.Types.ObjectId,
    @Param('mailbox_id', TransformObjectidPipe)
    mailbox_id: mongoose.Types.ObjectId,
  ) {
    const mailbox = await this.mailboxesService.findMailbox(mailbox_id);
    if (!mailbox) {
      throw new NotFoundException({
        detail: '해당 mailbox는 존재하지 않습니다.',
      });
    } else if (
      !mailbox.owner_users
        .map((owner_user) => owner_user.user_id)
        .includes(user)
    ) {
      throw new BadRequestException({
        detail: '해당 mailbox의 사용자가 아닙니다.',
      });
    } else {
      this.mailboxesService.leaveMailbox(user, mailbox_id);
    }
    return;
  }
}
