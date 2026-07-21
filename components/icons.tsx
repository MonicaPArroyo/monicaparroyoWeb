import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
	width: 20,
	height: 20,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 1.8,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
};

export function SunIcon(props: IconProps) {
	return (
		<svg {...base} {...props} aria-hidden="true">
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
		</svg>
	);
}

export function MoonIcon(props: IconProps) {
	return (
		<svg {...base} {...props} aria-hidden="true">
			<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
		</svg>
	);
}

export function MenuIcon(props: IconProps) {
	return (
		<svg {...base} {...props} aria-hidden="true">
			<path d="M3 6h18M3 12h18M3 18h18" />
		</svg>
	);
}

export function CloseIcon(props: IconProps) {
	return (
		<svg {...base} {...props} aria-hidden="true">
			<path d="M18 6 6 18M6 6l12 12" />
		</svg>
	);
}

export function ArrowUpRightIcon(props: IconProps) {
	return (
		<svg {...base} {...props} aria-hidden="true">
			<path d="M7 17 17 7M8 7h9v9" />
		</svg>
	);
}
