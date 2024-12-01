import { Injectable } from '@nestjs/common';

export interface ResultWithPagination<T = unknown> {
  numberOfElements: number;
  totalElements: number;
  page: number;
  totalPages: number;
  hasContent: boolean;
  nextPage?: number;
  previousPage?: number;
  content: T[];
}

export type RepositoryPaginationInput = {
  page: number;
  size: number;
};

export type WhereWithPagination<Where> = Where &
  Partial<RepositoryPaginationInput>;

@Injectable()
export abstract class RepositoryPagination<T> {
  protected parsePaginationInput({ page, size }: RepositoryPaginationInput): {
    skip: number;
    take: number;
  } {
    const parsedPage = page - 1;
    const skip = parsedPage < 1 ? 0 : size * parsedPage;
    const take = size;
    return { skip, take };
  }

  protected parsePaginationOutput({
    page,
    size,
    count,
    content,
  }): ResultWithPagination<T> {
    const totalPages = Math.ceil(count / size);
    return {
      numberOfElements: content.length,
      totalElements: count,
      page: page < 1 ? 1 : page,
      totalPages,
      hasContent: Boolean(content.length),
      nextPage: page < totalPages ?? page + 1,
      previousPage: page > 1 ? page - 1 : null,
      content,
    };
  }
}
