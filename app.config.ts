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
        secondary: {
          soft: "text-secondaryColor bg-secondaryLightColor hover:bg-transparent",
        },
        gray: {
          solid:
            "text-base bg-strokeLightGray border-none ring-0 hover:bg-transparent",
        },
      },
      default: {
        size: "lg",
        variant: "solid",
        color: "primary",
      },
    },
    icons: {
      dynamic: true,
    },
    pagination: {
      wrapper: "w-fit gap-2 space-x-0",
      base: "p-0 w-8 aspect-[1/1] flex items-center justify-center font-urw",
      rounded: "rounded-full me-5",
    },
    badge: {
      color: {
        red: {
          solid: "bg-redColor text-white",
        },
      },
    },
    chip: {
      position: {
        "top-center": "top-0 inset-x-auto -translate-y-1/2",
      },
    },
    container: {
      center: true,
    },
  },
});
