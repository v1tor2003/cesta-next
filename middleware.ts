import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req){
    if(
      req.nextUrl.pathname.startsWith('/dashboard') &&
      !req.nextauth.token
    ) return NextResponse.rewrite(new URL('/auth/login', req.url))
  },
  {
    callbacks: {
      authorized: ({token}) => !!token
    }
  } 
)

// maybe macther is '/dashboard/:path*'
export const config = {matcher: ['/dashboard/:path*']}