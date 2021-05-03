import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigModule } from '../../../config/database/mongo/config.module';
import { MongoConfigService } from '../../../config/database/mongo/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri:
          'mongodb+srv://' +
          `${mongoConfigService.user}:` +
          `${mongoConfigService.password}@` +
          `${mongoConfigService.host}/` +
          `${mongoConfigService.database}` +
          '?retryWrites=true&w=majority',
        useCreateIndex: true,
        useFindAndModify: false,
      }),
      inject: [MongoConfigService],
    }),
  ],
})
export class MongoDatabaseProviderModule {}
