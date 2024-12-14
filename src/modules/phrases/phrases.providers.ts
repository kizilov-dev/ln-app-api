import { DATA_SOURCE, PHRASE_REPOSITORY } from '../../common/database/providers.constants';
import { Phrase } from './phrase.entity';
import { DataSource } from 'typeorm';

export const phraseProviders = [
  {
    provide: PHRASE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Phrase),
    inject: [DATA_SOURCE],
  },
];
