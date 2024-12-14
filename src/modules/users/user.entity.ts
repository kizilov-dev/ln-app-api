import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Recording } from '../recordings/recording.entity';
import { UserProgress } from '../user-progress/user-progress.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  password_hash: string;

  @Column({ name: 'target_language' })
  target_language: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'last_login' })
  last_login: Date;

  @OneToMany(() => Recording, recording => recording.user)
  recordings: Recording[];

  @OneToMany(() => UserProgress, progress => progress.user)
  progress: UserProgress[];
}
