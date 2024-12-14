import { DATA_SOURCE, TOPIC_REPOSITORY } from '../../common/database/providers.constants';
import { Topic } from './topic.entity';
import { DataSource } from 'typeorm';

export const topicProviders = [
  {
    provide: TOPIC_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Topic),
    inject: [DATA_SOURCE],
  },
];
