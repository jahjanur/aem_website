import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Run on every path except API routes, Next.js internals, and files with an extension
  // (e.g. /favicon.ico) — otherwise unprefixed routes for the default locale (mk) 404,
  // since the middleware never gets a chance to rewrite them to a locale-aware path.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
