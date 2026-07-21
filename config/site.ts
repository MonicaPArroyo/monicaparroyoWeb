/** Central config for nav + social links, reused across navbar / footer / drawer. */

export type NavItem = {
	/** i18n key under the `nav` namespace. */
	key: 'home' | 'works' | 'about' | 'contact' | 'blog';
	href: string;
	/** true → real route (locale-aware Link); false → same-page hash anchor. */
	route?: boolean;
};

export type SocialLink = {
	name: string;
	href: string;
	icon: string;
};

export const siteConfig = {
	name: 'Mónica P. Arroyo',
	email: 'monica.arroyo@hirint.io',
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
			icon: '/images/Github.png',
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/in/monicaparroyo/',
			icon: '/images/Linkedin.png',
		},
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/monicaparroyo/',
			icon: '/images/Instagram.png',
		},
		{
			name: 'Itch.io',
			href: 'https://monicaparroyo.itch.io/',
			icon: '/images/Itch.png',
		},
		{
			name: 'Tinkercad',
			href: 'https://www.tinkercad.com/users/97kCQIzEEaU',
			icon: '/images/Tinkercad.png',
		},
	] satisfies SocialLink[],
} as const;
