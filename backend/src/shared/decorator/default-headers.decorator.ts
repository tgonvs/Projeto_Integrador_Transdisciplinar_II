import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DefaultHeaders = createParamDecorator(
  (
    keys: string[] = ['Authorization', 'app-version', 'site-origin'],
    ctx: ExecutionContext,
  ): Record<string, string> => {
    const { headers } = ctx.switchToHttp().getRequest();
    return keys
      .map((key) => key.toLowerCase())
      .reduce((agg, key) => {
        const value = headers[key];
        return { ...agg, ...(value && { [key]: value }) };
      }, {});
  },
);
