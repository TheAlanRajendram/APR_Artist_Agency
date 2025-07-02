import { defineCollection, z } from 'astro:content';

// Services collection schema
const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number(),
    icon: z.string().optional(),
    image: z.string().optional(),
  }),
});

// Work collection schema
const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    brand: z.string(),
    artist: z.string(),
    date: z.string(),
    image: z.string(),
    tags: z.array(z.string()),
    gallery: z.array(z.object({
      media: z.discriminatedUnion('discriminant', [
        z.object({
          discriminant: z.literal('image'),
          value: z.string(),
        }),
        z.object({
          discriminant: z.literal('video'),
          value: z.object({
            file: z.string(),
            thumbnail: z.string().optional(),
          }),
        }),
      ]),
      caption: z.string().optional(),
    })).optional(),
  }),
});

// About collection schema (for future use)
const aboutCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    order: z.number().optional(),
    image: z.string().optional(),
  }),
});

// Brands collection defined here for single-file management
const brandsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    brands: z.array(z.object({
      name: z.string(),
      logo: z.string(),
      isActive: z.boolean(),
    })),
  }),
});

export const collections = {
  services: servicesCollection,
  work: workCollection,
  about: aboutCollection,
  brands: brandsCollection,
};
