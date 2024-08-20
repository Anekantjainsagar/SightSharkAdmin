import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // if (pathname === "/") {
  if (pathname) {
    return NextResponse.next();
  }

  const cookies = request.headers.get("cookie") || "";
  if (cookies) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
