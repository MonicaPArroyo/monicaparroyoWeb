import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { Providers } from '@/app/providers';
import { PageDecor } from '@/components/page-decor';
import '@/styles/globals.css';

// Single typeface across the whole site (matches the Figma).
const firaCode = Fira_Code({
	subsets: ['latin'],
	variable: '--font-fira',
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL('https://monicaparroyo.vercel.app'),
	title: {
		default: 'Mónica P. Arroyo | Frontend Developer',
		template: '%s | Mónica P. Arroyo',
	},
	description:
		'Frontend Developer especializada en Next.js, TypeScript, React y PHP/Laravel. Transformando líneas de código en oportunidades para el futuro.',
	creator: 'Mónica Pamela Arroyo Montiel',
	keywords: ['Next.js', 'React', 'TypeScript', 'Frontend', 'Laravel', 'Arduino'],
};

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const locale = await getLocale();

	return (
		<html
			lang={locale}
			suppressHydrationWarning
			className={firaCode.variable}
		>
			<body className="min-h-screen bg-background font-sans text-foreground antialiased">
				<PageDecor />
				<Providers>{children}</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
