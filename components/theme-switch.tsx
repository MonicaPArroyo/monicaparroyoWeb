'use client';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MoonIcon, SunIcon } from '@/components/icons';
import { iconButtonClass } from '@/components/ui';

type ToastData = { kind: 'light' | 'dark'; msg: string };

export function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();
	const t = useTranslations('theme');

	const [toast, setToast] = useState<ToastData | null>(null);
	const [shown, setShown] = useState(false);
	const [barKey, setBarKey] = useState(0);
	const idx = useRef<{ light: number; dark: number }>({ light: 0, dark: 0 });
	const hideRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// Theme is unknown during SSR — reserve space until mounted to avoid a flash.
	useEffect(() => setMounted(true), []);
	useEffect(() => () => clearTimeout(hideRef.current), []);

	if (!mounted) return <div aria-hidden className="size-9" />;

	const isDark = resolvedTheme === 'dark';

	function toggle() {
		const next = isDark ? 'light' : 'dark';
		setTheme(next);

		// Rotate through the 3 phrases for that direction (the dev in-joke).
		const list = t.raw(next) as string[];
		const i = idx.current[next] % list.length;
		idx.current[next] = i + 1;

		setToast({ kind: next, msg: list[i] });
		setShown(true);
		setBarKey((k) => k + 1);
		clearTimeout(hideRef.current);
		hideRef.current = setTimeout(() => setShown(false), 4000);
	}

	// Red for the "light" warning, green for the "dark" thank-you.
	const accent = toast?.kind === 'light' ? 'var(--danger)' : 'var(--success)';

	return (
		<>
			<button
				type="button"
				onClick={toggle}
				aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
				className={iconButtonClass}
			>
				{isDark ? <SunIcon /> : <MoonIcon />}
			</button>

			{toast &&
				createPortal(
					<div
						role="status"
						aria-live="polite"
						style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
						className={clsx(
							'fixed bottom-4 left-4 z-[60] w-[min(340px,calc(100vw-2rem))] overflow-hidden rounded-lg border border-separator bg-surface p-3 pr-8 font-mono shadow-xl transition-all duration-200',
							shown
								? 'translate-y-0 opacity-100'
								: 'pointer-events-none translate-y-2 opacity-0',
						)}
					>
						<button
							type="button"
							onClick={() => setShown(false)}
							aria-label={t('close')}
							className="absolute right-2 top-1 text-lg leading-none text-muted transition-colors hover:text-foreground"
						>
							×
						</button>
						<div className="flex items-start gap-2.5">
							<span
								aria-hidden
								className="mt-1.5 size-2 shrink-0 rounded-full"
								style={{ background: accent }}
							/>
							<span className="text-sm text-foreground">{toast.msg}</span>
						</div>
						<span
							key={barKey}
							aria-hidden
							className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
							style={{
								background: accent,
								animation: 'toast-drain 4s linear forwards',
							}}
						/>
					</div>,
					document.body,
				)}
		</>
	);
}
