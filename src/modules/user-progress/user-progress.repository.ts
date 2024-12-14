import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserProgress } from './user-progress.entity';
import { USER_PROGRESS_REPOSITORY } from '../../common/database/providers.constants';

@Injectable()
export class UserProgressRepository {
  // Expose the underlying repository
  public readonly repository: Repository<UserProgress>;

  constructor(
    @Inject(USER_PROGRESS_REPOSITORY)
    repository: Repository<UserProgress>,
  ) {
    this.repository = repository;
  }

  async findByUserId(user_id: number): Promise<UserProgress | null> {
    return this.repository.findOne({
      where: { user_id }
    });
  }

  async create(user_id: number): Promise<UserProgress> {
    const userProgress = this.repository.create({ 
      user_id,
      current_streak: 0,
      longest_streak: 0,
      total_recordings: 0,
      total_practice_time_seconds: 0,
      level_points: 0
    });
    return this.repository.save(userProgress);
  }

  async updateStreak(user_id: number, isActive: boolean): Promise<UserProgress> {
    const userProgress = await this.findByUserId(user_id);
    
    if (!userProgress) {
      return this.create(user_id);
    }

    if (isActive) {
      userProgress.current_streak++;
      if (userProgress.current_streak > userProgress.longest_streak) {
        userProgress.longest_streak = userProgress.current_streak;
      }
    } else {
      userProgress.current_streak = 0;
    }

    userProgress.last_activity_date = new Date();
    return this.repository.save(userProgress);
  }

  async incrementPracticeTime(user_id: number, durationSeconds: number): Promise<UserProgress> {
    const userProgress = await this.findByUserId(user_id);
    
    if (!userProgress) {
      return this.create(user_id);
    }

    userProgress.total_practice_time_seconds += durationSeconds;
    userProgress.level_points += Math.floor(durationSeconds / 60); // 1 point per minute
    userProgress.total_recordings++;
    userProgress.last_activity_date = new Date();

    return this.repository.save(userProgress);
  }

  async resetDailyStreak(): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update(UserProgress)
      .set({ 
        current_streak: 0, 
        last_activity_date: null 
      })
      .where('last_activity_date < NOW() - INTERVAL 1 DAY')
      .execute();
  }
}
