# Saba Global Ventures — corporate showcase website

**From Bangladesh to the World.** A luxury, inquiry-only showcase site for an
international wholesale export/import house based in Cumilla, Bangladesh.
Bulk rice, shrimp, fish, fresh fruit, vegetables, spices, potato and agro foods.

There is **no cart and no checkout** — every "order" intent becomes a **bulk
inquiry** pre-filled into **WhatsApp** or **Gmail**. That rule is deliberate.

- **Spec / source of truth:** [`Saba-Global-Venture-Landing-Page-Prompt.md`](Saba-Global-Venture-Landing-Page-Prompt.md)
- **Living project memory:** [`PROJECT_CONTEXT.md`](PROJECT_CONTEXT.md)
- **Backend setup:** [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md)

---

## 1. Run it locally

The page is assembled at runtime from partials in `sections/` using `fetch()`, so
**you must serve it over HTTP**. Opening `index.html` directly (`file://`) gives you
a blank page — the browser blocks those fetches.

```bash
cd sabaglobal
python -m http.server 8777
# then open http://127.0.0.1:8777/index.html
```

Any static server works (`npx serve .`, VS Code Live Server, …). There is **no build
step** — no npm, no bundler. Edit a file, refresh.

---

## 2. Before you launch — the checklist

| # | Task | Where |
|---|---|---|
| 1 | ✅ WhatsApp / email / address are in. Still `{CURLY}`: **website + socials** | `assets/js/config.js` |
| 2 | ✅ Mirrored into the structured data — **keep the two in sync by hand** | `index.html` (JSON-LD block) |
| 3 | Add real product photos | `assets/img/products/` |
| 4 | Add a story photo | `assets/img/photos/` |
| 5 | Confirm the certifications you actually hold | `assets/js/config.js` → `certs` |
| 6 | Confirm grades / packaging / MOQ / **HS codes** on every product | `assets/data/products.js` or Admin |
| 7 | Set up Firebase so admin edits reach real visitors | `FIREBASE_SETUP.md` |
| 8 | Replace `www.sabaglobalventures.com` with the real domain | `index.html`, `sitemap.xml`, `robots.txt` |

> **Never invent contact details.** A wrong phone number on a trading site costs real
> business. Any value still left as `{CURLY}` is treated as **unset** — its link is
> disabled rather than half-built, so the gap is obvious instead of silently wrong.

> **Changing a contact detail later?** Do all three: edit `assets/js/config.js`, update
> the JSON-LD in `index.html`, and **bump `seeded` in `assets/js/store.js`**. A browser
> that has already seeded keeps saved Settings that mask `config.js`, so returning
> visitors would otherwise still see the old number.

---

## 3. Editing content

### The one file that matters most
`assets/js/config.js` is the **single source of truth** for the WhatsApp number,
email, phone, address, map link, socials, markets, stats and message templates.
Every CTA on the site reads from it.

### Admin panel
Open `/admin.html` (not linked publicly — there's a tiny gold dot in the footer).
It manages **Products, Ads/Banners, Inquiries, Settings**, and under *Content*:
**Page Content** (hero + story wording and image), **Categories**, **Countries**
(which drive the world map pins and trade routes) and **Branding/Emblem**.

Anything saved in Admin → Settings **overrides** `config.js` live, with no redeploy.

⚠ **Login.** With Firebase configured, login is real Firebase Auth and the credentials
live in your Firebase console. Until then it falls back to a **local demo gate**
(`admin@sabaglobalventures.com` / `demo1234`) — in that mode every edit stays in your
own browser's localStorage and is **not** visible to anyone else. Set up Firebase
before you rely on the panel for anything real.

### How the catalogue actually gets published
- **With Firebase:** save in Admin → it mirrors to Firestore → visitors see it. Done.
- **Without Firebase (e.g. plain GitHub Pages):** Admin → Products →
  **"⤓ Export catalogue"** downloads a regenerated `assets/data/products.js`.
  **Commit that file** and it goes live for everyone.

> Gotcha: once a browser has seeded its localStorage, edits to `config.js` /
> `products.js` are masked by the saved copy **in that browser**. Either edit via
> Admin, click *Reset demo data*, or bump `seeded` in `assets/js/store.js` to
> re-seed everyone.

---

## 4. How it's put together

```
index.html            the whole site (single-scroll narrative)
  └── sections/*.html   fetched + injected by assets/js/include.js
assets/css/tokens.css   ← change the brand colours/fonts HERE; they cascade everywhere
assets/js/main.js       boot order: pull cloud → apply settings → render → init modules
```

Each section is its own HTML partial **and** its own CSS file, so you can work on one
part without touching the rest. `products.html`, `about.html` and `contact.html` are
just redirect stubs to `index.html#section`.

**Design system:** majestic blue canvas, gold as jewelry (≤10% of any view), Cormorant
Garamond 300 for display type with a gold-italic `<em>` flourish, Manrope for UI.
The background ("Delta to the World") is authored SVG **masks** tinted by a single
gold gradient — no photography needed.

### Things that will bite you if you don't know them
- **Class names are a contract.** `sections/trust.html` must use `.stats`/`.certs`
  because `trust.css` styles those. Renaming a class in a partial silently breaks
  its styling.
- **The emblem must be square.** `main.js applyEmblem()` stamps the configured mark
  into `.brand .mark`, which already sits beside a text wordmark — a wide lockup
  there prints the brand name twice.
- **No Lenis / smooth-scroll library.** It hijacks the mouse wheel and makes desktop
  scrolling feel stuck. Native scrolling only.
- **Deep links need `honourInitialHash()`** (`main.js`). Partials load async, so the
  browser's native `#products` scroll fires before that section exists.
- **Side accents are `display:none` below 760px**, not `opacity:0` — anchored off-edge
  art otherwise widens the page and causes horizontal scroll.

---

## 5. Deploying

Any static host. For **GitHub Pages**: push, then Settings → Pages → deploy from
`main` / root. `.nojekyll` is already present so files serve as-is, and every path is
relative, so a project subpath (`user.github.io/repo/`) works fine.

Remember to add your live domain to **Firebase → Authentication → Settings →
Authorized domains**, or admin login will fail in production.

---

## 6. Local verification

There's no test suite; this is a static site. To check a change end-to-end, serve it
and look at it. If you need to automate, note that **Node is not installed** on the
original dev machine — Python + a headless Chrome via the DevTools Protocol was used
instead. See the caveats in `PROJECT_CONTEXT.md` §9 before trusting a headless
screenshot: `--virtual-time-budget` and `captureBeyondViewport` both lie about this
page's layout.
