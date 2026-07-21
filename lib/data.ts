/** Static portfolio data. Prose (titles/descriptions) is translated via i18n keys;
 *  proper nouns, tech tags and links live here. */

export type ProjectLink = {
	type: 'live' | 'github' | 'figma' | 'demo' | 'itch' | 'cached' | 'tinkercad';
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
	/** cover accent tint. */
	tint: 'accent' | 'nova';
};

export const projects: Project[] = [
	{
		key: 'astroletras',
		name: 'AstroLetras',
		year: '2024',
		tech: ['Next.js', 'Zustand', 'NextUI', 'Cypress'],
		links: [{ type: 'live', href: 'https://astroletras.vercel.app/' }],
		featured: true,
		tint: 'accent',
	},
	{
		key: 'crystalgems',
		name: 'CrystalGems',
		tech: ['Next.js', 'Vercel'],
		links: [{ type: 'live', href: 'https://crystalgems.vercel.app/' }],
		featured: true,
		tint: 'nova',
	},
	{
		key: 'contactapp',
		name: 'ContactApp',
		tech: ['Next.js', 'Prisma', 'Formik', 'Yup'],
		links: [{ type: 'live', href: 'https://mpa-contactapp.vercel.app/' }],
		featured: true,
		tint: 'accent',
	},
	{
		key: 'calaverita',
		name: 'Calaverita',
		tech: ['Arduino', 'C++', 'Electrónica'],
		links: [
			{ type: 'github', href: 'https://github.com/MonicaPArroyo/Calaverita' },
			{
				type: 'tinkercad',
				href: 'https://www.tinkercad.com/things/bpGrzxdJW10-calaveritah',
			},
		],
		featured: false,
		tint: 'nova',
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
