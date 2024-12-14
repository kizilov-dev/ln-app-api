import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { TopicsRepository } from './topics.repository';
import { topicProviders } from './topics.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicsController],
  providers: [
    ...topicProviders,
    TopicsService,
    TopicsRepository
  ],
  exports: [TopicsRepository]
})
export class TopicsModule {}
