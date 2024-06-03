<template>
  <GeneralTheCard
    :ui="{
      body: {
        base: 'overflow-visible',
        padding: 'px-4 py-5 sm:!px-8',
      },
    }"
  >
    <div class="grid grid-cols-12 mb-6">
      <div class="col col-span-3">
        <UAvatar
          :src="userInfo.store_image"
          :alt="userInfo.store_name"
          class="border border-solid border-strokeLightGray bg-white rounded-lg shadow-none relative aspect-[1/.7] w-full h-auto overflow-hidden"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 mb-6">
      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.store_name.label") }}</h5>
        <p class="text-textLightColor text-sm">{{ userInfo.store_name }}</p>
      </div>

      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.email.label") }}</h5>
        <p class="text-textLightColor text-sm">
          {{ userInfo.store_email }}
        </p>
      </div>

      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.commercial_number.label") }}</h5>
        <p class="text-textLightColor text-sm">
          {{ userInfo.commercial_number }}
        </p>
      </div>

      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.city.label") }}</h5>
        <p class="text-textLightColor text-sm">{{ userInfo.city.name }}</p>
      </div>
    </div>

    <UButton
      :label="$t('auth.store.change')"
      radius="rounded-lg block min-w-[173px] max-w-full"
      size="xl"
      class="rounded-xl"
      @click="modal = true"
    />

    <SettingsStoreInfoModal v-model="modal" />
  </GeneralTheCard>
</template>

<script setup>
// auth store
const { userInfo } = storeToRefs(useAuthStore());

// modal
const modal = ref(false);
</script>

<style></style>
