<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <Body>
      <main class="auth-layout">
        <UContainer class="grid grid-cols-12">
          <div class="col col-span-6 p-0 h-screen overflow-y-auto bg-slate-600">
            <slot />
          </div>

          <div class="col col-span-6 p-0 h-screen">
            <div class="block ms-auto w-fit pt-8">
              <LayoutNavbarLanguages
                color="text-white hover:text-white"
                arrow="/images/icons/chevron-down-white.svg"
              />
            </div>
            <LayoutAuthImageSlogan />
          </div>
        </UContainer>
      </main>
    </Body>
  </Html>
</template>

<script setup>
// i18n
const { t } = useI18n();

// route
const route = useRoute();

// locale head
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});

// title
const title = computed(() => {
  if (process.client) {
    return t(route.meta.title ?? "") + " - " + t("head.title");
  }
});
</script>
