<template>
  <div class="!p-0">
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

  window.Telegram.WebApp.BiometricManager?.init();

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

  // const requestAccess = async () => {
  //   alert('start request access');
  //   let { isInited, requestAccess } = window.Telegram.WebApp.BiometricManager;

  //   if (!isInited) {
  //     alert(`isInited: ${window.Telegram.WebApp.BiometricManager.isInited}`);

  //     alert('start requestAccess');
  //     requestAccess({ reason: 'gogogogo' }, (res: any) => {
  //       alert(`requestAccess res: ${JSON.stringify(res)}`);

  //       let {
  //         isAccessRequested,
  //         isAccessGranted,
  //         isBiometricTokenSaved,
  //         deviceId,
  //         isBiometricAvailable,
  //       } = window.Telegram.WebApp.BiometricManager;

  //       alert(
  //         ` isBiometricAvailable: ${isBiometricAvailable}, isAccessRequested: ${isAccessRequested}, isAccessGranted: ${isAccessGranted}, isBiometricTokenSaved: ${isBiometricTokenSaved}, deviceId: ${deviceId}`,
  //       );
  //     });
  //   }
  // };

  // const authenticate = async () => {
  //   alert('start authenticate');

  //   let { authenticate } = window.Telegram.WebApp.BiometricManager;
  //   authenticate({ reason: 'authenticate gogogogo' }, (res: any, token: string) => {
  //     alert(`authenticate res: ${JSON.stringify(res)}, token: ${token}`);

  //     let {
  //       isAccessRequested,
  //       isAccessGranted,
  //       isBiometricTokenSaved,
  //       deviceId,
  //       isBiometricAvailable,
  //       updateBiometricToken,
  //     } = window.Telegram.WebApp.BiometricManager;

  //     updateBiometricToken(token);

  //     alert(
  //       ` isBiometricAvailable: ${isBiometricAvailable}, isAccessRequested: ${isAccessRequested}, isAccessGranted: ${isAccessGranted}, isBiometricTokenSaved: ${isBiometricTokenSaved}, deviceId: ${deviceId}`,
  //     );
  //   });
  // };
</script>

<route lang="yaml">
meta:
  layout: wallet
</route>

