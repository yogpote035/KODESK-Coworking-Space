import { NextResponse } from "next/server";
import { getPublicCmsData } from "@/lib/cms/public";

export async function GET() {
  const data = await getPublicCmsData();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store, max-age=0" } });
}
