# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and Open Graph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## ✍️ Writing posts / 写文章

- Put Markdown or MDX files in `src/content/blog/`
- Frontmatter needs at least `title`, `description`, `pubDate` (see sample posts)
- Images: put files in `src/assets/` (or use Markdown `![alt](path)` / MDX components as in the template)

中文：在 `src/content/blog/` 新建 `.md` / `.mdx`，照着示例填 frontmatter；配图放 `src/assets/`，正文用 Markdown 图片语法即可。

## ☁️ Deploy to Vercel / 部署到 Vercel

1. Import this GitHub repo in Vercel (Framework Preset: Astro, or leave Auto)
2. Build Command: `npm run build` · Output: `dist` (Astro static default)
3. Every push to `main` auto-deploys

中文：在 Vercel 导入本仓库即可；静态产物默认在 `dist/`，推送 `main` 后自动上线。无需 CMS。

## 📝 Keystatic Admin / 用 Keystatic 写文章

Local admin UI (recommended for day-to-day writing):

```sh
npm run dev
```

Open [http://127.0.0.1:4321/keystatic](http://127.0.0.1:4321/keystatic) → **Blog** → create/edit posts. Saving writes Markdown under `src/content/blog/`; commit & push to redeploy on Vercel.

中文：本地 `npm run dev` 后打开 `/keystatic`，在后台改文章即可；保存会写回仓库里的 Markdown，推送 `main` 后 Vercel 自动上线。

> Existing sample `using-mdx.mdx` uses MDX `import`s — edit that one in the code editor. New posts from Keystatic use plain `.md` and work in the Admin UI.

### Optional: edit on the live site (GitHub storage)

To use `/keystatic` on the deployed Vercel URL, switch `storage.kind` to `'github'` in `keystatic.config.ts` and follow [Keystatic’s GitHub storage guide](https://keystatic.com/docs/github-mode) (GitHub App / OAuth). Until then, local Admin + `git push` is the lightest workflow.
