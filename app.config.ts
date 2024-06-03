export default defineAppConfig({
  ui: {
    button: {
      base: "shadow-none ring-0 transition-colors ease-in-out duration-300",
      font: "font-bukra font-bold",
      rounded: "rounded-lg",
      size: {
        sm: "text-xs",
        lg: "text-xs",
        xl: "text-xs min-h-11",
      },
      padding: {
        sm: "px-5 py-2",
        lg: "px-5 py-2.5",
        xl: "px-11 py-1.5",
      },
      color: {
        primary: {
          solid: "text-white bg-primaryColor hover:bg-primaryDarkColor",
          outline:
            "text-primaryColor bg-transparent border-2 border-primaryColor hover:text-white hover:bg-primaryColor",
          link: "underline text-primaryColor dark:text-primaryColor hover:text-primaryColor dark:hover:text-primaryColor  focus-visible:ring-0 focus-visible:ring-0",
        },
        secondary: {
          soft: "text-secondaryColor bg-secondaryLightColor hover:bg-transparent",
        },
        gray: {
          solid:
            "text-base bg-strokeLightGray border-none ring-0 hover:bg-transparent",
        },
        red: {
          solid:
            "text-white bg-redColor border-none ring-0 hover:bg-redColor/90",
          link: "underline text-redColor dark:text-redColor hover:text-redColor dark:hover:text-redColor  focus-visible:ring-0 focus-visible:ring-0",
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
      constrained: "w-full max-w-7xl",
    },
    formGroup: {
      label: {
        base: "text-xs text-textBaseColor",
        required: "after:text-redColor dark:after:text-redColor",
      },
      error: "mt-2 text-xs text-redColor dark:text-redColor",
      default: {
        size: "lg",
      },
    },
    input: {
      file: {
        base: "w-full h-full cursor-pointer file:w-full file:h-full file:mx-0 file:cursor-pointer !p-0",
      },
      placeholder: "placeholder-textLightColor dark:placeholder-textLightColor",
      icon: {
        trailing: {
          pointer: "",
        },
      },
      color: {
        white: {
          outline:
            "shadow-none text-textLightColor ring-strokeLightGray focus:ring-1 focus:ring-primaryColor dark:focus:ring-primaryColor",
        },
      },
      variant: {
        outline: "shadow-none bg-white text-textLightColor",
      },
      rounded: "rounded-lg",
      padding: {
        lg: "py-3.5",
      },
      size: {
        lg: "text-xs",
      },
      default: {
        size: "lg",
        color: "white",
      },
    },
    textarea: {
      placeholder: "placeholder-textLightColor dark:placeholder-textLightColor",
      color: {
        white: {
          outline:
            "shadow-none text-textLightColor ring-strokeLightGray focus:ring-1 focus:ring-primaryColor dark:focus:ring-primaryColor",
        },
      },
      variant: {
        outline: "shadow-none bg-white text-textLightColor",
      },
      rounded: "rounded-lg",
      padding: {
        lg: "py-3.5",
      },
      size: {
        lg: "text-xs",
      },
      default: {
        size: "lg",
        color: "white",
        variant: "outline",
      },
    },
    select: {
      padding: {
        lg: "py-3.5",
      },
      size: {
        lg: "text-xs",
      },
      rounded: "rounded-lg",
      color: {
        white: {
          outline:
            "shadow-none text-textLightColor ring-strokeLightGray focus:ring-1 focus:ring-primaryColor dark:focus:ring-primaryColor",
          none: "shadow-none text-textBaseColor ring-0 focus:ring-0",
        },
      },
      default: {
        size: "lg",
        color: "white",
      },
    },
    modal: {
      overlay: {
        background: "bg-black/60 dark:bg-black/60",
      },
      background: "bg-transparent dark:bg-transparent",
    },
    skeleton: {
      background: "bg-gray-200 dark:bg-gray-800",
    },
    toggle: {
      active: "bg-primaryColor dark:bg-primaryColor",
    },
    progress: {
      color: {
        primary: "bg-primaryColor",
      },
    },
    card: {
      base: "h-full",
      divide: "divide-strokeLightGray",
      ring: "ring-0",
      shadow: "shadow-card",
      rounded: "rounded-2xl",
      header: {
        base: "min-h-[50px] flex items-center justify-between gap-3 flex-wrap",
        padding: "px-4 py-2",
      },
      body: {
        base: "flex-1 overflow-auto",
        padding: "sm:p-4",
      },
    },
    table: {
      base: "min-w-full table-fixed",
      // wrapper: 'overflow-visible',
      divide: "divide-none",
      thead: "font-bukra",
      tbody: "divide-none font-medium",
      tr: {
        selected: "selected-row",
      },
      th: {
        padding: "px-0 py-0",
        size: "text-xs",
        color: "text-textBaseColor",
      },
      td: {
        base: "h-20",
        padding: "px-0 py-0",
        size: "text-xs",
        color: "text-textBaseColor",
      },
      default: {
        sortAscIcon: "i-material-symbols-arrow-drop-up",
        sortDescIcon: "i-material-symbols-arrow-drop-down",
        sortButton: {
          class: "text-xs",
        },
        progress: {
          color: "primaryColor",
        },
      },
    },
    tabs: {
      list: {
        background: "bg-transparent dark:bg-transparent",
        padding: "p-0",
      },
    },
    breadcrumb: {
      active: "text-textLightColor dark:text-white",
      inactive: "text-textLightColor",
    },
    radio: {
      wrapper: "inline-flex items-center",
      label: "text-xs text-textBaseColor",
      color: "text-primaryColor dark:text-primaryColor",
      border: "border-strokeLightGray",
      base: "h-3 w-3",
    },
    radioGroup: {
      fieldset: "flex items-center flex-wrap gap-6 mt-2",
    },
    checkbox: {
      wrapper: "items-center",
      color: "text-primaryColor dark:text-primaryColor",
      border: "border-strokeLightGray",
      ring: "focus-visible:ring-0",
      base: "h-3.5 w-3.5",
      label: "text-xs font-normal",
    },
    avatar: {
      placeholder: "font-bukra font-bold text-primaryColor",
    },
  },
});
