export abstract class PaginationResponseDTO<ContentDTO> {
  numberOfElements: number;
  totalElements: number;
  page: number;
  totalPages: number;
  hasContent: boolean;
  nextPage?: number;
  previousPage?: number;
  abstract content: ContentDTO[];
}
