import { Injectable, NotFoundException } from '@nestjs/common';
import { PhrasesRepository } from './phrases.repository';
import { Phrase } from './phrase.entity';
import { DifficultyLevel } from '../topics/topic.entity';

@Injectable()
export class PhrasesService {
  constructor(
    private readonly phrasesRepository: PhrasesRepository,
  ) {}

  async getAllPhrases(): Promise<Phrase[]> {
    return this.phrasesRepository.findAll();
  }

  async getPhraseById(id: number): Promise<Phrase> {
    const phrase = await this.phrasesRepository.findById(id);
    if (!phrase) {
      throw new NotFoundException(`Phrase with ID ${id} not found`);
    }
    return phrase;
  }

  async createPhrase(phraseData: Partial<Phrase>): Promise<Phrase> {
    return this.phrasesRepository.create(phraseData);
  }

  async updatePhrase(id: number, phraseData: Partial<Phrase>): Promise<Phrase> {
    const updatedPhrase = await this.phrasesRepository.update(id, phraseData);
    if (!updatedPhrase) {
      throw new NotFoundException(`Phrase with ID ${id} not found`);
    }
    return updatedPhrase;
  }

  async deletePhrase(id: number): Promise<void> {
    const deleted = await this.phrasesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Phrase with ID ${id} not found`);
    }
  }

  async getPhrasesByDifficulty(level: DifficultyLevel): Promise<Phrase[]> {
    return this.phrasesRepository.findByDifficultyLevel(level);
  }

  async getPhrasesByTopicId(topic_id: number): Promise<Phrase[]> {
    return this.phrasesRepository.findByTopicId(topic_id);
  }
}
