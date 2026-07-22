import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { Providers } from '@/app/providers';
import '@/styles/globals.css';

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
	display: 'swap',
});

const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains',
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
			className={`${inter.variable} ${jetbrains.variable}`}
		>
			<body className="min-h-screen bg-background font-sans text-foreground antialiased">
				<Providers>{children}</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
