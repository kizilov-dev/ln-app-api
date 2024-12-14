import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthJwtModule } from './modules/auth/jwt.module';
import { TopicsModule } from './modules/topics/topics.module';
import { PhrasesModule } from './modules/phrases/phrases.module';
import { RecordingsModule } from './modules/recordings/recordings.module';
import { UserProgressModule } from './modules/user-progress/user-progress.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    AuthJwtModule,
    TopicsModule,
    PhrasesModule,
    RecordingsModule,
    UserProgressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
