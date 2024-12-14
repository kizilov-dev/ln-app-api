import { Injectable, NotFoundException } from '@nestjs/common';
import { UserProgressRepository } from './user-progress.repository';
import { UserProgress } from './user-progress.entity';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserProgressService {
  constructor(
    private readonly userProgressRepository: UserProgressRepository,
  ) {}

  async getUserProgress(user_id: number): Promise<UserProgress> {
    const userProgress = await this.userProgressRepository.findByUserId(user_id);
    if (!userProgress) {
      return this.userProgressRepository.create(user_id);
    }
    return userProgress;
  }

  async incrementPracticeTime(user_id: number, duration_seconds: number): Promise<UserProgress> {
    return this.userProgressRepository.incrementPracticeTime(user_id, duration_seconds);
  }

  async updateStreak(user_id: number, isActive: boolean): Promise<UserProgress> {
    return this.userProgressRepository.updateStreak(user_id, isActive);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async resetDailyStreak(): Promise<void> {
    await this.userProgressRepository.resetDailyStreak();
  }

  async calculateUserLevel(user_id: number): Promise<number> {
    const userProgress = await this.getUserProgress(user_id);
    
    // Simple leveling system: 1 level per 100 points
    return Math.floor(userProgress.level_points / 100) + 1;
  }

  async getLeaderboard(limit: number = 10): Promise<UserProgress[]> {
    return this.userProgressRepository.repository.find({
      order: {
        level_points: 'DESC'
      },
      take: limit
    });
  }
}
