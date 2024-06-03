<template>
  <div>
    <USkeleton
      v-if="props.loading"
      :ui="{ rounded: 'rounded-2xl' }"
      class="flex flex-col h-full"
    />

    <GeneralTheCard
      :header="{ title: $t('user.details') }"
      class="flex flex-col"
      v-else-if="!props.loading"
    >
      <div class="h-full flex flex-col gap-7">
        <ul class="flex-1">
          <li class="mb-7">
            <small class="text-[10px] text-textLightColor">{{
              $t("user.table.name")
            }}</small>
            <p class="font-bukra text-xs">{{ props.user.name }}</p>
          </li>

          <li class="mb-7">
            <small class="text-[10px] text-textLightColor">{{
              $t("user.table.job_name")
            }}</small>
            <p class="font-bukra text-xs">{{ role_name }}</p>
          </li>

          <li class="mb-7">
            <small class="text-[10px] text-textLightColor">{{
              $t("inputs.permissions.label")
            }}</small>
            <p class="font-bukra text-xs">
              <span v-for="(ability, idx) in abilities" :key="ability.id">
                {{ ability.name }}
                {{ idx < props.user.abilities.length - 1 ? " / " : "" }}
              </span>
            </p>
          </li>
          <!-- 
        <li>
          <small class="text-[10px] text-textLightColor">{{
            $t("inputs.password.label")
          }}</small>

          <div class="flex items-center gap-2">
            <p class="font-bukra text-xs" v-if="showPass">12345678</p>
            <p class="font-bukra text-xs" v-else>**********</p>

            <UButton
              variant="link"
              class="font-normal"
              @click="showPass = !showPass"
              :padded="false"
            >
              <template #leading>
                <UAvatar :src="passIcon" size="2xs" />
              </template>
            </UButton>
          </div>
        </li> -->
        </ul>

        <div class="flex items-center flex-wrap gap-3">
          <UserAction
            :button-label="$t('user.edit')"
            :user
            @update="$emit('update')"
          />

          <UserDelete
            :button-label="$t('user.delete.this')"
            :user-id="props.user.id"
            @delete="$emit('delete')"
          />
        </div>
      </div>
    </GeneralTheCard>
  </div>
</template>

<script lang="ts" setup>
// props
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
  },
});

// i18n
const { locale } = useI18n();

// role name
const role_name = computed(() => {
  if (locale.value === "en") return props.user.role_name.en || "";
  else return props.user.role_name.ar || "";
});

// abilities
const abilities = computed(() => {
  return props.user.abilities || [];
});

// toggle password
const showPass = ref(false);

const passIcon = computed(() => {
  return showPass.value
    ? "/images/icons/eye.svg"
    : "/images/icons/eye-closed.svg";
});
</script>

<style></style>
