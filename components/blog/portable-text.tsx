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
			return (
				<Image
					src={b.width(1200).fit('max').url()}
					alt={value?.alt ?? ''}
					width={1200}
					height={800}
					className="my-6 h-auto w-full rounded-xl border border-separator"
				/>
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

export function PortableTextBody({ value }: { value: unknown[] }) {
	return <PortableText value={value as never} components={components} />;
}
