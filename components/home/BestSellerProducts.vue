<template>
  <GeneralTheCard :header="{ title: $t('product.best_seller') }">
    <template #header>
      <div class="flex gap-4">
        <UButton
          @click="carousel.prev()"
          variant="soft"
          color="secondary"
          square
          class="rounded-full w-10 h-10 min-h-fit"
          size="xl"
        >
          <UAvatar
            :src="`/images/icons/arrow-${arrowLeft}-secondary.svg`"
            size="xs"
          />
        </UButton>

        <UButton
          @click="carousel.next()"
          variant="soft"
          color="secondary"
          square
          class="rounded-full w-10 h-10 min-h-fit"
          size="xl"
        >
          <UAvatar
            :src="`/images/icons/arrow-${arrowRight}-secondary.svg`"
            size="xs"
          />
        </UButton>
      </div>
    </template>

    <UCarousel
      :items="items"
      :ui="{
        item: 'snap-start xl:basis-2/12 lg:basis-3/12 sm:basis-1/3 basis-1/2 overflow-hidden',
      }"
      ref="carousel"
    >
      <template #default="{ item }">
        <ProductItemCard :item="item" />
      </template>
    </UCarousel>
  </GeneralTheCard>
</template>

<script setup>
const carousel = ref("");
const items = [
  "https://picsum.photos/600/800?random=1",
  "https://picsum.photos/600/800?random=2",
  "https://picsum.photos/600/800?random=3",
  "https://picsum.photos/600/800?random=4",
  "https://picsum.photos/600/800?random=5",
  "https://picsum.photos/600/800?random=6",
];

const { locale } = useI18n();

const arrowRight = computed(() => (locale.value === "en" ? "right" : "left"));
const arrowLeft = computed(() => (locale.value === "en" ? "left" : "right"));
</script>
