import { useTranslations } from 'next-intl';
import { DotGrid, GeoSquares } from '@/components/decorations';
import { LinkButton } from '@/components/link-button';
import { MonogramTile } from '@/components/monogram-tile';

export function Hero() {
	const t = useTranslations('hero');

	return (
		<section
			id="home"
			className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-8 pt-16 sm:pt-24"
		>
			<div className="grid items-center gap-14 lg:grid-cols-2">
				<div>
					<p className="text-sm text-accent">{t('greeting')}</p>
					<h1 className="mt-2 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
						{t('name')}
					</h1>
					<p className="mt-3 text-2xl font-semibold text-accent sm:text-3xl">
						{t('roleLead')}
					</p>
					<p className="mt-2 text-sm text-muted">{t('roleTail')}</p>
					<p className="mt-6 max-w-md text-pretty leading-relaxed text-muted">
						{t('desc')}
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<LinkButton href="#contacts">{t('ctaContact')}</LinkButton>
						<LinkButton href="#works" variant="outline">
							{t('ctaWorks')}
						</LinkButton>
					</div>
				</div>

				{/* Portrait placeholder framed with Figma-style decorations */}
				<div className="relative mx-auto w-full max-w-sm">
					<GeoSquares
						size={120}
						className="absolute -right-5 -top-8 -z-10 hidden sm:block"
					/>
					<DotGrid className="absolute -left-6 top-8 -z-10 hidden text-accent/20 sm:block" />

					<MonogramTile
						className="aspect-[4/5]"
						textClassName="text-7xl sm:text-8xl"
					>
						<DotGrid
							rows={4}
							cols={4}
							className="absolute bottom-4 right-4 text-accent/30"
						/>
					</MonogramTile>

					<span className="absolute -bottom-4 left-6 inline-flex items-center gap-2 border border-separator bg-background px-3 py-2 text-xs">
						<span className="size-2.5 bg-nova" />
						{t('statusPrefix')}&nbsp;
						<strong className="font-semibold">Hirint.io</strong>
					</span>
				</div>
			</div>
		</section>
	);
}
