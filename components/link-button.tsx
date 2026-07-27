import { clsx } from 'clsx';
import type { ReactNode } from 'react';
import { ArrowUpRightIcon } from '@/components/icons';

type Variant = 'primary' | 'outline' | 'nova' | 'ghost';
type Size = 'sm' | 'md';

/** Solid brand fill (dark blue + white) — passes AA. Shared with the contact
 *  form's HeroUI Button so every primary CTA looks identical. */
export const accentSolidButtonClass =
	'bg-accent-solid text-accent-solid-foreground hover:brightness-110';

/** Outline button at sm size — for the blog link in project cards, which is a
 *  locale-aware next-intl Link (not an <a>), so it can't go through LinkButton. */
export const outlineButtonSmClass =
	'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all border border-border text-foreground hover:border-accent hover:text-accent';

const variantCls: Record<Variant, string> = {
	primary: accentSolidButtonClass,
	nova: 'bg-nova text-nova-foreground hover:brightness-105',
	outline:
		'border border-border text-foreground hover:border-accent hover:text-accent',
	ghost: 'text-foreground/80 hover:text-accent',
};

const sizeCls: Record<Size, string> = {
	sm: 'px-3 py-1.5 text-xs',
	md: 'px-5 py-2.5 text-sm',
};

type LinkButtonProps = {
	href: string;
	children: ReactNode;
	variant?: Variant;
	size?: Size;
	external?: boolean;
	className?: string;
	'aria-label'?: string;
};

/**
 * Anchor styled like a button. Stays a Server Component (no React-Aria handlers),
 * so it's safe to drop inside RSC sections for links/CTAs.
 */
export function LinkButton({
	href,
	children,
	variant = 'primary',
	size = 'md',
	external,
	className,
	...rest
}: LinkButtonProps) {
	return (
		<a
			href={href}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
			className={clsx(
				'inline-flex items-center gap-1.5 rounded-lg font-medium transition-all',
				variantCls[variant],
				sizeCls[size],
				className,
			)}
			{...rest}
		>
			{children}
			{external && <ArrowUpRightIcon className="size-3.5" />}
		</a>
	);
}
