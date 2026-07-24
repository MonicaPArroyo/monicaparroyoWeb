import { useTranslations } from 'next-intl';
import { DotGrid } from '@/components/decorations';
import { MapPinIcon } from '@/components/icons';
import { Section } from '@/components/sections/section';

export function About() {
	const t = useTranslations('about');
	const funFacts = t.raw('funFacts') as string[];

	return (
		<Section id="about-me" title={t('heading')} subtitle={t('subheading')}>
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
				{/* bio */}
				<div className="max-w-xl space-y-4 text-pretty leading-relaxed text-muted">
					<p>{t('p1')}</p>
					<p>{t('p2')}</p>
					<p className="inline-flex items-center gap-2 pt-2 text-sm text-muted">
						<MapPinIcon className="size-4 text-accent" />
						{t('location')}
					</p>
				</div>

				{/* portrait placeholder framed with decorations */}
				<div className="relative mx-auto w-full max-w-xs">
					<DotGrid className="absolute -right-6 -top-6 -z-10 hidden text-nova/25 sm:block" />
					<div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-separator bg-surface">
						<span className="text-7xl font-bold text-nova">MA</span>
						<DotGrid
							rows={4}
							cols={4}
							className="absolute left-4 top-4 text-accent/30"
						/>
						<span className="absolute bottom-0 left-0 h-1 w-full bg-accent/60" />
					</div>
				</div>
			</div>

			{/* fun facts */}
			<h3 className="mb-4 mt-14 text-sm font-semibold uppercase tracking-wider text-muted">
				{t('funFactsTitle')}
			</h3>
			<ul className="flex flex-wrap gap-3">
				{funFacts.map((fact) => (
					<li
						key={fact}
						className="border border-separator px-3 py-2 text-sm text-foreground/90 transition-colors hover:border-accent/60"
					>
						{fact}
					</li>
				))}
			</ul>
		</Section>
	);
}
