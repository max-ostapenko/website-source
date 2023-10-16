import lume from "lume/mod.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import postcss from "lume/plugins/postcss.ts";
import code_highlight from "lume/plugins/code_highlight.ts";
import nav from "lume/plugins/nav.ts";
import pagefind from "lume/plugins/pagefind.ts";
import picture from "lume/plugins/picture.ts";
import imagick from "lume/plugins/imagick.ts";
import sheets from "lume/plugins/sheets.ts";
import sitemap from "lume/plugins/sitemap.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";

import { initializeApp } from "firebase/firebase-app.js";
import { getAnalytics } from "firebase/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyD2ip08k9dEL-mMzVr26v9Z663QlFD1m90",
  authDomain: "max-ostapenko.firebaseapp.com",
  databaseURL: "https://max-ostapenko.firebaseio.com",
  projectId: "max-ostapenko",
  storageBucket: "max-ostapenko.appspot.com",
  messagingSenderId: "390347019852",
  appId: "1:390347019852:web:14ca448a408310721f86e9",
  measurementId: "G-2PLSJFB5RW",
};
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const site = lume({
  src: "./src",
  dest: "./public",
  location: new URL("https://maxostapenko.com"),
  server: {
    open: true,
  },
});

site.use(code_highlight());
site.use(nav());
site.use(pagefind());
site.use(picture());
site.use(imagick());
site.use(sheets());
site.use(sitemap());
site.use(slugify_urls());
site.use(tailwindcss(/* Options */));
site.use(postcss());

export default site;
