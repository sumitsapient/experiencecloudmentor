import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string(),
    category: z.enum(['AEM', 'RTCDP', 'AJO', 'Adobe Target', 'EDS']),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Beginner to Advanced']),
    duration: z.string(),
    deliveryMode: z.string(),
    pacingOptions: z
      .array(
        z.object({
          label: z.string(),
          schedule: z.string(),
        })
      )
      .default([]),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    prerequisites: z.array(z.string()).default([]),
    whoIsThisFor: z.array(z.string()).default([]),
    outcomes: z.array(z.string()).default([]),
    curriculum: z.array(
      z.object({
        module: z.string(),
        topics: z.array(z.string()),
      })
    ),
  }),
});

export const collections = { courses };
