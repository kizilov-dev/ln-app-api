import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { UserProgressController } from './user-progress.controller';
import { UserProgressService } from './user-progress.service';
import { UserProgressRepository } from './user-progress.repository';
import { userProgressProviders } from './user-progress.providers';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UserProgressController],
  providers: [
    ...userProgressProviders,
    UserProgressService,
    UserProgressRepository
  ],
  exports: [UserProgressRepository, UserProgressService]
})
export class UserProgressModule {}
