<template>
  <ClientOnly>
    <aside class="h-screen">
      <div class="head">
        <img src="/images/logo.svg" class="logo" />
      </div>

      <ul class="side-menu">
        <li v-for="(link, idx) in links" :key="link[idx]">
          <ULink
            :to="link.to ? link.to : ''"
            @click="link?.action"
            class="link"
            active-class="active"
          >
            <span class="icon">
              <img :src="link.icon.src" :alt="link.label" class="w-5" />
              <UBadge size="xs" v-if="link.badge" color="red" class="badge">{{
                link.badge
              }}</UBadge>
            </span>

            <span>
              {{ link.label }}
            </span>
          </ULink>
        </li>
      </ul>

      <!-- <UVerticalNavigation
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
            base: 'flex-shrink-0 ml-auto absolute font-bold -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 top-2 start-3 rounded-full text-[10px] w-fit h-fit px-[2px] py-0 leading-none z-[1]',
            color: 'red',
            variant: 'solid',
          },
        }"
      >
        <template #icon="{ link }">
          <IconHover :image="link.icon" />
        </template>
  
        <template #default="{ link }">
          <div class="relative">
            {{ link.label }}
          </div>
        </template>
  
        <template #accordion="{ link }">
          <div class="relative bg-red">
            {{ link.label }}
          </div>
        </template>
      </UVerticalNavigation> -->
    </aside>
  </ClientOnly>
</template>

<script setup>
// i18n
const { t } = useI18n();

// local route
const localeRoute = useLocaleRoute();

// route
const route = useRoute();

// nav livks
const links = computed(() => [
  {
    label: t("pages.home"),
    icon: {
      src: route.name.includes("index")
        ? "/images/icons/home-filled.svg"
        : "/images/icons/home.svg",
    },
    to: localeRoute({ name: "index" }),
  },
  {
    label: t("pages.products_management"),
    icon: {
      src: route.name.includes("products")
        ? "/images/icons/box-filled.svg"
        : "/images/icons/box.svg",
    },
    to: localeRoute({ name: "products" }),
  },
  {
    label: t("pages.chats"),
    icon: {
      src: route.name.includes("chats")
        ? "/images/icons/message-filled.svg"
        : "/images/icons/message.svg",
    },
    badge: 100,
    to: "",
  },
  {
    label: t("pages.orders_management"),
    icon: {
      src: route.name.includes("orders-management")
        ? "/images/icons/order-manage-filled.svg"
        : "/images/icons/order-manage.svg",
    },
    to: "",
  },
  {
    label: t("pages.products_refund"),
    icon: {
      src: route.name.includes("products-refund")
        ? "/images/icons/return-filled.svg"
        : "/images/icons/return.svg",
    },
    to: "",
  },
  {
    label: t("pages.users_management"),
    icon: {
      src: route.name.includes("users-management")
        ? "/images/icons/user-filled.svg"
        : "/images/icons/user.svg",
    },
    to: "",
  },
  {
    label: t("pages.finance_treatements"),
    icon: {
      src: route.name.includes("finance-treatements")
        ? "/images/icons/coin-filled.svg"
        : "/images/icons/coin.svg",
    },
    to: "",
  },
  {
    label: t("pages.shop_rates"),
    icon: {
      src: route.name.includes("shop-rates")
        ? "/images/icons/star-filled.svg"
        : "/images/icons/star.svg",
    },
    to: "",
  },
  {
    label: t("pages.contact_us"),
    icon: {
      src: route.name.includes("contact-us")
        ? "/images/icons/call-filled.svg"
        : "/images/icons/call.svg",
    },
    to: "",
  },
  {
    label: t("pages.settings"),
    icon: {
      src: route.name.includes("settings")
        ? "/images/icons/settings-filled.svg"
        : "/images/icons/settings.svg",
    },
    to: "",
  },
  {
    label: t("pages.logout"),
    icon: {
      src: route.name.includes("logout")
        ? "/images/icons/logout-filled.svg"
        : "/images/icons/logout.svg",
    },
    action: logout,
  },
]);

// auth store
const { userInfo } = storeToRefs(useAuthStore());
const { deleteAuth } = useAuthStore();

// fetch composable
const { fetchData } = useFetchData();

// runtime config
const config = useRuntimeConfig();

// handle logout
const logout = async () => {
  const token = userInfo.value.token;

  await fetchData({
    url: "provider/sign-out",
    method: "DELETE",
    getSuccess: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      device_id: config.public.device_id,
    },
    onSuccess: async () => {
      deleteAuth();
      await navigateTo(localeRoute({ name: "auth-login", replace: true }));
    },
  });
};
</script>

<style lang="scss" scoped>
aside {
  @apply bg-textBaseColor flex flex-col overflow-hidden font-bukra transition-all duration-300;

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
  @apply flex-1 overflow-auto p-5 pt-0;

  .link {
    @apply text-white flex gap-3 items-center px-3 py-2 bg-transparent hover:text-white rounded-[10px] mb-2;

    .icon {
      @apply z-[1] w-[33px] h-[33px] flex items-center justify-center flex-shrink-0 bg-white/5 rounded-[10px] relative;

      .badge {
        @apply absolute font-bold -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 top-0 start-0 rounded-full text-[10px] w-fit h-fit px-[2px] py-0 leading-none z-[1];
      }
    }

    &.active {
      @apply bg-primaryColor;
    }
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-[#fff]/20 hover:bg-[#fff]/25 rounded;
  }
}
</style>
