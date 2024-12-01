/* eslint-disable @typescript-eslint/no-var-requires */
const isCi = process.env.CI !== undefined;
if (!isCi) {
  import('husky').then((_package) => _package.install());
}
