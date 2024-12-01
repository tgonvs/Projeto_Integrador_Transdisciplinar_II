import { faker } from '@faker-js/faker';

export function makeRequestHeadersMock(input?: object): object {
  return {
    Authorization: `Bearer ${faker.string.sample(32)}`,
    'app-version': faker.system.semver(),
    'site-origin': faker.string.sample(16),
    ...input,
  };
}
