import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Topic, DifficultyLevel } from '../topics/topic.entity';

@Entity('phrases')
export class Phrase {
  @PrimaryGeneratedColumn({ 
    name: 'phrase_id',
    type: 'int' 
  })
  id: number;

  @Column({ 
    name: 'phrase_text', 
    type: 'text',
    nullable: false 
  })
  text: string;

  @Column({ 
    type: 'text', 
    nullable: false 
  })
  translation: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    enumName: 'difficulty_level_enum',
    name: 'difficulty_level',
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
