import { clsx } from 'clsx';
import type { ReactNode } from 'react';

type SectionProps = {
	id: string;
	/** shown as `#title` in accent + foreground. */
	title?: string;
	subtitle?: string;
	children: ReactNode;
	className?: string;
};

export function Section({ id, title, subtitle, children, className }: SectionProps) {
	return (
		<section
			id={id}
			className={clsx('mx-auto max-w-6xl scroll-mt-20 px-6 py-16 sm:py-24', className)}
		>
			{title && (
				<header className="mb-10">
					<h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
						<span className="text-accent">#</span>
						{title}
					</h2>
					{subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
				</header>
			)}
			{children}
		</section>
	);
}
