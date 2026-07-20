/* ============================================================================
   products.js (DATA) — Seed product catalogue
   ----------------------------------------------------------------------------
   This is the FIRST-RUN seed only. Once the site loads, the catalogue lives in
   the Store (localStorage) and — if Firebase is configured — in Firestore, and
   is managed entirely from Admin → Products. Editing this file afterwards has
   no effect on a browser that has already seeded, unless you either:
     • bump `seeded` in assets/js/store.js  (re-seeds every visitor), or
     • click "Reset demo data" in Admin      (re-seeds just your browser).

   Admin → Products → "⤓ Export catalogue" regenerates THIS file from your live
   edits — commit the download to publish the catalogue to every visitor.

   ⚠ EVERY ITEM BELOW IS A REALISTIC PLACEHOLDER, not a confirmed line card.
   The client must confirm grades, packaging, MOQ, HS codes and specs before
   launch, and supply real photography into assets/img/products/.
   Photos are referenced but not yet present — img-fallback.js paints a branded
   blue/gold placeholder for each, so the grid looks intentional meanwhile.

   Shape of one product:
     {
       id: "p1", slug: "miniket-rice", name: "Miniket Rice",
       category: "Rice",             // must match a name in Admin → Categories
       status: "published",          // "published" (shown) | "draft" (hidden)
       featured: false,               // shows in the Featured deck
       order: 1,
       shortDesc: "…",  longDesc: "…",
       origins: ["Cumilla, Bangladesh"], grades: ["Sortex-clean"],
       packaging: ["25 kg PP bag"], moq: "1 x 20' FCL", hsCode: "1006.30",
       images: [{ url: "assets/img/products/x.jpg", alt: "…" }],
       specs: { Moisture: "≤ 13%" }, tags: ["new-crop"]
     }
   ========================================================================== */

window.PRODUCTS = [
  /* ---- Rice ---------------------------------------------------------- */
  {
    id: "p1", slug: "miniket-rice", name: "Miniket Rice",
    category: "Rice", status: "published", featured: false, order: 1,
    shortDesc: "Fine-milled, polished long grain rice with natural aroma and delicate taste.",
    longDesc: "Slender, polished long-grain rice milled from Bangladeshi paddy and sortex-cleaned to export presentation. Consistent grain length and a clean, non-sticky cook make it the standard choice for Gulf retail and catering buyers. Milled to order against your specification.",
    origins: ["Cumilla, Bangladesh"], grades: ["Sortex-clean", "Double-polished"],
    packaging: ["25 kg PP bag", "50 kg jute bag", "1 MT jumbo bag"],
    moq: "1 x 20' FCL", hsCode: "1006.30",
    images: [{ url: "assets/img/products/miniket-rice.jpg", alt: "Polished Miniket long-grain rice" }],
    specs: { Moisture: "≤ 13%", Broken: "≤ 5%", "Crop": "Current season" },
    tags: ["new-crop"],
  },
  /* ---- The reference mockup's lead trio (cards 2 & 3) ----------------- */
  {
    id: "p30", slug: "bengal-spices", name: "Bengal Spices",
    category: "Spices", status: "published", featured: false, order: 2,
    shortDesc: "Pure, sun-dried spices sourced from the best farms of Bengal.",
    longDesc: "A curated spice basket from the northern districts — turmeric, dried chilli, cumin, coriander and cardamom — sun-dried the traditional way and milled or shipped whole to order. Every lot is single-origin, traceable to its farm cluster and graded for colour and oil content before packing.",
    origins: ["Naogaon, Bangladesh"], grades: ["Whole", "Ground", "Farm-graded"],
    packaging: ["10 kg carton", "25 kg PP bag", "Retail sachets to order"],
    moq: "1 x 20' FCL (mixed lots welcome)", hsCode: "0910.99",
    images: [{ url: "assets/img/products/bengal-spices.jpg", alt: "Bowls of turmeric, chilli and whole Bengal spices" }],
    specs: { Drying: "Sun-dried", Moisture: "≤ 10%", Origin: "Single-farm lots" },
    tags: ["signature"],
  },
  {
    id: "p31", slug: "premium-shrimp", name: "Premium Shrimp",
    category: "Shrimp", status: "published", featured: false, order: 3,
    shortDesc: "Wild-caught and responsibly processed for exceptional quality and freshness.",
    longDesc: "Shrimp from the Khulna estuaries, iced at the landing ghat and processed the same day in BRC-certified plants. Graded by count, glazed to specification and blast-frozen, with full cold-chain documentation from ghat to port.",
    origins: ["Khulna, Bangladesh"], grades: ["HOSO", "HLSO", "PD blocks"],
    packaging: ["6 x 1.8 kg block carton", "IQF 1 kg retail bag"],
    moq: "1 x 40' reefer", hsCode: "0306.17",
    images: [{ url: "assets/img/products/premium-shrimp.jpg", alt: "Fresh shrimp on ice in a woven basket" }],
    specs: { Freezing: "Blast, -40°C", Glaze: "To buyer spec", Plant: "BRC-certified" },
    tags: ["signature"],
  },
  {
    id: "p2", slug: "chinigura-aromatic-rice", name: "Chinigura Aromatic Rice",
    category: "Rice", status: "published", featured: false, order: 2,
    shortDesc: "Bangladesh's celebrated short-grain aromatic — the rice of polao and biryani.",
    longDesc: "A small-grain aromatic rice native to Bangladesh, prized for an intense natural fragrance that basmati cannot replicate. Traditionally reserved for polao, biryani and festival cooking. Aged before milling to deepen aroma and firm the grain.",
    origins: ["Dinajpur, Bangladesh"], grades: ["Premium aged", "Sortex-clean"],
    packaging: ["1 kg retail pack", "5 kg retail pack", "25 kg PP bag"],
    moq: "1 x 20' FCL", hsCode: "1006.30",
    images: [{ url: "assets/img/products/chinigura-rice.jpg", alt: "Chinigura aromatic short-grain rice" }],
    specs: { Moisture: "≤ 13%", Aroma: "Natural, unscented", Ageing: "6–12 months" },
    tags: ["aromatic", "signature"],
  },
  {
    id: "p3", slug: "parboiled-rice", name: "Parboiled Rice",
    category: "Rice", status: "published", featured: false, order: 3,
    shortDesc: "Steam-treated long-grain, high head-rice yield and a firm separate cook.",
    longDesc: "Paddy is soaked, steamed and dried before milling, driving nutrients into the grain and hardening it against breakage. The result is a resilient, free-flowing rice suited to institutional catering and long transit. Available in varying degrees of parboiling.",
    origins: ["Cumilla, Bangladesh", "Naogaon, Bangladesh"], grades: ["Sortex-clean", "5% broken"],
    packaging: ["25 kg PP bag", "50 kg PP bag"],
    moq: "1 x 20' FCL", hsCode: "1006.30",
    images: [{ url: "assets/img/products/parboiled-rice.jpg", alt: "Parboiled long-grain rice" }],
    specs: { Moisture: "≤ 13%", Broken: "≤ 5%" },
    tags: [],
  },

  /* ---- Shrimp -------------------------------------------------------- */
  {
    id: "p4", slug: "black-tiger-shrimp", name: "Black Tiger Shrimp",
    category: "Shrimp", status: "published", featured: false, order: 4,
    shortDesc: "Bagda — the Sundarbans-belt tiger prawn, blast-frozen at source.",
    longDesc: "Penaeus monodon farmed in the brackish delta of southwest Bangladesh, graded by count and blast-frozen within hours of harvest to lock in texture and colour. Available head-on (HOSO), headless shell-on (HLSO) and peeled formats, block or IQF. Cold chain unbroken from pond to port.",
    origins: ["Khulna, Bangladesh", "Satkhira, Bangladesh"],
    grades: ["HOSO", "HLSO", "PD / PUD", "IQF", "Block frozen"],
    packaging: ["2 kg block x 6 (master carton)", "10 kg master carton", "IQF 1 kg retail"],
    moq: "1 x 40' reefer", hsCode: "0306.17",
    images: [{ url: "assets/img/products/black-tiger-shrimp.jpg", alt: "Raw black tiger shrimp on ice" }],
    specs: { Counts: "U/5 – 71/90", Glazing: "10–20% (to spec)", Storage: "-18°C or colder" },
    tags: ["cold-chain", "signature"],
  },
  {
    id: "p5", slug: "vannamei-shrimp", name: "Vannamei Shrimp",
    category: "Shrimp", status: "published", featured: false, order: 5,
    shortDesc: "Whiteleg shrimp at consistent counts — the volume workhorse for foodservice.",
    longDesc: "Litopenaeus vannamei from managed Bangladeshi farms, selected for uniform sizing and a mild, sweet profile. The dependable choice where a buyer needs the same count, colour and yield container after container. Antibiotic testing on every lot.",
    origins: ["Cox's Bazar, Bangladesh", "Khulna, Bangladesh"],
    grades: ["HOSO", "HLSO", "PD", "IQF"],
    packaging: ["10 kg master carton", "IQF 1 kg retail"],
    moq: "1 x 40' reefer", hsCode: "0306.17",
    images: [{ url: "assets/img/products/vannamei-shrimp.jpg", alt: "Vannamei whiteleg shrimp" }],
    specs: { Counts: "16/20 – 71/90", Glazing: "10–20% (to spec)", Storage: "-18°C or colder" },
    tags: ["cold-chain"],
  },
  {
    id: "p6", slug: "freshwater-prawn", name: "Freshwater Prawn (Golda)",
    category: "Shrimp", status: "published", featured: false, order: 6,
    shortDesc: "Golda — the giant river prawn, sweet-fleshed and dramatic on the plate.",
    longDesc: "Macrobrachium rosenbergii raised in the freshwater ghers of the delta. Large, blue-clawed and sweet, it commands a premium as a centrepiece prawn. Graded by count, head-on, individually handled to protect the claws and rostrum.",
    origins: ["Bagerhat, Bangladesh"], grades: ["HOSO", "HLSO"],
    packaging: ["2 kg block x 6 (master carton)", "10 kg master carton"],
    moq: "1 x 40' reefer", hsCode: "0306.19",
    images: [{ url: "assets/img/products/golda-prawn.jpg", alt: "Golda freshwater giant river prawn" }],
    specs: { Counts: "U/5 – 30/40", Storage: "-18°C or colder" },
    tags: ["cold-chain", "premium"],
  },

  /* ---- Fish & Seafood ------------------------------------------------ */
  {
    id: "p7", slug: "hilsa-ilish", name: "Hilsa (Ilish)",
    category: "Fish & Seafood", status: "published", featured: false, order: 7,
    shortDesc: "The national fish — Padma and Meghna river hilsa, whole and frozen.",
    longDesc: "Tenualosa ilisha, the most sought-after fish in Bengali cuisine and the single strongest draw for diaspora buyers across the Gulf and beyond. Sourced in season from the Padma and Meghna, graded by weight, whole-round and blast-frozen. Subject to seasonal catch windows and export regulation.",
    origins: ["Chandpur, Bangladesh", "Barishal, Bangladesh"],
    grades: ["Whole round", "Gutted"],
    packaging: ["Vacuum pack, 1 pc", "10 kg master carton"],
    moq: "1 x 40' reefer", hsCode: "0303.89",
    images: [{ url: "assets/img/products/hilsa-ilish.jpg", alt: "Whole frozen hilsa (ilish) fish" }],
    specs: { Sizes: "500 g – 1.5 kg+", Season: "Subject to catch window", Storage: "-18°C or colder" },
    tags: ["cold-chain", "seasonal", "signature"],
  },
  {
    id: "p8", slug: "rui-katla-carp", name: "Rui & Katla Carp",
    category: "Fish & Seafood", status: "published", featured: false, order: 8,
    shortDesc: "Farmed Indian major carp, whole-round frozen — the staple table fish.",
    longDesc: "Rui (Labeo rohita) and Katla (Catla catla) from managed freshwater ponds, harvested to size and blast-frozen whole. The everyday fish of the Bengali kitchen and a steady, high-volume line for South Asian retail across the Gulf.",
    origins: ["Mymensingh, Bangladesh"], grades: ["Whole round", "Gutted", "Steak cut"],
    packaging: ["10 kg master carton", "Vacuum pack"],
    moq: "1 x 40' reefer", hsCode: "0303.25",
    images: [{ url: "assets/img/products/rui-katla-carp.jpg", alt: "Frozen rui and katla carp" }],
    specs: { Sizes: "1 – 3 kg", Storage: "-18°C or colder" },
    tags: ["cold-chain"],
  },
  {
    id: "p9", slug: "dried-fish-shutki", name: "Dried Fish (Shutki)",
    category: "Fish & Seafood", status: "published", featured: false, order: 9,
    shortDesc: "Sun-cured shutki in traditional varieties — loitta, chhuri and more.",
    longDesc: "Sun-dried fish cured on the Cox's Bazar coast by methods unchanged for generations, then cleaned and graded for export. A high-value, shelf-stable line with deep demand among diaspora communities. Available in loitta (Bombay duck), chhuri (ribbon fish) and mixed varieties.",
    origins: ["Cox's Bazar, Bangladesh"], grades: ["Loitta", "Chhuri", "Mixed"],
    packaging: ["500 g retail pack", "5 kg carton", "20 kg carton"],
    moq: "1 x 20' FCL", hsCode: "0305.59",
    images: [{ url: "assets/img/products/dried-fish-shutki.jpg", alt: "Traditional sun-dried shutki fish" }],
    specs: { Moisture: "≤ 18%", Storage: "Ambient, dry" },
    tags: ["shelf-stable"],
  },

  /* ---- Fresh Vegetables ---------------------------------------------- */
  {
    id: "p10", slug: "green-chilli", name: "Green Chilli",
    category: "Fresh Vegetables", status: "published", featured: false, order: 10,
    shortDesc: "Hand-picked, cold-chain handled from field to freight in under 24 hours.",
    longDesc: "Fresh green chilli picked at colour and firmness, pre-cooled and moved to the airport the same day. Air-freighted to Gulf markets on a schedule that protects shelf life. Sorted by length and packed to your retail or wholesale presentation.",
    origins: ["Cumilla, Bangladesh", "Bogura, Bangladesh"], grades: ["Export grade", "Hand-sorted"],
    packaging: ["5 kg carton", "10 kg carton", "Retail punnet"],
    moq: "500 kg (air freight)", hsCode: "0709.60",
    images: [{ url: "assets/img/products/green-chilli.jpg", alt: "Fresh green chillies" }],
    specs: { "Cold chain": "Pre-cooled, 8–10°C", "Field to freight": "< 24 hours" },
    tags: ["air-freight", "cold-chain"],
  },
  {
    id: "p11", slug: "bitter-gourd", name: "Bitter Gourd (Korola)",
    category: "Fresh Vegetables", status: "published", featured: false, order: 11,
    shortDesc: "Korola picked young and ridged, graded by length for retail display.",
    longDesc: "Momordica charantia harvested young, when the ridging is sharp and the flesh firm. Graded by length, pre-cooled and air-freighted. A dependable seller wherever South Asian communities shop.",
    origins: ["Cumilla, Bangladesh"], grades: ["Export grade"],
    packaging: ["5 kg carton", "10 kg carton"],
    moq: "500 kg (air freight)", hsCode: "0709.99",
    images: [{ url: "assets/img/products/bitter-gourd.jpg", alt: "Fresh bitter gourd (korola)" }],
    specs: { "Cold chain": "Pre-cooled, 10–12°C" },
    tags: ["air-freight"],
  },
  {
    id: "p12", slug: "mixed-leafy-greens", name: "Mixed Leafy Greens",
    category: "Fresh Vegetables", status: "published", featured: false, order: 12,
    shortDesc: "Pui, lal shak, data and kachu — the Bengali greens basket, bunched to order.",
    longDesc: "A rotating basket of Bangladeshi leafy vegetables — pui shak, lal shak, data shak and kachu shak — cut, bunched and pre-cooled for same-day air freight. Composition flexes with the season and with what your shelves actually turn.",
    origins: ["Cumilla, Bangladesh", "Jashore, Bangladesh"], grades: ["Bunched", "Export grade"],
    packaging: ["Bunched, 5 kg carton"],
    moq: "300 kg (air freight)", hsCode: "0709.99",
    images: [{ url: "assets/img/products/leafy-greens.jpg", alt: "Bundles of fresh Bengali leafy greens" }],
    specs: { "Cold chain": "Pre-cooled, 4–8°C", Composition: "Seasonal, to order" },
    tags: ["air-freight", "seasonal"],
  },

  /* ---- Fresh Fruits --------------------------------------------------- */
  {
    id: "p13", slug: "haribhanga-mango", name: "Haribhanga Mango",
    category: "Fresh Fruits", status: "published", featured: false, order: 13,
    shortDesc: "Rangpur's fibreless, honey-sweet mango — the pride of the Bangladeshi season.",
    longDesc: "A GI-recognised Bangladeshi mango from the Rangpur belt, celebrated for dense fibreless flesh, a small stone and an intense honeyed sweetness. Harvested at maturity, hot-water treated where the destination requires it, and air-freighted inside the short season.",
    origins: ["Rangpur, Bangladesh"], grades: ["Export grade", "A-grade"],
    packaging: ["3 kg carton", "5 kg carton"],
    moq: "500 kg (air freight)", hsCode: "0804.50",
    images: [{ url: "assets/img/products/haribhanga-mango.jpg", alt: "Haribhanga mangoes" }],
    specs: { Season: "June – August", Treatment: "Hot-water treated on request" },
    tags: ["air-freight", "seasonal", "signature"],
  },
  {
    id: "p14", slug: "jackfruit", name: "Jackfruit",
    category: "Fresh Fruits", status: "published", featured: false, order: 14,
    shortDesc: "The national fruit — whole or pod-packed, fresh and frozen formats.",
    longDesc: "Bangladesh's national fruit, offered whole for wholesale markets or cleaned and pod-packed for retail convenience. Also available frozen in pods, and green (raw) for the growing plant-based trade where it substitutes for pulled meat.",
    origins: ["Gazipur, Bangladesh", "Cumilla, Bangladesh"], grades: ["Whole", "Pod-packed", "Green / raw"],
    packaging: ["Whole, loose", "500 g pod pack", "10 kg carton"],
    moq: "1 x 20' reefer", hsCode: "0810.90",
    images: [{ url: "assets/img/products/jackfruit.jpg", alt: "Fresh jackfruit and cleaned pods" }],
    specs: { Season: "April – August", Formats: "Fresh, frozen, green" },
    tags: ["seasonal"],
  },
  {
    id: "p15", slug: "green-coconut", name: "Green Coconut",
    category: "Fresh Fruits", status: "published", featured: false, order: 15,
    shortDesc: "Tender coconut trimmed and shrink-wrapped, water intact.",
    longDesc: "Young drinking coconuts harvested tender, trimmed to a clean diamond or cylinder, and shrink-wrapped to protect the water and extend shelf life. Shipped chilled for the Gulf HORECA and retail trade.",
    origins: ["Chattogram, Bangladesh"], grades: ["Trimmed", "Shrink-wrapped"],
    packaging: ["9 pcs carton", "12 pcs carton"],
    moq: "1 x 20' reefer", hsCode: "0801.12",
    images: [{ url: "assets/img/products/green-coconut.jpg", alt: "Trimmed tender green coconuts" }],
    specs: { "Cold chain": "Chilled, 3–5°C" },
    tags: ["cold-chain"],
  },

  /* ---- Spices --------------------------------------------------------- */
  {
    id: "p16", slug: "turmeric", name: "Turmeric",
    category: "Spices", status: "published", featured: false, order: 16,
    shortDesc: "Whole fingers and ground powder, with curcumin declared on every lot.",
    longDesc: "Bangladeshi turmeric offered as dried whole fingers or milled to a fine powder. Curcumin content is tested and declared per lot — no averaging across shipments. Available bulk or in retail-ready packs under your label.",
    origins: ["Cumilla, Bangladesh"], grades: ["Whole finger", "Ground powder"],
    packaging: ["200 g retail pack", "25 kg PP bag", "50 kg PP bag"],
    moq: "1 x 20' FCL", hsCode: "0910.30",
    images: [{ url: "assets/img/products/turmeric.jpg", alt: "Turmeric fingers and ground turmeric powder" }],
    specs: { Curcumin: "Declared per lot", Moisture: "≤ 10%" },
    tags: ["private-label"],
  },
  {
    id: "p17", slug: "dried-red-chilli", name: "Dried Red Chilli",
    category: "Spices", status: "published", featured: false, order: 17,
    shortDesc: "Sun-dried whole chilli and crushed flake, stems on or off to spec.",
    longDesc: "Whole sun-dried red chilli, cleaned and graded, with stems retained or removed to your specification. Also supplied crushed or milled. Heat and colour vary by variety — samples sent before every first order.",
    origins: ["Bogura, Bangladesh"], grades: ["Whole, stem-on", "Whole, stemless", "Crushed"],
    packaging: ["200 g retail pack", "25 kg PP bag"],
    moq: "1 x 20' FCL", hsCode: "0904.21",
    images: [{ url: "assets/img/products/dried-red-chilli.jpg", alt: "Dried red chillies" }],
    specs: { Moisture: "≤ 11%", Heat: "Variety dependent" },
    tags: ["private-label"],
  },

  /* ---- Potato --------------------------------------------------------- */
  {
    id: "p18", slug: "table-potato", name: "Table Potato",
    category: "Potato", status: "published", featured: false, order: 18,
    shortDesc: "Diamant and Cardinal, size-graded and cured for long transit.",
    longDesc: "Bangladesh grows far more potato than it eats, and the surplus is genuinely export-competitive. Diamant and Cardinal varieties, harvested mature, cured to set the skin, then size-graded and packed. Handled to arrive firm, unblemished and ready for shelf.",
    origins: ["Munshiganj, Bangladesh", "Bogura, Bangladesh"], grades: ["Diamant", "Cardinal", "Size-graded"],
    packaging: ["10 kg mesh bag", "25 kg mesh bag", "50 kg jute bag"],
    moq: "1 x 20' FCL", hsCode: "0701.90",
    images: [{ url: "assets/img/products/table-potato.jpg", alt: "Graded export table potatoes" }],
    specs: { Sizes: "40–55 mm, 55–75 mm", Curing: "Skin-set before packing" },
    tags: ["volume"],
  },

  /* ---- Dry & Agro Foods ------------------------------------------------ */
  {
    id: "p19", slug: "lentils-pulses", name: "Lentils & Pulses",
    category: "Dry & Agro Foods", status: "published", featured: false, order: 19,
    shortDesc: "Masoor, mug and khesari — cleaned, sortex-graded, packed to order.",
    longDesc: "Red lentil (masoor), mung (mug) and grass pea (khesari) cleaned, de-stoned and sortex-graded. Supplied whole or split, in bulk bags or retail packs under your own label.",
    origins: ["Faridpur, Bangladesh", "Cumilla, Bangladesh"], grades: ["Whole", "Split", "Sortex-clean"],
    packaging: ["1 kg retail pack", "25 kg PP bag", "50 kg PP bag"],
    moq: "1 x 20' FCL", hsCode: "0713.40",
    images: [{ url: "assets/img/products/lentils-pulses.jpg", alt: "Red lentils, mung and other pulses" }],
    specs: { Purity: "≥ 99%", Moisture: "≤ 12%" },
    tags: ["private-label", "shelf-stable"],
  },
  {
    id: "p20", slug: "molasses-gur", name: "Date Palm Molasses (Gur)",
    category: "Dry & Agro Foods", status: "published", featured: false, order: 20,
    shortDesc: "Khejur gur — winter-tapped date palm sap, reduced to cake or liquid.",
    longDesc: "Sap tapped from date palms through the short Bangladeshi winter and reduced over open fire to a dark, smoky jaggery. Available as pressed cake (patali) or liquid (jhola). A seasonal, high-sentiment line with strong diaspora pull.",
    origins: ["Jashore, Bangladesh"], grades: ["Patali (cake)", "Jhola (liquid)"],
    packaging: ["500 g pack", "1 kg tub", "20 kg carton"],
    moq: "1 x 20' FCL", hsCode: "1702.90",
    images: [{ url: "assets/img/products/khejur-gur.jpg", alt: "Date palm molasses (khejur gur) cakes" }],
    specs: { Season: "December – February", Storage: "Ambient, dry" },
    tags: ["seasonal", "shelf-stable"],
  },
  {
    id: "p21", slug: "jute-goods", name: "Jute Bags & Sacking",
    category: "Dry & Agro Foods", status: "draft", featured: false, order: 21,
    shortDesc: "The Golden Fibre — food-grade sacking, hessian and shopping bags.",
    longDesc: "Bangladesh's Golden Fibre, woven into food-grade sacking, hessian cloth and reusable shopping bags. Held as DRAFT until the client confirms whether to carry a non-food line alongside the produce catalogue.",
    origins: ["Narsingdi, Bangladesh"], grades: ["Food-grade sacking", "Hessian", "Shopping bag"],
    packaging: ["Bale", "Bundle"],
    moq: "1 x 20' FCL", hsCode: "6305.10",
    images: [{ url: "assets/img/products/jute-goods.jpg", alt: "Woven jute sacks and hessian cloth" }],
    specs: { Note: "Draft — pending client confirmation" },
    tags: ["non-food"],
  },

  /* ======================================================================
     SABA-BRANDED / SOURCED LINES — the Featured deck.
     Real product photography (assets/img/products/). Traded worldwide
     alongside the Bengal harvest. These are the ONLY featured:true items.
     ⚠ Grades / packaging / MOQ / HS codes are sensible placeholders — the
     client confirms before launch.
     ====================================================================== */

  /* ---- Dairy --------------------------------------------------------- */
  {
    id: "p32", slug: "lancy-full-cream-milk-powder", name: "Lancy Instant Full Cream Milk Powder",
    category: "Dairy", status: "published", featured: true, order: 32,
    shortDesc: "Spray-dried instant full-cream milk powder, packed in 25 kg bags for foodservice and repacking.",
    longDesc: "Saba's Lancy label — instant full-cream milk powder, spray-dried from fresh cow's milk and packed in 25 kg multi-wall bags for bakeries, foodservice and retail repackers across the Gulf. Consistent solubility and a clean, rich dairy note, lot after lot.",
    origins: ["Imported dairy"], grades: ["Full cream", "Instant, spray-dried"],
    packaging: ["25 kg multiwall bag", "Retail packs to order"],
    moq: "1 x 20' FCL", hsCode: "0402.21",
    images: [{ url: "assets/img/products/lancy-milk.jpg", alt: "Lancy instant full cream milk powder 25 kg bag" }],
    specs: { Type: "Full cream", Fat: "26–28%", Process: "Spray-dried", Pack: "25 kg" },
    tags: ["branded", "dairy"],
  },
  {
    id: "p33", slug: "suri-skimmed-milk-powder", name: "Suri Skimmed Milk Powder",
    category: "Dairy", status: "published", featured: true, order: 33,
    shortDesc: "Low-fat skimmed milk powder in 25 kg bags — the workhorse base for bakery and confectionery.",
    longDesc: "Suri skimmed milk powder: spray-dried, low-fat and free-flowing — the dependable dairy base for bakeries, confectioners and beverage makers. Packed in 25 kg bags with consistent protein and solubility.",
    origins: ["Imported dairy"], grades: ["Skimmed / low-fat", "Spray-dried"],
    packaging: ["25 kg multiwall bag"],
    moq: "1 x 20' FCL", hsCode: "0402.10",
    images: [{ url: "assets/img/products/suri-milk.jpg", alt: "Suri skimmed milk powder 25 kg bag" }],
    specs: { Type: "Skimmed", Fat: "≤ 1.5%", Process: "Spray-dried", Pack: "25 kg" },
    tags: ["branded", "dairy"],
  },
  {
    id: "p34", slug: "malak-full-cream-milk-powder", name: "Malak Full Cream Milk Powder",
    category: "Dairy", status: "published", featured: true, order: 34,
    shortDesc: "Instant full-cream milk powder of New Zealand origin — 25 kg.",
    longDesc: "Malak instant full-cream milk powder, made from New Zealand dairy and packed in 25 kg bags. A premium full-cream base for tea, foodservice and retail repackers who want a clean, rich cup.",
    origins: ["New Zealand"], grades: ["Full cream", "Instant"],
    packaging: ["25 kg multiwall bag"],
    moq: "1 x 20' FCL", hsCode: "0402.21",
    images: [{ url: "assets/img/products/malak-milk.jpg", alt: "Malak full cream milk powder 25 kg bag" }],
    specs: { Type: "Full cream", Fat: "26–28%", Origin: "New Zealand", Pack: "25 kg" },
    tags: ["branded", "dairy"],
  },
  {
    id: "p35", slug: "nzmp-wholemilk-powder", name: "NZMP Wholemilk Powder",
    category: "Dairy", status: "published", featured: true, order: 35,
    shortDesc: "Fonterra NZMP wholemilk powder, product of New Zealand — 25 kg.",
    longDesc: "NZMP wholemilk powder, made to Fonterra's quality standards and shipped as a product of New Zealand in 25 kg bags. A globally trusted dairy ingredient for manufacturers and repackers.",
    origins: ["New Zealand"], grades: ["Wholemilk", "Pasteurised"],
    packaging: ["25 kg bag"],
    moq: "1 x 20' FCL", hsCode: "0402.21",
    images: [{ url: "assets/img/products/nzmp-wholemilk.jpg", alt: "NZMP wholemilk powder, product of New Zealand" }],
    specs: { Brand: "NZMP (Fonterra)", Origin: "New Zealand", Pack: "25 kg" },
    tags: ["branded", "dairy"],
  },

  /* ---- Spices -------------------------------------------------------- */
  {
    id: "p36", slug: "premium-saffron", name: "Premium Grade Saffron",
    category: "Spices", status: "published", featured: true, order: 36,
    shortDesc: "Deep-red, high-grade saffron threads — intense colour, aroma and flavour.",
    longDesc: "Premium all-red saffron threads, hand-graded for colour strength and aroma. Supplied in bulk and retail-ready packs for HORECA and the gift trade — a high-value, low-volume line that travels light and sells on presentation.",
    origins: ["Imported, hand-graded"], grades: ["All-red premium", "Whole threads"],
    packaging: ["1 g / 2 g / 5 g retail", "Bulk tins"],
    moq: "By agreement", hsCode: "0910.20",
    images: [
      { url: "assets/img/products/saffron.jpg", alt: "Premium grade saffron threads in a bowl" },
      { url: "assets/img/products/saffron-2.jpg", alt: "Saffron threads with a crocus flower" },
      { url: "assets/img/products/saffron-3.jpg", alt: "Bowl of premium saffron threads" },
    ],
    specs: { Grade: "All-red premium", Form: "Threads", Aroma: "High" },
    tags: ["premium", "signature"],
  },

  /* ---- Dry Fruits & Nuts --------------------------------------------- */
  {
    id: "p37", slug: "makhana-fox-nuts", name: "Makhana (Fox Nuts)",
    category: "Dry Fruits & Nuts", status: "published", featured: true, order: 37,
    shortDesc: "Light, crisp fox nuts — the popular high-protein healthy snack, bulk or retail.",
    longDesc: "Premium makhana (fox nuts / lotus seeds), size-graded and crisp, ready to roast and season. A fast-growing healthy-snack line with strong demand across the Gulf and South Asia. Bulk or retail packs to order.",
    origins: ["Sourced & graded"], grades: ["Popped", "Size-graded"],
    packaging: ["Bulk carton", "Retail pouch"],
    moq: "1 x 20' FCL (mixed welcome)", hsCode: "1212.99",
    images: [{ url: "assets/img/products/makhana.jpg", alt: "Makhana fox nuts in a bowl" }],
    specs: { Form: "Popped seeds", Grading: "By size", Moisture: "Low" },
    tags: ["healthy-snack"],
  },
  {
    id: "p38", slug: "ajwa-dates-madinah", name: "Ajwa Dates (Madinah)",
    category: "Dry Fruits & Nuts", status: "published", featured: true, order: 38,
    shortDesc: "Soft, dark Madinah Ajwa dates — the premium gifting and Ramadan line.",
    longDesc: "Ajwa dates from Madinah: soft, dark and richly sweet — the most prized date for gifting and the Ramadan trade. Hand-selected, graded and packed to retail presentation. A high-sentiment, high-margin seasonal line.",
    origins: ["Madinah, Saudi Arabia"], grades: ["Premium", "Hand-selected"],
    packaging: ["400 g / 800 g gift box", "5 kg carton"],
    moq: "By agreement", hsCode: "0804.10",
    images: [{ url: "assets/img/products/ajwa-dates.jpg", alt: "Premium Ajwa dates from Madinah in a bowl" }],
    specs: { Variety: "Ajwa", Origin: "Madinah", Texture: "Soft" },
    tags: ["premium", "seasonal", "signature"],
  },
  {
    id: "p39", slug: "dried-figs", name: "Dried Figs",
    category: "Dry Fruits & Nuts", status: "published", featured: true, order: 39,
    shortDesc: "Sun-dried whole figs — naturally sweet, in threaded and loose packs.",
    longDesc: "Whole dried figs, naturally sweet and tender, supplied both string-threaded (traditional) and as loose graded fruit. A staple dry-fruit line for retail, gifting and the Ramadan basket.",
    origins: ["Imported, graded"], grades: ["Threaded", "Loose, graded"],
    packaging: ["Retail pouch", "5 kg / 10 kg carton"],
    moq: "By agreement", hsCode: "0804.20",
    images: [{ url: "assets/img/products/dried-figs.jpg", alt: "Sun-dried whole figs" }],
    specs: { Form: "Whole dried", Grades: "Threaded / loose" },
    tags: ["shelf-stable"],
  },

  /* ---- Confectionery ------------------------------------------------- */
  {
    id: "p40", slug: "pistachio-filled-chocolate", name: "Pistachio Filled Chocolate",
    category: "Confectionery", status: "published", featured: true, order: 40,
    shortDesc: "Milk chocolate with a rich pistachio-cream filling — the viral gourmet bar.",
    longDesc: "Indulgent milk chocolate bars with a generous roasted-pistachio cream filling — the gourmet, gift-worthy confection driving demand across the Gulf. Available in retail bars and gift formats under private label.",
    origins: ["Made to order"], grades: ["Milk chocolate", "Pistachio-filled"],
    packaging: ["Retail bar", "Gift box"],
    moq: "By agreement", hsCode: "1806.31",
    images: [{ url: "assets/img/products/pistachio-chocolate.jpg", alt: "Pistachio-filled milk chocolate bars" }],
    specs: { Type: "Filled chocolate bar", Filling: "Pistachio cream" },
    tags: ["premium", "private-label"],
  },
];
