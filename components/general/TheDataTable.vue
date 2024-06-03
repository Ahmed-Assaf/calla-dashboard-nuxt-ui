<template>
  <section>
    <slot />

    <div
      class="flex items-center justify-between gap-6 flex-wrap border-t border-t-strokeLightGray bg-white p-7 shadow-card rounded-b-3xl"
    >
      <div>
        <slot name="tfoot" />
      </div>

      <GeneralThePaginator @update:page="$emit('update:page', $event)" />
    </div>
  </section>
</template>

<script setup lang="ts">
// paginateData = computed(() => {
//   if (process.client) {
//     return {
//       pageCount: pageCount.value,
//       total: people.length,
//       maxItems: 5,
//     };
//   }
// });
</script>

<style lang="scss">
.the-data-table {
  thead {
    tr > th {
      > * {
        @apply bg-[#f2f2f2] mb-3 py-3 px-5 w-full h-full rounded-none m-0 hover:bg-[#f2f2f2] whitespace-nowrap;
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

  &.hidden-select {
    thead {
      tr > th {
        &:nth-of-type(2) {
          > * {
            @apply rounded-s-3xl;
          }
        }
      }
    }
  }

  tbody {
    @apply relative after:block after:absolute after:top-0 after:start-0 after:w-full after:h-full after:shadow-card after:bg-white after:rounded-t-3xl after:-z-[1];

    tr > td {
      @apply my-3 py-3 px-5 rounded-none m-0;
    }

    tr.selected-row > td {
      @apply bg-primaryColor text-white;
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

  &.hidden-select {
    tbody {
      tr:first-of-type {
        td:nth-of-type(2) {
          @apply rounded-ss-3xl;
        }
        td:last-of-type {
          @apply rounded-se-3xl;
        }
      }
    }
  }
}
</style>
