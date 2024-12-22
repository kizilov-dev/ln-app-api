import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Topic } from '../topics/topic.entity';

@Entity('recordings')
export class Recording {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'topic_id' })
  topic_id: number;

  @Column({ name: 'audio_file_path' })
  audio_file_path: string;

  @Column({ name: 'transcribed_text', type: 'text', nullable: true })
  transcribed_text: string;

  @Column({ name: 'corrected_text', type: 'text', nullable: true })
  corrected_text: string;

  @Column({ name: 'ai_audio_file_path', nullable: true })
  ai_audio_file_path: string;

  @Column({ name: 'duration_seconds' })
  duration_seconds: number;

  @Column({ 
    name: 'created_at', 
    type: 'datetime', 
    default: () => 'CURRENT_TIMESTAMP', 
    nullable: false 
  })
  created_at: Date;

  @ManyToOne(() => User, user => user.recordings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Topic, topic => topic.recordings)
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;
}
