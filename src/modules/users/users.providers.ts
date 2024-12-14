import { DATA_SOURCE, USER_REPOSITORY } from "src/common/database/providers.constants";
import { User } from "src/modules/users/user.entity";
import { DataSource } from "typeorm";

export const userProviders = [
    {
      provide: USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DATA_SOURCE],
    },
  ];