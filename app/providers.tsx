'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

/**
 * HeroUI v3 needs NO provider — theming is pure CSS variables read from <html>.
 * We only wrap next-themes so users can toggle / persist light–dark.
 */
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
