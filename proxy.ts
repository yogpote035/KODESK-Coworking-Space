import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const pathname = request.nextUrl.pathname;
  if (!url || !key || pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) return NextResponse.next();
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data } = await client.from("redirect_rules").select("destination_path,status_code").eq("source_path", pathname).eq("is_active", true).maybeSingle();
  if (!data || data.destination_path === pathname) return NextResponse.next();
  return NextResponse.redirect(new URL(data.destination_path, request.url), data.status_code);
}

export const config = { matcher: ["/:path*"] };
