<template>
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
          :class="{ active: link.active, 'opacity-40 !pe-0': !link.open }"
          :disabled="!link.open"
        >
          <span class="item-icon">
            <img :src="link.icon.src" :alt="link.label" class="w-5" />
            <UBadge
              size="xs"
              v-if="link.badge && link.open"
              color="red"
              class="badge"
              >{{ link.badge }}</UBadge
            >
          </span>

          <span class="flex-1">
            {{ link.label }}
          </span>

          <UIcon
            name="i-heroicons-lock-closed"
            class="text-base flex-shrink-0 opacity-40"
            v-if="!link.open"
          />
        </ULink>

        <ul class="sub-menu" v-if="link.sub_links && link.active">
          <li v-for="(subLink, idx) in link.sub_links" :key="idx">
            <ULink :to="subLink.to" class="sub-link" active-class="active">{{
              subLink.label
            }}</ULink>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script setup>
// i18n
const { t } = useI18n();

// local route
const localeRoute = useLocaleRoute();

// route
const route = useRoute();
const { deleteAuth } = useAuthStore();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

const checkOpen = (id) => {
  return userInfo.value.abilities.some((ab) => ab.id === id);
};

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
    open: true,
  },
  {
    label: t("pages.products_management"),
    icon: {
      src: route.name.includes("products")
        ? "/images/icons/box-filled.svg"
        : "/images/icons/box.svg",
    },
    to: localeRoute({ name: "products" }),
    open: checkOpen(1),
  },
  {
    label: t("pages.chats"),
    icon: {
      src: route.name.includes("chats")
        ? "/images/icons/message-filled.svg"
        : "/images/icons/message.svg",
    },
    badge: 100,
    to: localeRoute({ name: "chats" }),
    open: checkOpen(2),
  },
  {
    label: t("pages.orders_management"),
    icon: {
      src: route.name.includes("orders-management")
        ? "/images/icons/order-manage-filled.svg"
        : "/images/icons/order-manage.svg",
    },
    to: localeRoute({ name: "orders" }),
    open: checkOpen(3),
  },
  {
    label: t("pages.products_refund"),
    icon: {
      src: route.name.includes("refund")
        ? "/images/icons/return-filled.svg"
        : "/images/icons/return.svg",
    },
    to: localeRoute({ name: "refund" }),
    open: checkOpen(4),
  },
  {
    label: t("pages.users_management"),
    icon: {
      src: route.name.includes("users-management")
        ? "/images/icons/user-filled.svg"
        : "/images/icons/user.svg",
    },
    to: localeRoute({ name: "users" }),
    open: checkOpen(5),
  },
  {
    label: t("pages.finance_treatements"),
    icon: {
      src: route.name.includes("finance-treatements")
        ? "/images/icons/coin-filled.svg"
        : "/images/icons/coin.svg",
    },
    to: localeRoute({ name: "finance-treatements-financial-reports" }),
    open: checkOpen(6),
    sub_links: [
      {
        label: t("pages.financial_reports"),
        to: localeRoute({ name: "finance-treatements-financial-reports" }),
      },
      {
        label: t("pages.settlement_requests"),
        to: localeRoute({
          name: "finance-treatements-settlement-requests",
        }),
      },
    ],
    active: route.name.includes("finance-treatements"),
  },
  {
    label: t("pages.store_rates"),
    icon: {
      src: route.name.includes("store-rates")
        ? "/images/icons/star-filled.svg"
        : "/images/icons/star.svg",
    },
    to: localeRoute({
      name: "store-rates",
    }),
    open: checkOpen(7),
  },
  {
    label: t("pages.contact_us"),
    icon: {
      src: route.name.includes("contact-us")
        ? "/images/icons/call-filled.svg"
        : "/images/icons/call.svg",
    },
    to: localeRoute({
      name: "contact-us",
    }),
    open: checkOpen(8),
  },
  {
    label: t("pages.settings"),
    icon: {
      src: route.name.includes("settings")
        ? "/images/icons/settings-filled.svg"
        : "/images/icons/settings.svg",
    },
    to: localeRoute({
      name: "settings",
    }),
    open: checkOpen(9),
  },
  {
    label: t("pages.logout"),
    icon: {
      src: route.name.includes("logout")
        ? "/images/icons/logout-filled.svg"
        : "/images/icons/logout.svg",
    },
    action: logout,
    open: true,
  },
]);

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
  @apply bg-textBaseColor flex flex-col overflow-hidden font-bukra font-normal text-sm transition-all duration-300;

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

  > li {
    @apply mb-2;
  }

  .link {
    @apply text-white flex gap-3 items-center ps-3 pe-6 py-2 bg-transparent hover:text-white rounded-[10px];

    .item-icon {
      @apply z-[1] w-[33px] h-[33px] flex items-center justify-center flex-shrink-0 bg-white/5 rounded-[10px] relative;

      .badge {
        @apply absolute font-bold -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 top-0 start-0 rounded-full text-[10px] w-fit h-fit px-[2px] py-0 leading-none z-[1];
      }
    }

    &.active {
      @apply bg-primaryColor font-bold;
    }
  }

  .sub-menu {
    @apply ms-[29px] pt-3 border-s border-[#fff]/20;

    li {
      @apply flex items-end gap-2 before:content-[''] before:block before:w-5 before:h-full before:border-s before:border-b before:border-[#fff]/20;
      &:not(:last-of-type) {
        @apply mb-3;
      }
    }
  }
  .sub-link {
    @apply text-white text-xs;
    &.active {
      @apply font-bold text-primaryColor;
    }
  }

  &::-webkit-scrollbar-thumb {
    @apply bg-[#fff]/20 hover:bg-[#fff]/25 rounded;
  }
}
</style>
