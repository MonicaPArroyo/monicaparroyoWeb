import { clsx } from 'clsx';
import type { IconType } from 'react-icons';
import { FaLinkedin } from 'react-icons/fa6';
import {
	SiDiscord,
	SiGithub,
	SiInstagram,
	SiItchdotio,
	SiTinkercad,
} from 'react-icons/si';
import type { SocialBrand } from '@/config/site';
import { siteConfig } from '@/config/site';

// Brand marks: Simple Icons for all, Font Awesome for LinkedIn
// (Simple Icons removed LinkedIn over trademark).
const brandIcon: Record<SocialBrand, IconType> = {
	github: SiGithub,
	linkedin: FaLinkedin,
	instagram: SiInstagram,
	itch: SiItchdotio,
	tinkercad: SiTinkercad,
	discord: SiDiscord,
};

type SocialLinksProps = {
	/** Icon size in px. */
	size?: number;
	className?: string;
	/** Stack vertically (used by the left rail). */
	vertical?: boolean;
};

export function SocialLinks({ size = 20, className, vertical }: SocialLinksProps) {
	return (
		<ul
			className={clsx(
				'flex items-center gap-4',
				vertical && 'flex-col',
				className,
			)}
		>
			{siteConfig.social.map((s) => {
				const Icon = brandIcon[s.brand];
				return (
					<li key={s.name}>
						<a
							href={s.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={s.name}
							title={s.name}
							className="block text-muted transition-colors hover:text-accent"
						>
							<Icon size={size} />
						</a>
					</li>
				);
			})}
		</ul>
	);
}
