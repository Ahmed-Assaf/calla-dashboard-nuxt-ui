<template>
  <nav class="navbar">
    <ClientOnly>
      <LayoutNavbarNotifications />

      <div class="flex items-center gap-2">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/739984?v=4"
          alt="shop"
          class="border border-solid border-strokeLightGray bg-white rounded-lg shadow-none relative w-[37.6px] h-[37.6px] overflow-hidden"
        />

        <small>اسم المتجر</small>
      </div>

      <LayoutNavbarLanguages />
    </ClientOnly>
  </nav>
</template>

<script lang="ts" setup></script>

<style lang="scss">
  .navbar {
    @apply flex items-center justify-end gap-4 py-6 bg-inherit;
  }
</style>
