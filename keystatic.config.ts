import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    blog: collection({
      label: '文章 / Blog',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          multiline: true,
        }),
        pubDatetime: fields.datetime({
          label: 'Publish Date',
          defaultValue: { kind: 'now' },
        }),
        modDatetime: fields.datetime({
          label: 'Updated Date',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        featured: fields.checkbox({
          label: 'Featured',
          defaultValue: false,
        }),
        author: fields.text({
          label: 'Author',
          defaultValue: '大橘官',
        }),
        hideEditPost: fields.checkbox({
          label: 'Hide edit link',
          defaultValue: true,
        }),
        content: fields.mdx({
          label: 'Content',
          extension: 'md',
          options: {
            image: {
              directory: 'src/assets/blog',
              publicPath: '../../assets/blog/',
            },
          },
        }),
      },
    }),
    notes: collection({
      label: '碎碎念 / Notes',
      slugField: 'title',
      path: 'src/content/notes/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: {
            label: 'Title',
            description: 'Short label for the note (also used as slug)',
          },
        }),
        publishDate: fields.datetime({
          label: 'Publish Date',
          defaultValue: { kind: 'now' },
        }),
        link: fields.url({
          label: 'Optional link',
          description: 'External URL to attach (optional)',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Note',
          extension: 'md',
          options: {
            image: {
              directory: 'src/content/notes',
              publicPath: './',
            },
          },
        }),
      },
    }),
  },
});
