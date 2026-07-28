import { Card, Chip } from '@heroui/react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getAllPosts } from '@/lib/sanity';
import { formatDate } from '@/lib/format';

export const revalidate = 3600;

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: 'blog' });
	const url = `/${locale}/blog`;
	return {
		title: 'Blog',
		description: t('subheading'),
		alternates: { canonical: url },
		openGraph: {
			type: 'website',
			title: 'Blog',
			description: t('subheading'),
			url,
		},
	};
}

export default async function BlogPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);
	const [t, posts] = await Promise.all([
		getTranslations('blog'),
		getAllPosts(),
	]);

	return (
		<section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
			<div className="flex items-center gap-4">
				<h1 className="whitespace-nowrap text-3xl font-bold tracking-tight">
					<span className="text-accent">#</span>
					{t('heading')}
				</h1>
				<span className="h-px flex-1 bg-separator" />
			</div>
			<p className="mt-2 text-muted">{t('subheading')}</p>

			{posts.length === 0 ? (
				<div className="mt-12 rounded-xl border border-separator bg-surface p-12 text-center text-muted">
					{t('empty')}
				</div>
			) : (
				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<Link
							key={post.slug}
							href={`/blog/${post.slug}`}
							className="group block"
						>
							<Card className="flex h-full flex-col transition-transform group-hover:-translate-y-1">
								{post.cover && (
									<div className="relative h-40 overflow-hidden rounded-lg">
										<Image
											src={post.cover.url}
											alt={post.cover.alt}
											fill
											sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 50vw, 33vw"
											className="object-cover"
										/>
									</div>
								)}
								<Card.Header>
									<Card.Title className="group-hover:text-accent">
										{post.title}
									</Card.Title>
									{post.publishedDate && (
										<time className="text-xs text-muted">
											{formatDate(post.publishedDate, locale)}
										</time>
									)}
								</Card.Header>
								{post.excerpt && (
									<Card.Content>
										<p className="line-clamp-3 text-sm text-muted">
											{post.excerpt}
										</p>
									</Card.Content>
								)}
								{post.tags.length > 0 && (
									<Card.Footer className="mt-auto flex flex-wrap gap-2">
										{post.tags.map((tag) => (
											<Chip key={tag} size="sm" variant="soft" color="accent">
												{tag}
											</Chip>
										))}
									</Card.Footer>
								)}
							</Card>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
