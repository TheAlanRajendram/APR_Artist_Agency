import { defineCollection, z } from 'astro:content';

// Keystatic will manage the schema for work, services, and about collections.
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
  brands: brandsCollection,
};
