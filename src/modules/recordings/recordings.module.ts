import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { RecordingsController } from './recordings.controller';
import { RecordingsService } from './recordings.service';
import { RecordingsRepository } from './recordings.repository';
import { recordingProviders } from './recordings.providers';
import { UserProgressModule } from '../user-progress/user-progress.module';

@Module({
  imports: [
    DatabaseModule,
    UserProgressModule
  ],
  controllers: [RecordingsController],
  providers: [
    ...recordingProviders,
    RecordingsService,
    RecordingsRepository
  ],
  exports: [RecordingsRepository]
})
export class RecordingsModule {}
