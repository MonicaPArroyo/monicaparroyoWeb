/** Central config for nav + social links, reused across navbar / footer / drawer. */

export type NavItem = {
	/** i18n key under the `nav` namespace. */
	key: 'home' | 'works' | 'about' | 'contact' | 'blog';
	href: string;
	/** true → real route (locale-aware Link); false → same-page hash anchor. */
	route?: boolean;
};

export type SocialBrand =
	| 'github'
	| 'linkedin'
	| 'instagram'
	| 'itch'
	| 'tinkercad'
	| 'discord';

export type SocialLink = {
	name: string;
	href: string;
	brand: SocialBrand;
};

export const siteConfig = {
	name: 'Mónica P. Arroyo',
	email: 'monicaparroyo7@gmail.com',
	navItems: [
		{ key: 'home', href: '#home' },
		{ key: 'works', href: '#works' },
		{ key: 'about', href: '#about-me' },
		{ key: 'contact', href: '#contacts' },
		{ key: 'blog', href: '/blog', route: true },
	] satisfies NavItem[],
	social: [
		{
			name: 'GitHub',
			href: 'https://github.com/MonicaPArroyo',
			brand: 'github',
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/monicaparroyo/',
			brand: 'linkedin',
		},
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/monicaparroyo/',
			brand: 'instagram',
		},
		{
			name: 'Itch.io',
			href: 'https://monicaparroyo.itch.io/',
			brand: 'itch',
		},
		{
			name: 'Tinkercad',
			href: 'https://www.tinkercad.com/users/97kCQIzEEaU',
			brand: 'tinkercad',
		},
		{
			name: 'Discord',
			href: 'https://discord.com/users/744638555833499689',
			brand: 'discord',
		},
	] satisfies SocialLink[],
	buyMeACoffee: 'https://buymeacoffee.com/monicaparroyo',
} as const;
