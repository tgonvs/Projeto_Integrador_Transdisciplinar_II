import { PaginationResponseDTO } from 'src/modules/shared/dtos/pagination-response.dto';

import { CupcakeResponseDTO } from './cupcake-response.dto';

export class ListCupcakeResponseDTO extends PaginationResponseDTO<CupcakeResponseDTO> {
  content: CupcakeResponseDTO[];
}
