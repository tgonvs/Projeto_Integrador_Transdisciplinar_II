export type RequestOptions = {
  params?: Record<string, string | number | boolean>;
  tag?: string;
};

export const api = {
  _parseParams(params?: RequestOptions["params"]) {
    if (!params) return "";
    return (
      "?" +
      new URLSearchParams(
        Object.fromEntries(
          Object.entries(params).map(([key, value]) => [key, String(value)])
        )
      ).toString()
    );
  },

  _parseResource(resource: string) {
    if (resource.startsWith("/")) return resource;
    return `/${resource}`;
  },

  async get<Response>(resource: string, options?: RequestOptions) {
    const res = await fetch(
      `${process.env.BACKEND_URL}${api._parseResource(
        resource
      )}${api._parseParams(options?.params)}`,
      {
        ...(options?.tag && {
          next: {
            tags: [options.tag],
          },
        }),
      }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    return (await res.json()) as Response;
  },

  async post<Response, Request = unknown>(
    resource: string,
    body?: Request,
    options?: RequestOptions
  ) {
    const res = await fetch(
      `${process.env.BACKEND_URL}${api._parseResource(
        resource
      )}${api._parseParams(options?.params)}`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    return (await res.json()) as Response;
  },

  async patch<Response, Request = unknown>(
    resource: string,
    body?: Request,
    options?: RequestOptions
  ) {
    const res = await fetch(
      `${process.env.BACKEND_URL}${api._parseResource(
        resource
      )}${api._parseParams(options?.params)}`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      }
    );
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }
    return (await res.json()) as Response;
  },
};

export interface PaginationDTO<T> {
  numberOfElements: number;
  totalElements: number;
  page: number;
  totalPages: number;
  hasContent: boolean;
  nextPage: boolean;
  previousPage: any;
  content: T[];
}
