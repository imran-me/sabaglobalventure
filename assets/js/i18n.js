/* ============================================================================
   i18n.js — The Arabic edition (ART-VISION #23)
   ----------------------------------------------------------------------------
   A true RTL Arabic mirror for the Gulf buyer, not a widget bolted on:

     - One dictionary of the site's English strings → Modern Standard Arabic.
     - Translation happens on TEXT NODES (TreeWalker), so it survives the
       partial-include system, config-driven fills and injected markup: any
       node whose normalized text matches a key is swapped in place.
     - `initI18n` runs AFTER content fills but BEFORE the kinetic headline
       split (see main.js order), so the Arabic headline animates word by word
       exactly like the English one.
     - The toggle stores the choice and reloads — a clean boot in the chosen
       language beats live re-translation both directions.
     - Product DATA (names, descriptions from Admin/Firestore) stays English:
       trade catalogues travel in English; the FRAME becomes Arabic.

   Typography rules live in assets/css/rtl.css (Amiri; letter-spacing zeroed —
   Arabic script must never be tracked; italics normalized — Arabic does not
   slant; looser line-heights so ascenders survive Cormorant's tight leading).
   ========================================================================== */

(function () {
  const KEY = "sgv_lang";

  /* ---- The dictionary (en → ar) --------------------------------------- */
  const AR = {
    /* Navigation & header */
    "Home": "الرئيسية",
    "Products": "المنتجات",
    "About": "من نحن",
    "Contact": "اتصل بنا",
    "Request a Quote": "اطلب عرض سعر",

    /* Hero */
    "Cumilla · Bangladesh · Global Trade": "كوميلا · بنغلاديش · تجارة عالمية",
    "Bangladesh's Harvest,": "حصاد بنغلاديش،",
    "Carried to the World.": "محمولٌ إلى العالم.",
    "Saba Global Ventures sources rice, shrimp, fish, fruit and fresh vegetables from the Bengal delta and delivers them in bulk to wholesale markets across the Gulf, the Middle East and South Asia.":
      "تورّد سابا غلوبال فينتشرز الأرز والروبيان والأسماك والفواكه والخضروات الطازجة من دلتا البنغال، وتسلّمها بالجملة إلى أسواق الخليج والشرق الأوسط وجنوب آسيا.",
    "Request a Bulk Quote": "اطلب عرض سعر بالجملة",
    "Email Our Trade Desk": "راسل مكتب التجارة",
    "Scroll": "مرّر",
    "The Bengal Delta": "دلتا البنغال",
    "Est. Cumilla · Bengal": "تأسست في كوميلا · البنغال",

    /* Featured */
    "Featured Selection": "تشكيلة مختارة",
    "Signature Lines,": "خطوطنا المميزة،",
    "Hand-Picked": "منتقاة بعناية",
    "View All Products →": "عرض جميع المنتجات ←",

    /* About / Origin */
    "Origin": "الأصل",
    "Rooted in the Delta.": "متجذّرون في الدلتا.",
    "Trusted Across Borders.": "موثوقون عبر الحدود.",
    "Bangladesh feeds a great deal more than Bangladesh. From our base in Cumilla we buy where the crop is grown and the catch is landed, hold it to an export standard, and move it to buyers who need the same quality arriving container after container.":
      "تُطعم بنغلاديش ما هو أبعد من بنغلاديش. من مقرّنا في كوميلا نشتري حيث يُزرع المحصول ويُصاد السمك، ونحفظه على معيار التصدير، وننقله إلى مشترين ينتظرون الجودة نفسها حاويةً بعد حاوية.",
    "“From the delta's harvest to the world's tables — moved in bulk, backed by a handshake that holds.”":
      "«من حصاد الدلتا إلى موائد العالم — يُنقل بالجملة، ويسنده عهدٌ يُوفى.»",
    "Direct Sourcing": "توريد مباشر",
    "Farm gate and landing station. No layers between the crop and your container.":
      "من باب المزرعة ومرسى الصيد مباشرة. لا وسطاء بين المحصول وحاويتك.",
    "Quality Control": "ضبط الجودة",
    "Export-graded, sampled and inspected before a carton is sealed.":
      "تصنيف تصديري، وأخذ عينات وفحص قبل إغلاق كل كرتونة.",
    "Cold Chain": "سلسلة التبريد",
    "Blast-frozen at source, monitored in transit, unbroken to port.":
      "تجميد سريع عند المصدر، ومراقبة أثناء النقل، دون انقطاع حتى الميناء.",
    "Documentation": "التوثيق",
    "Halal, phytosanitary, health certificate, CoO — the full file, on time.":
      "حلال، وصحة نباتية، وشهادة صحية، وشهادة منشأ — الملف الكامل في موعده.",
    "See the Catalogue →": "اطّلع على الكتالوج ←",
    "“Every container that leaves under our name carries my own word with it. Write to us — you will be answered by someone who can decide.”":
      "«كل حاوية تغادر باسمنا تحمل كلمتي معها. راسلونا — وسيجيبكم من يملك القرار.»",
    "Managing Director": "المدير العام",
    "Chattogram · The River to the Sea": "تشاتوغرام · النهر إلى البحر",
    "Harvest loading at a river ghat, golden hour": "تحميل الحصاد عند مرسى النهر، ساعة الغروب",

    /* Trust band */
    "Trading Markets": "أسواق نتعامل معها",
    "Export Grades": "درجات تصدير",
    "Core Categories": "فئات رئيسية",
    "Bulk / Wholesale": "جملة بالكامل",
    "Certified": "اعتماداتنا",
    "ISO Certified": "حاصلون على الأيزو",
    "HACCP": "هاسب HACCP",
    "Halal Certified": "حلال معتمد",
    "Phytosanitary": "صحة نباتية",
    "Premium Export": "تصدير ممتاز",
    "Non GMO": "خالٍ من التعديل الوراثي",
    "Hygienically Processed": "معالجة صحية",
    "Moisture Controlled": "رطوبة مضبوطة",
    "Certificates & export documents available on request —": "الشهادات ووثائق التصدير متاحة عند الطلب —",
    "ask the trade desk": "اسأل مكتب التجارة",

    /* Products banner + catalogue */
    "From Bengal, to the World": "من البنغال إلى العالم",
    "Premium quality products from the fertile lands of Bengal, crafted for the world.":
      "منتجات فاخرة من أراضي البنغال الخصبة، صُنعت للعالم.",
    "Rooted in Bengal": "متجذّرون في البنغال",
    "Delivering Worldwide": "نسلّم إلى العالم أجمع",
    "All": "الكل",
    "Rice": "الأرز",
    "Shrimp": "الروبيان",
    "Fish & Seafood": "الأسماك والمأكولات البحرية",
    "Fresh Vegetables": "خضروات طازجة",
    "Fresh Fruits": "فواكه طازجة",
    "Spices": "التوابل",
    "Potato": "البطاطس",
    "Dry & Agro Foods": "أغذية جافة وزراعية",
    "Multiple / Other": "متعدد / أخرى",
    "Explore Product": "استكشف المنتج",
    "“From the golden fields of Bengal to tables around the world.”":
      "«من حقول البنغال الذهبية إلى موائد العالم.»",

    /* Capabilities */
    "How We Work": "كيف نعمل",
    "The House": "الدار",
    "Built for Bulk,": "بُنيت للجملة،",
    "Backed by Care": "ومسنودة بالعناية",
    "Sea & Air Freight": "شحن بحري وجوي",
    "Unbroken Cold Chain": "سلسلة تبريد غير منقطعة",
    "Custom Packaging": "تعبئة حسب الطلب",
    "Trade Documentation": "وثائق التجارة",

    /* Journey + markets */
    "The Journey": "الرحلة",
    "From a Field in the Delta,": "من حقل في الدلتا،",
    "to a Ship at Chattogram.": "إلى سفينة في تشاتوغرام.",
    "Reach": "الانتشار",
    "From Bangladesh,": "من بنغلاديش،",
    "Across the World": "إلى أنحاء العالم",
    "Every route below runs outward from the delta. Add a market and it appears here.":
      "كل مسار أدناه ينطلق من الدلتا. أضِف سوقًا جديدة فتظهر هنا.",
    "Bangladesh": "بنغلاديش",
    "UAE": "الإمارات",
    "Saudi Arabia": "السعودية",
    "Qatar": "قطر",
    "Kuwait": "الكويت",
    "Oman": "عُمان",
    "Bahrain": "البحرين",
    "India": "الهند",
    "Malaysia": "ماليزيا",

    /* CTA band */
    "Let's Trade": "لنتاجر",
    "Ready to place a": "هل أنت مستعد لتقديم",
    "bulk inquiry?": "طلب جملة؟",
    "Talk to our trade desk — we reply": "تحدّث إلى مكتب التجارة — نرد",
    "within 24 hours (GMT+6)": "خلال 24 ساعة (GMT+6)",
    "View the Line Card": "اطّلع على قائمة المنتجات",
    "Port of loading": "ميناء الشحن",
    "Chattogram Seaport · Dhaka (air)": "ميناء تشاتوغرام · دكا (جوًا)",
    "Incoterms": "شروط التسليم",
    "Payment": "الدفع",
    "Irrevocable LC at sight · TT": "اعتماد مستندي غير قابل للنقض · حوالة مصرفية",
    "Lead time": "مدة التجهيز",
    "FCL in 2–3 weeks of confirmed order": "حاوية كاملة خلال 2–3 أسابيع من تأكيد الطلب",
    "Samples": "العينات",
    "Samples available — buyer covers courier": "العينات متاحة — والشحن على المشتري",

    /* Contact + form */
    "The Trade Desk": "مكتب التجارة",
    "Start a": "ابدأ",
    "Bulk Inquiry": "طلب جملة",
    "Wholesale & bulk inquiries only. MOQ applies. FOB / CIF terms available.":
      "طلبات الجملة فقط. يُطبَّق حدٌّ أدنى للطلب. شروط FOB / CIF متاحة.",
    "Name *": "الاسم *",
    "Company": "الشركة",
    "Your name": "اسمك",
    "Company (optional)": "الشركة (اختياري)",
    "Destination country *": "بلد الوجهة *",
    "e.g. United Arab Emirates": "مثال: الإمارات العربية المتحدة",
    "Product interest *": "المنتج المطلوب *",
    "Select a category…": "اختر فئة…",
    "Your WhatsApp / email *": "واتسابك أو بريدك الإلكتروني *",
    "So our trade desk can reach you — number or email": "ليتمكن مكتبنا من الرد عليك — رقم أو بريد",
    "Quantity / MOQ": "الكمية / الحد الأدنى",
    "e.g. 1 x 40ft reefer": "مثال: حاوية مبردة 40 قدمًا",
    "Message": "الرسالة",
    "Tell us about your requirement, packaging and timeline…": "أخبرنا عن طلبك والتعبئة والجدول الزمني…",
    "Send Inquiry": "أرسل الطلب",
    "Prefer Email?": "تفضّل البريد؟",
    "On submit we'll open WhatsApp with your inquiry pre-filled — press": "عند الإرسال سنفتح واتساب ورسالتك مجهّزة — اضغط",
    "Send": "إرسال",
    "there to deliver it. We reply": "هناك لتسليمها. نرد",
    ". We never charge or transact on-site.": ". لا نُحصّل أي مدفوعات ولا نجري معاملات على الموقع.",
    "Please enter your name.": "يرجى إدخال الاسم.",
    "Please enter a destination.": "يرجى إدخال بلد الوجهة.",
    "Please choose a product interest.": "يرجى اختيار المنتج.",
    "Please leave a WhatsApp number or email.": "يرجى ترك رقم واتساب أو بريد إلكتروني.",
    "Before you ask": "قبل أن تسأل",
    "What is the minimum order?": "ما الحد الأدنى للطلب؟",
    "Which payment terms do you accept?": "ما شروط الدفع المقبولة؟",
    "How fast can you ship?": "ما سرعة الشحن لديكم؟",
    "Can I get samples first?": "هل يمكنني الحصول على عينات أولًا؟",
    "Which ports do you load from?": "من أي موانئ تشحنون؟",
    "WhatsApp": "واتساب",
    "Click to chat — fastest reply": "انقر للمحادثة — أسرع رد",
    "Email": "البريد الإلكتروني",
    "Phone": "الهاتف",
    "Cumilla HQ": "المقر — كوميلا",
    "Hours": "ساعات العمل",
    "Sat–Thu, 9:00–18:00 (BST, GMT+6)": "السبت–الخميس، 9:00–18:00 (بتوقيت بنغلاديش GMT+6)",
    "Open in Google Maps": "افتح في خرائط جوجل",

    /* Footer */
    "Explore": "استكشف",
    "Markets": "الأسواق",
    "Get in Touch": "تواصل معنا",
    "WhatsApp — click to chat": "واتساب — انقر للمحادثة",
    "Trusted sourcing partner from the Bengal delta — the harvest of Bangladesh, delivered in bulk, with trust.":
      "شريك توريد موثوق من دلتا البنغال — حصاد بنغلاديش، يُسلَّم بالجملة، وبثقة.",
    "Our Group Companies": "شركات مجموعتنا",
    "Bulk & wholesale inquiries only.": "طلبات الجملة فقط.",
    "Trade Markets · GCC · Middle East · South Asia": "أسواق التجارة · الخليج · الشرق الأوسط · جنوب آسيا",
    "Privacy": "الخصوصية",
    "Terms": "الشروط",
    "FOB / CIF terms available · MOQ applies to all products.": "شروط FOB / CIF متاحة · يُطبَّق حد أدنى للطلب على جميع المنتجات.",

    /* Modal */
    "Inquire on WhatsApp": "استفسر عبر واتساب",
    "Email Trade Desk": "راسل مكتب التجارة",
    "Copy Link": "انسخ الرابط",
    "Varieties / Grades": "الأصناف / الدرجات",
    "Origins": "المناشئ",
    "Packaging": "التعبئة",
    "MOQ:": "الحد الأدنى للطلب:",
    "HS Code:": "رمز HS:",

    /* Markets modal + empty states + form toast */
    "Where We Operate": "أين نعمل",
    "No products yet — add your first to bring the showcase to life.":
      "لا توجد منتجات بعد — أضِف أول منتج لتُحيي المعرض.",
    "Please complete the required fields.": "يرجى إكمال الحقول المطلوبة.",
  };

  /* Context overrides — where one English word must translate differently.
     Applied AFTER the dictionary pass, keyed by selector. */
  const OVERRIDES = {
    ".pb-our": "منتجاتنا",          // banner "Our"
    ".pb-products": "من البنغال",   // banner "Products" (nav keeps المنتجات)
  };

  const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();

  function translateTree(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(n) {
        const p = n.parentElement;
        if (!p || /^(SCRIPT|STYLE|CODE)$/.test(p.tagName)) return NodeFilter.FILTER_REJECT;
        return norm(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((n) => {
      const t = AR[norm(n.nodeValue)];
      if (!t) return;
      // Preserve the node's original leading/trailing whitespace — the space
      // between a text node and an <em> flourish lives HERE, and dropping it
      // welds words together (e.g. "لتقديم" + "طلب").
      const lead = n.nodeValue.match(/^\s*/)[0];
      const trail = n.nodeValue.match(/\s*$/)[0];
      n.nodeValue = lead + t + (trail || " ");
    });
    // Attributes that carry visible language.
    root.querySelectorAll?.("[placeholder]").forEach((el) => {
      const t = AR[norm(el.getAttribute("placeholder"))];
      if (t) el.setAttribute("placeholder", t);
    });
    root.querySelectorAll?.("[aria-label]").forEach((el) => {
      const t = AR[norm(el.getAttribute("aria-label"))];
      if (t) el.setAttribute("aria-label", t);
    });
  }

  function apply(root = document.body) {
    translateTree(root);
    for (const sel in OVERRIDES) {
      const el = (root.querySelector ? root : document).querySelector(sel);
      if (el) el.textContent = OVERRIDES[sel];
    }
    // The catalogue searches product text — an Arabic hint reads better.
    const search = document.querySelector("[data-product-search]");
    if (search) search.setAttribute("placeholder", "ابحث في الكتالوج — miniket, hilsa, turmeric…");
  }

  window.I18N = {
    get active() { try { return localStorage.getItem(KEY) === "ar"; } catch (_) { return false; } },
    apply,
    // Translate a single runtime string (for toasts/messages built in JS).
    // Returns the original when inactive or unknown, so callers can wrap freely.
    t(str) { return this.active ? (AR[norm(str)] || str) : str; },
  };

  window.initI18n = function initI18n() {
    // Wire every toggle (header + mobile menu).
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      if (window.I18N.active) btn.textContent = "EN";
      btn.addEventListener("click", () => {
        try { localStorage.setItem(KEY, window.I18N.active ? "en" : "ar"); } catch (_) {}
        location.reload();
      });
    });
    if (!window.I18N.active) return;

    // Amiri loads only for the Arabic edition — English visitors never pay for it.
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap";
    document.head.appendChild(link);

    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");
    apply(document.body);
  };
})();
