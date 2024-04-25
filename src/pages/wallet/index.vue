<template>
  <div class="!p-0">
    <Button @click="requestAccess">Request</Button>
    <div class="px-4">
      <div class="grid grid-cols-2 gap-4 my-3">
        <Button class="!w-full !text-xl" @click="faucetHandler" :loading="fauceting">
          <font-awesome-icon icon="fa-solid fa-faucet" />
          Faucet
        </Button>
        <Button class="!w-full !text-xl" @click="$router.push('/wallet/send')">
          <font-awesome-icon icon="fa-regular fa-paper-plane" />
          Send
        </Button>
      </div>
      <AssertPanel class="mt-5" />
      <PassMintPanel class="mt-5" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useWallet from '@/hooks/useWallet';
  import Button from '@/lib/Button.vue';
  import useAccountStore from '@/store/AccountStore';
  import { message } from 'ant-design-vue';

  const { getFaucet } = useWallet();
  const accountStore = useAccountStore();

  const fauceting = ref(false);
  const faucetHandler = async () => {
    if (fauceting.value) return;

    try {
      fauceting.value = true;
      await getFaucet(accountStore.address);
      accountStore.fetchBalance();
    } catch (e: any) {
      message.error(e.message || e);
    } finally {
      fauceting.value = false;
    }
  };

  const requestAccess = async () => {
    if (window.Telegram.WebApp.BiometricManager.isInited) {
      alert('inited');
      // window.Telegram.WebApp.BiometricManager.requestAccess();
      window.Telegram.WebApp.BiometricManager.openSettings();
    } else {
      alert('go init');
      window.Telegram.WebApp.BiometricManager.init([
        (isInited: boolean) => {
          console.log('isInited', isInited);
          if (isInited) {
            // window.Telegram.WebApp.BiometricManager.requestAccess();
            // window.Telegram.WebApp.BiometricManager.openSettings();
            alert('inited');
          }
        },
      ]);
    }
  };
</script>

<route lang="yaml">
meta:
  layout: wallet
</route>

