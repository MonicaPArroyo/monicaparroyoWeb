import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next.js 16 renamed `middleware` → `proxy`. next-intl's helper is unchanged.
export default createMiddleware(routing);

export const config = {
	// Match all pathnames except for API routes, Next internals and static files.
	matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
