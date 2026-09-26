# FreshFind quality audit

Public site configured: https://freshfind-app.netlify.app

## Final measured results

The 95–100 target is **not fully achieved**. All 13 routes score 100 for accessibility, best practices and SEO on both device profiles, and 100 for desktop performance. Mobile performance meets the target on 10 of 13 routes; the homepage and the two authentication previews remain below it.

| Route | Mobile performance | Desktop performance | Accessibility / Best practices / SEO, both devices |
| --- | ---: | ---: | --- |
| `/` | 93 | 100 | 100 / 100 / 100 |
| `/markets` | 96 | 100 | 100 / 100 / 100 |
| `/markets/1` | 96 | 100 | 100 / 100 / 100 |
| `/markets/2` | 97 | 100 | 100 / 100 / 100 |
| `/markets/3` | 97 | 100 | 100 / 100 / 100 |
| `/markets/4` | 96 | 100 | 100 / 100 / 100 |
| `/markets/5` | 96 | 100 | 100 / 100 / 100 |
| `/produce-guide` | 95 | 100 | 100 / 100 / 100 |
| `/saved` | 96 | 100 | 100 / 100 / 100 |
| `/about` | 96 | 100 | 100 / 100 / 100 |
| `/contact` | 96 | 100 | 100 / 100 / 100 |
| `/login` | 94 | 100 | 100 / 100 / 100 |
| `/signup` | 94 | 100 | 100 / 100 / 100 |

These are the final complete batch, not the best scores selected from earlier runs. Some earlier runs reached 95 on the homepage, but that result was not sustained. Remaining work is mobile first-paint/hero rendering and initial JavaScript execution on the three pages above, followed by repeat measurements and a separate audit of the deployed Netlify site. The current audit command correctly exits with a failing status because those pages do not reach 95.

Build, lint and 121 static checks passed. Functional checks below passed. Visual evidence: [mobile](previews/quality-mobile.png) and [desktop](previews/quality-desktop.png).

## Scope and measurement

Local production-build verification on 26 September 2026, using Lighthouse 13.5.0 and installed Chrome 154. Default Lighthouse mobile and desktop profiles; no audits disabled within the four selected categories and no custom throttling. Results are laboratory scores, not guarantees of live-site speed or WCAG conformance. Deployment and live Netlify verification remain separate steps.

Detailed JSON and HTML reports are in `docs/audits/`. The report's `fetchTime`, `environment` and `configSettings` identify its conditions. `latest-run.json` covers the most recent batch only. Earlier `docs/lighthouse-*.json` files used an obsolete bundled browser and are not the final results.

## Implemented improvements

- Prerender all 13 public routes with route-specific titles, descriptions, canonical URLs, social tags and JSON-LD. Include a sitemap, robots.txt, real favicon and descriptive llms.txt.
- Hydrate existing content instead of replacing it. Keep stored bookmarks and time-dependent schedules consistent during hydration.
- Split page code, preload the initial route and its dependencies, and resolve it before rendering/hydration so static pages never contain unresolved loading placeholders.
- Self-host fonts, inline the critical shared stylesheet, preload hero assets, provide responsive WebP/AVIF artwork, and retain original image assets.
- Preserve the tree design and scroll-driven branches; remove delayed content entrances, respect reduced motion, and defer off-screen tree rendering on mobile.
- Improve contrast, heading order, labels, focus indicators, touch targets, status announcements and keyboard dismissal. Load Google Maps only after explicit interaction.
- Configure Netlify static routing, a real 404, the sign-in redirect, caching and security headers. These headers require deployment to take effect.

## Browser-agent and functional checks

There is no standard Lighthouse “agentic browsing” percentage. The following were verified through visible page controls, independently of Lighthouse:

- Home search opens the directory with the search term in the URL.
- Directory search, empty results, reset, sort direction and readable result counts work.
- Saving a market persists after reload; the test bookmark was removed afterward.
- Produce search narrows results; “Find at markets” carries the produce query to the directory.
- Mobile menu opens and closes with Escape, returning focus to its button.
- Assistant opens with input focus, answers a produce query with market links, and returns focus to its launcher on Escape.
- Sign-up rejects mismatched made-up passwords, then completes the demo with matching sample values.
- Contact FAQ disclosures work; Google Maps is not embedded until requested. No location permission was requested during testing.
- Mobile (390×844) and desktop (1440×1000) homepage checks found no horizontal overflow or broken loaded images.
- Static checks cover all 13 routes: one H1, named navigation and main landmark, canonical/description, valid JSON-LD, existing image files and internal links, completed HTML, sitemap, robots, llms.txt and noindex on the 404 page.

The application remains a frontend demonstration: sample market listings, local-only bookmarks, demo authentication and an unsent contact-draft workflow. These checks do not imply a working authentication backend or verified market data.

## Reproduce

```powershell
npm run build
npm run check:static
npm run lint
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

In another terminal, choose a current installed Chrome rather than an old bundled Chromium:

```powershell
$env:CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
npm run audit
# Optional: audit specific routes
node scripts/audit.mjs / /produce-guide /markets/2
# Full 13-route coverage used for this report
node scripts/audit.mjs / /produce-guide /login /markets /markets/1 /saved /about /contact /signup /markets/2 /markets/3 /markets/4 /markets/5
```

The audit command exits nonzero if any selected category is below 95. Avoid running builds or image encoders concurrently with performance measurements. Rerun against the deployed URL using `AUDIT_URL` to verify real hosting, compression and security headers.

Image variants can be regenerated with `scripts/optimize-images.mjs`; set `FRESHFIND_RUNTIME_PACKAGE` to the absolute package.json path of an installed Sharp package first. The generated assets are already included, so ordinary builds do not require Sharp.

## References

- [Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview)
- [Performance scoring and variability](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Accessibility scoring limitations](https://developer.chrome.com/docs/lighthouse/accessibility/scoring)
- [Off-screen rendering and accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility)
