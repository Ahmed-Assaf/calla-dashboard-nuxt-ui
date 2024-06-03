<template>
  <GeneralTheCard :ui="{ body: { padding: 'sm:!py-9 sm:p-8' } }">
    <img
      src="/images/contact-us.svg"
      :alt="$t('pages.contact_us')"
      class="w-48 mx-auto mb-7"
    />

    <p class="text-xs font-light leading-[2.5] mb-7">
      هذا النص يمكن استبداله هذا النص يمكن استبداله في نفس المساحة هذا النص يمكن
      استبداله هذا النص يمكن استبداله هذا النص يمكن استبداله في نفس المساحة هذا
      النص يمكن استبداله هذا النص يمكن استبداله هذا النص يمكن استبداله في نفس
      المساحة هذا النص يمكن استبداله هذا النص يمكن استبداله هذا النص يمكن
      استبداله في نفس المساحة هذا النص يمكن استبداله
    </p>

    <ul>
      <li>
        <ULink class="link">
          <div class="icon">
            <img src="/images/icons/location-white.svg" alt="address" />
          </div>

          <span class="font-bukra font-bold">الرياض</span>
        </ULink>
      </li>

      <li>
        <ULink class="link">
          <div class="icon">
            <img src="/images/icons/envelope-white.svg" alt="address" />
          </div>

          <span>example.info@gmail.com</span>
        </ULink>
      </li>

      <li>
        <ULink class="link">
          <div class="icon">
            <img src="/images/icons/phone-white.svg" alt="address" />
          </div>

          <span dir="ltr">+966 5555 5652 1565</span>
        </ULink>
      </li>
    </ul>
  </GeneralTheCard>
</template>

<script setup></script>

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
