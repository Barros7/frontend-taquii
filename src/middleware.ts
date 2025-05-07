import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's an admin route
  if (pathname.startsWith('/admin')) {
    try {
      // Get the session token
      const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
      
      if (!token) {
        // Redirect to login if not authenticated
        return NextResponse.redirect(new URL('/login', request.url));
      }

      const userType = token.userType as string;

      // Redirect to the correct area based on user type
      if (pathname === '/admin') {
        if (userType === 'ADMIN') {
          return NextResponse.redirect(new URL('/admin/sysadmin', request.url));
        } else {
          return NextResponse.redirect(new URL('/admin/provider', request.url));
        }
      }

      // Check specific permissions
      if (pathname.startsWith('/admin/sysadmin') && userType !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/provider', request.url));
      }

      if (pathname.startsWith('/admin/provider') && userType !== 'PROVIDER') {
        return NextResponse.redirect(new URL('/admin/sysadmin', request.url));
      }

      // Add security headers
      const response = NextResponse.next();
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
      
      return response;
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/error', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ],
}; 