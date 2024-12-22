import { Topic } from './topic.entity';
import { DifficultyLevel } from '../../common/types/difficulty_level';

const minDurationMapping: Record<DifficultyLevel, number> = {
  [DifficultyLevel.BEGINNER]: 30,
  [DifficultyLevel.INTERMEDIATE]: 60,
  [DifficultyLevel.ADVANCED]: 90,
};

const minWordsMapping: Record<DifficultyLevel, number> = {
  [DifficultyLevel.BEGINNER]: 30,
  [DifficultyLevel.INTERMEDIATE]: 60,
  [DifficultyLevel.ADVANCED]: 90,
};

export class TopicDto extends Topic {
  min_duration: number;
  min_words: number;
  constructor(topic: Topic) {
    super();
    this.id = topic.id;
    this.title = topic.title;
    this.description = topic.description;
    this.difficulty_level = topic.difficulty_level;
    this.is_active = topic.is_active;
    this.language = topic.language;
    this.created_at = topic.created_at;
    this.min_duration = minDurationMapping[this.difficulty_level];
    this.min_words = minWordsMapping[this.difficulty_level];
  }
}