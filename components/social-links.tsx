import Image from 'next/image';
import { clsx } from 'clsx';
import { siteConfig } from '@/config/site';

type SocialLinksProps = {
	/** Icon box size in px. */
	size?: number;
	className?: string;
};

/**
 * Row of Mónica's hand-made pixel-art social icons. Reused in footer / contact /
 * drawer. Rendered pixelated so the pixel art stays crisp.
 */
export function SocialLinks({ size = 28, className }: SocialLinksProps) {
	return (
		<ul className={clsx('flex items-center gap-4', className)}>
			{siteConfig.social.map((s) => (
				<li key={s.name}>
					<a
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={s.name}
						title={s.name}
						className="block opacity-80 transition-opacity hover:opacity-100"
					>
						<Image
							src={s.icon}
							alt={s.name}
							width={size}
							height={size}
							style={{ imageRendering: 'pixelated' }}
						/>
					</a>
				</li>
			))}
		</ul>
	);
}
