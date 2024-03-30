<template>
  <div class="w-full flex-col gap-2">
    <span class="text-xl font-bold mb-2">FuzzPass Mint</span>
    <Button class="!w-full" @click="mintPass" :loading="minting">Mint FuzzPasss</Button>
  </div>
</template>

<script lang="ts" setup>
  import { CONTRACT_ADDRESS, FUZZ_LOGIN_JWT } from '@/config';
  import usePasskey from '@/hooks/usePasskey';
  import Button from '@/lib/Button.vue';
  import useAccountStore from '@/store/AccountStore';
  import { message } from 'ant-design-vue';

  const accountStore = useAccountStore();
  const { signTransactionWithPassKey } = usePasskey();

  const minting = ref(false);
  const mintPass = async () => {
    if (minting.value) return;

    const passkey = accountStore.profile?.passKey?.slice(-1)?.[0];
    if (!passkey) {
      message.error('Invalid Passkey');
      return;
    }

    try {
      minting.value = true;

      const payload = {
        function: `${CONTRACT_ADDRESS}::FuzzPass::mint`,
        typeArguments: [],
        functionArguments: [],
      };

      if (window.Telegram.WebApp.initData) {
        const searchParams = new URLSearchParams();
        searchParams.append('access_token', localStorage.getItem(FUZZ_LOGIN_JWT) as string);
        searchParams.append('payload', window.btoa(JSON.stringify(payload)));
        searchParams.append('redirect_uri', 'https://t.me/FuzzWalletBot');
        window.open(`/passkey/sign?${searchParams.toString()}`);
      } else {
        await signTransactionWithPassKey({
          passkeyData: passkey as any,
          transactionPayload: payload,
        });
      }
    } catch (e: any) {
      message.error(e.message || e);
    } finally {
      minting.value = false;
    }
  };
</script>

