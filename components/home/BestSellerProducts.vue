<script setup lang="ts">
  const items = [
    "https://picsum.photos/600/800?random=1",
    "https://picsum.photos/600/800?random=2",
    "https://picsum.photos/600/800?random=3",
    "https://picsum.photos/600/800?random=4",
    "https://picsum.photos/600/800?random=5",
    "https://picsum.photos/600/800?random=6",
  ];

  const { locale } = useI18n();

  console.log(locale);
</script>

<template>
  <UCarousel
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'rounded-lg',
    }"
    arrows
    class="w-64 mx-auto"
  >
    <template #default="{ item }">
      <img :src="item" class="w-full" draggable="false" />
    </template>

    <template #prev="{ onClick, disabled }">
      <button @click="onClick">
        {{ locale === "en" ? "Prev" : "Next" }}
      </button>
    </template>

    <template #next="{ onClick, disabled }">
      <button @click="onClick">
        {{ locale === "en" ? "Next" : "Prev" }}
      </button>
    </template>
  </UCarousel>
</template>
