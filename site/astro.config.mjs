// VEON demo base: technical setup only. Visual design comes from design/concept.md of each client.
import { defineConfig } from "astro/config";

// Styles and the small script stay inside index.html, so dist opens the same from a server and from file://.
export default defineConfig({
  build: { inlineStylesheets: "always" },
  compressHTML: true,
  devToolbar: { enabled: false },
  vite: { build: { assetsInlineLimit: 16384 } },
});
