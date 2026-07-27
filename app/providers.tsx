'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

export function Providers({
	children,
	...themeProps
}: { children: React.ReactNode } & Partial<ThemeProviderProps>) {
	return (
		<NextThemesProvider
			attribute="class"
			defaultTheme="dark"
			enableSystem={false}
			disableTransitionOnChange
			{...themeProps}
		>
			{children}
		</NextThemesProvider>
	);
}
