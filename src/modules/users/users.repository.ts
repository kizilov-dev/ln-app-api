import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterDto } from './users.dto';
import { USER_REPOSITORY } from '../../common/database/providers.constants';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly repository: Repository<User>,
  ) {}

  async findByEmailOrUsername(email: string, username: string): Promise<User | null> {
    return this.repository.findOne({
        where: [
          { email },
          { username },
        ],
      });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      select: ['id', 'username', 'email', 'target_language', 'created_at'],
    });
  }

  async create(data: RegisterDto, hashedPassword: string): Promise<User> {
    const user = this.repository.create({
      ...data,
      password_hash: hashedPassword,
    });
    return this.repository.save(user);
  }
}
