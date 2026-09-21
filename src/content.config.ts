import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { createOutOfScopeSchema } from './lib/out-of-scope/schema';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    updated: z.coerce.date().optional(), tags: z.array(z.string()),
    readingTime: z.number().positive(), canonical: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

const outOfScope = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/out-of-scope' }),
  schema: ({ image }) => createOutOfScopeSchema(image()),
});

export const collections = { notes, outOfScope };
