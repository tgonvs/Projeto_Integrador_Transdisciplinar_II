"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createAccount } from "@/gateways/account.gateway";
import { CookiesKeys } from "@/types/cookies-keys.enum";

import { z } from "zod";

type State = {
  errors?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    request?: string;
  };
};

const schema = z.object({
  email: z.string().email({ message: "Email invalido!" }),
  firstName: z
    .string()
    .regex(/^([A-Za-z])+$/, {
      message: "Nome deve conter apenas lesta sem espaço",
    })
    .min(3, { message: "O Nome deve conter no mínimo 3 letras" })
    .max(32, { message: "O Nome deve conter no máximo 32 letras" }),
  lastName: z
    .string()
    .regex(/^([A-Za-z])+$/, {
      message: "Sobrenome deve conter apenas lesta sem espaço",
    })
    .min(3, { message: "O Nome deve conter no mínimo 3 letras" })
    .max(32, { message: "O Nome deve conter no máximo 32 letras" }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Telefone deve ter apenas números" })
    .length(11, {
      message: "Telefone precisa ter 11 dígitos com o DDD ex: 51978978978",
    }),
});

export async function createAccountAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const result = schema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
  });

  if (!result.success) {
    return {
      errors: {
        email: result.error.format().email?._errors[0],
        firstName: result.error.format().firstName?._errors[0],
        lastName: result.error.format().lastName?._errors[0],
        phone: result.error.format().phone?._errors[0],
      },
    };
  }

  let accountId = 0;
  try {
    const account = await createAccount(result.data);
    accountId = account.id;
    cookies().set(CookiesKeys.accountId, `${account.id}`, { secure: true });
  } catch (err) {
    if (err instanceof Error) {
      return {
        errors: { request: err.message },
      };
    }
    return { errors: { request: "Falha na requisição" } };
  }

  redirect(`/account${accountId ? `/${accountId}` : ""}`);
}
