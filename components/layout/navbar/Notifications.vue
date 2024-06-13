<template>
  <UDropdown
    :items="items"
    :popper="{ arrow: true }"
    :ui="{
      base: 'border-2 border-solid border-primaryColor rounded-lg stroke-none',
      ring: 'ring-0',
      rounded: 'rounded-lg',
      width: 'min-w-[20%] max-w-[80%] w-auto',
      divide: 'divide-transparent',
      padding: 'px-0 py-0 relative z-[1]',
      arrow: {
        base: 'rtl:before:border-s-0 ltr:before:border-e-0 before:border-b-0 before:border-t-2 rtl:before:border-e-2 ltr:before:border-s-2 before:border-primaryColor before:w-4 before:h-4 z-[1]',
        ring: 'before:ring-0',
        shadow: 'before:shadow-none',
        placement: `group-data-[popper-placement*='bottom']:-top-2`,
      },
      item: {
        base: 'gap-2 bg-transparent hover:bg-transparent border-b border-solid border-strokeLightGray items-start text-start cursor-default',
        rounded: 'rounded-none',
        padding: 'px-4 py-3',
      },
    }"
    @update:open="onOpen($event)"
    ref="dropdown"
  >
    <UButton
      square
      size="md"
      variant="link"
      class="border border-solid border-strokeLightGray bg-white rounded-lg shadow-none relative"
    >
      <template #leading>
        <UBadge
          color="red"
          variant="solid"
          class="flex aspect-square absolute -translate-y-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 top-0 start-0 rounded-full text-[8px] w-fit h-fit px-[2px] py-0 leading-tight z-[1] font-bukra font-bold"
          v-show="notifsCount"
          >{{ notifsCount }}</UBadge
        >
        <UAvatar src="/images/icons/notifications-filled.svg" size="2xs" />
      </template>
    </UButton>

    <template #item="{ item }">
      <div class="flex flex-1 items-center gap-2">
        <div
          class="icon bg-lightGray border border-solid border-strokeLightGray w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center relative"
        >
          <img
            src="/images/icons/notifications.svg"
            alt="notification"
            width="16"
          />
        </div>

        <div class="flex-1">
          <small class="flex leading-tight mb-1 whitespace-break-spaces">{{
            item.title
          }}</small>
          <small class="flex leading-tight text-textLightColor">{{
            item.created_at
          }}</small>
        </div>
      </div>

      <UButton
        color="red"
        size="sm"
        variant="link"
        :padded="false"
        class="flex-shrink-0"
        @click="deleteNotification(item.id)"
      >
        <template #leading>
          <UAvatar src="/images/icons/trash-filled.svg" size="3xs" />
        </template>
      </UButton>
    </template>

    <template #more="{ item }" v-if="items?.length">
      <UButton
        :to="localePath({ name: 'notifications' })"
        :label="item.label"
        block
      >
        <template #trailing>
          <UAvatar
            src="/images/icons/notifications-filled-white.svg"
            size="2xs"
          />
        </template>
      </UButton>
    </template>
  </UDropdown>
</template>

<script setup>
// i18n
const { t } = useI18n();

// locale path
const localePath = useLocalePath();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// dropdown
const dropdown = ref(null);

// fetch data
const { fetchData, loading, resultData } = useFetchData();

// notifications
const notifications = ref([]),
  notificationsLoading = ref(false);

// get notiifications on open
const onOpen = async (open) => {
  if (open) {
    fetchData({
      url: "provider/notifications",
      headers: {
        Authorization: `Bearer ${userInfo.value.token}`,
      },
      onSuccess: () => {
        console.log(resultData.value);
        notifications.value = resultData.value.notifications?.data;
      },
    });
  }
};

// notifications items
const items = computed(() => [
  [...notifications.value],
  [
    {
      label: t("general.view_more"),
      slot: "more",
    },
  ],
]);

// notifications count
const notifsCount = ref(0);

// get notiifications count
const getNotifsCount = async () => {
  fetchData({
    url: "provider/count-notifications",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: () => {
      notifsCount.value = resultData.value.count;
    },
  });
};

// delete notiifications
const deleteNotification = async (id) => {
  dropdown.value.open();
  fetchData({
    url: `provider/delete-notification/${id}`,
    method: "delete",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: async () => {
      await onOpen();
    },
  });
};

onMounted(async () => {
  await getNotifsCount();
});
</script>
