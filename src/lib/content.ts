// Governing: ADR-0001 (Astro Content Collections), ADR-0002 (EN/DE subpath routing and cross-locale linking)
// Implements: SPEC-0002 REQ "Localized Collection Listing and Detail Routes", SPEC-0002 REQ "Conditional Navigation and Graceful Empty States", SPEC-0002 REQ "Cross-Locale Entry Linking"

import { getCollection, type CollectionEntry } from 'astro:content';
import { localePath, type Locale } from '../i18n/ui';

export function extractEntrySlug(id: string): string {
  // Strips leading locale folder ("en/my-post" -> "my-post") and file extension if present
  return id
    .replace(/^(en|de)\//, '')
    .replace(/\.(md|mdx)$/, '');
}

export async function getPublishedProjects(lang: Locale): Promise<CollectionEntry<'projects'>[]> {
  const entries = await getCollection(
    'projects',
    (entry) => !entry.data.draft && entry.data.lang === lang,
  );
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPublishedBlogPosts(lang: Locale): Promise<CollectionEntry<'blog'>[]> {
  const entries = await getCollection(
    'blog',
    (entry) => !entry.data.draft && entry.data.lang === lang,
  );
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getCollectionNavVisibility(lang: Locale): Promise<{
  showProjects: boolean;
  showBlog: boolean;
}> {
  const [projects, blog] = await Promise.all([
    getPublishedProjects(lang),
    getPublishedBlogPosts(lang),
  ]);
  return {
    showProjects: projects.length > 0,
    showBlog: blog.length > 0,
  };
}

export async function resolveCollectionTranslationPath(
  collectionName: 'projects' | 'blog',
  currentEntry: CollectionEntry<'projects'> | CollectionEntry<'blog'>,
  targetLang: Locale,
): Promise<{ path: string; hasExactTranslation: boolean }> {
  const fallbackIndex = localePath(targetLang, `/${collectionName}`);
  const key = currentEntry.data.translationSlug;
  if (!key) {
    return { path: fallbackIndex, hasExactTranslation: false };
  }

  const candidates =
    collectionName === 'projects'
      ? await getPublishedProjects(targetLang)
      : await getPublishedBlogPosts(targetLang);

  const match = candidates.find(
    (entry) => entry.data.translationSlug === key || extractEntrySlug(entry.id) === key,
  );

  if (!match) {
    return { path: fallbackIndex, hasExactTranslation: false };
  }

  const slug = extractEntrySlug(match.id);
  return {
    path: localePath(targetLang, `/${collectionName}/${slug}`),
    hasExactTranslation: true,
  };
}
