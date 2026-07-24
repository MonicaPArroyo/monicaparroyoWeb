import { clsx } from 'clsx';

type DotGridProps = {
	rows?: number;
	cols?: number;
	/** gap between dot centers, px */
	gap?: number;
	/** dot radius, px */
	r?: number;
	className?: string;
};

/** Grid of dots (Figma decoration). Color via `text-*` on className. */
export function DotGrid({
	rows = 5,
	cols = 5,
	gap = 16,
	r = 2,
	className,
}: DotGridProps) {
	const w = (cols - 1) * gap + r * 2;
	const h = (rows - 1) * gap + r * 2;
	return (
		<svg
			width={w}
			height={h}
			viewBox={`0 0 ${w} ${h}`}
			className={clsx('text-accent/25', className)}
			aria-hidden="true"
		>
			{Array.from({ length: rows }).map((_, ri) =>
				Array.from({ length: cols }).map((_, ci) => (
					<circle
						key={`${ri}-${ci}`}
						cx={r + ci * gap}
						cy={r + ri * gap}
						r={r}
						fill="currentColor"
					/>
				)),
			)}
		</svg>
	);
}

type GeoSquaresProps = {
	/** side of the largest square, px */
	size?: number;
	className?: string;
};

/** Two overlapping outlined squares (accent + nova) — Figma decoration. */
export function GeoSquares({ size = 96, className }: GeoSquaresProps) {
	const s = size * 0.66;
	return (
		<div
			className={clsx('pointer-events-none relative', className)}
			style={{ width: size, height: size }}
			aria-hidden="true"
		>
			<span
				className="absolute left-0 top-0 border border-accent/40"
				style={{ width: s, height: s }}
			/>
			<span
				className="absolute border border-nova/40"
				style={{ width: s, height: s, right: 0, bottom: 0 }}
			/>
		</div>
	);
}
