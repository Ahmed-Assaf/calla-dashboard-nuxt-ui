<template>
  <UFormGroup :label="$t('inputs.username.label')" name="name">
    <UInput
      :modelValue="props.name"
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
// props
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

//  modal
const modal = ref(false);
</script>
