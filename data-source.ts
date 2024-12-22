import { DataSource } from 'typeorm';
import { Phrase } from './src/modules/phrases/phrase.entity';
import { Topic } from './src/modules/topics/topic.entity';
import { UserProgress } from './src/modules/user-progress/user-progress.entity';
import { Recording } from './src/modules/recordings/recording.entity';
import { User } from './src/modules/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USERNAME || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
  database: process.env.DATABASE_NAME || 'language_learning_app',
  entities: [User, Recording, Phrase, Topic, UserProgress],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true,
  charset: 'utf8mb4',
});
