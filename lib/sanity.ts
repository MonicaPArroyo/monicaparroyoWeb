import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export type BlogPost = {
	title: string;
	slug: string;
	excerpt?: string;
	cover?: { url: string; width?: number; height?: number; alt: string };
	publishedDate?: string;
	tags: string[];
	/** Portable Text blocks. */
	body: unknown[] | null;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

/** Null until Sanity is configured, so the blog degrades to an empty state. */
export const sanityClient: SanityClient | null = projectId
	? createClient({
			projectId,
			dataset,
			apiVersion,
			useCdn: true,
			...(process.env.SANITY_API_READ_TOKEN
				? { token: process.env.SANITY_API_READ_TOKEN }
				: {}),
		})
	: null;

const builder = projectId ? imageUrlBuilder({ projectId, dataset }) : null;
export function urlFor(source: unknown) {
	return builder ? builder.image(source as never) : null;
}

const POST_FIELDS = /* groq */ `
	title,
	"slug": slug.current,
	excerpt,
	publishedDate,
	tags,
	"cover": coverImage{
		"url": asset->url,
		"width": asset->metadata.dimensions.width,
		"height": asset->metadata.dimensions.height,
		"alt": coalesce(alt, ^.title)
	}
`;

function mapPost(doc: any): BlogPost {
	return {
		title: doc?.title ?? '',
		slug: doc?.slug ?? '',
		excerpt: doc?.excerpt ?? undefined,
		cover: doc?.cover?.url
			? {
					url: doc.cover.url,
					width: doc.cover.width,
					height: doc.cover.height,
					alt: doc.cover.alt ?? doc.title ?? '',
				}
			: undefined,
		publishedDate: doc?.publishedDate,
		tags: Array.isArray(doc?.tags) ? doc.tags : [],
		body: doc?.body ?? null,
	};
}

export async function getAllPosts(): Promise<BlogPost[]> {
	if (!sanityClient) return [];
	try {
		const docs = await sanityClient.fetch(
			`*[_type == "blogPost" && defined(slug.current)] | order(publishedDate desc){${POST_FIELDS}}`,
		);
		return (docs ?? []).map(mapPost);
	} catch (err) {
		console.error('[sanity] getAllPosts failed:', err);
		return [];
	}
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
	if (!sanityClient) return null;
	try {
		const doc = await sanityClient.fetch(
			`*[_type == "blogPost" && slug.current == $slug][0]{${POST_FIELDS}, body}`,
			{ slug },
		);
		return doc ? mapPost(doc) : null;
	} catch (err) {
		console.error('[sanity] getPostBySlug failed:', err);
		return null;
	}
}

export const isSanityConfigured = Boolean(projectId);
