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
        "4/3": "4 / 3",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },
      fontSize: {
        sm: ["14px", "14px"],
        base: ["14px", "14px"],
        lg: ["32px", "32px"],
        xl: ["750px", "750px"],
      },
      colors: {
        "maud-green": "#dee9bb",
        "maud-brown": "#897152",
        "maud-red": "#FF2C1D",
      },
      maxWidth: {
        "max-w-3xl": "50rem",
      },
    },
  },
  plugins: [],
};
export default config;
