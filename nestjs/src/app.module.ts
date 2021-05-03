import { Module } from '@nestjs/common';
import { MongoDatabaseProviderModule } from './providers/database/mongo/provider.module';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './models/users/users.module';
import { MissionsModule } from './models/missions/missions.module';
import { LettersModule } from './models/letters/letters.module';
import { LanguagesModule } from './models/languages/languages.module';
import { FavoritesModule } from './models/favorites/favorites.module';
import { AnimalsModule } from './models/animals/animals.module';
import { AccessoriesModule } from './models/accessories/accessories.module';
import { MailboxesModule } from './models/mailboxes/mailboxes.module';

@Module({
  imports: [
    MongoDatabaseProviderModule,
    AuthModule,
    UsersModule,
    MissionsModule,
    LettersModule,
    LanguagesModule,
    FavoritesModule,
    AnimalsModule,
    AccessoriesModule,
    MailboxesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
