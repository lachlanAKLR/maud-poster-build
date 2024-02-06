import localFont from "next/font/local";

export const unica = localFont({
  src: [
    {
      path: "./assets/fonts/Unica77-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/Unica77-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const herbik = localFont({
  src: [
    {
      path: "./assets/fonts/HerbikUnlicensedTrial-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});
