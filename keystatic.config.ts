import { config, fields, collection } from '@keystatic/core';

export default config({
	storage: {
		// Local filesystem while developing (`npm run dev` → /keystatic).
		// To edit on the deployed site, switch to GitHub storage (see README).
		kind: 'local',
	},
	collections: {
		blog: collection({
			label: 'Blog',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({
					label: 'Description',
					multiline: true,
				}),
				pubDate: fields.date({
					label: 'Publish Date',
				}),
				updatedDate: fields.date({
					label: 'Updated Date',
				}),
				heroImage: fields.image({
					label: 'Hero Image',
					directory: 'src/assets',
					publicPath: '../../assets/',
				}),
				// Keep .md so existing official-template posts stay editable.
				content: fields.mdx({
					label: 'Content',
					extension: 'md',
					options: {
						image: {
							directory: 'src/assets',
							publicPath: '../../assets/',
						},
					},
				}),
			},
		}),
	},
});
