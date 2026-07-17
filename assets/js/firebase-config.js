/* ============================================================================
   firebase-config.js — YOUR Firebase project credentials (EDIT THIS FILE)
   ----------------------------------------------------------------------------
   The site works fully WITHOUT this: leave the values blank and everything runs
   on localStorage, exactly as if there were no backend. Fill it in when you
   want admin edits to be visible to every visitor on every device.

   SETUP (about 10 minutes, free Spark plan is enough):
     1. https://console.firebase.google.com  ->  Add project
        (suggested name: "sabaglobalventure" — do NOT reuse another project).
     2. Build -> Firestore Database -> Create database -> *production mode*.
     3. Build -> Authentication -> Sign-in method -> enable *Email/Password*.
        Then Users -> Add user. THAT email/password is your admin.html login.
        Do not enable public sign-up — there is exactly one admin.
     4. Project settings (gear) -> Your apps -> Web app (</>) -> register the
        app, then copy its `firebaseConfig` values into the object below.
     5. Firestore -> Rules -> paste the rules from FIREBASE_SETUP.md -> Publish.
        This step is what actually protects your data. Do not skip it.
     6. Authentication -> Settings -> Authorized domains -> add your live domain
        (e.g. yourname.github.io) or login will fail in production.

   SECURITY NOTE: these web API keys are NOT secrets — they ship in every
   Firebase web app and are safe to commit. Your Firestore RULES are what stop
   strangers writing to your catalogue. Get step 5 right.
   ========================================================================== */

/* Live project: "sabaglobalventure" (added 2026-07). The Firebase console shows
   the keys in a v12 modular <script type="module"> snippet, but this site uses
   the v10 *compat* SDK (the <script> tags in index.html / admin.html) — the
   config OBJECT is identical either way, so these values drop straight in. */
window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBFrkeXaK56cFsJh8ikgMuAt1V8T-LbEGM",
  authDomain: "sabaglobalventure.firebaseapp.com",
  projectId: "sabaglobalventure",
  storageBucket: "sabaglobalventure.firebasestorage.app",
  messagingSenderId: "612320337283",
  appId: "1:612320337283:web:ba07f03850815c41e52ab6",
};
