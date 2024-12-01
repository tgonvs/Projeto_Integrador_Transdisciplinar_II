"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createAccountAddress } from "@/gateways/account-address.gateway";
import { CookiesKeys } from "@/types/cookies-keys.enum";

import { AxiosError } from "axios";
import { z } from "zod";

type State = {
  errors?: {
    zipcode?: string;
    address?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    favorite?: string;
    request?: string;
  };
};

const schema = z.object({
  zipcode: z
    .string()
    .regex(/^\d+$/, { message: "O CEP deve ter apenas números" })
    .length(8, { message: "O CEP deve conter 8 números" }),
  address: z
    .string()
    .min(3, { message: "O endereço deve conter no mínimo 3 letras" })
    .max(255, { message: "O endereço deve conter no máximo 255 letras" }),
  number: z.number(),
  complement: z.string().optional(),
  neighborhood: z
    .string()
    .min(1, { message: "O bairro deve conter no mínimo 1 letra" })
    .max(255, { message: "O bairro deve conter no máximo 255 letras" }),
  city: z
    .string()
    .min(3, { message: "O cidade deve conter no mínimo 3 letras" })
    .max(255, { message: "O cidade deve conter no máximo 255 letras" }),
  state: z.string().length(2, { message: "O estado deve conter 2 letras" }),
  favorite: z.boolean(),
});

export async function createAccountAddressAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const result = schema.safeParse({
    zipcode: formData.get("zipcode"),
    address: formData.get("address"),
    number: Number(formData.get("number")),
    complement: formData.get("complement"),
    neighborhood: formData.get("neighborhood"),
    city: formData.get("city"),
    state: formData.get("state"),
    favorite: Boolean(formData.get("favorite")),
  });

  if (!result.success) {
    return {
      errors: {
        zipcode: result.error.format().zipcode?._errors[0],
        address: result.error.format().address?._errors[0],
        number: result.error.format().number?._errors[0],
        complement: result.error.format().complement?._errors[0],
        neighborhood: result.error.format().neighborhood?._errors[0],
        city: result.error.format().city?._errors[0],
        state: result.error.format().state?._errors[0],
        favorite: result.error.format().favorite?._errors[0],
      },
    };
  }

  const accountCookie = cookies().get(CookiesKeys.accountId);
  if (!accountCookie)
    return {
      errors: {
        request:
          "Parece que você ainda não fez login, volte para o menu de conta e realize.",
      },
    };

  try {
    await createAccountAddress({
      ...result.data,
      accountId: Number(accountCookie.value),
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      return {
        errors: { request: err.response?.data?.message || err.message },
      };
    }
    if (err instanceof Error) {
      return {
        errors: { request: err.message },
      };
    }
    return { errors: { request: "Falha na requisição" } };
  }
  redirect(`/account/${accountCookie.value}`);
}
