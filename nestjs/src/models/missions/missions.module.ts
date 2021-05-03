import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mission, MissionSchema } from './schemas/mission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Mission.name, schema: MissionSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class MissionsModule {}
