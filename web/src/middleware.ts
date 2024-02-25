import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./app/utils/isAuthenticated";

const protectedRoutes = "/dashboard";

export default async function middleware(req: NextRequest) {
  const result = await isAuthenticated();

  if (result !== true && req.nextUrl.pathname.includes(protectedRoutes)) {
    const absoluteURL = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
