import { Module, forwardRef } from '@nestjs/common';

import { ClientModule } from '../client/client.module';
import { CreateClientAddressCommand } from './controllers/create/create.command';
import { CreateClientAddressController } from './controllers/create/create.controller';
import { GetClientAddressByIdCommand } from './controllers/get-by-id/get-by-id.command';
import { GetClientAddressByIdController } from './controllers/get-by-id/get-by-id.controller';
import { ListClientAddressCommand } from './controllers/list/list.command';
import { ListClientAddressController } from './controllers/list/list.controller';
import { UpdateClientAddressCommand } from './controllers/update/update.command';
import { UpdateClientAddressController } from './controllers/update/update.controller';
import { ClientAddressRepository } from './gateways/client-address-repository.gateway';
import { ValidateClientAddressService } from './services/validate-client-address.service';

@Module({
  imports: [forwardRef(() => ClientModule)],
  controllers: [
    CreateClientAddressController,
    GetClientAddressByIdController,
    ListClientAddressController,
    UpdateClientAddressController,
  ],
  providers: [
    ClientAddressRepository,
    CreateClientAddressCommand,
    GetClientAddressByIdCommand,
    ListClientAddressCommand,
    UpdateClientAddressCommand,
    ValidateClientAddressService,
  ],
  exports: [ClientAddressRepository, ValidateClientAddressService],
})
export class ClientAddressModule {}
