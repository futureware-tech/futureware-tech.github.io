// Governing: ADR-0001 (Astro Content Collections), ADR-0002 (Bilingual EN/DE content schemas)
// Implements: SPEC-0002 REQ "Typed Content Schemas for Projects and Blog"

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const baseContentFields = {
  title: z.string().min(1),
  description: z.string().min(1),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  lang: z.enum(['en', 'de']),
  translationSlug: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    ...baseContentFields,
    client: z.string().optional(),
    industry: z.string().optional(),
    services: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    ...baseContentFields,
  }),
});

export const collections = {
  projects,
  blog,
};
