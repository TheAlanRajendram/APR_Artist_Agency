import { config, fields, collection, singleton } from '@keystatic/core';

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
  singletons: {
    brands: singleton({
      label: 'Brand Logos',
      path: 'src/content/brands/brands',
      schema: {
        brands: fields.array(
          fields.object({
            name: fields.text({
              label: 'Brand Name',
              description: 'The name of the brand (used for alt text and identification)',
            }),
            logo: fields.image({
              label: 'Brand Logo',
              description: 'Upload the brand logo image (SVG or PNG format recommended)',
              directory: 'public/images/brands',
              publicPath: '/images/brands/',
              validation: {
                isRequired: true
              }
            }),
            isActive: fields.checkbox({
              label: 'Show in Animation',
              description: 'Check this box to include this brand in the scrolling animation',
              defaultValue: true
            }),
          }),
          {
            label: 'Brand List',
            itemLabel: props => props.fields.name.value || 'New Brand'
          }
        ),
      },
    }),
  },
  collections: {
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
        date: fields.text({
          label: 'Project Date',
          description: 'Enter date in YYYY-MM-DD format (e.g., 2025-01-15)',
          validation: {
            isRequired: true,
            pattern: {
              regex: /^\d{4}-\d{2}-\d{2}$/,
              message: 'Date must be in YYYY-MM-DD format'
            }
          }
        }),
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
        gallery: fields.array(
          fields.object({
            media: fields.conditional(
              fields.select({
                label: 'Media Type',
                options: [
                  { label: 'Image', value: 'image' },
                  { label: 'Video', value: 'video' }
                ],
                defaultValue: 'image'
              }),
              {
                image: fields.image({
                  label: 'Image File',
                  description: 'Upload an image file (JPG, PNG, WebP). Add a caption below for better CMS preview.',
                  directory: 'public/images/work/gallery',
                  publicPath: '/images/work/gallery/',
                }),
                video: fields.object({
                  file: fields.file({
                    label: 'Video File',
                    description: 'Upload a video file (MP4, WebM, MOV)',
                    directory: 'public/videos/work/gallery',
                    publicPath: '/videos/work/gallery/',
                  }),
                  thumbnail: fields.image({
                    label: 'Video Thumbnail/Preview',
                    description: 'Upload a preview image for this video (RECOMMENDED - shows as preview in CMS)',
                    directory: 'public/images/work/gallery',
                    publicPath: '/images/work/gallery/',
                    validation: {
                      isRequired: false
                    }
                  }),
                })
              }
            ),
            caption: fields.text({
              label: 'Caption/Description',
              description: 'Brief description of this media (RECOMMENDED - shows as preview text in CMS list)',
            }),
          }),
                              {
            label: 'Project Gallery',
            itemLabel: props => {
              const mediaType = props.fields.media.discriminant;
              const caption = props.fields.caption.value;

              if (mediaType === 'image') {
                return caption
                  ? `📷 ${caption}`
                  : `📷 Image (add caption for better preview)`;
              } else if (mediaType === 'video') {
                return caption
                  ? `🎬 ${caption}`
                  : `🎬 Video (add caption & thumbnail for better preview)`;
              }

              return caption || 'Media Item';
            }
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
