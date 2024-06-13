<template>
  <UFormGroup :label="$t('inputs.username.label')" name="name">
    <UInput
      :modelValue="profile?.name"
      :placeholder="$t('inputs.username.placeholder')"
      :ui="{
        padding: {
          lg: `!pe-48`,
        },
        icon: {
          trailing: {
            padding: {
              lg: `px-0`,
            },
          },
        },
      }"
      :loading="profileLoading"
      readonly
    >
      <template #trailing>
        <UButton
          type="buttons"
          size="xl"
          :label="$t('auth.username.change')"
          variant="solid"
          class="w-44 rounded-lg px-3 justify-center"
          @click="modal = true"
        />
      </template>
    </UInput>
    <SettingsAccountInfoNameModal v-model="modal" />
  </UFormGroup>
</template>

<script setup>
//  modal
const modal = ref(false);

// profile store
const { profile, profileLoading } = storeToRefs(useProfileStore());
</script>
