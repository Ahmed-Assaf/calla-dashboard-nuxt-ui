<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <Body>
      <ClientOnly>
        <div class="flex overflow-hidden">
          <!-- sidebar -->
          <LayoutSidebar
            class="flex-shrink-0 h-screen md:basis-auto md:opacity-100 basis-0 opacity-0"
            :class="{
              '!sm:basis-1/3 !basis-10/12 !opacity-100': expandedBar,
            }"
          />

          <div
            class="flex-1 flex flex-col h-screen"
            :class="{ '!sm:basis-2/3 !basis-2/12': expandedBar }"
          >
            <!-- navbar -->
            <LayoutNavbar
              class="flex-shrink-0"
              @toggle-sidebar="toggleSidebar"
            />

            <main
              class="flex-1 overflow-auto"
              :class="{ '!opacity-0': expandedBar }"
            >
              <!-- page content -->
              <slot />
            </main>
          </div>
        </div>
      </ClientOnly>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
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

// toggle sidebar
const expandedBar = ref(false);
const toggleSidebar = async () => {
  expandedBar.value = !expandedBar.value;
};
</script>

<style></style>
