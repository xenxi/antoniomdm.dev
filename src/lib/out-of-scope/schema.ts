import { z } from 'astro/zod';

export function createOutOfScopeSchema<T extends z.ZodType>(coverSchema: T) {
  return z.object({
    title: z.string().min(1),
    summary: z.string().min(40, 'summary must contain at least 40 characters'),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'slug must be kebab-case'),
    locale: z.enum(['es', 'en']),
    translationKey: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    tags: z.array(z.string().min(1)).min(1),
    category: z.string().min(1),
    series: z.string().min(1).optional(),
    cover: coverSchema.optional(),
    coverAlt: z.string().min(1).optional(),
    type: z.enum(['exploration', 'experiment', 'postmortem', 'notes']),
    readingTime: z.number().int().positive(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    seo: z.object({ description: z.string().min(40).max(170) }).optional(),
    linkedin: z.object({
      enabled: z.boolean().default(true),
      mode: z.enum(['review', 'auto', 'disabled']).default('review'),
      text: z.string().min(1).optional(),
    }).default({ enabled: true, mode: 'review' }),
  }).superRefine((value, context) => {
    if (value.cover && !value.coverAlt) {
      context.addIssue({ code: 'custom', path: ['coverAlt'], message: 'coverAlt is required when cover is set' });
    }
    if (value.linkedin.mode === 'disabled' && value.linkedin.enabled) {
      context.addIssue({ code: 'custom', path: ['linkedin', 'enabled'], message: 'linkedin.enabled must be false when mode is disabled' });
    }
  });
}
