<template>
  <div class="flex items-center h-full py-12">
    <img
      src="/images/auth-slog-bg.svg"
      class="absolute top-0 end-0 ltr:-scale-100 h-full -z-[1]"
      loading="lazy"
    />

    <img
      src="/images/auth-image-slog-ar.svg"
      alt="Authentication"
      loading="lazy"
      class="max-w-[90%] ms-auto max-h-full object-contain animate-float drop-shadow-2xl"
    />
  </div>
</template>

<script lang="ts" setup>
// locale route
const localeRoute = useLocaleRoute();
</script>
