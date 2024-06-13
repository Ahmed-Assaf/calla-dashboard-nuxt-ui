<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('pages.contact_us') }]" />

    <div class="grid grid-cols-12 mb-8">
      <div class="col lg:col-span-5 col-span-12">
        <ContactUsInfo />
      </div>

      <div class="col lg:col-span-7 col-span-12">
        <ContactUsMessageForm />
      </div>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.contact_us",
  permissionId: 8,
});
</script>

<style></style>
