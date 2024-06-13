<template>
  <UModal :ui="{ width: 'w-full sm:max-w-xs' }" :model-value="props.modelValue">
    <UCard>
      <div class="text-center">
        <img
          :src="image"
          :alt="props.actionData?.title"
          class="w-44 mx-auto"
          :class="{ 'w-24 mb-4': props.actionData?.image }"
        />
        <h5 class="font-bukra font-bold text-sm mb-4">
          {{ props.actionData?.title }}
        </h5>

        <UButton @click="onSuccess" v-if="props.actionData?.success">
          Click to emit a success event
        </UButton>

        <UButton
          @click="onClose"
          size="xl"
          class="w-full justify-center"
          v-else
          >{{ props.actionData?.button || $t("general.back") }}</UButton
        >
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  actionData: {
    type: Object,
    required: true,
  },
});

const image = computed(() => {
  return props.actionData?.image
    ? props.actionData.image
    : "/images/success-check.gif";
});

const emit = defineEmits(["success", "close"]);

function onClose() {
  emit("close");
}

function onSuccess() {
  emit("success");
}
</script>
