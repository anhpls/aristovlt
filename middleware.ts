import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const storeClosed = process.env.STORE_CLOSED === "true";
  const passwordProtection = process.env.PASSWORD_PROTECTION === "true";

  // Allow `/approved` and `/return` routes
  if (url.pathname === "/approved" || url.pathname === "/return") {
    return NextResponse.next();
  }

  // Example: Redirect unauthenticated users
  const isLoggedIn = req.cookies.get("auth_token");
  if (!isLoggedIn && !url.pathname.startsWith("/login")) {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  // redirect to /closed if the store is closed
  if (storeClosed && !url.pathname.startsWith("/closed")) {
    return NextResponse.redirect(new URL("/closed", req.url));
  }

  // enforce password protection
  if (passwordProtection) {
    const accessGranted = req.cookies.get("accessGranted")?.value === "true";
    if (!accessGranted && url.pathname !== "/") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else if (url.pathname === "/") {
    // redirect to /home if password protection is disabled
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (url.pathname === "/approved" || url.pathname === "/return") {
    // Example condition: check for a specific header or referer
    const referer = req.headers.get("referer");
    if (!referer || !referer.includes("https://aristovlt.vercel.app/")) {
      return NextResponse.redirect(new URL("/home", req.url));
    }

    // Example condition: check for a specific session cookie
    const checkoutSession = req.cookies.get("checkoutSession")?.value;
    if (!checkoutSession) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");

  return response;
}

export const config = {
  matcher: [
    "/home",
    "/",
    "/collections",
    "/collections/:path*",
    "/closed",
    "/api/products",
    "/about",
    "/contact",
    "/return",
    "/approved",
  ],
};
