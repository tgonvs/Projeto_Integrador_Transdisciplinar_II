import { NextResponse } from "next/server";

import { listCupcakes } from "@/gateways/cupcake.gateway";

export async function GET() {
  const data = await listCupcakes();

  return NextResponse.json(data);
}
