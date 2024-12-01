import { Account } from "@/models/account.mode";
import { CacheTag } from "@/types/cache-tag.enum";

import { getAccountAddress } from "./account-address.gateway";
import { PaginationDTO, api } from "./api";


export async function createAccount(input: AccountService.AccountDTO) {
  const data = await api.post<Account>("/client", input);
  return data;
}

export async function getAccount(id: number) {
  const data = await api.get<Account>(`/client/${id}`, {
    tag: `${CacheTag.account}:${id}`,
  });
  return data;
}

export async function getAccountFavoriteAddress(accountId: number) {
  const account = await getAccount(accountId);
  if (account.favoriteAddressId)
    return await getAccountAddress(account.favoriteAddressId);
}

export async function findAccountByMail(email: string) {
  const data = await api.get<PaginationDTO<Account>>(`/client`, {
    params: { email },
  });
  return data.content[0];
}

export async function updateAccount({
  id,
  ...data
}: Partial<AccountService.AccountDTO> & { id: number }) {
  const client = await api.patch<Account>(`/client/${id}`, data);
  return client;
}

export namespace AccountService {
  export type AccountDTO = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
}
