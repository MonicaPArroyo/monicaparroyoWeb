import { useTranslations } from 'next-intl';
import { MailIcon } from '@/components/icons';
import { ContactForm } from '@/components/sections/contact-form';
import { Section } from '@/components/sections/section';
import { SocialLinks } from '@/components/social-links';
import { siteConfig } from '@/config/site';

export function Contact() {
	const t = useTranslations('contact');

	return (
		<Section id="contacts" title={t('heading')} subtitle={t('subheading')}>
			<div className="grid gap-10 lg:grid-cols-2">
				<div className="flex flex-col gap-8">
					<p className="max-w-md text-pretty text-muted">{t('availability')}</p>

					<div className="flex flex-col gap-3">
						<a
							href={`mailto:${siteConfig.email}`}
							className="group inline-flex w-fit items-center gap-3 text-foreground transition-colors hover:text-accent"
						>
							<MailIcon className="text-accent" />
							<span className="font-mono text-sm">{siteConfig.email}</span>
						</a>
						<span className="inline-flex items-center gap-3 font-mono text-sm text-muted">
							<span aria-hidden>📍</span>
							{t('location')}
						</span>
					</div>

					<div>
						<p className="mb-3 font-mono text-sm text-muted">{t('directTitle')}</p>
						<SocialLinks />
					</div>
				</div>

				<ContactForm />
			</div>
		</Section>
	);
}
