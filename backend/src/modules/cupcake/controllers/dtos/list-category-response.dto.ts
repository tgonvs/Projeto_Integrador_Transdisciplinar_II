import { PaginationResponseDTO } from 'src/modules/shared/dtos/pagination-response.dto';

import { CategoryResponseDTO } from './category-response.dto';

export class ListCategoryResponseDTO extends PaginationResponseDTO<CategoryResponseDTO> {
  content: CategoryResponseDTO[];
}
