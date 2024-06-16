import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import react from "@astrojs/react";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon(), react()],
  output: "hybrid",
  adapter: netlify(),
  image: {
    domains: ["cdn.shopify.com"],
  },
});
