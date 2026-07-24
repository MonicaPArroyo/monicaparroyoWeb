import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { LinkButton } from '@/components/link-button';
import { Logo } from '@/components/logo';
import type { Project, ProjectLink } from '@/lib/data';

const linkVariant: Record<ProjectLink['type'], 'primary' | 'outline' | 'nova'> = {
	live: 'primary',
	demo: 'primary',
	itch: 'nova',
	github: 'outline',
	figma: 'outline',
	cached: 'outline',
	tinkercad: 'outline',
};

function Actions({ project, t }: { project: Project; t: (k: string) => string }) {
	if (project.links.length === 0) return null;
	return (
		<div className="mt-4 flex flex-wrap gap-2">
			{project.links.map((link) => (
				<LinkButton
					key={link.type}
					href={link.href}
					size="sm"
					variant={linkVariant[link.type]}
					external
				>
					{t(`links.${link.type}`)}
				</LinkButton>
			))}
		</div>
	);
}

export function ProjectCard({
	project,
	variant,
}: {
	project: Project;
	variant: 'featured' | 'small';
}) {
	const t = useTranslations('projects');
	const stack = project.tech.join('  ');

	if (variant === 'small') {
		return (
			<div className="flex h-full flex-col border border-separator transition-colors hover:border-accent/60">
				<div className="border-b border-separator px-4 py-2 text-xs text-muted">
					{stack}
				</div>
				<div className="flex flex-1 flex-col px-4 py-4">
					<h3 className="text-lg font-semibold">{project.name}</h3>
					<p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
						{t(`items.${project.key}`)}
					</p>
					<Actions project={project} t={t} />
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-full flex-col border border-separator transition-colors hover:border-accent/60">
			{/* cover placeholder — real cover images added later */}
			<div
				className={clsx(
					'relative flex h-36 items-center justify-center overflow-hidden',
					project.tint === 'nova' ? 'bg-nova/10' : 'bg-accent/10',
				)}
			>
				<Logo size={40} />
				<span className="absolute bottom-2 right-3 max-w-[80%] truncate text-[11px] text-muted">
					{project.name}
				</span>
			</div>
			<div className="border-y border-separator px-4 py-2 text-xs text-muted">
				{stack}
			</div>
			<div className="flex flex-1 flex-col px-4 pb-4 pt-3">
				<div className="flex items-start justify-between gap-2">
					<h3 className="text-lg font-semibold">{project.name}</h3>
					{project.year && (
						<span className="shrink-0 text-xs text-muted">{project.year}</span>
					)}
				</div>
				<p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
					{t(`items.${project.key}`)}
				</p>
				<Actions project={project} t={t} />
			</div>
		</div>
	);
}
