'use client';

import { clsx } from 'clsx';
import { useLocale } from 'next-intl';
import { Fragment, useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitch() {
	const active = useLocale();
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	function switchTo(locale: string) {
		if (locale === active) return;
		startTransition(() => {
			// Keep the current path, swap the locale prefix.
			router.replace(pathname, { locale });
		});
	}

	return (
		<div
			className={clsx(
				'flex items-center gap-1 font-mono text-sm',
				isPending && 'opacity-60',
			)}
		>
			{routing.locales.map((loc, i) => (
				<Fragment key={loc}>
					{i > 0 && <span className="text-muted">/</span>}
					<button
						type="button"
						onClick={() => switchTo(loc)}
						aria-current={loc === active ? 'true' : undefined}
						className={clsx(
							'rounded px-1 transition-colors',
							loc === active
								? 'font-semibold text-accent'
								: 'text-muted hover:text-foreground',
						)}
					>
						{loc.toUpperCase()}
					</button>
				</Fragment>
			))}
		</div>
	);
}
