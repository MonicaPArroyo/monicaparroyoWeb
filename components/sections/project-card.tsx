import { Card, Chip } from '@heroui/react';
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

export function ProjectCard({ project }: { project: Project }) {
	const t = useTranslations('projects');

	return (
		<Card className="flex h-full flex-col">
			{/* cover placeholder — real cover images added later */}
			<div
				className={clsx(
					'relative flex h-32 items-center justify-center overflow-hidden rounded-lg',
					project.tint === 'nova' ? 'bg-nova/10' : 'bg-accent/10',
				)}
			>
				<Logo size={40} />
				<span className="absolute bottom-2 right-3 max-w-[80%] truncate font-mono text-[11px] text-muted">
					{project.name}
				</span>
			</div>

			<Card.Header>
				<Card.Title>{project.name}</Card.Title>
				<Card.Description>{t(`items.${project.key}`)}</Card.Description>
			</Card.Header>

			<Card.Content>
				<div className="flex flex-wrap gap-2">
					{project.tech.map((tech) => (
						<Chip key={tech} size="sm" variant="soft" color="accent">
							{tech}
						</Chip>
					))}
				</div>
			</Card.Content>

			<Card.Footer className="mt-auto flex items-center gap-2">
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
				{project.year && (
					<span className="ml-auto font-mono text-xs text-muted">
						{project.year}
					</span>
				)}
			</Card.Footer>
		</Card>
	);
}
