<template>
  <aside>
    <div class="head">
      <img src="/images/logo.svg" class="logo" />
    </div>

    <UVerticalNavigation
      class="side-menu"
      :links="links"
      :ui="{
        wrapper: 'flex-1 overflow-auto p-5 pt-0',
        base: 'text-white flex gap-3 items-center px-3 py-2 bg-transparent hover:text-white before:z-0 before:rounded-[10px] mb-2',
        active: 'before:bg-primaryColor hover:before:bg-primaryColor',
        inactive: 'hover:before:bg-transparent',
        avatar: {
          base: 'z-[1] w-[33px] h-[33px] flex items-center justify-center bg-white/5 rounded-[10px]',
        },
        badge: {
          base: 'flex-shrink-0 ml-auto absolute -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 top-2 start-3 rounded-full text-[10px] w-fit h-fit px-[2px] py-0 leading-none z-[1]',
          color: 'red',
          variant: 'solid',
        },
      }"
    >
      <!-- <template #icon="{ link }">
        <IconHover :image="link.icon" />
      </template> -->

      <template #default="{ link }">
        <div class="relative">
          {{ link.label }}
        </div>
      </template>
    </UVerticalNavigation>
  </aside>
</template>

<script setup>
// i18n
const { t } = useI18n();

// locale path
const localePath = useLocalePath();

// route
const route = useRoute();

console.log("route", route);

// nav livks
const links = computed(() => [
  {
    label: t("pages.home"),
    avatar: {
      src: route.name.includes("index")
        ? "/images/icons/home-filled.svg"
        : "/images/icons/home.svg",
    },
    to: localePath({ name: "index" }),
  },
  {
    label: t("pages.products_management"),
    avatar: {
      src: route.name.includes("products-management")
        ? "/images/icons/box-filled.svg"
        : "/images/icons/box.svg",
    },
    to: localePath({ name: "products-management" }),
  },
  {
    label: t("pages.chats"),
    avatar: {
      src: route.name.includes("chats")
        ? "/images/icons/message-filled.svg"
        : "/images/icons/message.svg",
    },
    badge: 100,
    to: "",
  },
  {
    label: t("pages.orders_management"),
    avatar: {
      src: route.name.includes("orders-management")
        ? "/images/icons/order-manage-filled.svg"
        : "/images/icons/order-manage.svg",
    },
    to: "",
  },
  {
    label: t("pages.products_refund"),
    avatar: {
      src: route.name.includes("products-refund")
        ? "/images/icons/return-filled.svg"
        : "/images/icons/return.svg",
    },
    to: "",
  },
  {
    label: t("pages.users_management"),
    avatar: {
      src: route.name.includes("users-management")
        ? "/images/icons/user-filled.svg"
        : "/images/icons/user.svg",
    },
    to: "",
  },
  {
    label: t("pages.finance_treatements"),
    avatar: {
      src: route.name.includes("finance-treatements")
        ? "/images/icons/coin-filled.svg"
        : "/images/icons/coin.svg",
    },
    to: "",
  },
  {
    label: t("pages.shop_rates"),
    avatar: {
      src: route.name.includes("shop-rates")
        ? "/images/icons/star-filled.svg"
        : "/images/icons/star.svg",
    },
    to: "",
  },
  {
    label: t("pages.contact_us"),
    avatar: {
      src: route.name.includes("contact-us")
        ? "/images/icons/call-filled.svg"
        : "/images/icons/call.svg",
    },
    to: "",
  },
  {
    label: t("pages.settings"),
    avatar: {
      src: route.name.includes("settings")
        ? "/images/icons/settings-filled.svg"
        : "/images/icons/settings.svg",
    },
    to: "",
  },
  {
    label: t("pages.logout"),
    avatar: {
      src: route.name.includes("logout")
        ? "/images/icons/logout-filled.svg"
        : "/images/icons/logout.svg",
    },
    to: "",
  },
]);
</script>

<style lang="scss" scoped>
aside {
  @apply bg-sidebarColor h-full flex flex-col overflow-hidden;

  .head {
    @apply p-5 flex-shrink-0;

    .logo {
      @apply mx-auto w-[65px];
    }
  }
}
</style>

<style lang="scss">
.side-menu {
  &::-webkit-scrollbar-thumb {
    @apply bg-[#fff]/20 hover:bg-[#fff]/25 rounded;
  }
}
</style>
