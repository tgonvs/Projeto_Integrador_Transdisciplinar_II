import { PaginationResponseDTO } from 'src/modules/shared/dtos/pagination-response.dto';

import { StoreResponseDTO } from './store-response.dto';

export class ListStoreResponseDTO extends PaginationResponseDTO<StoreResponseDTO> {
  content: StoreResponseDTO[];
}
