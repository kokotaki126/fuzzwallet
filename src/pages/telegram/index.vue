<template>
  <div class="page-container flex-col items-center">
    <InitLoading @loading-done="startInit" v-if="loading" />
    <AccountCreate v-else />
  </div>
</template>

<script lang="ts" setup>
  import useTelegram from '@/hooks/useTelegram';
  import router from '@/router';
  import useAccountStore from '@/store/AccountStore';
  import { message } from 'ant-design-vue';

  const inited = ref(false);
  const loading = ref(true);
  const { TGInit } = useTelegram();
  const accountStore = useAccountStore();

  const TelegramBotInit = () => {
    window.Telegram.WebApp.expand();
  };

  const startInit = async () => {
    if (!window.Telegram.WebApp.initData) {
      message.error("You're not in Telegram");
      router.replace('/');
      return;
    }

    TelegramBotInit();

    if (window.PublicKeyCredential && PublicKeyCredential.isConditionalMediationAvailable) {
      // Check if conditional mediation is available.
      const isCMA = await PublicKeyCredential.isConditionalMediationAvailable();
      console.log('Conditional mediation is available', isCMA);

      if (isCMA) {
        // Call WebAuthn authentication
      }
    }

    if (inited.value) return;

    try {
      inited.value = true;
      await TGInit(window.Telegram.WebApp.initData);
      await accountStore.fetchProfile();

      if (accountStore.profile.passKey?.length != 0) {
        router.replace('/wallet');
      }
    } catch (e: any) {
      message.error(e.message);
    } finally {
      inited.value = false;
    }

    // show main page
    // or create wallet page
  };

  onMounted(async () => {
    await new Promise((resolve) =>
      setTimeout(() => {
        loading.value = false;
        resolve('');
      }, 0),
    );

    startInit();
  });
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<style lang="less" scoped></style>

