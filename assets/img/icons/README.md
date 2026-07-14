# Icons, emblem & share image

Everything here is **already generated** — nothing is pending. This file just records
what each asset is and how to regenerate it.

| File | What it is |
|---|---|
| `emblem.svg` | The **square crest** — gold double ring, Shapla (water lily) over water, rising-sun arc, `SGV`. This is the site-wide brand mark (header, footer, preloader, admin). |
| `favicon.svg` | Bold gold Shapla on a `#071C4D` rounded square. Deliberately simpler than the crest so it survives 16×16. |
| `favicon.ico` | Multi-size 16/32/48/64. |
| `apple-touch-icon.png` | 180×180. |
| `icon-192.png` | 192×192 (PWA manifest). |
| `icon-512.png` | 512×512, **maskable** — mark kept inside the safe zone, no outer ring. |
| `og-image.png` | 1200×630 social share card: gold lily + "SABA GLOBAL / VENTURE / FROM BANGLADESH TO THE WORLD" on the navy gradient. |

## Important: the emblem must stay square

`main.js applyEmblem()` stamps the configured mark into `.brand .mark`, which sits
directly beside a **text wordmark** in the header. Pointing it at the wide lockup
(`assets/img/brand/logo.svg`) prints the brand name twice, side by side. If you swap
the emblem via **Admin → Branding**, use a roughly square image.

## Regenerating the rasters

The PNG/ICO set was drawn directly with Python + PIL (there was no SVG rasterizer on
the build machine). If you need to change the mark, the cleanest path today is to
export the rasters from `favicon.svg` / `emblem.svg` with any SVG→PNG tool
(Inkscape, `rsvg-convert`, Figma, or an online converter) at the sizes in the table
above, keeping the `#071C4D` field and `#C9A24B` gold.
