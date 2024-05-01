<template>
  <ClientOnly>
    <UDropdown
      :items="items"
      :popper="{ arrow: true }"
      :ui="{
        base: 'border-2 border-solid border-primaryColor rounded-lg stroke-none',
        ring: 'ring-0',
        arrow: {
          base: 'before:border-s-0 before:border-b-0 before:border-t-2 before:border-e-2 before:border-primaryColor before:w-3 before:h-3 z-[1]',
          ring: 'before:ring-0',
          shadow: 'before:shadow-none',
        },
      }"
    >
      <UButton
        square
        size="md"
        variant="link"
        class="border border-solid border-[#E6E6E6] bg-white rounded-lg shadow-none relative"
      >
        <template #leading>
          <UBadge
            color="red"
            variant="solid"
            class="flex aspect-square absolute -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 top-0 start-0 rounded-full text-[10px] w-fit h-fit px-[2px] py-0 leading-none z-[1]"
            >5</UBadge
          >
          <UAvatar src="/images/icons/notifications-filled.svg" size="2xs" />
        </template>
      </UButton>

      <template #account="{ item }">
        <div class="text-left">
          <p>Signed in as</p>
          <p class="truncate font-medium text-gray-900 dark:text-white">
            {{ item.label }}
          </p>
        </div>
      </template>

      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>

        <UIcon
          :name="item.icon"
          class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
        />
      </template>
    </UDropdown>
  </ClientOnly>
</template>

<script setup lang="ts">
const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Documentation",
      icon: "i-heroicons-book-open",
    },
    {
      label: "Changelog",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];
</script>
