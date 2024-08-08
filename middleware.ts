import { auth } from "./app/lib/auth/auth"

export default auth((req) => {
  if(!req.auth && req.nextUrl.pathname !== process.env.LOGIN_PAGE){
    const newUrl = new URL(process.env.LOGIN_PAGE ?? '', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

// maybe macther is '/dashboard/:path*'
export const config = {matcher: ['/dashboard/:path*']}