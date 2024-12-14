import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { PhrasesController } from './phrases.controller';
import { PhrasesService } from './phrases.service';
import { PhrasesRepository } from './phrases.repository';
import { phraseProviders } from './phrases.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PhrasesController],
  providers: [
    ...phraseProviders,
    PhrasesService,
    PhrasesRepository
  ],
  exports: [PhrasesRepository]
})
export class PhrasesModule {}
