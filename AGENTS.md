# AGENTS.md

## Purpose
This repository builds an Astro site where design consistency, liquid-glass aesthetics, performance, SEO, and editor experience are non-negotiable.

If a tradeoff is required, prioritize in this order:
1. Correctness and editability in TinaCMS
2. Performance and accessibility
3. SEO completeness
4. Visual polish and motion

## Project Stack Snapshot
- Framework: Astro `^5.17.1`
- Adapter: `@astrojs/cloudflare`
- UI framework integration: `@astrojs/react` (used for Tina inline bridge)
- CMS: TinaCMS Cloud (`tinacms`, `@tinacms/cli`)
- Runtime target: Cloudflare Pages/Workers via Wrangler

## Source Of Truth
- Main editable content: `content/tina/site-content.json`
- Tina schema/config: `tina/config.ts`
- Tina generated client/types: `tina/__generated__/`
- Main page: `src/pages/index.astro`
- Tina inline React bridge: `src/components/react/TinaInlineBridge.tsx`

Never bypass these sources with hardcoded user-facing copy unless explicitly requested.

## Core Non-Negotiables

### 0) Own The Code + Assets
- Do not mirror or embed third-party site markup, CSS, JS, or media endpoints.
- Do not hardcode external brand/domain links unless explicitly required by project content.
- Use project-owned assets under `public/` (or Tina-managed media that resolves to this project), not copied remote pipelines.
- Keep implementation Astro-native; avoid introducing framework-specific output patterns from other stacks.

### 1) Universal Styles, Not One-Off Styling
- Reuse shared design tokens (color, spacing, radius, shadows, blur, typography, transitions).
- Prefer globally reusable classes/tokens over per-section bespoke values.
- Avoid scattering random hex values and arbitrary spacing in component-level edits.
- Keep a single visual language across all sections and routes.

### 2) Liquid-Glass Visual System
- Preserve the existing liquid-glass style language (`ep-soft-liquid`, layered borders, translucency, subtle glow).
- Use blur, transparency, gradients, and layered highlights intentionally, not as decoration spam.
- Maintain readable contrast and keyboard focus states in all glass surfaces.
- Provide graceful fallback when `backdrop-filter` is unsupported.

### 3) Performance Is A Feature
- Astro-first approach: ship HTML by default, send minimal JS.
- Hydrate only what must be interactive.
- Keep image payloads and font payloads lean.
- Avoid layout shift by always setting image dimensions.

### 4) SEO Is Required, Not Optional
Every page must include:
- Unique `<title>`
- Meta description
- Canonical URL
- Open Graph metadata
- Sensible heading hierarchy (`h1` once, then descending levels)
- Crawl-friendly internal linking

For site-level SEO, ensure:
- `site` is set in `astro.config.mjs`
- Sitemap generation is enabled (`@astrojs/sitemap`)
- `robots.txt` includes sitemap URL

### 5) Everything User-Facing Is Editable In Tina
- All visible marketing copy, labels, CTA text, internal/external URLs, social URLs, alt text, and repeatable content must come from Tina-backed data.
- Content images should be Tina-editable (prefer Tina media fields over hardcoded path strings).
- Keep core brand/system assets code-owned (for example: fixed logo assets or decorative framework graphics that are not editorial content).
- New sections must be wired into `content/tina/site-content.json` and exposed through Tina schema generation.
- Preserve inline editing support by maintaining `data-tina-field` bindings.

## Astro Implementation Rules

### Static-First + Islands
- Astro components are static by default; keep it that way unless interactivity is needed.
- For framework components, choose the lightest hydration directive that satisfies UX:
1. `client:load` only for above-the-fold critical interactivity
2. `client:idle` for non-critical interaction
3. `client:visible` for below-the-fold/heavy islands
- Do not use `client:only` unless SSR output is impossible.

### Scripts
- Prefer Astro-processed scripts (plain `<script>` without extra attrs) for bundling and dedupe.
- Use `is:inline` only when intentionally opting out of bundling/processing.
- Keep client-side scripts small and scoped to specific behavior.

### Styling In Astro
- Scoped styles are default; use global styles only for shared tokens/utilities/base reset.
- Keep global cascade predictable and minimal.
- If styling CMS-injected HTML, use targeted `:global(...)` selectors carefully.

### Images
- Prefer `astro:assets` (`<Image />` / `<Picture />`) where possible.
- If using `/public` images, always include explicit `width` and `height`.
- Use meaningful `alt` text from Tina content.
- Default to lazy loading except LCP/hero assets.

## TinaCMS Cloud + Inline Editing Rules

### Content Modeling
- Add/extend fields in `content/tina/site-content.json` first.
- Keep content nested by section to mirror page structure.
- Use stable keys to avoid breaking existing editor data.
- For editable images, use structured Tina fields and validate alt text + URL/path format.

### Inline Editing Wiring
- Keep `TinaInlineBridge` mounted with `client:tina`.
- Preserve metadata wrapping pattern (`addMetadata`, `hashFromQuery`) used by inline editing.
- Add `data-tina-field={tinaField(...)}` to editable nodes.
- For list items, include index-aware bindings (`tinaField(section, 'items', index)`).

### Do Not Regress Editor UX
- Do not remove existing Tina bindings.
- Do not move critical content into CSS pseudo-elements where Tina cannot edit it.
- Do not hardcode text that exists in Tina content.

## Universal Style System Requirements
When touching styles, enforce this structure (incrementally if refactoring existing code):
1. Design tokens: colors, spacing, radii, typography, elevation, blur, motion
2. Base layer: reset, typography defaults, layout primitives (`.container`, section rhythm)
3. Component layer: reusable patterns (buttons, cards, chips, liquid surfaces)
4. Section overrides: only where layout/content requires variation

New UI must consume shared tokens/classes before introducing new local rules.

## Accessibility Requirements
- Maintain keyboard access for all interactive elements.
- Visible focus states are mandatory.
- Respect `prefers-reduced-motion`.
- Use semantic landmarks (`header`, `main`, `footer`, `nav`) and valid heading order.
- Provide alt text for meaningful images; decorative images use empty alt.

## Performance Guardrails
- Avoid unnecessary React islands and large client bundles.
- Limit heavy effects (blur/shadow/filter) on large scrolling surfaces.
- Prefer CSS over JS for simple visual behavior.
- Minimize webfont count/weights; use `font-display: swap`.
- Ensure LCP content is not blocked by non-critical JS.

## SEO Guardrails
- One canonical URL per page.
- No duplicate titles/descriptions across pages.
- Use descriptive anchor text.
- Ensure structured data (JSON-LD) for business pages when available.
- Keep metadata server-rendered, not client-injected.
- Use a shared SEO component (`SEO.astro`) for all routes/layouts to centralize metadata defaults and page-level overrides.

## CI Quality Gates
- Enforce Lighthouse in CI using mobile profile.
- Run Lighthouse 3 times and use the median result to reduce flaky failures.
- Minimum scores: Performance `>= 90`, SEO `>= 95`, Accessibility `>= 95`, Best Practices `>= 95`.
- Regression gate: fail CI if any score drops by more than `5` points versus established baseline.

## Build, Verify, Ship Checklist
Before finalizing changes:
1. `pnpm dev` for Tina local editing flow, or `pnpm dev:astro` for plain Astro
2. `pnpm build:local` to verify build without cloud credentials
3. `pnpm build` when Tina cloud env vars are available
4. Verify inline edits still work on touched content
5. Verify responsive layout on mobile and desktop
6. Verify no console/runtime errors
7. Verify core metadata exists on modified pages
8. Run Lighthouse checks using CI thresholds before merge

## MCP Usage Expectations
- Use Astro MCP docs for Astro-specific decisions when uncertain.
- Prefer Astro documentation-backed solutions over ad-hoc framework patterns.

## Editing Behavior For Future Agents
- Make minimal, targeted changes.
- Do not remove or rewrite unrelated working sections.
- Preserve existing naming conventions (`ep-*`, section-specific class prefixes).
- Favor incremental refactors over large rewrites unless explicitly requested.

## Current Project-Specific Notes
- The current site is primarily a single large Astro page with a strong existing liquid-glass motif.
- There is already a custom `client:tina` directive bridge and inline metadata wiring; preserve this.
- If refactoring styles into shared files, preserve visual parity and Tina bindings first, then optimize structure.
