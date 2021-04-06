import { Module } from '@nestjs/common';
import { MongoDatabaseProviderModule } from './providers/database/mongo/provider.module';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './models/users/users.module';

@Module({
  imports: [MongoDatabaseProviderModule, AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
