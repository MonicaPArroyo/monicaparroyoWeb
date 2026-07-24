import { setRequestLocale } from 'next-intl/server';
import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Experience } from '@/components/sections/experience';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Quote } from '@/components/sections/quote';
import { Skills } from '@/components/sections/skills';

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	return (
		<>
			<Hero />
			<Quote />
			<Projects />
			<Experience />
			<Skills />
			<About />
			<Contact />
		</>
	);
}
