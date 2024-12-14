import { DATA_SOURCE, USER_PROGRESS_REPOSITORY } from '../../common/database/providers.constants';
import { UserProgress } from './user-progress.entity';
import { DataSource } from 'typeorm';

export const userProgressProviders = [
  {
    provide: USER_PROGRESS_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserProgress),
    inject: [DATA_SOURCE],
  },
];
