import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  ParseIntPipe, 
  Query 
} from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { Phrase } from './phrase.entity';
import { DifficultyLevel } from '../topics/topic.entity';

@Controller('phrases')
export class PhrasesController {
  constructor(private readonly phrasesService: PhrasesService) {}

  @Get()
  async getPhrases(
    @Query('topic_id') topic_id?: number,
    @Query('difficulty_level') difficulty_level?: DifficultyLevel
  ): Promise<Phrase[]> {
    if (topic_id) {
      return this.phrasesService.getPhrasesByTopicId(topic_id);
    }
    if (difficulty_level) {
      return this.phrasesService.getPhrasesByDifficulty(difficulty_level);
    }
    return this.phrasesService.getAllPhrases();
  }

  @Get(':id')
  async getPhraseById(@Param('id', ParseIntPipe) id: number) {
    return this.phrasesService.getPhraseById(id);
  }

  @Post()
  async createPhrase(@Body() phraseData: Partial<Phrase>) {
    return this.phrasesService.createPhrase(phraseData);
  }

  @Put(':id')
  async updatePhrase(
    @Param('id', ParseIntPipe) id: number, 
    @Body() phraseData: Partial<Phrase>
  ) {
    return this.phrasesService.updatePhrase(id, phraseData);
  }

  @Delete(':id')
  async deletePhrase(@Param('id', ParseIntPipe) id: number) {
    return this.phrasesService.deletePhrase(id);
  }
}
