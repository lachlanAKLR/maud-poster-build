import localFont from "next/font/local";

export const diatype = localFont({
  src: [
    {
      path: "./assets/fonts/ABCDiatype-Bold.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./assets/fonts/ABCDiatype-Black-Trial.woff",
      weight: "900",
      style: "normal",
    },
  ],
});

export const herbik = localFont({
  src: [
    {
      path: "./assets/fonts/Herbik-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});
