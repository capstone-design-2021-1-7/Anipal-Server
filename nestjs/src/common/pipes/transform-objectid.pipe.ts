import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class TransformObjectidPipe
  implements PipeTransform<string, Promise<mongoose.Types.ObjectId>> {
  async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<mongoose.Types.ObjectId> {
    return mongoose.Types.ObjectId(value);
  }
}
[];
