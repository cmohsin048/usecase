// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;
  
  const protectedRoutes = ['/'];
  const publicRoutes = ['/login', '/register'];

  const isLoggedIn = req.cookies.get("isLoggedIn")?.value === "true";

  if (!isLoggedIn && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register']
};
