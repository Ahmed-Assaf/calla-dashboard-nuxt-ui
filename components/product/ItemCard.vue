<template>
  <UCard
    :ui="{
      base: 'h-full w-full p-3',
      divide: 'divide-none',
      ring: 'ring-0',
      shadow: 'shadow-none',
      header: {
        base: 'text-center mb-2 sm:p-0 flex-col gap-0',
      },
      body: {
        padding: 'py-0 px-0 sm:p-0',
      },
    }"
  >
    <template #header v-if="props.header">
      <h5 class="font-bukra text-xs">
        {{ $t("product.item.sold_times") }}
      </h5>

      <h6 class="text-2xl text-primaryColor font-bukra font-bold">
        {{ props.item.selling_count }}
      </h6>
    </template>

    <div
      class="aspect-[1/.6] overflow-hidden flex items-center justify-center my-3"
    >
      <img
        src="/images/product-img.png"
        alt=""
        class="object-contain w-full h-full"
      />
    </div>

    <h6 class="font-bukra truncate max-w-full text-sm mb-3">
      {{ props.item.title }}
    </h6>

    <div class="flex items-center justify-between gap-3 flex-wrap">
      <p class="text-sm text-primaryColor font-bukra font-bold">
        {{ props.item.price }} {{ $t("general.currency") }}
      </p>

      <small class="font-bukra font-bold">
        {{ props.item.avg_rate }}
        <UIcon
          name="i-heroicons-star-solid"
          dynamic
          class="text-base text-starActive"
        />
      </small>
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  header: {
    type: Object,
    default: {},
  },
  item: {
    type: Object,
    required: true,
  },
});
</script>
