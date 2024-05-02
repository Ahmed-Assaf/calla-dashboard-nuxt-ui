import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  theme: {
    fontFamily: {
      base: "'29LT Kaff'",
      bukra: "'29LT Bukra'",
      urw: "'URW DIN Arabic SemiCond'",
    },
    extend: {
      colors: {
        primaryColor: "#00c2cb",
        primaryLightColor: "#BEF1F4",
        secondaryColor: "#FF66C4",
        secondaryLightColor: "#FFE5F5",
        greenColor: "#4EE682",
        greenLightColor: "#DCFCE7",
        orangeColor: "#FFBC37",
        orangeLightColor: "#FFF4DE",
        textLightColor: "#9B9B9B",
        bodyColor: "#FAFAFA",
        sidebarColor: "#272727",
        strokeLightGray: "#E6E6E6",
        lightGray: "#F7F7F7",
      },
    },
    container: {
      center: true,
    },
  },
};
