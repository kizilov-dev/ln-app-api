import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Topic } from '../topics/topic.entity';
import { DifficultyLevel } from '../../common/types/difficulty_level';

@Entity('phrases')
export class Phrase {
  @PrimaryGeneratedColumn({
    type: 'int'
  })
  id: number;

  @Column({
    type: 'text',
    nullable: false 
  })
  phrase_text: string;

  @Column({ 
    type: 'text', 
    nullable: false 
  })
  translation: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    nullable: false
  })
  difficulty_level: DifficultyLevel;

  @Column({ 
    name: 'created_at', 
    default: () => 'CURRENT_TIMESTAMP', 
    nullable: false,
  })
  created_at: Date;

  @ManyToMany(() => Topic, topic => topic.phrases)
  topics: Topic[];
}
