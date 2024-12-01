import { NextRequest, NextResponse } from "next/server";

import { listStore } from "@/gateways/store.gateway";

export async function GET(req: NextRequest) {
  const zipcode = req.nextUrl.searchParams.get("zipcode") ?? "";
  const [data] = await listStore({ servedZipcode: zipcode });

  return NextResponse.json(data);
}
