import { Command, CommandInput } from 'src/modules/shared/abstractions/command';

export function CommandEventHandler(extraDataKey: string) {
  return function (
    _target: Command,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ): void {
    const oldFunc = descriptor.value;
    descriptor.value = async function (arg: CommandInput): Promise<unknown> {
      try {
        const response = await oldFunc.apply(this, [arg]);
        this.eventService.log({
          extraData: arg.input[extraDataKey],
          data: arg.eventData,
          resource: this.constructor.name,
          ...(response && { response }),
          message: 'success',
        });
        return response;
      } catch (error) {
        this.eventService.error(
          {
            extraData: arg.input[extraDataKey],
            data: arg.eventData,
            resource: this.constructor.name,
          },
          error,
        );
        throw error;
      }
    };
  };
}
