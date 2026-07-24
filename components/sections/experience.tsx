import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { Section } from '@/components/sections/section';
import { experiences } from '@/lib/data';

export function Experience() {
	const t = useTranslations('experience');

	return (
		<Section id="experience" title={t('heading')} subtitle={t('subheading')}>
			<ol className="relative space-y-9">
				{/* spine */}
				<span
					aria-hidden
					className="absolute bottom-1.5 left-[5px] top-1.5 w-0.5 bg-separator"
				/>

				{experiences.map((exp) => {
					const item = `items.${exp.key}`;
					const highlights = exp.hasHighlights
						? (t.raw(`${item}.highlights`) as string[])
						: [];

					return (
						<li key={exp.key} className="relative pl-8">
							{/* node */}
							<span
								aria-hidden
								className={clsx(
									'absolute left-0 top-1.5 size-3 rounded-full border-2 box-border',
									exp.current
										? 'border-nova bg-nova ring-4 ring-nova/20'
										: 'border-accent bg-background',
								)}
							/>

							{/* meta line */}
							<div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted tabular-nums">
								<span>{t(`${item}.period`)}</span>
								<span className="opacity-50">·</span>
								<span>{t(`${item}.duration`)}</span>
								<span className="opacity-50">·</span>
								<span>{t(`${item}.location`)}</span>
								{exp.current && (
									<span className="rounded-full border border-nova/55 px-2 py-0.5 text-[0.66rem] uppercase tracking-wide text-nova">
										{t('now')}
									</span>
								)}
							</div>

							{/* role · company */}
							<h3 className="mt-1.5 text-base font-semibold text-foreground">
								{exp.role} <span className="font-normal text-muted">·</span>{' '}
								{exp.companyHref ? (
									<a
										href={exp.companyHref}
										target="_blank"
										rel="noopener noreferrer"
										className="border-b border-dashed border-muted/55 text-muted transition-colors hover:border-accent hover:text-accent"
									>
										{exp.company}
										<span className="text-[0.8em]"> ↗</span>
									</a>
								) : (
									<span className="text-muted">{exp.company}</span>
								)}
							</h3>

							<p className="mt-2.5 max-w-[64ch] text-sm leading-relaxed text-muted">
								{t(`${item}.summary`)}
							</p>

							{highlights.length > 0 && (
								<ul className="mt-3 flex max-w-[66ch] flex-col gap-1.5">
									{highlights.map((h) => (
										<li
											key={h}
											className="relative pl-[1.1rem] text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-0 before:text-accent before:content-['▹']"
										>
											{h}
										</li>
									))}
								</ul>
							)}

							<ul className="mt-3.5 flex flex-wrap gap-1.5">
								{exp.tech.map((tech) => (
									<li
										key={tech}
										className="rounded-md border border-border bg-surface/50 px-2 py-0.5 text-xs text-muted"
									>
										{tech}
									</li>
								))}
							</ul>
						</li>
					);
				})}
			</ol>

			{/* STEAM origin — one line, links to the school */}
			<p className="relative mt-7 pl-8 text-sm text-muted before:absolute before:left-1 before:top-0 before:text-muted/70 before:content-['↳']">
				{t.rich('before', {
					b: (chunks) => (
						<span className="font-semibold text-foreground/80">{chunks}</span>
					),
					link: (chunks) => (
						<a
							href="https://possenti.mx/"
							target="_blank"
							rel="noopener noreferrer"
							className="border-b border-dashed border-muted/55 transition-colors hover:border-accent hover:text-accent"
						>
							{chunks}
						</a>
					),
				})}
			</p>
		</Section>
	);
}
