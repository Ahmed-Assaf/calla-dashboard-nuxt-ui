<template>
  <UFormGroup :label="$t('inputs.password.label')" name="name">
    <UInput
      modelValue="********"
      :placeholder="$t('inputs.password.placeholder')"
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
      readonly
    >
      <template #trailing>
        <UButton
          type="buttons"
          size="xl"
          :label="$t('auth.password.change')"
          variant="solid"
          class="w-44 rounded-lg px-3 justify-center"
          @click="modal = true"
        />
      </template>
    </UInput>

    <SettingsAccountInfoPasswordModal v-model="modal" />
  </UFormGroup>
</template>

<script setup>
//  modal
const modal = ref(false);
</script>
