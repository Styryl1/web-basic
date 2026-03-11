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
| `pnpm install` | Install dependencies |
| `pnpm dev` | Start Astro + Tina local editing mode (`tinacms dev`) |
| `pnpm dev:cloud` | Build TinaCloud client (no local cache) then run Astro dev (for cloud-content preview) |
| `pnpm dev:local` | Start Astro + Tina local file-based editing mode |
| `pnpm dev:astro` | Start plain Astro dev server |
| `pnpm build` | Tina Cloud build (no local cache) + Astro build (requires Tina env vars) |
| `pnpm build:local` | Local Tina build + Astro build (no Tina Cloud credentials required) |
| `pnpm preview` | Preview `dist/` |
| `pnpm translations:sync` | Auto-fill missing locale translations with DeepL |

## Multilingual Content Workflow

The site now serves English at `/` and Dutch at `/nl/`.

All editable locale content lives in:

- `content/tina/site-content.json`
- `siteSettings` for shared site metadata and locale labels
- `pages.home.translations.en` for English content
- `pages.home.translations.nl` for Dutch content

To enable DeepL-assisted translation locally, add these env vars to `.env`:

```env
DEEPL_API_KEY=your_deepl_api_key
DEEPL_API_BASE_URL=https://api-free.deepl.com
TRANSLATION_SOURCE_LOCALE=en
TRANSLATION_TARGET_LOCALES=nl
```

If you use DeepL API Pro, set `DEEPL_API_BASE_URL=https://api.deepl.com`.

Recommended workflow:

1. Edit the English source content in Tina (`pages.home.translations.en`).
2. Run `pnpm translations:sync` (reads `.env` automatically).
3. Review and refine Dutch in Tina (`pages.home.translations.nl`).
4. Run `pnpm build:local` before shipping changes.

The translation script only fills blank or still-English target fields, so manual Dutch edits are preserved.

## TinaCMS Setup (Online Editing)

1. Create a Tina Cloud project at `https://app.tina.io/`.
2. Connect it to this GitHub repo (`Styryl1/web-basic`) and branch (`main`).
3. In Tina Cloud, copy:
   - `Client ID`
   - `Read Only Token`
4. Add these env vars in Cloudflare Pages project settings:
   - `NEXT_PUBLIC_TINA_CLIENT_ID`
   - `TINA_TOKEN`
   - `TINA_PREVIEW_ORIGIN` (set to your site URL, e.g. `https://englishplumber.nl`)
   - Optional: `CF_PAGES_BRANCH` is already provided by Cloudflare.
   - Optional: `CF_PAGES_URL` is auto-provided on Cloudflare preview deploys and is used as fallback for visual preview URL.
5. Trigger a new Cloudflare deploy.

For TinaCloud-backed preview/deploy, create a local `.env` file (not committed) with the same values, then run:

- `pnpm dev:cloud` (preview cloud-backed content in Astro dev)
- `pnpm build` (production build path)

Note: `dev:cloud` reads from Tina Cloud. If content in Tina Cloud was just changed, wait for branch indexing to finish in Tina Cloud, then refresh the page.

Also set the Tina Cloud project Site URL / Allowed Origins to include:

- `https://englishplumber.nl`

After deploy, open:

- `https://<your-site>/admin/index.html`

and sign in with Tina to edit content online.

## Cloudflare Pages (GitHub Method)

Use these build settings in Cloudflare Pages:

- Build command: `pnpm build`
- Build output directory: `dist`
- Root directory: `/`

Every push to `main` triggers a new deploy.
