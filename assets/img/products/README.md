# Product photography

Drop real product photos here. **Until you do, nothing looks broken** —
`assets/js/img-fallback.js` draws a branded blue/gold placeholder built from each
image's alt text, so the catalogue still reads as intentional.

## Filenames the seed catalogue expects

`assets/data/products.js` references these. Match the names and the photos appear
with no code change:

```
miniket-rice.jpg          chinigura-rice.jpg        parboiled-rice.jpg
black-tiger-shrimp.jpg    vannamei-shrimp.jpg       golda-prawn.jpg
hilsa-ilish.jpg           rui-katla-carp.jpg        dried-fish-shutki.jpg
green-chilli.jpg          bitter-gourd.jpg          leafy-greens.jpg
haribhanga-mango.jpg      jackfruit.jpg             green-coconut.jpg
turmeric.jpg              dried-red-chilli.jpg      table-potato.jpg
lentils-pulses.jpg        khejur-gur.jpg            jute-goods.jpg
```

(You can also just upload photos in **Admin → Products → Edit**, or paste a Google
Drive share link — no files needed here at all.)

## Specs

- **Aspect:** 4:3 landscape. Cards crop to 4:3; the featured deck crops to portrait,
  so keep the subject centred and don't put anything important at the edges.
- **Size:** ~1200×900px, JPEG, under ~300 KB. Larger is wasted — they render small.
- **Grade:** warm, rich and editorial against the cool blue canvas. Think jute sacks
  of rice, ice-packed tiger shrimp, whole hilsa, spice mounds, crates of mango,
  cold-store pallets, Chattogram port at golden hour.
- **Background:** dark or neutral works best with the theme. Avoid pure white.

## Google Drive links

Share the file as **"Anyone with the link – Viewer"**, then paste the share URL into
the product editor. `assets/js/media.js` rewrites it to an embeddable URL.
