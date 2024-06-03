<template>
  <GeneralTheCard
    :ui="{
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
    class="h-fit"
  >
    <UTable
      :columns="columns"
      :rows="people"
      :ui="{
        wrapper: 'the-table',
        thead: 'border-b border-b-strokeLightGray',
        th: { padding: 'px-4 py-3.5' },
        td: { base: 'h-fit', padding: 'px-4 py-3.5' },
      }"
    />
  </GeneralTheCard>
</template>

<script setup>
const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "name",
    label: "User name",
  },
  {
    key: "title",
    label: "Job position",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "role",
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
</script>
