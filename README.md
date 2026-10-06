# rakarasell.dev

Personal portfolio, blog, and trading journal of Raka Rasell — live at [rakarasell.dev](https://rakarasell.dev).

Built with Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion, deployed to Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare).

## Pages

| Route              | Content                                                       |
| ------------------ | ------------------------------------------------------------- |
| `/`                | Home — hero, experience, tools, latest projects and posts     |
| `/about`           | About me                                                      |
| `/blog`            | Blog index, pulled from my Medium RSS feed                    |
| `/blog/[slug]`     | Local markdown posts from `src/posts/`                        |
| `/project`         | Selected projects                                             |
| `/trading-journal` | Public forex trading journal — stats, trades, reasons, lessons |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command           | Description                                             |
| ----------------- | ------------------------------------------------------- |
| `npm run dev`     | Start the dev server                                    |
| `npm run build`   | Production Next.js build                                |
| `npm run start`   | Run the production build                                |
| `npm run preview` | Build and run the Cloudflare Worker locally (wrangler)  |
| `npm run deploy`  | Build and deploy the Cloudflare Worker                  |
| `npm run shadcn`  | Add shadcn/ui components                                |

`dev` and `build` first run `scripts/generate-posts.mjs`, which bakes the markdown posts into `src/lib/posts.generated.ts` (Workers have no filesystem at runtime).

## Updating content

- **Blog post** — add a `.md` file with frontmatter (`title`, `date`, `slug`, `description`, `thumbnail`, `author`, `tags`) to `src/posts/`.
- **Trading journal** — edit `public/trading-journal.json` (account, summary, and trades). The page reads it at build time, so redeploy to publish changes. The raw file is also served at `/trading-journal.json`.
- **Projects, experience, testimonials, tools, nav menu** — edit the data arrays in `src/lib/` (`projectList.ts`, `experience.ts`, `testimonial.ts`, `tool.ts`, `menu.ts`).

## Deployment

Deployed on Cloudflare Workers with `@opennextjs/cloudflare`. Use `npm run deploy` locally.

For Cloudflare's dashboard Git integration (Workers Builds), set:

- **Build command:** `npm run build:worker`
- **Deploy command:** `npx wrangler deploy`

Images are served unoptimized (`images.unoptimized: true`), since Workers can't run the sharp-based `next/image` optimizer.
