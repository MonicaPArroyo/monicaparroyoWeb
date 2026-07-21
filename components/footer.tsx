import { useTranslations } from 'next-intl';
import { Logo } from '@/components/logo';
import { SocialLinks } from '@/components/social-links';
import { siteConfig } from '@/config/site';

export function Footer() {
	const t = useTranslations('footer');
	const year = new Date().getFullYear();

	return (
		<footer className="mt-24 border-t border-separator">
			<div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
				<div className="max-w-sm">
					<div className="flex items-center gap-2">
						<Logo size={40} />
						<span className="font-mono text-lg font-semibold tracking-tight">
							{siteConfig.name}
						</span>
					</div>
					<p className="mt-3 text-sm text-muted">{t('tagline')}</p>
				</div>

				<div className="flex flex-col gap-4 sm:items-end">
					<span className="font-mono text-sm text-foreground/80">
						{t('social')}
					</span>
					<SocialLinks />
				</div>
			</div>

			<div className="border-t border-separator">
				<p className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-muted">
					© {year} {siteConfig.name}. {t('rights')}
				</p>
			</div>
		</footer>
	);
}
