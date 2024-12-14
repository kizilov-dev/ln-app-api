import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Phrase } from './phrase.entity';
import { PHRASE_REPOSITORY } from '../../common/database/providers.constants';
import { DifficultyLevel } from '../topics/topic.entity';

@Injectable()
export class PhrasesRepository {
  constructor(
    @Inject(PHRASE_REPOSITORY)
    private readonly repository: Repository<Phrase>,
  ) {}

  async findAll(): Promise<Phrase[]> {
    return this.repository.find({
      relations: ['topics']
    });
  }

  async findById(id: number): Promise<Phrase | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['topics']
    });
  }

  async create(phraseData: Partial<Phrase>): Promise<Phrase> {
    const phrase = this.repository.create(phraseData);
    return this.repository.save(phrase);
  }

  async update(id: number, phraseData: Partial<Phrase>): Promise<Phrase | null> {
    await this.repository.update(id, phraseData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  async findByDifficultyLevel(level: DifficultyLevel): Promise<Phrase[]> {
    return this.repository.find({
      where: { difficulty_level: level },
    });
  }

  async findByTopicId(topic_id: number): Promise<Phrase[]> {
    return this.repository
      .createQueryBuilder('phrase')
      .innerJoin('phrase.topics', 'topic', 'topic.id = :topic_id', { topic_id })
      .getMany();
  }
}
