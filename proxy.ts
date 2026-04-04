import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const publicRoutes = ['/login', '/daftar'];

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isLoggedIn = !!token;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl));
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Middleware aktif di SEMUA route, KECUALI yang dimulai dengan:
     *
     * 1. api/auth          → Endpoint NextAuth (session, signin, signout, csrf)
     *                        Wajib diexclude agar NextAuth tetap return JSON, bukan HTML
     *  
     * 2. _next/static      → Asset statis hasil build (JS, CSS, fonts)
     *
     * 3. _next/image       → Endpoint optimasi gambar bawaan Next.js
     *
     * 4. favicon.ico       → Icon tab browser
     *
     * 5. login             → Halaman login (publik, tidak perlu auth)
     *
     * 6. register          → Halaman register (publik, tidak perlu auth)
     *
     * 7. .*\\.[\w]+$       → File apapun yang punya ekstensi
     *                        Contoh: .png .jpg .svg .webp .ico .css .js
     *                        Ini mencegah redirect pada gambar/aset di folder /public
     */
    '/((?!api/auth|_next/static|_next/image|favicon\\.ico|login|register|.*\\.[\\w]+$).*)',
  ],
};
