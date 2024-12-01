import { PaginationDTO, api } from "@/gateways/api";
import { Category } from "@/models/category.model";
import { Cupcake } from "@/models/cupcake.model";

export async function listCupcakes(
  input?: CupcakeService.ListCupcakesInput
): Promise<Cupcake[]> {
  const data = await api.get<PaginationDTO<CupcakeService.CupcakeDTO>>(
    "/cupcake",
    {
      params: {
        page: 1,
        size: 25,
        ...input,
      },
    }
  );
  return data.content.map((cupcake) => Cupcake.create(cupcake));
}

export async function listCupcakesCategories(): Promise<Category[]> {
  const data = await api.get<PaginationDTO<CupcakeService.CategoryDTO>>(
    "/cupcake/category",
    {
      params: {
        page: 1,
        size: 25,
      },
    }
  );
  return data.content;
}

export async function getCategory(categoryId: number): Promise<Category> {
  const data = await api.get<PaginationDTO<CupcakeService.CategoryDTO>>(
    "/cupcake/category",
    {
      params: {
        page: 1,
        size: 25,
      },
    }
  );
  return data.content.find(
    ({ id }) => id === categoryId
  ) as CupcakeService.CategoryDTO;
}

export namespace CupcakeService {
  export type CupcakeDTO = {
    id: number;
    name: string;
    description: string;
    ingredients: string;
    value: string;
    image: string;
    categories: CategoryDTO[];
  };

  export interface CategoryDTO {
    id: number;
    name: string;
    description: string;
    image: string;
  }

  export interface ListCupcakesInput {
    categoryId?: number;
  }
}
