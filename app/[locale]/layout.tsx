import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/app/providers';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { PageDecor } from '@/components/page-decor';
import { SocialRail } from '@/components/social-rail';
import { routing } from '@/i18n/routing';

// Single typeface across the whole site (matches the Figma). Only the weights
// actually used (400/500/600/700) — 300 was unused.
const firaCode = Fira_Code({
	subsets: ['latin'],
	variable: '--font-fira',
	weight: ['400', '500', '600', '700'],
	display: 'swap',
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'metadata' });
	return {
		description: t('description'),
		alternates: {
			canonical: `/${locale}`,
			languages: { es: '/es', en: '/en' },
		},
		openGraph: {
			title: t('title'),
			description: t('description'),
			locale: locale === 'es' ? 'es_MX' : 'en_US',
			type: 'website',
			images: [
				{
					url: '/og.png',
					width: 1006,
					height: 600,
					alt: 'Mónica P. Arroyo — Frontend Developer',
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			images: ['/og.png'],
		},
	};
}

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();

	// Locale comes from params (not headers) → the tree can render statically.
	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning className={firaCode.variable}>
			<body className="min-h-screen bg-background font-sans text-foreground antialiased">
				<PageDecor />
				<Providers>
					<NextIntlClientProvider messages={messages}>
						<div className="relative z-10 flex min-h-screen flex-col">
							<Navbar />
							<SocialRail />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
					</NextIntlClientProvider>
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
