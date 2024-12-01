import { PaginationResponseDTO } from 'src/modules/shared/dtos/pagination-response.dto';

import { ClientResponseDTO } from './client-response.dto';

export class ListClientResponseDTO extends PaginationResponseDTO<ClientResponseDTO> {
  content: ClientResponseDTO[];
}
