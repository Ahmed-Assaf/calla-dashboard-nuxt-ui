<template>
  <div class="grid grid-cols-12">
    <div class="col md:col-span-7 col-span-12">
      <UTabs
        :items="items"
        class="w-full"
        :defaultIndex="1"
        :ui="{
          list: {
            base: '!flex items-center gap-4 border-b border-b-strokeLightGray pb-3 mb-3 overflow-x-auto',
            height: 'h-fit',
            rounded: 'rounded-none',
            marker: {
              wrapper: 'top-0 left-0',
              background: 'bg-primaryColor',
              rounded: 'rounded-xl',
              shadow: 'shadow-none',
            },
            tab: {
              base: 'disabled:opacity-100 w-fit min-w-[120px] rounded-xl ui-focus-visible:ring-0',
              padding: 'px-1 py-3',
              height: 'h-fit',
              active: 'text-white',
              inactive:
                'text-textLightColor border border-strokeLightGray disabled:border-0',
              size: 'text-xs',
            },
          },
        }"
      >
        <template #default="{ item }">
          <GeneralPageHeading
            :title="[{ label: $t('pages.settings') }]"
            v-if="item.key === 'title'"
            class="!mb-0"
          />

          <div class="flex items-center gap-2 relative truncate" v-else>
            {{ item.label }}
          </div>
        </template>

        <template #item="{ item }">
          <SettingsAccountInfo v-if="item.key === 'account'" />

          <SettingsStoreInfo v-if="item.key === 'store'" />
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup>
// page meta
definePageMeta({
  title: "pages.settings",
  permissionId: 9,
});

// i18n
const { t } = useI18n();

// tab items
const items = ref([
  {
    key: "title",
    disabled: true,
  },
  {
    key: "account",
    label: t("settings.account_data.title"),
  },
  {
    key: "store",
    label: t("settings.store_data.title"),
  },
]);

// profile store
const { fetchProfile } = useProfileStore();

onMounted(async () => {
  await fetchProfile();
});
</script>

<style></style>
