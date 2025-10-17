import { NextResponse } from "next/server";
import { auth } from "@src/libs";
import { PublicPaths, SharedPaths, SharedWildcardPaths } from "@src/config";

export const middleware = auth((request) => {
  const isAuthenticated = !!request.auth?.user?.id;
  const pathname = request.nextUrl.pathname;

  if (
    !isAuthenticated &&
    !SharedPaths.has(pathname) &&
    !SharedWildcardPaths.find((swp) => pathname.includes(swp)) &&
    !PublicPaths.has(pathname)
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  } else if (
    isAuthenticated &&
    PublicPaths.has(pathname) &&
    !SharedWildcardPaths.find((swp) => pathname.includes(swp)) &&
    !SharedPaths.has(pathname)
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/*).*)"],
};
