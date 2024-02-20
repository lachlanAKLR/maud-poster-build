import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        "1/1": "1 / 1",
        "2/3": "2 / 3",
        "3/2": "3 / 2",
        "4/5": "4 / 5",
        "16/9": "16 / 9",
        "3/4": "3 / 4",
        "4/3": "4 / 3",
      },
      fontSize: {
        xs: ["14px", "16.8px"],
        sm: ["20px", "24px"],
        base: ["16px", "18px"],
        lg: ["24px", "28.8px"],
        xl: ["48px", "57.6px"],
        "2xl": ["64px", "58px"],
        "3xl": ["150px", "134px"],
        "4xl": ["180px", "171px"],
        "5xl": ["300px", "300px"],
        "6xl": ["820px", "750px"],
      },
      colors: {
        "maud-green": "#dee9bb",
        "maud-brown": "#897152",
        "maud-red": "#FF2C1D",
        "maud-black": "#16161D",
        "maud-grey": "#F2F2F0",
      },
      maxWidth: {
        "max-w-3xl": "50rem",
      },
    },
  },
  plugins: [],
};
export default config;
