import { 
  Controller, 
  Get, 
  Param, 
  ParseIntPipe,
  Query 
} from '@nestjs/common';
import { UserProgressService } from './user-progress.service';

@Controller('user-progress')
export class UserProgressController {
  constructor(private readonly userProgressService: UserProgressService) {}

  @Get(':userId')
  async getUserProgress(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProgressService.getUserProgress(userId);
  }

  @Get(':userId/level')
  async getUserLevel(@Param('userId', ParseIntPipe) userId: number) {
    return this.userProgressService.calculateUserLevel(userId);
  }

  @Get('leaderboard')
  async getLeaderboard(@Query('limit') limit?: number) {
    return this.userProgressService.getLeaderboard(limit);
  }
}
