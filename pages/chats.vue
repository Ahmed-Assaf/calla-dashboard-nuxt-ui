<template>
  <div>
    <GeneralPageHeading :title="[{ label: $t('pages.chats') }]" />

    <div class="grid grid-cols-12 mb-5">
      <UTabs
        :items="rooms"
        orientation="vertical"
        :ui="{
          wrapper:
            'flex items-start gap-4 grid grid-cols-12 col col-span-12 chat-wrap',
          base: 'h-full',
          container: 'relative w-auto col col-span-8 h-full !my-0',
          list: {
            base: 'col-span-4 w-auto flex flex-col gap-3 !h-full overflow-y-auto scroll-smooth px-2',
            marker: {
              wrapper: '!left-2',
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
        v-model="activeRoomIdx"
        @change="getRoomMsgs"
      >
        <template
          #default="{ item, selected }"
          v-if="rooms.length && !roomsLoading"
        >
          <div class="flex items-center justify-between gap-x-3 gap-y-2 mb-3">
            <div class="flex items-center gap-2">
              <UAvatar :src="item.avatar" :alt="item.name" size="lg" />
              <h6
                class="font-bukra font-bold text-primaryColor text-xs"
                :class="{ 'text-white': selected }"
              >
                {{ item.name }}
                {{ item.id }}
              </h6>
            </div>
            <p class="font-normal text-xs">{{ item.date }}</p>
          </div>
          <div class="flex items-center justify-between gap-x-3 gap-y-2">
            <p class="truncate font-normal text-xs">{{ item.message }}</p>
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

        <template #default v-else v-for="skel in skelCount" :key="skel">
          <div>
            <div class="flex items-center justify-between gap-x-3 gap-y-2 mb-3">
              <div class="flex items-center flex-1 gap-2">
                <USkeleton class="w-12 aspect-[1] rounded-full" />
                <USkeleton class="basis-2/3 w-auto h-4" />
              </div>
              <USkeleton class="w-5 h-3" />
            </div>
            <div class="flex items-center justify-between gap-x-3 gap-y-2">
              <USkeleton class="flex-1 h-3" />
            </div>
          </div>
        </template>

        <template #item="{ item, index }">
          <UCard
            class="shadow-card h-full rounded-2xl ring-0"
            :ui="{
              base: 'flex flex-col  chat-wrap',
              body: {
                base: 'flex-1',
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

            <div
              class="overflow-y-auto h-full scroll-smooth"
              @scroll="handelScroll($event)"
              :id="`messageWrapper_${index}`"
              v-if="allMessages.length"
            >
              <div v-if="scrollLoading" class="text-center mb-3">
                <UIcon name="i-eos-icons-loading" class="text-3xl" />
              </div>

              <div
                v-if="!messagesLoading"
                v-for="message in allMessages"
                :key="message"
                class="message-wrap"
                :class="{
                  sender: message.is_sender,
                  receiver: !message.is_sender,
                }"
              >
                <div>
                  <div class="message-cloud">
                    {{ message.body }}
                  </div>
                  <small class="text-xs text-[#707C97]">{{
                    message.created_dt
                  }}</small>
                </div>

                <UAvatar
                  :src="item.avatar"
                  :alt="item.name"
                  size="sm"
                  v-if="!message.is_sender"
                />
              </div>
              <div
                v-else
                v-for="msg in allMessages"
                :key="msg"
                class="message-wrap"
                :class="{
                  sender: msg.is_sender,
                  receiver: !msg.is_sender,
                }"
              >
                <div>
                  <USkeleton class="message-cloud h-8" />
                  <USkeleton class="h-4 w-24" />
                </div>

                <USkeleton class="w-8 aspect-[1] rounded-full" />
              </div>
            </div>

            <!-- card footer -->
            <template #footer>
              <UInput
                v-model="messageText"
                :placeholder="$t('inputs.chat.placeholder')"
                variant="none"
                :ui="{
                  wrapper: 'flex-1',
                }"
                @keyup.enter="sendMessage(index)"
              />
              <UButton
                square
                class="rounded-full min-h-fit"
                size="sm"
                @click="sendMessage(index)"
                :disabled="!messageText"
              >
                <img src="/images/icons/send-filled-white.svg" />
              </UButton>
            </template>
          </UCard>
        </template>
      </UTabs>
    </div>
  </div>
</template>

<script setup>
// imports
import { io } from "socket.io-client";
import moment from "moment";
import "moment/dist/locale/ar";

// page meta
definePageMeta({
  title: "pages.chats",
  permissionId: 2,
});

const { locale } = useI18n();

// auth store
const { userInfo } = storeToRefs(useAuthStore());

// fetch data
const { fetchData, resultData } = useFetchData();

// rooms
const rooms = ref([]),
  roomId = ref(null),
  activeRoomIdx = ref(null);

const roomsLoading = ref(null),
  skelCount = ref(1);

const socket = io("https://calla-app.com:4767", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  transports: ["websocket"],
});

const getRooms = async () => {
  roomsLoading.value = TextTrackCueList;

  await fetchData({
    url: "provider/chats/get-rooms",
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    onSuccess: async () => {
      rooms.value = [];

      for (const room of resultData.value.rooms) {
        const delegate = room.members.find((d) => d.type.includes("Delegate"));
        rooms.value.push({
          id: room.id,
          avatar: delegate.image,
          name: delegate.name,
          message: room.last_message_body,
          date: room.last_message_created_dt,
        });
      }

      skelCount.value = rooms.value.length;

      setTimeout(() => {
        roomsLoading.value = false;
        activeRoomIdx.value = 0;
      }, 1000);
    },
  });
};

// messages
const messages = ref([]),
  msgsPagination = ref({}),
  allMessages = ref([]),
  messageText = ref(undefined),
  receiverId = ref(null),
  current_page = ref(1),
  messagesLoading = ref(true),
  scrollLoading = ref(false),
  per_page = ref(10);

const getRoomMsgs = async (idx = 0) => {
  roomId.value = rooms.value[idx].id;

  console.log(roomId.value);
  allMessages.value = [];

  current_page.value = 1;

  await fetchData({
    url: `provider/chats/get-room-messages/${roomId.value}`,
    headers: {
      Authorization: `Bearer ${userInfo.value.token}`,
    },
    params: {
      page: current_page.value,
      per_page: per_page.value,
    },
    onSuccess: () => {
      console.log(resultData.value);
      socket.emit("exitChat", {});

      messages.value = resultData.value.messages.data.reverse();
      msgsPagination.value = resultData.value.messages.pagination;
      allMessages.value.push(...messages.value);

      socket.emit("enterChat", {
        user_id: userInfo.value.id,
        user_type: "Provider",
        room_id: roomId.value,
      });

      receiverId.value = resultData.value.members[0].id;

      setTimeout(() => {
        scrollBottom(idx);
      }, 100);
    },
  });
};

const scrollBottom = async (idx) => {
  const wrap = document.getElementById(`messageWrapper_${idx}`);
  wrap.scrollTo(0, wrap.scrollHeight);
  messagesLoading.value = false;
};

const sendMessageTosocket = (messageBody, type) => {
  socket.emit("sendMessage", {
    sender_id: userInfo.value.id,
    sender_type: "Provider",
    sender_name: userInfo.value.name,
    avater: "",
    receiver_id: receiverId.value,
    receiver_type: "Delegate",
    room_id: roomId.value,
    type: type,
    body: messageBody,
  });
};

const pushMessage = (messageBody, type) => {
  allMessages.value.push({
    is_sender: 1,
    type: type,
    body: messageBody,
    created_dt: moment().locale(locale.value).fromNow(),
  });
};

const sendMessage = async (idx) => {
  if (messageText.value.trim().length) {
    sendMessageTosocket(messageText.value, "text");
    pushMessage(messageText.value, "text");
  }

  console.log(idx);

  setTimeout(() => {
    scrollBottom(idx);
    messageText.value = undefined;
  }, 0.1);
};

socket.on("sendMessageRes", async () => {
  await getRooms();
});

const handelScroll = async (e) => {
  if (e.target.scrollTop === 0) {
    if (current_page.value < msgsPagination.value.total_pages) {
      scrollLoading.value = true;
      await fetchData({
        url: `provider/chats/get-room-messages/${roomId.value}`,
        headers: {
          Authorization: `Bearer ${userInfo.value.token}`,
        },
        params: {
          page: current_page.value + 1,
          per_page: per_page.value,
        },
        onSuccess: async () => {
          e.target.scroll({ top: 10 });
          current_page.value = current_page.value + 1;
          allMessages.value.unshift(
            ...resultData.value.messages.data.reverse()
          );

          scrollLoading.value = false;
        },
      });
    }
  }
};

onMounted(async () => {
  await getRooms();

  await getRoomMsgs();

  await scrollBottom(0);
});
</script>

<style lang="scss">
.chat-wrap {
  height: calc(100vh - 154px);
}

.message-wrap {
  @apply w-fit flex items-start gap-3 mb-3;

  .message-cloud {
    @apply px-3 py-2 w-fit max-w-full text-xs;
  }

  &.receiver {
    @apply ms-auto;

    .message-cloud {
      @apply ms-auto rounded-lg rounded-se-none;

      &:not(.skel) {
        @apply bg-primaryLightColor;
      }
    }
  }

  &.sender {
    .message-cloud {
      @apply rounded-lg rounded-es-none;

      &:not(.skel) {
        @apply bg-bodyColor;
      }
    }
  }
}
</style>
