import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const res = new Response(null, { status: 200 });
  // Security headers
  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: blob: https:",
    "script-src 'self' 'unsafe-inline' https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data: https:",
    "connect-src 'self' https://api.github.com https://api.resend.com https://www.google.com",
    "frame-src https://www.google.com",
    'upgrade-insecure-requests',
  ].join('; ');

  res.headers.set('Content-Security-Policy', csp);
  res.headers.set('Referrer-Policy', 'no-referrer');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  res.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

