import { clsx } from 'clsx';

type LogoProps = {
	/** Rendered height in px. Width scales to the 3:2 viewBox. */
	size?: number;
	/** Subtle twinkle on the sun (use in the navbar). */
	animated?: boolean;
	className?: string;
	title?: string;
};

/** 5-point star polygon points centered at (cx,cy). */
function star(cx: number, cy: number, rOuter = 2.6): string {
	const rInner = rOuter * 0.4;
	const pts: string[] = [];
	for (let i = 0; i < 10; i++) {
		const r = i % 2 === 0 ? rOuter : rInner;
		const a = -Math.PI / 2 + (i * Math.PI) / 5;
		pts.push(`${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`);
	}
	return pts.join(' ');
}

/**
 * Brand mark — the `</>` glyph drawn as a constellation of 5-point stars joined
 * by faint lines. Base (lines + stars) uses the foreground color (white on the
 * dark theme); one larger "sun" shines in the nova-gold token.
 */
export function Logo({
	size = 28,
	animated = false,
	className,
	title = 'Mónica P. Arroyo',
}: LogoProps) {
	// White 5-point stars (base = foreground). Slash keeps only 2 stars.
	const stars = [
		[13, 5],
		[3, 16],
		[13, 27], // <
		[45, 16],
		[35, 27], // >  (top vertex is the sun)
		[20, 27],
		[28, 5], // slash — 2 stars
	];
	const sun = [35, 5]; // where the ">" begins

	return (
		<svg
			width={Math.round(size * 1.5)}
			height={size}
			viewBox="0 0 48 32"
			fill="none"
			role="img"
			aria-label={title}
			className={clsx('shrink-0 text-foreground', className)}
		>
			{/* constellation lines */}
			<g
				stroke="currentColor"
				strokeWidth={1.4}
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.5}
			>
				<polyline points="13,5 3,16 13,27" />
				<polyline points="35,5 45,16 35,27" />
				<polyline points="20,27 28,5" />
			</g>

			{/* white 5-point stars */}
			<g fill="currentColor">
				{stars.map(([cx, cy]) => (
					<polygon key={`${cx}-${cy}`} points={star(cx, cy)} />
				))}
			</g>

			{/* the "sun" — larger, gold, with a soft glow */}
			<g
				className={clsx(
					'fill-nova',
					animated && '[animation:nova-twinkle_2.8s_ease-in-out_infinite]',
				)}
				style={{ transformOrigin: `${sun[0]}px ${sun[1]}px` }}
			>
				<circle cx={sun[0]} cy={sun[1]} r={3.6} opacity={0.25} />
				<circle cx={sun[0]} cy={sun[1]} r={2.5} />
			</g>
		</svg>
	);
}
