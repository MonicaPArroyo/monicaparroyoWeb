import { Button, Card, Chip, Separator } from '@heroui/react';
import { setRequestLocale } from 'next-intl/server';
import { Logo } from '@/components/logo';

// TEMPORARY smoke-test page — verifies HeroUI v3 + Tailwind v4 + the Azul TARDIS
// theme render and that light/dark tokens resolve. Replaced by real sections in Phase 5.
export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const swatches = [
		{ name: 'background', cls: 'bg-background border border-separator' },
		{ name: 'surface', cls: 'bg-surface border border-separator' },
		{ name: 'accent', cls: 'bg-accent' },
		{ name: 'nova', cls: 'bg-nova' },
		{ name: 'foreground', cls: 'bg-foreground' },
	];

	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			{/* Logo showcase (Phase 3 review) */}
			<Card className="mb-10">
				<Card.Header>
					<Card.Title>Logo — constelación &lt;/&gt;</Card.Title>
					<Card.Description>
						Navbar brand, footer size, y estrella nova animada.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div className="flex flex-wrap items-center gap-x-10 gap-y-6">
						{/* as it appears in the navbar */}
						<div className="flex items-center gap-2">
							<Logo size={28} animated />
							<span className="font-mono text-lg font-semibold tracking-tight">
								Mónica P. Arroyo
							</span>
						</div>
						{/* footer size */}
						<Logo size={48} />
						{/* small / favicon-ish */}
						<Logo size={20} />
					</div>
				</Card.Content>
			</Card>

			<Chip variant="soft" color="accent">
				locale: {locale}
			</Chip>

			<h1 className="mt-6 font-mono text-4xl font-bold tracking-tight">
				Azul <span className="text-accent">TARDIS</span>{' '}
				<span className="text-nova">✦</span>
			</h1>
			<p className="mt-3 text-muted">
				HeroUI v3 + Tailwind v4 + next-intl v4 — smoke test.
			</p>

			<Separator className="my-8" />

			<div className="flex flex-wrap gap-3">
				<Button variant="primary">Primary (accent)</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button className="bg-nova text-nova-foreground">Nova</Button>
			</div>

			<Card className="mt-8">
				<Card.Header>
					<Card.Title>Card component</Card.Title>
					<Card.Description>
						Surface token, compound API, themed border.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
						{swatches.map((s) => (
							<div key={s.name} className="text-center">
								<div className={`h-14 w-full rounded-lg ${s.cls}`} />
								<span className="mt-1 block font-mono text-xs text-muted">
									{s.name}
								</span>
							</div>
						))}
					</div>
				</Card.Content>
			</Card>
		</div>
	);
}
