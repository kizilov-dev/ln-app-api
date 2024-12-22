import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Recording } from '../recordings/recording.entity';
import { UserProgress } from '../user-progress/user-progress.entity';
import { DifficultyLevel } from '../../common/types/difficulty_level';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: DifficultyLevel,
    default: DifficultyLevel.BEGINNER,
  })
  difficulty_level: DifficultyLevel;

  @Column()
  user_language: string;

  @Column()
  target_language: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_login: Date;

  @OneToMany(() => Recording, recording => recording.user)
  recordings: Recording[];

  @OneToMany(() => UserProgress, progress => progress.user)
  progress: UserProgress[];
}
