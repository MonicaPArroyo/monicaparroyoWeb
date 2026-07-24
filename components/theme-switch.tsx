'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from '@/components/icons';
import { iconButtonClass } from '@/components/ui';

export function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	// Theme is unknown during SSR — reserve space until mounted to avoid a flash.
	useEffect(() => setMounted(true), []);

	if (!mounted) return <div aria-hidden className="size-9" />;

	const isDark = resolvedTheme === 'dark';

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? 'light' : 'dark')}
			aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
			className={iconButtonClass}
		>
			{isDark ? <SunIcon /> : <MoonIcon />}
		</button>
	);
}
