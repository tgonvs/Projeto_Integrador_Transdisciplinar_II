import { AppEnvironment } from '../enums/app-environment';

export const DefaultConfiguration = {
  [AppEnvironment.nodeEnv]: 'production',
  [AppEnvironment.dbLogging]: 'false',
};
