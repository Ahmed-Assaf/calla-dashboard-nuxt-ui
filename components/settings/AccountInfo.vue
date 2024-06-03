<template>
  <GeneralTheCard :ui="{ body: { base: 'overflow-visible' } }">
    <div class="space-y-5">
      <!-- name -->
      <SettingsAccountInfoName :name="userInfo.name" />

      <!-- phone -->
      <SettingsAccountInfoPhone
        :phone="userInfo.phone"
        :country-code="`+${userInfo.country_code}`"
      />

      <!-- password -->
      <SettingsAccountInfoPassword />
    </div>
  </GeneralTheCard>
</template>

<script setup>
// auth store
const { userInfo } = storeToRefs(useAuthStore());
</script>
