<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <Body class="overflow-y-auto">
      <ClientOnly>
        <main
          class="auth-layout min-h-screen flex flex-col items-center pt-[64px]"
        >
          <!-- languages -->
          <UContainer class="pt-8 fixed top-0 z-[1]">
            <div class="block ms-auto w-fit">
              <LayoutNavbarLanguages
                color="text-white hover:text-white"
                arrow="/images/icons/chevron-down-white.svg"
              />
            </div>
          </UContainer>

          <!-- body content -->
          <UContainer class="grid grid-cols-12 !gap-y-8 py-8 flex-1">
            <div
              class="col md:col-span-6 col-span-12 h-full overflow-y-auto flex flex-col justify-center relative z-[1] md:order-1 order-2"
            >
              <slot />
            </div>

            <div
              class="col md:col-span-6 col-span-12 md:w-1/2 md:h-screen md:fixed top-0 end-0 md:order-2 order-1"
            >
              <LayoutAuthImageSlogan class="image-slogan" />
            </div>
          </UContainer>
        </main>
      </ClientOnly>
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

<style scoped lang="scss">
.image-slogan {
  z-index: 0;
}

@media screen and (min-width: 1280px) {
  .image-slogan {
    width: calc(100% - ((100vw - 1280px) / 2));
  }
}
</style>
