import { clsx } from 'clsx';
import type { ReactNode } from 'react';

/**
 * The "MA" monogram tile shared by the hero and about placeholders: a bordered,
 * rounded surface with the gold monogram and an accent bar along the bottom.
 * Aspect ratio, monogram size, and inner decoration are composed by the caller
 * (`className` / `textClassName` / `children`) — no boolean modes.
 */
export function MonogramTile({
	className,
	textClassName,
	children,
}: {
	className?: string;
	textClassName?: string;
	children?: ReactNode;
}) {
	return (
		<div
			className={clsx(
				'relative flex items-center justify-center overflow-hidden rounded-2xl border border-separator bg-surface',
				className,
			)}
		>
			<span className={clsx('font-bold text-nova', textClassName)}>MA</span>
			{children}
			<span className="absolute bottom-0 left-0 h-1 w-full bg-accent/60" />
		</div>
	);
}
