import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllPosts } from '@/lib/sanity';

const BASE = 'https://monicaparroyo.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const posts = await getAllPosts();
	const entries: MetadataRoute.Sitemap = [];

	for (const locale of routing.locales) {
		entries.push({ url: `${BASE}/${locale}`, changeFrequency: 'monthly', priority: 1 });
		entries.push({
			url: `${BASE}/${locale}/blog`,
			changeFrequency: 'weekly',
			priority: 0.7,
		});
		for (const post of posts) {
			entries.push({
				url: `${BASE}/${locale}/blog/${post.slug}`,
				lastModified: post.publishedDate ? new Date(post.publishedDate) : undefined,
				changeFrequency: 'monthly',
				priority: 0.5,
			});
		}
	}

	return entries;
}
