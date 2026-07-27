import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Conservative security headers applied to every route. These are all safe for a
// static/SSR Next app — we intentionally do NOT set a script-src CSP here, which
// would require nonces and an allowlist for Vercel Analytics; framing is locked
// down via frame-ancestors instead.
const securityHeaders = [
	{ key: 'X-Content-Type-Options', value: 'nosniff' },
	{ key: 'X-Frame-Options', value: 'DENY' },
	{ key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
	{ key: 'Content-Security-Policy', value: "frame-ancestors 'none'" },
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
	},
	async headers() {
		return [{ source: '/:path*', headers: securityHeaders }];
	},
};

export default withNextIntl(nextConfig);
