'use client';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CloseIcon, MenuIcon } from '@/components/icons';
import { LanguageSwitch } from '@/components/language-switch';
import { Logo } from '@/components/logo';
import { SocialLinks } from '@/components/social-links';
import { ThemeSwitch } from '@/components/theme-switch';
import { iconButtonClass } from '@/components/ui';
import { siteConfig } from '@/config/site';
import { Link as IntlLink, usePathname } from '@/i18n/navigation';

type NavKey = (typeof siteConfig.navItems)[number]['key'];

const linkClass =
	'font-mono text-foreground/80 transition-colors hover:text-accent';

/** A nav entry. Hash anchors scroll in-page on home; from other routes they jump
 *  to `/#section` (locale-aware) so the URL never becomes e.g. /es/blog#works.
 *  Kept at module scope (not inside Navbar) so it isn't a new component type on
 *  every render — that would remount every link. */
function NavLink({
	item,
	t,
	onHome,
	onClick,
	className,
}: {
	item: (typeof siteConfig.navItems)[number];
	t: (key: NavKey) => string;
	onHome: boolean;
	onClick?: () => void;
	className?: string;
}) {
	const cls = clsx(linkClass, className);
	const inner = (
		<>
			<span className="text-accent">#</span>
			{t(item.key)}
		</>
	);
	if (item.route) {
		return (
			<IntlLink href={item.href} className={cls} onClick={onClick}>
				{inner}
			</IntlLink>
		);
	}
	return onHome ? (
		<a href={item.href} className={cls} onClick={onClick}>
			{inner}
		</a>
	) : (
		<IntlLink href={`/${item.href}`} className={cls} onClick={onClick}>
			{inner}
		</IntlLink>
	);
}

export function Navbar() {
	const t = useTranslations('nav');
	const [open, setOpen] = useState(false);
	// Locale-aware pathname ('/' on home, '/blog' elsewhere).
	const onHome = usePathname() === '/';

	// Close the drawer on Escape and lock body scroll while it's open.
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
		document.addEventListener('keydown', onKey);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<>
			<header className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
				<nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
					{onHome ? (
						<a
							href="#home"
							className="flex items-center gap-2"
							aria-label={siteConfig.name}
						>
							<Logo size={28} animated />
							<span className="font-mono text-base font-semibold tracking-tight">
								{siteConfig.name}
							</span>
						</a>
					) : (
						<IntlLink
							href="/"
							className="flex items-center gap-2"
							aria-label={siteConfig.name}
						>
							<Logo size={28} animated />
							<span className="font-mono text-base font-semibold tracking-tight">
								{siteConfig.name}
							</span>
						</IntlLink>
					)}

					<ul className="hidden items-center gap-6 text-sm lg:flex">
						{siteConfig.navItems.map((item) => (
							<li key={item.key}>
								<NavLink item={item} t={t} onHome={onHome} />
							</li>
						))}
					</ul>

					<div className="flex items-center gap-1 sm:gap-2">
						<LanguageSwitch />
						<ThemeSwitch />
						<button
							type="button"
							onClick={() => setOpen(true)}
							aria-label="Open menu"
							aria-expanded={open}
							className={clsx(iconButtonClass, 'lg:hidden')}
						>
							<MenuIcon />
						</button>
					</div>
				</nav>
			</header>

			{/* Mobile drawer — kept OUTSIDE the header: the header's backdrop-blur
			   would otherwise make these fixed elements contained by it. */}
			<div
				aria-hidden
				onClick={() => setOpen(false)}
				className={clsx(
					'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden',
					open ? 'opacity-100' : 'pointer-events-none opacity-0',
				)}
			/>
			<aside
				role="dialog"
				aria-modal="true"
				aria-label={siteConfig.name}
				inert={!open}
				className={clsx(
					'fixed right-0 top-0 z-50 flex h-full w-72 max-w-[80vw] flex-col border-l border-separator bg-surface p-6 shadow-xl transition-transform duration-300 ease-out lg:hidden',
					open ? 'translate-x-0' : 'translate-x-full',
				)}
			>
				<div className="flex items-center justify-between">
					<span className="flex items-center gap-2">
						<Logo size={24} />
						<span className="font-mono text-sm font-semibold">
							{siteConfig.name}
						</span>
					</span>
					<button
						type="button"
						onClick={() => setOpen(false)}
						aria-label="Close menu"
						className={iconButtonClass}
					>
						<CloseIcon />
					</button>
				</div>

				<ul className="mt-10 flex flex-col gap-5">
					{siteConfig.navItems.map((item) => (
						<li key={item.key}>
							<NavLink
								item={item}
								t={t}
								onHome={onHome}
								className="text-lg"
								onClick={() => setOpen(false)}
							/>
						</li>
					))}
				</ul>

				<div className="mt-auto flex flex-col gap-6 pt-8">
					<div className="flex items-center gap-4">
						<LanguageSwitch />
						<ThemeSwitch />
					</div>
					<SocialLinks size={26} />
				</div>
			</aside>
		</>
	);
}
