import { defineCollection, z } from 'astro:content';

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    layout: z.string().optional(),
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
    icon: z.string().optional(),
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
  'work': workCollection,
  'services': servicesCollection,
  'about': aboutCollection,
};
