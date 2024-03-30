<template>
  <div class="py-20 flex-col-center gap-10 w-full md:!w-fit">
    <LogoImg class="!w-40" />
    <div class="flex-col mt-5 gap-3">
      <span class="text-center">Welcome {{ `${first_name}  ${last_name}` }}!</span>
      <Button class="!text-xl !w-full" @click="addPasskeyPage">Create Account</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FUZZ_LOGIN_JWT } from '@/config';
  import Button from '@/lib/Button.vue';
  import { message } from 'ant-design-vue';

  const { first_name, last_name } = window.Telegram?.WebApp?.initDataUnsafe?.user || {};

  const addPasskeyPage = () => {
    if (!localStorage.getItem(FUZZ_LOGIN_JWT)) {
      message.error('Please login first');
      return;
    }
    window.Telegram.WebApp.openLink(
      `/passkey?access_token=${localStorage.getItem(FUZZ_LOGIN_JWT)}`,
      '_blank',
    );
  };
</script>

