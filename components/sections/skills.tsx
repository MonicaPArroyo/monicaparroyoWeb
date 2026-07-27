import { useTranslations } from 'next-intl';
import { Section } from '@/components/sections/section';
import { skillGroups } from '@/lib/data';

export function Skills() {
	const t = useTranslations('skills');

	return (
		<Section id="skills" title={t('heading')} subtitle={t('subheading')}>
			<div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{skillGroups.map((group) => (
					<div key={group.key} className="border border-separator">
						<div className="border-b border-separator px-4 py-2 font-semibold">
							{t(`categories.${group.key}`)}
						</div>
						<div className="flex flex-wrap gap-x-3 gap-y-1.5 px-4 py-3 text-sm text-muted">
							{group.items.map((item) => (
								<span key={item} className="whitespace-nowrap">
									{item}
								</span>
							))}
						</div>
					</div>
				))}
			</div>
		</Section>
	);
}
