export function Quote() {
	return (
		<div className="mx-auto max-w-4xl px-6 py-10">
			<figure className="relative border border-separator px-8 py-10">
				<span
					aria-hidden
					className="absolute -top-6 left-4 font-bold leading-none text-6xl text-nova"
				>
					&ldquo;
				</span>
				{/* Star Trek — Spock. Intentionally in English (both locales). */}
				<blockquote className="text-center text-lg leading-relaxed sm:text-xl">
					Logic is the beginning of wisdom, not the end.
				</blockquote>
				<figcaption className="mt-5 text-right text-sm text-muted">
					— Spock
				</figcaption>
				<span
					aria-hidden
					className="absolute -bottom-10 right-4 font-bold leading-none text-6xl text-nova"
				>
					&rdquo;
				</span>
			</figure>
		</div>
	);
}
