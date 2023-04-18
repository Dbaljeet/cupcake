import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

interface Data {
  token: string
  user: {
    email: string
    name: string
    role: string
  }
}

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (req.nextUrl.pathname.startsWith('/login') && session) {
    const url = req.nextUrl.clone()
    url.pathname = `/`
    return NextResponse.redirect(url)
  }
  if (req.nextUrl.pathname.startsWith('/register') && session) {
    const url = req.nextUrl.clone()
    url.pathname = `/`
    return NextResponse.redirect(url)
  }

  if (
    !session &&
    !req.nextUrl.pathname.startsWith('/login') &&
    !req.nextUrl.pathname.startsWith('/register')
  ) {
    const requestedPage = req.nextUrl.pathname
    const url = req.nextUrl.clone()
    url.pathname = `/login`
    url.search = `p=${requestedPage}`
    return NextResponse.redirect(url)
  }

  const validRoles = ['admin']

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/admin')) {
    if (!validRoles.includes(session.user.role)) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/checkout/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
    '/login/:path*',
    '/register/:path*',
    '/orders/history/:path*',
  ],
}
