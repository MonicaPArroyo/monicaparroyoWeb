import { Chip } from '@heroui/react';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { PortableTextBody } from '@/components/blog/portable-text';
import { Link } from '@/i18n/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/sanity';
import { formatDate } from '@/lib/format';

export const revalidate = 3600;

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
	const { locale, slug } = await params;
	const post = await getPostBySlug(slug);
	if (!post) return { title: 'Blog' };
	const url = `/${locale}/blog/${slug}`;
	return {
		title: post.title,
		description: post.excerpt,
		alternates: { canonical: url },
		openGraph: {
			type: 'article',
			title: post.title,
			description: post.excerpt,
			url,
			publishedTime: post.publishedDate,
			images: post.cover ? [{ url: post.cover.url }] : undefined,
		},
	};
}

export default async function PostPage({
	params,
}: {
	params: Promise<{ locale: string; slug: string }>;
}) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const [t, post] = await Promise.all([
		getTranslations('blog'),
		getPostBySlug(slug),
	]);
	if (!post) notFound();

	return (
		<article className="mx-auto max-w-3xl px-6 py-16">
			<nav className="mb-8 flex flex-wrap items-center gap-2 font-mono text-sm text-muted">
				<Link href="/" className="hover:text-accent">
					{t('breadcrumbHome')}
				</Link>
				<span>/</span>
				<Link href="/blog" className="hover:text-accent">
					{t('breadcrumbBlog')}
				</Link>
				<span>/</span>
				<span className="truncate text-foreground">{post.title}</span>
			</nav>

			<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
				{post.title}
			</h1>
			{post.publishedDate && (
				<time className="mt-3 block text-sm text-muted">
					{t('publishedOn')} {formatDate(post.publishedDate, locale)}
				</time>
			)}
			{post.tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<Chip key={tag} size="sm" variant="soft" color="accent">
							{tag}
						</Chip>
					))}
				</div>
			)}

			{post.cover && (
				<Image
					src={post.cover.url}
					alt={post.cover.alt}
					width={post.cover.width ?? 1200}
					height={post.cover.height ?? 630}
					sizes="(max-width: 768px) 100vw, 768px"
					className="mt-8 w-full rounded-2xl border border-separator object-cover"
					priority
				/>
			)}

			<div className="mt-8">
				{post.body && <PortableTextBody value={post.body} />}
			</div>

			<div className="mt-14">
				<Link href="/blog" className="font-mono text-sm text-accent hover:underline">
					← {t('backToBlog')}
				</Link>
			</div>
		</article>
	);
}
