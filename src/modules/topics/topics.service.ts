import { Injectable, NotFoundException } from '@nestjs/common';
import { TopicsRepository } from './topics.repository';
import { Topic } from './topic.entity';
import { DifficultyLevel } from '../../common/types/difficulty_level';
import { TopicDto } from './topics.dto';

@Injectable()
export class TopicsService {
  constructor(
    private readonly topicsRepository: TopicsRepository,
  ) {}

  async getAllTopics(): Promise<Topic[]> {
    return this.topicsRepository.findAll();
  }

  async getTopicById(id: number): Promise<Topic> {
    const topic = await this.topicsRepository.findById(id);
    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async createTopic(topicData: Partial<Topic>): Promise<Topic> {
    return this.topicsRepository.create(topicData);
  }

  async updateTopic(id: number, topicData: Partial<Topic>): Promise<Topic> {
    const updatedTopic = await this.topicsRepository.update(id, topicData);
    if (!updatedTopic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return updatedTopic;
  }

  async deleteTopic(id: number): Promise<void> {
    const deleted = await this.topicsRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }

  async getTopicsByDifficulty(level: DifficultyLevel): Promise<Topic[]> {
    return this.topicsRepository.findByDifficultyLevel(level);
  }

  async getRandomTopics(level: DifficultyLevel, random: number): Promise<TopicDto[]> {
    const res =  await this.topicsRepository.findRandom(level, random);
    return res.map((topic) => new TopicDto(topic));
  }

  async getActiveTopics(): Promise<Topic[]> {
    return this.topicsRepository.findActiveTopics();
  }
}
