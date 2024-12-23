import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { Topic } from './topic.entity';
import { DifficultyLevel } from '../../common/types/difficulty_level';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getAllTopics(
    @Query('difficulty') difficulty?: DifficultyLevel,
    @Query('active') active?: boolean,
    @Query('random') random?: number
  ) {
    if (random) {
      return this.topicsService.getRandomTopics(difficulty, random);
    }
    if (difficulty) {
      return this.topicsService.getTopicsByDifficulty(difficulty);
    }
    if (active) {
      return this.topicsService.getActiveTopics();
    }
    return this.topicsService.getAllTopics();
  }

  @Get(':id')
  async getTopicById(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.getTopicById(id);
  }

  @Post()
  async createTopic(@Body() topicData: Partial<Topic>) {
    return this.topicsService.createTopic(topicData);
  }

  @Put(':id')
  async updateTopic(
    @Param('id', ParseIntPipe) id: number, 
    @Body() topicData: Partial<Topic>
  ) {
    return this.topicsService.updateTopic(id, topicData);
  }

  @Delete(':id')
  async deleteTopic(@Param('id', ParseIntPipe) id: number) {
    return this.topicsService.deleteTopic(id);
  }
}
