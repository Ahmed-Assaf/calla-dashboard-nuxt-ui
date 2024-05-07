export default defineAppConfig({
  ui: {
    button: {
      base: "shadow-none ring-0 transition-colors ease-in-out duration-300",
      font: "font-bukra font-bold",
      rounded: "rounded-lg",
      size: {
        sm: "text-xs",
        lg: "text-xs",
      },
      padding: {
        sm: "px-5 py-2",
        lg: "px-5 py-2.5",
      },
      color: {
        primary: {
          solid: "text-white bg-primaryColor hover:bg-primaryDarkColor",
        },
      },
      default: {
        size: "lg",
        variant: "solid",
        color: "primary",
      },
    },
  },
});
