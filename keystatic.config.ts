import { config, fields, collection } from '@keystatic/core';

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? { kind: 'local' }
      : {
          kind: 'github',
          repo: 'thealanrajendram/APR_Artist_Agency',
        },
  ui: {
    brand: {
      name: 'APR Artist Agency CMS'
    }
  },
  collections: {
    brands: collection({
      label: 'Brand Logos',
      slugField: 'name',
      path: 'src/content/brands/*',
      schema: {
        name: fields.text({
          label: 'Brand Name',
          description: 'The name of the brand (used for alt text and identification)',
        }),
        logo: fields.image({
          label: 'Brand Logo',
          description: 'Upload the brand logo image (SVG or PNG format recommended)',
          directory: 'public/images/brands',
          publicPath: '/images/brands/'
        }),
        isActive: fields.checkbox({
          label: 'Show in Animation',
          description: 'Check this box to include this brand in the scrolling animation',
          defaultValue: true
        }),
      },
    }),
    work: collection({
      label: 'Work',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Project Title',
            description: 'The name of this project as it will appear on the website',
          },
          slug: {
            label: 'URL-friendly name',
            description: 'This creates the web address for this project (auto-generated from title)'
          }
        }),
        brand: fields.text({ label: 'Brand Name' }),
        artist: fields.text({ label: 'Artist Name' }),
        date: fields.date({ label: 'Project Date' }),
        image: fields.image({
          label: 'Project Image',
          directory: 'public/images/work',
          publicPath: '/images/work/'
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: props => props.value
          }
        ),
        content: fields.mdx({
          label: 'Project Description',
        }),
      },
    }),
    services: collection({
      label: 'Services',
      slugField: 'title',
      path: 'src/content/services/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Service Title',
            description: 'The name of this service as it will appear on the website',
          },
          slug: {
            label: 'URL-friendly name',
            description: 'This creates the web address for this service (auto-generated from title)'
          }
        }),
        order: fields.integer({
          label: 'Display Order',
          validation: { min: 1 }
        }),
        icon: fields.text({
          label: 'SVG Icon Code',
          multiline: true
        }),
        content: fields.mdx({
          label: 'Service Description',
        }),
      },
    }),
    about: collection({
      label: 'About',
      slugField: 'title',
      path: 'src/content/about/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Page Title',
            description: 'The title of this about section as it will appear on the website',
          },
          slug: {
            label: 'URL-friendly name',
            description: 'This creates the file name for this section (auto-generated from title)'
          }
        }),
        order: fields.integer({
          label: 'Display Order',
          validation: { min: 1 }
        }),
        image: fields.image({
          label: 'Page Image',
          directory: 'public/images/about',
          publicPath: '/images/about/'
        }),
        content: fields.mdx({
          label: 'Page Content',
        }),
      },
    }),
  },
});
