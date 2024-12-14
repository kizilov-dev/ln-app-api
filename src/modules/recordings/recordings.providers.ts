import { DATA_SOURCE, RECORDING_REPOSITORY } from '../../common/database/providers.constants';
import { Recording } from './recording.entity';
import { DataSource } from 'typeorm';

export const recordingProviders = [
  {
    provide: RECORDING_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Recording),
    inject: [DATA_SOURCE],
  },
];
