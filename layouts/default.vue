<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Body>
      <div class="grid grid-cols-12 h-screen">
        <div class="col col-span-4">
          <!-- sidebar -->
          <LayoutSidebar />
        </div>
        <div class="col col-span-8 flex flex-col">
          <!-- navbar -->
          <LayoutNavbar class="flex-shrink-0" />

          <main class="flex-1">
            <!-- page content -->
            <slot />
          </main>
        </div>
      </div>
    </Body>
  </Html>
</template>

<script lang="ts" setup>
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<style></style>
