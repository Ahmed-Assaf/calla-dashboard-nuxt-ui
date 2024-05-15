<template>
  <ClientOnly>
    <nav class="navbar">
      <div class="col">
        <UButton
          :icon="icon"
          size="md"
          color="gray"
          square
          variant="outline"
          class="me-auto md:hidden"
          @click="$emit('toggleSidebar')"
        />

        <LayoutNavbarNotifications />

        <div class="flex items-center gap-2" v-if="isAuthed">
          <UAvatar
            :src="userInfo?.image"
            alt="shop"
            class="border border-solid border-strokeLightGray bg-white rounded-lg shadow-none relative w-[37.6px] h-[37.6px] overflow-hidden"
          />

          <small>{{ userInfo?.name }}</small>
        </div>

        <LayoutNavbarLanguages />
      </div>
    </nav>
  </ClientOnly>
</template>

<script lang="ts" setup>
// i18n
const { locale } = useI18n();

// emits
const emit = defineEmits(["toggleSidebar"]);

// icon
const icon = computed(() =>
  locale.value === "ar"
    ? "i-heroicons-bars-3-bottom-right"
    : "i-heroicons-bars-3-bottom-left"
);

// auth store
const { isAuthed, userInfo } = storeToRefs(useAuthStore());
</script>

<style lang="scss">
.navbar .col {
  @apply flex items-center justify-end gap-4 py-6 bg-inherit;
}
</style>
