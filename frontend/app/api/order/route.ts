import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { createOrder } from "@/gateways/order.gateway";
import { CookiesKeys } from "@/types/cookies-keys.enum";

export async function POST(req: Request) {
  const account = cookies().get(CookiesKeys.accountId);
  const body = await req.json();
  await createOrder({ ...body, accountId: account?.value });
  return NextResponse.json({}, { status: 201 });
}
