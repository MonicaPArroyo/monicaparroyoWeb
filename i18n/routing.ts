import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
	// Spanish first — Mónica's primary audience
	locales: ['es', 'en'],
	defaultLocale: 'es',
});

export type Locale = (typeof routing.locales)[number];
