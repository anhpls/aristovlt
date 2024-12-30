import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const storeClosed = process.env.STORE_CLOSED === "true";
  const passwordProtection = process.env.PASSWORD_PROTECTION === "true";

  if (storeClosed && !url.pathname.startsWith("/closed")) {
    return NextResponse.redirect(new URL("/closed", req.url));
  }

  if (passwordProtection) {
    const accessGranted = req.cookies.get("accessGranted")?.value === "true";
    if (!accessGranted && url.pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/home", "/", "/collections", "/collections/:path*", "/closed"],
};
