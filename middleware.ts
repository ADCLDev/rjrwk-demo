// middleware.ts
import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
 function middleware(req) {
   const token = req.nextauth.token
   const isAuth = !!token
   const { pathname } = req.nextUrl

   // Allow auth endpoints
   if (pathname.startsWith('/api/auth')) {
     return NextResponse.next()
   }

   // Handle role-based access
   if (isAuth) {
     const userRole = token.role as string

     if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
       return NextResponse.redirect(new URL('/dashboard', req.url))
     }

     if (pathname.startsWith('/buyer') && !['BUYER', 'ADMIN'].includes(userRole)) {
       return NextResponse.redirect(new URL('/dashboard', req.url))
     }

     if (pathname.startsWith('/manufacturer') && !['MANUFACTURER', 'ADMIN'].includes(userRole)) {
       return NextResponse.redirect(new URL('/dashboard', req.url))
     }
   }

   return NextResponse.next()
 },
 {
   callbacks: {
     authorized({ req, token }) {
       const { pathname } = req.nextUrl
       
       // Public routes
       if (pathname.startsWith('/api/auth')) return true
       
       // Auth required for all other routes
       return !!token
     },
   },
 }
)

export const config = {
 matcher: [
   '/dashboard/:path*',
   '/admin/:path*', 
   '/buyer/:path*',
   '/manufacturer/:path*',
   '/settings/:path*',
   '/api/:path*'
 ]
}