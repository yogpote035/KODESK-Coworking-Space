import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next();
  let response = NextResponse.next({ request });
  const client = createServerClient(url, key, { cookies: { getAll: () => request.cookies.getAll(), setAll: (cookies) => { cookies.forEach(({ name, value }) => request.cookies.set(name, value)); response = NextResponse.next({ request }); cookies.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); } } });
  const { data: { user } } = await client.auth.getUser();
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) return NextResponse.redirect(new URL("/login", request.url));
  if (user && request.nextUrl.pathname === "/login") return NextResponse.redirect(new URL("/dashboard", request.url));
  return response;
}

export const config = { matcher: ["/dashboard/:path*", "/enquiries/:path*", "/pricing/:path*", "/media/:path*", "/services/:path*", "/settings/:path*", "/login"] };
