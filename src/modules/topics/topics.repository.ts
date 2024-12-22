import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';
import { TOPIC_REPOSITORY } from '../../common/database/providers.constants';
import { DifficultyLevel } from '../../common/types/difficulty_level';

@Injectable()
export class TopicsRepository {
  constructor(
    @Inject(TOPIC_REPOSITORY)
    private readonly repository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Topic | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['topicPhrases', 'topicPhrases.phrase']
    });
  }

  async create(topicData: Partial<Topic>): Promise<Topic> {
    const topic = this.repository.create(topicData);
    return this.repository.save(topic);
  }

  async update(id: number, topicData: Partial<Topic>): Promise<Topic | null> {
    await this.repository.update(id, topicData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async findByDifficultyLevel(level: DifficultyLevel): Promise<Topic[]> {
    return this.repository.find({
      where: { difficulty_level: level }
    });
  }

  async findActiveTopics(): Promise<Topic[]> {
    return this.repository.find({
      where: { is_active: true }
    });
  }
}
