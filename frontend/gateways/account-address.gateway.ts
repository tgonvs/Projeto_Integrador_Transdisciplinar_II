import { revalidateTag } from "next/cache";

import { AccountAddress } from "@/models/account-address.model";
import { CacheTag } from "@/types/cache-tag.enum";

import { api } from "./api";


export async function getAccountAddress(id: number) {
  const data = await api.get<AccountAddress>(`/client-address/${id}`, {
    tag: `${CacheTag.accountAddress}:${id}`,
  });
  return data;
}

export async function createAccountAddress({
  accountId,
  ...input
}: AccountAddressService.AccountAddressDTO) {
  const data = await api.post<AccountAddress>(
    `/client/${accountId}/address`,
    input
  );
  revalidateTag(`${CacheTag.account}:${accountId}`);
  return data;
}

export namespace AccountAddressService {
  export type AccountAddressDTO = {
    accountId: number;
    address: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    favorite: boolean;
  };
}
