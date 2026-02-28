# English Plumber Astro Site

Astro site with TinaCMS wired for Git-backed content editing.

## Project Structure

```text
/
├── content/
│   └── tina/
│       └── site-content.json
├── public/
│   └── images/
├── src/
│   ├── data/
│   │   └── siteContent.ts
│   └── pages/
│       └── index.astro
└── tina/
    └── config.ts
```

`content/tina/site-content.json` is the source of truth edited by Tina.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Astro + Tina local editing mode |
| `npm run dev:astro` | Start plain Astro dev server |
| `npm run build` | Auto Tina build (Cloud mode when env vars exist, otherwise local mode) + Astro build |
| `npm run build:cloud` | Force Tina Cloud build + Astro build |
| `npm run build:local` | Local Tina build + Astro build (no Tina Cloud credentials required) |
| `npm run preview` | Preview `dist/` |

## TinaCMS Setup (Online Editing)

1. Create a Tina Cloud project at `https://app.tina.io/`.
2. Connect it to this GitHub repo (`Styryl1/web-basic`) and branch (`main`).
3. In Tina Cloud, copy:
   - `Client ID`
   - `Read Only Token`
4. Add these env vars in Cloudflare Pages project settings:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - Optional: `CF_PAGES_BRANCH` is already provided by Cloudflare.

After deploy, open:

- `https://<your-site>/admin/index.html`

and sign in with Tina to edit content online.

## Cloudflare Pages (GitHub Method)

Use these build settings in Cloudflare Pages:

- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

Every push to `main` triggers a new deploy.
