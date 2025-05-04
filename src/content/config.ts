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

export const collections = {
  'portfolio': portfolioCollection,
};
