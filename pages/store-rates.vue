<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('store_rates.users_rates') }]" />

    <div class="grid grid-cols-12 mb-8">
      <div class="col col-span-12">
        <GeneralTheCard class="text-center py-8 h-fit mb-5">
          <h4 class="font-bukra font-bold md:text-5xl text-3xl mb-5">4.0</h4>

          <div class="flex items-center justify-center mb-3">
            <UIcon
              name="i-heroicons-star-solid"
              dynamic
              class="text-starActive text-3xl"
              v-for="i in 5"
              :key="i"
            />
          </div>
          <span class="text-sm text-textLightColor"
            >(567) {{ $t("store_rates.rate.number") }}</span
          >
        </GeneralTheCard>

        <StoreComments />
      </div>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.store_rates",
  permissionId: 7,
});
</script>

<style></style>
