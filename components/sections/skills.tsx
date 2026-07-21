import { Card, Chip } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/sections/section';
import { skillGroups } from '@/lib/data';

export function Skills() {
	const t = useTranslations('skills');

	return (
		<Section id="skills" title={t('heading')} subtitle={t('subheading')}>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{skillGroups.map((group) => (
					<Card key={group.key} variant="secondary">
						<Card.Header>
							<Card.Title className="font-mono text-base">
								{t(`categories.${group.key}`)}
							</Card.Title>
						</Card.Header>
						<Card.Content>
							<div className="flex flex-wrap gap-2">
								{group.items.map((item) => (
									<Chip key={item} size="sm" variant="soft">
										{item}
									</Chip>
								))}
							</div>
						</Card.Content>
					</Card>
				))}
			</div>
		</Section>
	);
}
