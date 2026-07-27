import type { Metadata } from 'next';
import '@/styles/globals.css';

// Passthrough root layout: the <html>/<body> shell lives in app/[locale]/layout.tsx
// so the locale comes from route params (not headers) — that's what lets the whole
// tree render statically. Only global metadata + the global stylesheet live here.
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

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return children;
}
