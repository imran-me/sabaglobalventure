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

window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
