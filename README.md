# Bailiwick Refrigeration Ltd – website

Static, single-page site for **Bailiwick Refrigeration Ltd** (Guernsey) – commercial refrigeration service, supply and repair, plus vehicle / aircraft / marine air conditioning.

Plain HTML + Tailwind CSS + a small vanilla JS file. No framework, no backend, no build step needed to host it.

## Folder layout

```
index.html            ← the whole homepage (sections are clearly commented)
thanks.html           ← shown after the contact form if JavaScript is off
404.html              ← "page not found"
assets/
  css/styles.css      ← compiled Tailwind (generated – don't edit by hand)
  js/main.js          ← menu, animations, snow, gauge, contact form
  fonts/              ← self-hosted Oswald + Manrope (SIL Open Font License)
images/
  logo-bear.svg       ← polar bear (grey, as per the logo)
  logo-bear-white.svg ← polar bear for dark backgrounds
  logo-full.svg       ← bear + wordmark lockup
  logo-original.png   ← original logo crop, for reference
  team-van.jpg/.webp  ← team + van photo
  og-image.jpg        ← 1200×630 social share image
  icon-192/512.png    ← app / manifest icons
src/input.css         ← Tailwind source + custom animations
tailwind.config.js    ← brand colours & fonts
favicon.*, apple-touch-icon.png, site.webmanifest, robots.txt, sitemap.xml, _headers
```

## Editing

- **Text / phone / email:** edit `index.html` directly. Phone appears as `07781 136118` and `tel:+447781136118`; email as `bailiwickrefrigeration@gmail.com` – search & replace both if they change.
- **Styles / colours:** colours live in `tailwind.config.js` (`navy`, `ice`, `graphite`). If you add or change Tailwind classes, rebuild the CSS:

  ```bash
  npm install      # first time only
  npm run build    # or `npm run dev` to watch while editing
  ```

- **Photos:** drop new images in `images/` and point the `<img>` / `<source>` tags at them. Keep a `.webp` alongside the `.jpg` where possible.

## Contact form

Uses [FormSubmit](https://formsubmit.co) – no server needed.

- It currently sends to **Toby (toby1@greggs.org)** while the site is being built. To send enquiries to the business instead, change the email in the form's `action="https://formsubmit.co/…"` in `index.html`.
- The **first** submission to a new address triggers a one-off activation email from FormSubmit – click the link in it, then forms start arriving. After activation, FormSubmit gives you a random alias string you can swap in for the email address so it isn't visible in the page source.
- The form submits in the background (AJAX) and shows an inline success message. If JavaScript is off, it falls back to a normal POST and lands on `thanks.html`.

## SEO checklist

- Title, description, canonical, Open Graph + Twitter card tags, `HVACBusiness` JSON-LD, `robots.txt`, `sitemap.xml`, web manifest, favicons.
- **Domain placeholder:** everything uses `https://bailiwickrefrigeration.gg`. Once the real domain is confirmed, find & replace it in `index.html`, `robots.txt` and `sitemap.xml`.
- After going live: add the site to Google Search Console, submit the sitemap, and link it from the business's Google Business Profile + Facebook page.

## Hosting (Cloudflare Pages)

1. Client creates their own Cloudflare account and adds Toby.
2. Cloudflare Pages → Create project → connect this GitHub repo.
3. Build command: *(leave empty)* · Output directory: `/` (root).
4. Add the custom domain in Pages → Custom domains.

`_headers` sets sensible caching and security headers on Cloudflare Pages.
