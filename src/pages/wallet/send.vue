<template>
  <div class="page-container py-8">
    <h2>Send APT to:</h2>
    <Input class="text-sm" v-model="recipient" />
    <span class="text-red text-xs">
      {{ invalidReasonMessage }}
    </span>

    <div class="mt-4">
      <Input
        class="text-14 text-center"
        :class="{
          '!text-10': new BigNumber(aptAmount).isGreaterThan(999999),
          '!text-7': new BigNumber(aptAmount).isGreaterThan(999999999),
          '!text-5': new BigNumber(aptAmount).isGreaterThan(999999999999),
        }"
        suffix="APT"
        v-model="aptAmount"
      />
    </div>

    <div class="grid grid-cols-2 justify-items-center mt-4 gap-2">
      <Button class="!w-full">Cancel</Button>
      <Button
        class="!w-full"
        :disabled="!dryRunPassed"
        @click="transferHandler"
        :loading="transfering"
      >
        Confirm
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { APT_DECIMAL, FUZZ_LOGIN_JWT } from '@/config';
  import useWallet from '@/hooks/useWallet';
  import Button from '@/lib/Button.vue';
  import Input from '@/lib/Input.vue';
  import useAccountStore from '@/store/AccountStore';
  import { message } from 'ant-design-vue';
  import BigNumber from 'bignumber.js';
  import { AccountAddress } from 'keyless-sdk';

  const recipient = ref('');
  const aptAmount = ref('');
  const dryRunPassed = ref(false);
  const router = useRouter();
  const accountStore = useAccountStore();
  const { transfer } = useWallet();
  const FuzzLoginJwt = localStorage.getItem(FUZZ_LOGIN_JWT) as string;

  const invalidReasonMessage = computed(() => {
    console.log(
      'ff',
      AccountAddress.isValid({
        input: recipient.value,
      }),
    );
    return (
      AccountAddress.isValid({
        input: recipient.value,
      })?.invalidReasonMessage || ''
    );
  });

  const transfering = ref(false);
  const transferHandler = async () => {
    const payload = {
      function: '0x1::aptos_account::transfer',
      typeArguments: [],
      functionArguments: [
        recipient.value,
        new BigNumber(aptAmount.value).shiftedBy(APT_DECIMAL).toString(),
      ],
    };

    if (window.Telegram.WebApp.initData) {
      const searchParams = new URLSearchParams();
      searchParams.append('access_token', FuzzLoginJwt);
      searchParams.append('payload', window.btoa(JSON.stringify(payload)));
      searchParams.append('redirect_uri', 'https://t.me/FuzzWalletBot');

      window.open(`/passkey/sign?${searchParams.toString()}`);
    } else {
      // try passkey sign transaction
    }

    return;

    if (transfering.value) return;
    try {
      transfering.value = true;
      await transfer(
        accountStore.address,
        recipient.value,
        new BigNumber(aptAmount.value).shiftedBy(APT_DECIMAL).toNumber(),
      );
      message.success('Transfer success');
      accountStore.fetchBalance();
      aptAmount.value = '';
      recipient.value = '';
      router.replace('/wallet');
    } catch (error) {
      console.error(error);
    } finally {
      transfering.value = false;
    }
  };

  watchEffect(() => {
    dryRunPassed.value = !invalidReasonMessage.value;
  });
</script>

<route lang="yaml">
meta:
  layout: wallet
</route>

