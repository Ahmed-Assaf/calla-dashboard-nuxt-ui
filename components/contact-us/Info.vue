<template>
  <GeneralTheCard :ui="{ body: { padding: 'sm:!py-9 sm:p-8' } }">
    <img
      src="/images/contact-us.svg"
      :alt="$t('pages.contact_us')"
      class="w-48 mx-auto mb-7"
    />

    <div v-if="loading" class="mb-7">
      <USkeleton
        :ui="{ rounded: 'rounded-2xl' }"
        class="h-2 mb-2"
        v-for="i in 5"
        :key="i"
      />
    </div>

    <p class="text-xs font-light leading-[2.5] mb-7" v-else>
      {{ info.contact_text }}
    </p>

    <ul>
      <li>
        <ULink class="link">
          <div class="icon">
            <img src="/images/icons/location-white.svg" alt="address" />
          </div>

          <USkeleton
            :ui="{ rounded: 'rounded-2xl' }"
            class="flex-1 h-2"
            v-if="loading"
          />

          <span class="font-bukra font-bold" v-else>{{ info.map_desc }}</span>
        </ULink>
      </li>

      <li>
        <ULink class="link">
          <div class="icon">
            <img src="/images/icons/envelope-white.svg" alt="address" />
          </div>

          <USkeleton
            :ui="{ rounded: 'rounded-2xl' }"
            class="flex-1 h-2"
            v-if="loading"
          />

          <span v-else>{{ info.email }}</span>
        </ULink>
      </li>

      <li>
        <ULink class="link">
          <div class="icon">
            <img src="/images/icons/phone-white.svg" alt="address" />
          </div>

          <USkeleton
            :ui="{ rounded: 'rounded-2xl' }"
            class="flex-1 h-2"
            v-if="loading"
          />

          <span dir="ltr" v-else>{{ info.phone }}</span>
        </ULink>
      </li>
    </ul>
  </GeneralTheCard>
</template>

<script setup>
// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, resultData: info, loading } = useFetchData();

// fetch contact info
const fetchInfo = async () => {
  fetchData({
    url: "provider/complaints",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
  });
};

onMounted(async () => {
  await fetchInfo();
});
</script>

<style lang="scss" scoped>
ul {
  @apply space-y-4;

  li {
    .link {
      @apply flex items-center gap-3 bg-bodyColor shadow-[0_3px_6px_0_rgba(112,112,112,12.2%)] w-full rounded-s-3xl rounded-e-xl text-xs font-bukra;

      .icon {
        @apply w-9 aspect-[1] bg-primaryColor rounded-full flex items-center justify-center flex-shrink-0;
        img {
          @apply w-3/6;
        }
      }

      span {
        @apply truncate;
      }
    }
  }
}
</style>
