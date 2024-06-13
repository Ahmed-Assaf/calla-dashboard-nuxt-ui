<template>
  <GeneralTheCard :ui="{ body: { base: 'overflow-visible' } }">
    <div class="space-y-5">
      <!-- name -->
      <SettingsAccountInfoName />

      <!-- phone -->
      <SettingsAccountInfoPhone />

      <!-- password -->
      <SettingsAccountInfoPassword />
    </div>
  </GeneralTheCard>
</template>

<script setup></script>
