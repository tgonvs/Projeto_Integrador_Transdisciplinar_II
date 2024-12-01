"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { findAccountByMail } from "@/gateways/account.gateway";
import { CookiesKeys } from "@/types/cookies-keys.enum";

import { z } from "zod";

type State = {
  errorMessage?: string;
};

const schema = z.string().email({ message: "Preencha um email válido" });

export async function findAccountByMailAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const result = schema.safeParse(formData.get("mail"));
  if (!result.success)
    return { errorMessage: result.error.format()._errors[0] };

  const account = await findAccountByMail(result.data);
  if (account) {
    cookies().set(CookiesKeys.accountId, `${account.id}`, { secure: true });
    redirect(`/account/${account.id}`);
  }
  return { errorMessage: "Ops!\nEmail não encontrado. 🥲" };
}
