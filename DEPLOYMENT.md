# Publishing and discovery

## Git hosting

The provider should pull the website repository's reviewed deployment branch
and serve its root. HTML, CSS, JavaScript, images, text, JSON, and XML are already
present. There is no server process or build command to run on the provider.

The domain spelling used consistently here is **calpymodels.com**. If the actual
domain differs, update `site.origin` in `content/pages.mjs`, rebuild, and update
the social-card source and example comments before publication.

## Configure at the hosting provider

1. Resolve the existing DNS issue and enable a valid HTTPS certificate.
2. Use `https://calpymodels.com/` as the canonical host. Redirect HTTP and `www`
   to it with permanent redirects, preserving the path and query.
3. Serve directory index pages (`/get-started/`, `/examples/`, `/agents/`).
   Do not route every unknown path to the homepage: missing URLs should be 404.
4. Ensure hidden files and `.git/` cannot be served. Ideally also deny web access
   to `content/`, `tools/`, and repository maintenance Markdown. The robots rules
   merely discourage crawling; they are not access control.
5. Preserve the correct MIME types. JavaScript modules require a JavaScript MIME
   type, and `robots.txt` must be available as plain text at the origin root.
6. Check that a WAF, CAPTCHA, or provider bot switch is not blocking legitimate
   search crawlers. The supplied robots policy permits public-content crawling.

The site sets canonical tags and a sitemap; those do not create redirects or
configure the domain. No provider-specific rewrite file is assumed.

## Verify after deployment

Check HTTPS and HTTP status for `/`, `/get-started/`, `/examples/`, `/agents/`,
`/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/project.json`, and
`/assets/social-card.jpg`. Verify a nonexistent URL returns 404.

Check the canonical hostname, mobile layout, copy buttons, lab controls, contact
email target, and image previews. The copy control selects text for manual copy
if browser clipboard access is unavailable.

In Google Search Console and Bing Webmaster Tools, verify domain ownership,
submit `https://calpymodels.com/sitemap.xml`, and inspect the published URLs.
Ownership verification must use the real tokens issued to the owner; no invented
verification tags are included. Check structured data with the search engine's
validation tool after the domain is reachable. Search submission is not performed
by this repository or by the site build.

## What discovery files do

- HTML contains meaningful content before JavaScript runs. JS only enhances the
  lab and copy controls. Search metadata matches visible page content.
- JSON-LD identifies the website, organization, author, source project, and page.
  There are no fabricated ratings, offers, statistics, or search actions.
- `sitemap.xml` lists the eight canonical content pages. It avoids invented
  modification dates. `robots.txt` permits public crawling.
- `llms.txt` is an optional community-style resource index. `project.json` and
  `/agents/guide.md` make identity and availability explicit. They do not grant
  tools access, provide an execution API, or guarantee recommendation/indexing.

Read the platform guidance before changing crawler policies:
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- https://developers.openai.com/api/docs/bots
- https://llmstxt.org/

## Additional prepared pages

Also verify `/tour/`, `/services/`, `/examples/sensor-warmup/`, and
`/learn/sensor-calibration/`, plus the downloads linked from the worked example.
Review the proposed service format and `GROWTH_PLAN.md` before making the site
public. No analytics collection is currently enabled. A main-branch Git push
may trigger a provider pull if automatic deployment has been configured.
