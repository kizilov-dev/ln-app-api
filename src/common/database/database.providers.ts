import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './providers.constants';
import { User } from '../../modules/users/user.entity';
import { Topic } from '../../modules/topics/topic.entity';
import { Phrase } from '../../modules/phrases/phrase.entity';
import { Recording } from '../../modules/recordings/recording.entity';
import { UserProgress } from '../../modules/user-progress/user-progress.entity';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT || '3306', 10),
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || 'root',
        database: process.env.DATABASE_NAME || 'language_learning_app',
        entities: [User, Topic, Phrase, Recording, UserProgress],
        migrations: ["dist/migrations/*{.ts,.js}"],
        synchronize: process.env.NODE_ENV === 'development',
      });

      return dataSource.initialize(); 
    },
  },
];