<template>
  <section class="grid grid-cols-12 mb-6">
    <div class="col col-span-12">
      <slot />

      <div
        class="flex items-center justify-between gap-6 flex-wrap border-t border-t-strokeLightGray bg-white p-7 shadow-card rounded-b-3xl"
      >
        <div>
          <slot name="tfoot" />
        </div>

        <ClientOnly>
          <GeneralThePaginator v-model="page" :paginate-data="paginateData" />
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  paginate: {
    type: Object,
    required: false,
  },
});

// pagination
const page = ref(1),
  pageCount = ref(5),
  rows = computed(() => {
    return people.slice(
      (page.value - 1) * pageCount.value,
      page.value * pageCount.value
    );
  }),
  paginateData = computed(() => {
    if (process.client) {
      return {
        pageCount: pageCount.value,
        total: people.length,
        maxItems: 5,
      };
    }
  });
</script>

<style lang="scss">
.the-data-table {
  thead {
    tr > th {
      > * {
        @apply bg-[#f2f2f2] my-3 py-3 px-5 w-full h-full rounded-none m-0 hover:bg-[#f2f2f2];
      }

      &:first-of-type {
        > * {
          @apply rounded-s-3xl;
        }
      }

      &:last-of-type {
        > * {
          @apply rounded-e-3xl;
        }
      }

      > span {
        @apply block h-11 flex items-center;
      }
    }
  }

  tbody {
    @apply relative after:block after:absolute after:top-0 after:start-0 after:w-full after:h-full after:shadow-card after:bg-white after:rounded-t-3xl after:-z-[1];

    tr > td {
      @apply my-3 py-3 px-5 rounded-none m-0;
    }
    tr:first-of-type {
      td:first-of-type {
        @apply rounded-ss-3xl;
      }
      td:last-of-type {
        @apply rounded-se-3xl;
      }
    }
  }
}
</style>
