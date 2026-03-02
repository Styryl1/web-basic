## PR Checklist

- [ ] Tina editability preserved for all changed user-facing content (`data-tina-field` intact)
- [ ] No mirrored external markup/assets introduced; links and media are project-owned or explicitly approved
- [ ] SEO complete on changed pages (`title`, `description`, canonical, Open Graph/Twitter)
- [ ] Accessibility checks completed (keyboard nav, focus states, semantic headings/landmarks, alt text)
- [ ] Lighthouse quality gate passes (3-run median): Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95
- [ ] No Lighthouse regression > 5 points versus baseline
- [ ] Responsive verified at minimum: mobile, tablet, desktop
- [ ] `pnpm build:local` and `pnpm check` pass
