import { clsx } from 'clsx';

type LogoProps = {
	/** Rendered height in px. Width scales to the 3:2 viewBox. */
	size?: number;
	/** Subtle twinkle on the nova star (use in the navbar). */
	animated?: boolean;
	className?: string;
	title?: string;
};

/**
 * Brand mark — the `</>` code glyph drawn as a constellation: star-points
 * joined by faint lines, with the center star (on the slash) shining in the
 * nova-gold token while the rest use the accent color.
 *
 * Colors come from theme tokens via `stroke-accent` / `fill-accent` / `fill-nova`,
 * so the mark follows light/dark automatically.
 */
export function Logo({
	size = 28,
	animated = false,
	className,
	title = 'Mónica P. Arroyo',
}: LogoProps) {
	// Star points on a 48×32 canvas.
	const accentStars = [
		[13, 5],
		[3, 16],
		[13, 27], // <
		[45, 16],
		[35, 27], // >
		[20, 27],
		[24, 16], // slash midpoint
		[28, 5], // slash ends
	];
	// Off-center for asymmetry: the star where the ">" begins (its top vertex).
	const nova = [35, 5];

	return (
		<svg
			width={Math.round(size * 1.5)}
			height={size}
			viewBox="0 0 48 32"
			fill="none"
			role="img"
			aria-label={title}
			className={clsx('shrink-0', className)}
		>
			{/* constellation lines */}
			<g
				className="stroke-accent"
				strokeWidth={1.6}
				strokeLinecap="round"
				strokeLinejoin="round"
				opacity={0.55}
			>
				<polyline points="13,5 3,16 13,27" />
				<polyline points="35,5 45,16 35,27" />
				<polyline points="20,27 24,16 28,5" />
			</g>

			{/* accent stars */}
			<g className="fill-accent">
				{accentStars.map(([cx, cy]) => (
					<circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.7} />
				))}
			</g>

			{/* nova star (center, brighter + larger) */}
			<g
				className={clsx(
					'fill-nova',
					animated && '[animation:nova-twinkle_2.8s_ease-in-out_infinite]',
				)}
				style={{ transformOrigin: `${nova[0]}px ${nova[1]}px` }}
			>
				<circle cx={nova[0]} cy={nova[1]} r={3.4} opacity={0.25} />
				<circle cx={nova[0]} cy={nova[1]} r={2.4} />
			</g>
		</svg>
	);
}
