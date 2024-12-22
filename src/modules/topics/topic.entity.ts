import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Recording } from '../recordings/recording.entity';
import { Phrase } from '../phrases/phrase.entity';
import { DifficultyLevel } from '../../common/types/difficulty_level';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    name: 'difficulty_level'
  })
  difficulty_level: DifficultyLevel;

  @Column({ name: 'min_duration_seconds', default: 60 })
  min_duration_seconds: number;

  @Column({ name: 'is_active', default: true })
  is_active: boolean;

  @Column('text')
  language: string;

  @Column({ 
    name: 'created_at', 
    default: () => 'CURRENT_TIMESTAMP', 
    nullable: false
  })
  created_at: Date;

  @OneToMany(() => Recording, recording => recording.topic)
  recordings: Recording[];

  @ManyToMany(() => Phrase, phrase => phrase.topics)
  phrases: Phrase[];
}
