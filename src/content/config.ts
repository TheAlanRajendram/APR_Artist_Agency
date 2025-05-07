import { defineCollection, z } from 'astro:content';

const portfolioCollection = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string(),
    title: z.string(),
    brand: z.string(),
    artist: z.string(),
    date: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(), // For controlling the display order
    description: z.string().optional(),
    listItems: z.array(z.string()).optional(),
  }),
});

const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(), // For controlling the display order
  }),
});

export const collections = {
  'portfolio': portfolioCollection,
  'services': servicesCollection,
  'about': aboutCollection,
};
