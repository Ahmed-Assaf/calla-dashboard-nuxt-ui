<template>
  <UDropdown
    :items="items"
    :popper="{ arrow: true }"
    :ui="{
      padding: 'px-0 py-0 relative z-[1]',
      base: 'border border-solid border-primaryColor stroke-none',
      ring: 'ring-0',
      rounded: 'rounded-lg',
      divide: 'divide-strokeLightGray',
      arrow: {
        base: 'rtl:before:border-s-0 ltr:before:border-e-0  before:border-b-0 before:border-t rtl:before:border-e ltr:before:border-s before:border-primaryColor z-[1]',
        ring: 'before:ring-0',
        shadow: 'before:shadow-none',
      },
      item: {
        base: 'gap-2 ',
        active: 'bg-primaryColor text-white',
        inactive:
          'text-black hover:text-black bg-transparent hover:bg-transparent',
        rounded: 'rounded-none',
        padding: 'px-4 py-3',
      },
    }"
  >
    <UButton
      square
      size="sm"
      variant="link"
      :label="currentLocaleName"
      class="hover:no-underline font-normal"
      :class="props.color ? props.color : `text-black hover:text-black`"
    >
      <template #trailing>
        <img
          :src="props.arrow ? props.arrow : `/images/icons/chevron-down.svg`"
          width="20"
        />
      </template>
    </UButton>
  </UDropdown>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: "",
  },
  arrow: {
    type: String,
    default: "",
  },
});
// ========== language
const { availableLocales, currentLocaleName, switchLocalePath } =
  useSwitchLang();

// items
const items = ref([]);

for (const locale of availableLocales.value) {
  if (locale) {
    items.value.push([
      {
        label: locale.name,
        to: switchLocalePath(locale.code),
      },
    ]);
  }
}
</script>
