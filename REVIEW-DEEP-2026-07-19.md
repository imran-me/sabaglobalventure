# REVIEW-DEEP-2026-07-19 — forensic pass over every section & feature

Method: scripted feature drills (search/filter compose, modal cycle incl. zoom
+ share + Esc + focus, deep links, all form paths incl. blocked empty submit
and WhatsApp body content, linecard, 404, admin form, AR round-trip) plus
visual inspection of every section at 1536 / 390, the Arabic edition, and a
`prefers-reduced-motion` emulation pass.

## Verified working (no action)

- Search ∩ category filtering composes correctly (rice=3, +Shrimp=0, reset ✓).
- Modal: opens, sets `#product=slug`, gallery zoom toggles, Copy Link present,
  Esc closes, hash restored, body scroll restored.
- Form: empty submit blocked with 4 inline errors; valid submit builds the
  correct wa.me URL on the WhatsApp line (8801830187381) with the buyer's
  reply channel in the body; toast shown.
- Cert plates ×8 (numbers correctly absent until supplied), facts ledger ×5,
  FAQ ×5, MOQ chips ×22, Bengali line, colophon, waterline, net-route,
  legal/season lines correctly hidden while blank, 3 JSON-LD blocks.
- Linecard: 8 category tables, 22 rows, seal letterhead, contacts.
- 404: arch loads, feathered, home link. Admin: all 20 settings inputs.
- Mobile: products section shrank 12.6k→5.6k px via Show-more batching;
  snap-scroll featured; zero horizontal overflow at 390/768/1536.
- Reduced motion: sampan + weave animations off, all 9 accents visible, every
  reveal at opacity 1.
- AR: RTL boots from storage, cards mirror, arrows flip, zero overflow.

## Findings (fixed in this pass)

1. **Footer tail lines stuck left + colophon shattered.** The global
   `p { max-width: 68ch }` measure rule shrinks `.foot-fineprint` /
   `.foot-legal` / `.colophon` (no auto margins → left-hugging; the colophon's
   generous padding then squeezed it to one word per line). Fix: auto inline
   margins; colophon padding back to the gutter.
2. **The moon smudged the contact column.** `.site-footer::before` sat at
   `right: 9–20%`, overlapping "WhatsApp — click to chat", and its dim core
   read as a gray blot. Fix: moved outside the container column (right edge,
   higher), brighter luminous core, softer halo.
3. **`#product=` deep links dead on same-document navigation.** The hash is
   only honoured at boot; pasting/clicking a product link while already on
   the site does nothing (also bit the drill harness). Fix: `hashchange`
   listener in products.js opens the product modal.
4. **Arabic edition: Latin product text mis-punctuated in RTL.** English
   descriptions inside RTL cards rendered ".quality and freshness" with the
   period at line start. Fix: `unicode-bidi: plaintext` on card/modal text in
   rtl.css — each paragraph takes its own direction, so English stays English
   and future Arabic entries stay Arabic.
