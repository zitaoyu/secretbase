import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

// NextUI theme modification: https://nextui.org/docs/customization/create-theme

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "porygon-blue": "#69b6d8",
      "porygon-pink": "#e15e74",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        dark: {
          colors: {
            background: "#333333",
            foreground: "#ffffff",
          },
        },
        light: {
          colors: {
            background: "#f6f6f6",
            foreground: "#000000",
          },
        },
      },
    }),
  ],
};
export default config;
