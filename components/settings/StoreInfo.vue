<template>
  <GeneralTheCard
    v-if="profile"
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
          :src="profile.store_image"
          :alt="profile.store_name"
          class="border border-solid border-strokeLightGray bg-white rounded-lg shadow-none relative aspect-[1/.7] w-full h-auto overflow-hidden"
          :ui="{
            rounded: 'rounded-lg',
            size: {
              full: 'h-full w-full text-3xl object-contain',
            },
          }"
          size="full"
        />
      </div>
    </div>

    <div class="grid grid-cols-12 mb-6">
      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.store_name.label") }}</h5>
        <p class="text-textLightColor text-sm">
          {{ profile.store_name || $t("general.none") }}
        </p>
      </div>

      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.email.label") }}</h5>
        <p class="text-textLightColor text-sm">
          {{ profile.store_email }}
        </p>
      </div>

      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.commercial_number.label") }}</h5>
        <p class="text-textLightColor text-sm">
          {{ profile.commercial_number || $t("general.none") }}
        </p>
      </div>

      <div class="col col-span-3">
        <h5 class="text-xs mb-2">{{ $t("inputs.city.label") }}</h5>
        <p class="text-textLightColor text-sm">
          {{ profile.city?.name || $t("general.none") }}
        </p>
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
// modal
const modal = ref(false);

// profile store
const { profile } = storeToRefs(useProfileStore());
</script>

<style></style>
