import { useTranslations } from 'next-intl';
import { LinkButton } from '@/components/link-button';
import { Logo } from '@/components/logo';

function DotGrid({ className }: { className?: string }) {
	return (
		<svg width="80" height="80" viewBox="0 0 80 80" className={className} aria-hidden>
			{Array.from({ length: 5 }).map((_, r) =>
				Array.from({ length: 5 }).map((_, c) => (
					<circle key={`${r}-${c}`} cx={8 + c * 16} cy={8 + r * 16} r="2" fill="currentColor" />
				)),
			)}
		</svg>
	);
}

export function Hero() {
	const t = useTranslations('hero');

	return (
		<section id="home" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-8 pt-16 sm:pt-24">
			<div className="grid items-center gap-12 lg:grid-cols-2">
				<div>
					<p className="font-mono text-sm text-accent">{t('greeting')}</p>
					<h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						{t('name')}
					</h1>
					<p className="mt-4 text-xl font-semibold text-foreground/90">
						{t('roleLead')}
					</p>
					<p className="mt-1 font-mono text-sm text-muted">{t('roleTail')}</p>
					<p className="mt-6 max-w-md text-pretty text-base text-muted">
						{t('tagline')}
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<LinkButton href="#contacts">{t('ctaContact')}</LinkButton>
						<LinkButton href="#works" variant="outline">
							{t('ctaWorks')}
						</LinkButton>
					</div>

					<span className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
						<span className="relative flex size-2">
							<span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
							<span className="relative inline-flex size-2 rounded-full bg-accent" />
						</span>
						{t('statusPrefix')}&nbsp;<strong className="font-semibold">Hirint.io</strong>
					</span>
				</div>

				{/* decorative brand panel (placeholder for a future photo) */}
				<div className="relative overflow-hidden rounded-2xl border border-separator bg-surface p-8">
					<DotGrid className="absolute right-5 top-5 text-accent/25" />
					<DotGrid className="absolute bottom-5 left-5 text-nova/25" />
					<div className="flex flex-col items-center justify-center gap-6 py-10">
						<Logo size={104} animated />
						{/* Star Trek nod — intentionally always English, not translated. */}
						<p className="max-w-[16rem] text-center font-mono text-xs text-muted">
							Frontend engineering at warp speed.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
