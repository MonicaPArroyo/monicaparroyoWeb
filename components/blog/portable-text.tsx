import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

const components: PortableTextComponents = {
	block: {
		h2: ({ children }) => (
			<h2 className="mb-3 mt-10 text-2xl font-bold tracking-tight">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="mb-2 mt-8 text-xl font-semibold">{children}</h3>
		),
		normal: ({ children }) => (
			<p className="my-4 leading-relaxed text-foreground/90">{children}</p>
		),
		blockquote: ({ children }) => (
			<blockquote className="my-6 border-l-4 border-nova pl-4 italic text-muted">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="my-4 list-disc space-y-1 pl-6">{children}</ul>
		),
		number: ({ children }) => (
			<ol className="my-4 list-decimal space-y-1 pl-6">{children}</ol>
		),
	},
	marks: {
		code: ({ children }) => (
			<code className="rounded bg-surface px-1.5 py-0.5 font-mono text-sm">
				{children}
			</code>
		),
		link: ({ children, value }) => (
			<a
				href={value?.href}
				target="_blank"
				rel="noopener noreferrer"
				className="text-accent underline underline-offset-2"
			>
				{children}
			</a>
		),
	},
	types: {
		image: ({ value }) => {
			const b = urlFor(value);
			if (!b) return null;
			const { w, h } = imageDims(value as Record<string, unknown>);
			return (
				<Image
					src={b.width(1200).fit('max').url()}
					alt={value?.alt ?? ''}
					width={w}
					height={h}
					sizes="(max-width: 768px) 100vw, 768px"
					className="my-6 h-auto w-full rounded-xl border border-separator"
				/>
			);
		},
		// A run of ≥2 consecutive images (e.g. the Karnaugh maps) collapses into a
		// responsive grid so they don't eat a full column each. See groupImages().
		imageGroup: ({ value }) => {
			const images = (value?.images ?? []) as Array<Record<string, unknown>>;
			// Flex + justify-center → two per row, and a lone last item (odd count,
			// e.g. 7 Karnaugh maps) centers itself instead of hugging the left.
			return (
				<div className="my-6 flex flex-wrap justify-center gap-3">
					{images.map((img) => {
						const b = urlFor(img);
						if (!b) return null;
						const { w, h } = imageDims(img);
						return (
							<Image
								key={String(img._key)}
								src={b.width(700).fit('max').url()}
								alt={(img.alt as string) ?? ''}
								width={w}
								height={h}
								sizes="(max-width: 768px) 50vw, 384px"
								className="h-auto w-[calc(50%_-_0.5rem)] rounded-lg border border-separator"
							/>
						);
					})}
				</div>
			);
		},
		embed: ({ value }) => {
			const url: string | undefined = value?.url;
			if (!url) return null;
			return (
				<figure className="my-6 overflow-hidden rounded-xl border border-separator">
					<div className="relative w-full" style={{ aspectRatio: '16 / 10' }}>
						<iframe
							src={url}
							title={value?.title ?? 'Embed'}
							loading="lazy"
							allowFullScreen
							className="absolute inset-0 h-full w-full"
						/>
					</div>
				</figure>
			);
		},
	},
};

/** Sanity image refs embed dimensions: `image-<hash>-585x679-png`. */
const IMAGE_REF_DIMS = /-(\d+)x(\d+)-/;
function imageDims(img: Record<string, unknown>): { w: number; h: number } {
	const ref = (img?.asset as { _ref?: string } | undefined)?._ref ?? '';
	const m = IMAGE_REF_DIMS.exec(ref);
	return m ? { w: Number(m[1]), h: Number(m[2]) } : { w: 800, h: 800 };
}

/** Collapse runs of ≥2 consecutive image blocks into a single `imageGroup`
 *  (rendered as a grid). Lone images (like the truth table) pass through. */
function groupImages(blocks: Array<Record<string, unknown>>) {
	const out: Array<Record<string, unknown>> = [];
	let run: Array<Record<string, unknown>> = [];
	const flush = () => {
		if (run.length >= 2) {
			out.push({
				_type: 'imageGroup',
				_key: `imggroup-${String(run[0]._key)}`,
				images: run,
			});
		} else if (run.length === 1) {
			out.push(run[0]);
		}
		run = [];
	};
	for (const block of blocks) {
		if (block?._type === 'image') run.push(block);
		else {
			flush();
			out.push(block);
		}
	}
	flush();
	return out;
}

export function PortableTextBody({ value }: { value: unknown[] }) {
	const blocks = groupImages(value as Array<Record<string, unknown>>);
	return <PortableText value={blocks as never} components={components} />;
}
