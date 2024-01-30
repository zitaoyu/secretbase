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
      "sb-green": "#80c060",
      "sb-dark-green": "#398c31",
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      themes: {
        // Using Neutral color pallette from: https://atlassian.design/foundations/color-new/color-palette-new
        dark: {
          colors: {
            background: "#1D2125", //100
            content1: "#22272B", //200
            primary: {},
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
