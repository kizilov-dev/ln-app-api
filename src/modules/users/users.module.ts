import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AuthJwtModule } from '../auth/jwt.module';
import { DatabaseModule } from '../../common/database/database.module';
import { userProviders } from './users.providers';

@Module({
  imports: [
    DatabaseModule,
    AuthJwtModule,
  ],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
    UsersRepository
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
