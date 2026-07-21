import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
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

	// Enable static rendering for this locale.
	setRequestLocale(locale);

	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<div className="flex min-h-screen flex-col">
				<Navbar />
				<main className="flex-1">{children}</main>
				<Footer />
			</div>
		</NextIntlClientProvider>
	);
}
