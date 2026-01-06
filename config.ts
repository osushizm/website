import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
  }),
});

const worksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).default([]),
    technologies: z.array(z.string()).default([]),
    links: z.object({
      github: z.string().url().optional(),
      demo: z.string().url().optional(),
      article: z.string().optional(),
    }).optional(),
    coverImage: z.string().optional(),
    screenshots: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  works: worksCollection,
};
