import { DotGrid, GeoSquares } from '@/components/decorations';

/**
 * Faint ambient decorations behind the whole page (Figma sprinkles dot-grids and
 * outlined squares in the margins). Fixed + overflow-hidden so it never adds
 * horizontal scroll; sits at z-0 while page content is z-10.
 */
export function PageDecor() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden lg:block"
		>
			<DotGrid rows={6} cols={6} className="absolute right-10 top-40 text-accent/10" />
			<GeoSquares size={130} className="absolute left-6 top-1/2 opacity-30" />
			<DotGrid
				rows={6}
				cols={6}
				className="absolute bottom-40 right-24 text-nova/10"
			/>
			<DotGrid rows={5} cols={5} className="absolute left-12 top-24 text-accent/10" />
		</div>
	);
}
