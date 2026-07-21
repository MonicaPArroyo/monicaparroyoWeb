'use client';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { CloseIcon, MenuIcon } from '@/components/icons';
import { LanguageSwitch } from '@/components/language-switch';
import { Logo } from '@/components/logo';
import { SocialLinks } from '@/components/social-links';
import { ThemeSwitch } from '@/components/theme-switch';
import { siteConfig } from '@/config/site';
import { Link as IntlLink } from '@/i18n/navigation';

export function Navbar() {
	const t = useTranslations('nav');
	const [open, setOpen] = useState(false);

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

	const linkClass =
		'font-mono text-foreground/80 transition-colors hover:text-accent';

	function NavLink({
		item,
		onClick,
		className,
	}: {
		item: (typeof siteConfig.navItems)[number];
		onClick?: () => void;
		className?: string;
	}) {
		const cls = clsx(linkClass, className);
		const label = t(item.key);
		const inner = (
			<>
				<span className="text-accent">#</span>
				{label}
			</>
		);
		// Hash anchors stay on the current page; /blog is a locale-aware route.
		return item.route ? (
			<IntlLink href={item.href} className={cls} onClick={onClick}>
				{inner}
			</IntlLink>
		) : (
			<a href={item.href} className={cls} onClick={onClick}>
				{inner}
			</a>
		);
	}

	const iconBtn =
		'flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-default hover:text-accent';

	return (
		<>
		<header className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
			<nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
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

				<ul className="hidden items-center gap-6 text-sm lg:flex">
					{siteConfig.navItems.map((item) => (
						<li key={item.key}>
							<NavLink item={item} />
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
						className={clsx(iconBtn, 'lg:hidden')}
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
						className={iconBtn}
					>
						<CloseIcon />
					</button>
				</div>

				<ul className="mt-10 flex flex-col gap-5">
					{siteConfig.navItems.map((item) => (
						<li key={item.key}>
							<NavLink
								item={item}
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
