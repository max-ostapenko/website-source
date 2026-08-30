import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const linkSchema = z.object({
  text: z.string(),
  href: z.string(),
  icon: z.string().optional(),
});

const posts = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_drafts/**'],
    base: './src/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    categories: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    'code-links': z.array(linkSchema).optional(),
    codeLinks: z.array(linkSchema).optional(),
    'other-links': z.array(linkSchema).optional(),
    otherLinks: z.array(linkSchema).optional(),
  }).transform((data) => ({
    ...data,
    codeLinks: data.codeLinks || data['code-links'] || [],
    otherLinks: data.otherLinks || data['other-links'] || [],
  })),
});

const projects = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_drafts/**'],
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    'code-links': z.array(linkSchema).optional(),
    codeLinks: z.array(linkSchema).optional(),
    'other-links': z.array(linkSchema).optional(),
    otherLinks: z.array(linkSchema).optional(),
  }).transform((data) => ({
    ...data,
    codeLinks: data.codeLinks || data['code-links'] || [],
    otherLinks: data.otherLinks || data['other-links'] || [],
  })),
});

const learning = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_drafts/**'],
    base: './src/content/learning',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects, learning };
