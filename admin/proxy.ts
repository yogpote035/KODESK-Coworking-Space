import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || request.nextUrl.pathname === "/login")
    return NextResponse.next();
  let response = NextResponse.next({ request });
  const client = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (cookies) => {
        cookies.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookies.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });
  const authResult = await Promise.race([
    client.auth.getUser(),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
  ]);
  const user = authResult?.data.user;
  if (!user)
    return NextResponse.redirect(new URL("/login", request.url));
  if (user) {
    const { data: profile } = await client.from("admin_profiles").select("role,is_active").eq("id", user.id).maybeSingle();
    if (profile?.role !== "admin" || !profile.is_active) return NextResponse.redirect(new URL("/login", request.url));
  }
  if (user && request.nextUrl.pathname === "/login")
    return NextResponse.redirect(new URL("/dashboard", request.url));
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/editor/:path*",
    "/content/:path*",
    "/enquiries/:path*",
    "/pricing/:path*",
    "/media/:path*",
    "/services/:path*",
    "/settings/:path*",
    "/sections/:path*",
    "/quality/:path*",
    "/revisions/:path*",
    "/redirects/:path*",
    "/media-audit/:path*",
    "/login",
  ],
};
