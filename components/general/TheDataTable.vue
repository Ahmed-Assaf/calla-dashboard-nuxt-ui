<template>
  <section class="grid grid-cols-12 mb-6">
    <div class="col col-span-12">
      <UTable
        :columns="columns"
        :rows="rows"
        class="the-data-table"
        sort-asc-icon="i-material-symbols-arrow-drop-up"
        sort-desc-icon="i-material-symbols-arrow-drop-down"
        :ui="{
          base: 'min-w-full table-fixed',
          // wrapper: 'overflow-visible',
          divide: 'divide-none',
          thead: 'font-kaff',
          tbody: 'divide-none font-bukra',
          th: {
            padding: 'px-0 py-0',
            size: 'text-xs',
          },
          td: {
            base: 'h-20',
            padding: 'px-0 py-0',
            size: 'text-xs',
          },
        }"
      >
      </UTable>

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
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    direction: "desc" as const,
  },
  {
    key: "role",
    label: "Role",
  },
];

const people = [
  {
    id: 1,
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay.walton@example.com",
    role: "Member",
  },
  {
    id: 2,
    name: "Courtney Henry",
    title: "Designer",
    email: "courtney.henry@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Tom Cook",
    title: "Director of Product",
    email: "tom.cook@example.com",
    role: "Member",
  },
  {
    id: 4,
    name: "Whitney Francis",
    title: "Copywriter",
    email: "whitney.francis@example.com",
    role: "Admin",
  },
  {
    id: 5,
    name: "Leonard Krasner",
    title: "Senior Designer",
    email: "leonard.krasner@example.com",
    role: "Owner",
  },
  {
    id: 6,
    name: "Floyd Miles",
    title: "Principal Designer",
    email: "floyd.miles@example.com",
    role: "Member",
  },
];

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
