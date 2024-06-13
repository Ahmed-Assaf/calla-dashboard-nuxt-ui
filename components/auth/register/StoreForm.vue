<template>
  <div>
    <GeneralTheForm
      :button="{
        label: $t('auth.store.send_request'),
        radius: 'rounded-xl block min-w-[173px] max-w-full',
        loading,
      }"
      :state
      :schema
      ref="form"
      id="store_form"
      @submit="handleSubmit"
    >
      <!-- store image -->
      <UFormGroup>
        <div class="flex items-center justify-center gap-3">
          <div
            class="relative cursor-pointer w-14 aspect-[1] flex items-center justify-center flex-col gap-1"
          >
            <UInput
              type="file"
              class="absolute top-0 left-0 w-full h-full z-[1] opacity-0 cursor-pointer"
              multiple
              name="store_image"
              @change="uploadImage($event)"
            />

            <div
              class="w-full h-full overflow-hidden p-1 rounded-xl border border-solid border-strokeLightGray"
            >
              <img
                :src="thumbnail"
                :alt="$t('inputs.images.label')"
                class="mb-1 object-cover w-full h-full rounded-lg"
              />
            </div>
            <UButton
              square
              class="absolute bottom-0 translate-y-1/2 rounded-full p-[3px]"
              @click="removeImage(thumbnail)"
              size="2xs"
            >
              <template #leading>
                <img src="/images/icons/camera-white.svg" width="12" />
              </template>
            </UButton>
          </div>
        </div>
      </UFormGroup>

      <!-- store name -->
      <UFormGroup :label="$t('inputs.store_name.label')" name="store_name">
        <UInput
          v-model="state.store_name"
          :placeholder="$t('inputs.store_name.placeholder')"
        />
      </UFormGroup>

      <!-- store email -->
      <UFormGroup :label="$t('inputs.email.label')" name="store_email">
        <UInput
          v-model="state.store_email"
          :placeholder="$t('inputs.email.placeholder')"
          type="email"
        />
      </UFormGroup>

      <!-- city -->
      <UFormGroup :label="$t('inputs.city.label')" name="city_id" class="mb-0">
        <GeneralTheSelectMenu
          v-model="state.city_id"
          :options="cities"
          :placeholder="$t('inputs.city.placeholder')"
          value-attribute="id"
          option-attribute="name"
          @open="fetchCities"
          :loading="citiesLoading"
        />
      </UFormGroup>

      <!-- map -->
      <UFormGroup class="mb-0">
        <GMapMap
          :center="center"
          :zoom="13"
          :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
          }"
          class="w-full aspect-[1/.35] rounded-lg overflow-hidden"
          loading="async"
        >
          <GMapMarker
            :position="markers.position"
            :clickable="true"
            :draggable="true"
            icon="/images/icons/location-pin.svg"
            @dragend="setDragPLace($event)"
          >
          </GMapMarker>
        </GMapMap>
      </UFormGroup>

      <!-- commercial number -->
      <UFormGroup
        :label="$t('inputs.commercial_number.label')"
        name="commercial_number"
      >
        <UInput
          v-model="state.commercial_number"
          :placeholder="$t('inputs.commercial_number.placeholder')"
          type="number"
        />
      </UFormGroup>
    </GeneralTheForm>
  </div>
</template>

<script setup>
// imports
import { object, string, number } from "yup";
import { GeneralActionModal } from "#components";

// props
const props = defineProps({
  imgSrc: {
    type: String,
    default: "",
  },
  confirmedState: {
    type: Object,
    default: {},
  },
  edit: {
    type: Boolean,
    default: false,
  },
});

// emit
const emit = defineEmits(["submitted"]);

// form ref
const form = ref(null);

// i18n
const { t } = useI18n();

// images upload
const { thumbnail, imgList, uploadImage, removeImage } = useImageUploadSingle({
  defaultImg: "/images/icons/store.svg",
});

// cities
const { cities, citiesLoading } = storeToRefs(useCitiesStore());
const { fetchCities } = useCitiesStore();

// map initialization
const center = reactive({ lat: 31, lng: 31 }),
  markers = reactive({
    position: {
      lat: 31,
      lng: 31,
    },
  });

const stateObj = computed(() => {
  if (props.edit) {
    return { ...props.confirmedState };
  } else {
    return {
      store_image: imgList.value,
      store_email: undefined,
      city_id: null,
      lat: center.lat,
      lng: center.lng,
      map_desc: undefined,
      commercial_number: null,
      ...props.confirmedState,
    };
  }
});

// state
const state = reactive(stateObj.value);

// schema
const schema = object({
  store_name: string().required(t("inputs.store_name.required")),
  store_email: string()
    .email(t("inputs.email.invalid"))
    .required(t("inputs.email.required")),
  city_id: number().required(t("inputs.city.required")),
  commercial_number: number().required(t("inputs.commercial_number.required")),
});

// set the place on Drag
const setDragPLace = ($event) => {
  new google.maps.Geocoder().geocode(
    {
      latLng: $event.latLng,
    },
    function (results, status) {
      if (status === "OK") {
        if (results[0]) {
          const lat = $event.latLng.lat(),
            lng = $event.latLng.lng(),
            address = results[0].formatted_address;

          center.lat = lat;
          center.lng = lng;
          markers.position.lat = lat;
          markers.position.lng = lng;
          state.map_desc = address;

          console.log(state.map_desc);
        }
      }
    }
  );
};

const getlocation = async () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    if (process.client) {
      await new google.maps.Geocoder().geocode(
        {
          latLng: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        },
        function (results, status) {
          if (status === "OK") {
            if (results[0]) {
              const lat = pos.coords.latitude,
                lng = pos.coords.longitude,
                address = results[0].formatted_address;
              center.lat = lat;
              center.lng = lng;
              markers.position.lat = lat;
              markers.position.lng = lng;
              state.map_desc = address;
            }
          }
        }
      );
      console.log(state.map_desc);
    }
  });
};

// fetch data
const { fetchData, loading } = useFetchData();
loading.value = false;

// url
const url = computed(() => {
  if (props.edit) {
    return "provider/settings/update-provider-store";
  } else {
    return "provider/complete-info";
  }
});

const handleSubmit = async () => {
  const formData = new FormData(document.querySelector("#store_form"));

  formData.append("lat", center.lat);
  formData.append("lng", center.lng);
  formData.append("map_desc", state.map_desc);

  if (!props.edit) {
    Object.entries(props.confirmedState).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  await fetchData({
    url: url.value,
    headers: {
      Authorization: `Bearer ${props.confirmedState.token}`,
    },
    method: "post",
    body: formData,
    getSuccess: props.edit ? true : false,
    onSuccess: async () => {
      emit("submitted", state);

      if (!props.edit) {
        // modal
        const modal = useModal();
        modal.open(GeneralActionModal, {
          actionData: {
            title: t("auth.register_success"),
            button: t("pages.auth.login"),
          },
          onClose: async () => {
            modal.close();
          },
        });
      }
    },
  });
};

onMounted(() => {
  if (!props.edit) {
    getlocation();
  } else {
    state.city_id = props.confirmedState.city.id;
    state.store_image = props.confirmedState.store_image || imgList.value;
    console.log(props.confirmedState);
    thumbnail.value = props.confirmedState.store_image;
    fetchCities();
  }
});
</script>

<style lang="scss">
.otp {
  .otp-input-container {
    @apply flex gap-3 justify-center;
  }
  .otp-input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;

    @apply w-[45px] aspect-[1/1] border border-solid border-primaryColor rounded-lg text-center;
  }
}
</style>
