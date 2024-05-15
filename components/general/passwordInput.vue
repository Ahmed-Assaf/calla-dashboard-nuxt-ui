<template>
  <UInput :type="type">
    <template #trailing>
      <UButton
        variant="link"
        class="!no-underline"
        :padded="false"
        size="xs"
        type="button"
        @click="togglePassword"
      >
        <template #leading>
          <img :src="passIcon" width="18" />
        </template>
      </UButton>
    </template>
  </UInput>
</template>

<script lang="ts" setup>
// toggle password
const { type, passIcon, togglePassword } = usePasswordToggle();
</script>

<style></style>
