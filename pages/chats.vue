<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('pages.chats') }]" />

    <div class="grid grid-cols-12 mb-6">
      <UTabs
        :items="items"
        orientation="vertical"
        :ui="{
          wrapper: 'flex items-center gap-4 grid grid-cols-12 col col-span-12',
          base: 'h-full',
          container: 'relative w-auto col col-span-8 h-full !my-0',
          list: {
            width: 'w-48',
            base: 'col-span-4 w-auto flex flex-col gap-3',
            marker: {
              background: 'bg-gradient-to-r from-[#51B0B4] to-primaryColor',
              rounded: 'rounded-2xl',
              shadow: 'shadow-card',
            },
            tab: {
              base: 'block shadow-card',
              height: 'h-fit',
              active: 'text-white dark:text-white',
              inactive: 'text-textBaseColor dark:text-textBaseColor bg-white',
              padding: 'px-6 py-5',
              rounded: 'rounded-2xl',
            },
          },
        }"
      >
        <template #default="{ item, index, selected }">
          <div class="flex items-center justify-between gap-x-3 gap-y-2 mb-3">
            <div class="flex items-center justify-between gap-2">
              <UAvatar :src="item.avatar" :alt="item.name" size="lg" />
              <h6
                class="font-bukra font-bold text-primaryColor text-xs"
                :class="{ 'text-white': selected }"
              >
                {{ item.name }}
              </h6>
            </div>
            <p class="font-normal text-xs">{{ item.date }}</p>
          </div>
          <div class="flex items-center justify-between gap-x-3 gap-y-2">
            <p class="truncate font-normal text-xs">{{ item.content }}</p>
            <UChip
              text="3"
              size="xl"
              :ui="{
                base: 'relative !translate-x-0 !translate-y-0 font-bukra !py-0 !leading-none ring-0',
                background: 'bg-redColor',
                width: 'w-fit',
              }"
            ></UChip>
          </div>
        </template>

        <template #item="{ item }">
          <UCard
            class="shadow-card h-full rounded-2xl ring-0"
            :ui="{
              base: 'flex flex-col',
              body: {
                base: 'flex-1 overflow-auto',
              },
              footer: {
                base: 'flex items-center justify-between',
                padding: '!px-0 mx-6',
              },
            }"
          >
            <!-- card header -->
            <template #header>
              <div class="flex items-center gap-2">
                <UAvatar :src="item.avatar" :alt="item.name" size="lg" />
                <h6 class="font-bukra font-bold text-xs">
                  {{ item.name }}
                </h6>
              </div>
            </template>
            {{ item.content }}

            <!-- card footer -->
            <template #footer>
              <UInput
                v-model="value"
                :placeholder="$t('inputs.chat.placeholder')"
                variant="none"
                :ui="{
                  wrapper: 'flex-1',
                }"
              />
              <UButton square class="rounded-full min-h-fit" size="sm">
                <img src="/images/icons/send-filled-white.svg" />
              </UButton>
            </template>
          </UCard>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
const value = ref("");
const items = [
  {
    avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
    name: "اسم المندوب",
    date: "منذ 3 دقائق",
    content: "هذا النص يمكن استبداله بنص أخر هضا النص يمكن استبداله بنص",
  },
  {
    avatar: "",
    name: "اسم المندوب",
    date: "منذ 3 دقائق",
    content: "هذا النص يمكن استبداله بنص أخر هضا النص يمكن استبداله بنص",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
    name: "اسم المندوب",
    date: "منذ 3 دقائق",
    content: "هذا النص يمكن استبداله بنص أخر هضا النص يمكن استبداله بنص",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/739984?v=4",
    name: "اسم المندوب",
    date: "منذ 3 دقائق",
    content: "هذا النص يمكن استبداله بنص أخر هضا النص يمكن استبداله بنص",
  },
];
</script>

<style></style>
