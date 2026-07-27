import { useTranslations } from 'next-intl';
import { MailIcon, MapPinIcon } from '@/components/icons';
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
					<p className="max-w-md text-pretty leading-relaxed text-muted">
						{t('availability')}
					</p>

					{/* Figma-style bordered info card */}
					<div className="border border-separator p-5">
						<p className="mb-4 text-sm font-semibold">{t('directTitle')}</p>
						<div className="space-y-3">
							<a
								href={`mailto:${siteConfig.email}`}
								className="inline-flex w-fit items-center gap-3 text-foreground transition-colors hover:text-accent"
							>
								<MailIcon className="size-5 text-accent" />
								<span className="text-sm">{siteConfig.email}</span>
							</a>
							<span className="flex items-center gap-3 text-sm text-muted">
								<MapPinIcon className="size-5 text-accent" />
								{t('location')}
							</span>
						</div>
						<div className="mt-5 border-t border-separator pt-4">
							<SocialLinks size={20} />
						</div>
					</div>
				</div>

				<ContactForm />
			</div>
		</Section>
	);
}
