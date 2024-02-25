import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./app/utils/isAuthenticated";

const protectedRoutes = ["/dashboard", "/dashboard/edit", "/dashboard/posts"];

export default async function middleware(req: NextRequest) {
  const result = await isAuthenticated();

  if (result !== true && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/signin", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
