import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAccountFavoriteAddress } from "@/gateways/account.gateway";
import { CookiesKeys } from "@/types/cookies-keys.enum";

export async function GET() {
  const account = cookies().get(CookiesKeys.accountId);
  if (!account)
    return NextResponse.json(
      { error: "Endereço favorito não encontrado" },
      { status: 404 }
    );
  try {
    const address = await getAccountFavoriteAddress(Number(account.value));
    if (!account)
      return NextResponse.json(
        { error: "Endereço favorito não encontrado" },
        { status: 404 }
      );
    return NextResponse.json(address);
  } catch (err) {
    return NextResponse.json(
      { error: "Endereço favorito não encontrado" },
      { status: 404 }
    );
  }
}
