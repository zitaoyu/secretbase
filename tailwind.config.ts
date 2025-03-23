import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

// NextUI theme modification: https://nextui.org/docs/customization/create-theme

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "sb-primary": "#80c060",
      "sb-secondary": "#69b6d8",
      "porygon-blue": "#69b6d8",
      "porygon-pink": "#e15e74",
      "sb-green": "#80c060",
      "sb-dark-green": "#398c31",
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      addCommonColors: true,
      themes: {
        // Using Neutral color pallette from: https://atlassian.design/foundations/color-new/color-palette-new
        dark: {
          colors: {
            background: "#1D2125", //100
            content1: "#22272B", //200
          },
        },
        light: {
          colors: {
            background: "#F1F2F4", //200
            content1: "#F7F8F9", //100
          },
        },
      },
    }),
  ],
};
export default config;
