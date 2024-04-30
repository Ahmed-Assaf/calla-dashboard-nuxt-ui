import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primaryColor: "#00c2cb",
        secondaryColor: "#FF66C4",
        bodyColor: "#FAFAFA",
      },
    },
    container: {
      center: true,
    },
  },
};
