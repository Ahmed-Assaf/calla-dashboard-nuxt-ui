<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <Body>
      <div class="grid grid-cols-12">
        <div class="col col-span-2 p-0 h-screen">
          <!-- sidebar -->
          <LayoutSidebar />
        </div>
        <div class="col col-span-10 p-0 flex flex-col h-screen">
          <!-- navbar -->
          <LayoutNavbar class="flex-shrink-0" />

          <main class="flex-1 overflow-auto">
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
