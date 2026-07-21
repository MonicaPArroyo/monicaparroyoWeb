import { useTranslations } from 'next-intl';
import { ProjectCard } from '@/components/sections/project-card';
import { Section } from '@/components/sections/section';
import { projects } from '@/lib/data';

export function Projects() {
	const t = useTranslations('projects');
	const featured = projects.filter((p) => p.featured);
	const small = projects.filter((p) => !p.featured);

	return (
		<Section id="works" title={t('heading')} subtitle={t('subheading')}>
			<h3 className="mb-5 font-mono text-sm font-semibold uppercase tracking-wider text-muted">
				{t('featured')}
			</h3>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{featured.map((project) => (
					<ProjectCard key={project.key} project={project} />
				))}
			</div>

			<h3 className="mb-5 mt-14 font-mono text-sm font-semibold uppercase tracking-wider text-muted">
				{t('small')}
			</h3>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{small.map((project) => (
					<ProjectCard key={project.key} project={project} />
				))}
			</div>
		</Section>
	);
}
