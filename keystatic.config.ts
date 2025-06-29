import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'thealanrajendram/APR_Artist_Agency',
    branchPrefix: 'feature/redesign'
  },
  ui: {
    brand: {
      name: 'APR Artist Agency CMS'
    }
  },
  collections: {
    work: collection({
      label: 'Work Portfolio',
      slugField: 'title',
      path: 'src/content/work/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Project Title' } }),
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
        content: fields.markdoc({
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
        title: fields.slug({ name: { label: 'Service Title' } }),
        order: fields.integer({
          label: 'Display Order',
          validation: { min: 1 }
        }),
        icon: fields.text({
          label: 'SVG Icon Code',
          multiline: true
        }),
        content: fields.markdoc({
          label: 'Service Description',
        }),
      },
    }),
    about: collection({
      label: 'About Pages',
      slugField: 'title',
      path: 'src/content/about/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Page Title' } }),
        order: fields.integer({
          label: 'Display Order',
          validation: { min: 1 }
        }),
        content: fields.markdoc({
          label: 'Page Content',
        }),
      },
    }),
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
        }),
      },
    }),
  },
});
