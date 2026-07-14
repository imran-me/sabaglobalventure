# Firebase setup — make admin edits live for everyone

The site ships with an **optional** Firebase backend already wired in. Until you add
credentials it works exactly as-is (localStorage + export-to-GitHub). Once you finish
the steps below, the admin panel reads & writes the **cloud**, and every visitor
instantly sees your latest catalogue — no more "Export catalogue → commit" step.

> ⚠ **Create a NEW project for Saba Global Venture.** Do not reuse another site's
> Firebase project. `assets/js/firebase-config.js` ships **blank** on purpose.

## How it works (architecture)

- `assets/js/firebase-config.js` — **you paste your project keys here.**
- `assets/js/firebase.js` — defines `window.SGVCloud`:
  - `pull()` — public pages load published docs from Firestore into the local cache,
    then the site renders from it. `main.js` races this against a 4s timeout so a slow
    or unreachable Firestore can never hang the page on the preloader.
  - `mirror()` — every admin save/delete in `store.js` is pushed up to Firestore.
  - `signIn()/onAuth()` — admin login uses Firebase Auth.
  - `publishAll()` — the first admin login pushes your existing catalogue to the cloud.
- `store.js` keeps its same synchronous API; it just mirrors each write.

Collections used: `products`, `categories`, `countries`, `ads`, `inquiries`, and
`settings` (a single doc with id `site`).

## One-time setup (~15 minutes)

1. **Create a project** — <https://console.firebase.google.com> → *Add project*
   (e.g. `sabaglobalventure`). Google Analytics is optional.

2. **Firestore Database** — *Build → Firestore Database* → *Create database* →
   **Production mode** → pick a location near your buyers (`asia-south1` (Mumbai) is
   a good fit for Bangladesh + the Gulf) → Enable.

3. **Authentication** — *Build → Authentication* → *Get started* → *Sign-in method* →
   enable **Email/Password** → Save. Then *Users* → *Add user* → enter the email +
   password you'll use to log into `admin.html`. This replaces the demo gate.
   **Do not enable public sign-up** — there is exactly one admin.

4. **Register a web app & copy keys** — gear *Project settings* → *Your apps* → the
   **`</>`** (Web) icon → nickname → *Register*. Copy the shown `firebaseConfig`
   values into `assets/js/firebase-config.js`:

   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "AIza…",
     authDomain: "sabaglobalventure.firebaseapp.com",
     projectId: "sabaglobalventure",
     storageBucket: "sabaglobalventure.appspot.com",
     messagingSenderId: "1234567890",
     appId: "1:1234567890:web:abc123",
   };
   ```

   These web keys are **not secrets** — they ship in every Firebase web app and are
   safe to commit. Your **rules** (step 5) are what actually protect the data.

5. **Security rules** — Firestore → *Rules* → replace with the rules below →
   *Publish*. **Do not skip this.** In production mode the default rules deny
   everything, so the public site will show an empty catalogue until you publish these.
   Public can READ the catalogue; only your logged-in admin can WRITE. Inquiries can be
   CREATED by anyone (the contact form) but only read by the admin.

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /products/{id}   { allow read: if true;  allow write: if request.auth != null; }
       match /categories/{id} { allow read: if true;  allow write: if request.auth != null; }
       match /countries/{id}  { allow read: if true;  allow write: if request.auth != null; }
       match /ads/{id}        { allow read: if true;  allow write: if request.auth != null; }
       match /settings/{id}   { allow read: if true;  allow write: if request.auth != null; }
       match /inquiries/{id}  {
         allow create: if true;                                // contact form (anonymous)
         allow read, update, delete: if request.auth != null;  // admin only
       }
     }
   }
   ```

6. **Authorize your domain** — Authentication → *Settings → Authorized domains* → add
   your live domain (e.g. `yourname.github.io` and/or `sabaglobalventure.com`).
   `localhost` is already allowed. **Miss this and admin login fails in production.**

## First run

1. Open `admin.html` and log in with the email/password from step 3.
2. On this **first** login the panel detects the cloud is empty and uploads your
   current catalogue (you'll see a "Published to Firebase" toast). Check Firestore →
   *Data* to confirm the `products` collection appeared.
3. Edit a product and Save → it writes to Firestore.
4. Open the public site (another browser / your phone) → the change is there.

## Notes & costs

- **Free tier (Spark plan)** is generous (50k reads/day, 20k writes/day) — far more
  than this site needs.
- **Product photos:** the admin's desktop upload canvas-resizes each image to ≤1200px
  JPEG and embeds it inline as a `data:` URL kept under Firestore's **1 MB per-document
  limit**. That's fine for a curated ~20–25 SKU catalogue. **Google Drive share links**
  are also supported (`media.js` rewrites them). If the catalogue ever grows large,
  move photos to Firebase Storage (needs the Blaze plan) or stay on Drive links.
- The **"⤓ Export catalogue"** button still works as a backup/offline path.
- To go back to localStorage-only, just blank out `apiKey` in `firebase-config.js`.
