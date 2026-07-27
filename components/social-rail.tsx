import { SocialLinks } from '@/components/social-links';

/** Fixed vertical social rail on the left edge (desktop only) — Figma decoration. */
export function SocialRail() {
	return (
		<div className="fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex">
			<span className="h-16 w-px bg-separator" />
			<SocialLinks vertical size={18} />
			<span className="h-16 w-px bg-separator" />
		</div>
	);
}
