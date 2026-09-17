import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    updated: z.coerce.date().optional(), tags: z.array(z.string()),
    readingTime: z.number().positive(), canonical: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});
export const collections = { notes };
