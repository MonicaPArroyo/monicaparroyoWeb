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
			disableTransitionOnChange
			{...themeProps}
		>
			{children}
		</NextThemesProvider>
	);
}
