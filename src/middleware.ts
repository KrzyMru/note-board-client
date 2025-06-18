import { NextResponse, NextRequest } from "next/server";
 
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const path = request.nextUrl.pathname;

  const isAuthPage = path.endsWith("sign-in") || path.endsWith("sign-up");
  if(accessToken) {
    if(isAuthPage)
      return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  }
  else {
    if(isAuthPage)
      return NextResponse.next();
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }
}
 
export const config = {
  matcher: ["/dashboard", "/auth/sign-in", "/auth/sign-up"],
}