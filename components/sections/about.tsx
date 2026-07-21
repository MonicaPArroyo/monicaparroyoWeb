import { useTranslations } from 'next-intl';
import { Section } from '@/components/sections/section';

export function About() {
	const t = useTranslations('about');
	const funFacts = t.raw('funFacts') as string[];

	return (
		<Section id="about-me" title={t('heading')} subtitle={t('subheading')}>
			<div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:items-start">
				{/* initials placeholder — real photo added later */}
				<div className="flex flex-col items-center gap-3">
					<div className="flex size-40 items-center justify-center rounded-2xl bg-nova font-mono text-6xl font-bold text-nova-foreground">
						MA
					</div>
					<span className="font-mono text-xs text-muted">
						📍 {t('location')}
					</span>
				</div>

				<div>
					<div className="max-w-2xl space-y-4 text-pretty text-base leading-relaxed text-foreground/90">
						<p>{t('p1')}</p>
						<p>{t('p2')}</p>
					</div>

					<h3 className="mb-3 mt-8 font-mono text-sm font-semibold uppercase tracking-wider text-muted">
						{t('funFactsTitle')}
					</h3>
					<ul className="flex flex-wrap gap-2">
						{funFacts.map((fact) => (
							<li
								key={fact}
								className="rounded-lg border border-separator bg-surface px-3 py-2 text-sm"
							>
								{fact}
							</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	);
}
