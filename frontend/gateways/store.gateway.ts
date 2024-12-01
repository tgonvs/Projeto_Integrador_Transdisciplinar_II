import { PaginationDTO, api } from "@/gateways/api";
import { Store } from "@/models/store.model";

export async function listStore(
  input?: StoreService.ListCupcakesInput
): Promise<Store[]> {
  const data = await api.get<PaginationDTO<Store>>("/store", {
    params: {
      page: 1,
      size: 25,
      ...input,
    },
  });
  return data.content;
}
export namespace StoreService {
  export interface ListCupcakesInput {
    servedZipcode: string;
  }
}
