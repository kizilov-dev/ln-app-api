import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn({ name: 'progress_id' })
  id: number;

  @Column({ name: 'user_id' })
  user_id: number;

  @Column({ name: 'current_streak', default: 0 })
  current_streak: number;

  @Column({ name: 'longest_streak', default: 0 })
  longest_streak: number;

  @Column({ name: 'last_activity_date', type: 'date', nullable: true })
  last_activity_date: Date;

  @Column({ name: 'total_recordings', default: 0 })
  total_recordings: number;

  @Column({ name: 'total_practice_time_seconds', default: 0 })
  total_practice_time_seconds: number;

  @Column({ name: 'level_points', default: 0 })
  level_points: number;

  @ManyToOne(() => User, user => user.progress)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
