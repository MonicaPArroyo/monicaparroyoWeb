/** Static portfolio data. Prose (titles/descriptions) is translated via i18n keys;
 *  proper nouns, tech tags and links live here. */

export type ProjectLink = {
	type:
		| 'live'
		| 'github'
		| 'figma'
		| 'demo'
		| 'itch'
		| 'cached'
		| 'tinkercad'
		| 'blog';
	/** external URL, or an internal (locale-aware) path for `blog`. */
	href: string;
};

export type Project = {
	/** react key + i18n key under `projects.items`. */
	key: string;
	/** proper noun — not translated. */
	name: string;
	year?: string;
	tech: string[];
	links: ProjectLink[];
	featured: boolean;
	/** cover accent tint (used behind the placeholder / letterboxing). */
	tint: 'accent' | 'nova';
	/** cover image under /public, e.g. '/projects/contactapp.png'. Falls back to
	 *  the logo placeholder when absent. Cropped with object-cover so the card
	 *  keeps a fixed height. */
	cover?: string;
	/** object-position for the cover crop (Tailwind class, e.g. 'object-top'). */
	coverPosition?: string;
	/** optional co-author, shown as a small credit link on the card. */
	collaborator?: { name: string; href: string };
};

export const projects: Project[] = [
	{
		key: 'weddinghub',
		name: 'WeddingHub',
		tech: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth', 'MUI'],
		links: [
			{ type: 'live', href: 'https://araylalo.vercel.app/' },
			{ type: 'github', href: 'https://github.com/DavidNegreteL/weddingHub' },
		],
		featured: true,
		tint: 'nova',
		cover: '/projects/weddinghub.png',
		coverPosition: 'object-top',
		collaborator: { name: 'David', href: 'https://github.com/DavidNegreteL' },
	},
	{
		key: 'astroletras',
		name: 'AstroLetras',
		year: '2024',
		tech: ['Next.js', 'Zustand', 'NextUI', 'Cypress'],
		links: [
			{ type: 'live', href: 'https://astroletras.vercel.app/' },
			{ type: 'github', href: 'https://github.com/MonicaPArroyo/AstroLetras' },
		],
		featured: true,
		tint: 'accent',
		cover: '/projects/astroletras.png',
		coverPosition: 'object-top',
	},
	{
		key: 'crystalgems',
		name: 'CrystalGems',
		tech: ['Next.js', 'Vercel'],
		links: [
			{ type: 'live', href: 'https://crystalgems.vercel.app/' },
			{ type: 'github', href: 'https://github.com/MonicaPArroyo/CrystalGems' },
		],
		featured: true,
		tint: 'nova',
		cover: '/projects/crystalgems.png',
		coverPosition: 'object-top',
	},
	{
		key: 'contactapp',
		name: 'ContactApp',
		tech: ['Next.js', 'Prisma', 'Formik', 'Yup'],
		links: [
			{ type: 'live', href: 'https://mpa-contactapp.vercel.app/' },
			{ type: 'github', href: 'https://github.com/MonicaPArroyo/ContactApp' },
		],
		featured: true,
		tint: 'accent',
		cover: '/projects/contactapp.png',
	},
	{
		key: 'calaverita',
		name: 'Calaverita',
		tech: ['Arduino', 'C++', 'Electrónica'],
		links: [
			{
				type: 'tinkercad',
				href: 'https://www.tinkercad.com/things/bpGrzxdJW10-calaveritah',
			},
			{ type: 'github', href: 'https://github.com/MonicaPArroyo/Calaverita' },
		],
		featured: false,
		tint: 'nova',
	},
	{
		key: 'decoder',
		name: 'Decodificador a 7 segmentos',
		tech: ['Electrónica', 'Lógica digital', 'Tinkercad'],
		links: [
			{
				type: 'tinkercad',
				href: 'https://www.tinkercad.com/things/j96Q0IwrwoT-decodificador-binario-a-7-segmentos',
			},
			{ type: 'blog', href: '/blog/decodificador-binario-7-segmentos' },
		],
		featured: false,
		tint: 'accent',
	},
	{
		key: 'snowball',
		name: 'Snowball · ¡Corre, Tim, Corre!',
		tech: ['Game Design', 'itch.io'],
		links: [
			{ type: 'itch', href: 'https://monicaparroyo.itch.io/snowball-the-game' },
		],
		featured: false,
		tint: 'accent',
	},
	{
		key: 'flanes',
		name: 'Flanes: The Game',
		tech: ['Phaser', 'JavaScript', 'HTML5'],
		links: [
			{ type: 'live', href: 'https://monicaparroyo.github.io/Flanes-The-Game/' },
			{ type: 'github', href: 'https://github.com/MonicaPArroyo/Flanes-The-Game' },
		],
		featured: false,
		tint: 'nova',
	},
];

/** Work history. Prose (period/location/summary/highlights) is translated via
 *  i18n under `experience.items.<key>`; proper nouns + tech + links live here. */
export type Experience = {
	/** react key + i18n key under `experience.items`. */
	key: string;
	/** proper noun — not translated. */
	company: string;
	/** discreet external link on the company name (omit → plain text). */
	companyHref?: string;
	/** job title — kept in English across locales (as elsewhere on the site). */
	role: string;
	/** highlights the current role with the gold node + "now" tag. */
	current?: boolean;
	/** whether i18n provides a `highlights` array for this role. */
	hasHighlights?: boolean;
	tech: string[];
};

export const experiences: Experience[] = [
	{
		key: 'hirint',
		company: 'Hirint',
		companyHref: 'https://hirint.io',
		role: 'Frontend Developer',
		current: true,
		hasHighlights: true,
		tech: ['Next.js', 'TypeScript', 'Laravel', 'SQL', 'UI/UX'],
	},
	{
		key: 'yaganaste',
		company: 'Ya Ganaste',
		companyHref: 'https://www.yaganaste.com/',
		role: 'Frontend Developer',
		tech: [
			'Next.js',
			'TypeScript',
			'Material UI',
			'React Query',
			'TanStack Table',
			'Chart.js',
			'Zod',
			'Zustand',
		],
	},
	{
		key: 'snowballcommunity',
		company: 'Snowball Community',
		companyHref: 'https://www.snowball.mx/',
		role: 'Fullstack Developer',
		tech: ['Laravel', 'Next.js', 'React', 'GraphQL', 'Apollo', 'MySQL', 'Redux'],
	},
	{
		key: 'snowballmx',
		company: 'Snowball.MX',
		companyHref: 'https://www.snowball.mx/',
		role: 'Fullstack Developer',
		tech: ['PHP', 'Smarty', 'Bootstrap', 'MySQL'],
	},
];

export type SkillGroup = {
	/** i18n key under `skills.categories`. */
	key: string;
	items: string[];
};

export const skillGroups: SkillGroup[] = [
	{ key: 'languages', items: ['TypeScript', 'JavaScript', 'PHP', 'C++'] },
	{ key: 'frameworks', items: ['Next.js', 'React', 'Laravel', 'Node.js'] },
	{ key: 'tools', items: ['Git', 'Figma', 'Cypress', 'Tinkercad', 'Arduino'] },
	{ key: 'databases', items: ['MySQL', 'PostgreSQL', 'Prisma'] },
	{ key: 'other', items: ['Zustand', 'Formik', 'Yup', 'Tailwind CSS', 'REST'] },
];
