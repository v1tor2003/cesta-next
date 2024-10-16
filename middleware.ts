import { auth } from "./app/lib/auth/auth"

export default auth((req) => {
  if(!req.auth && req.nextUrl.pathname !== process.env.LOGIN_PAGE){
    const home = process.env.LOGIN_PAGE 
    if(!home) throw new Error('Could not loud home page.')
    const newUrl = new URL(home, req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {matcher: ['/dashboard/:path*']}