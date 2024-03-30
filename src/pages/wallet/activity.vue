<template>
  <div class="flex-col py-4 px-2 gap-2">
    <div class="act-item" @click="openExplorer(txn)" v-for="(txn, index) in txns" :key="index">
      <span class="font-medium flex items-center gap-3">
        <font-awesome-icon
          icon="fa-solid fa-check"
          class="text-green"
          v-if="txn.is_transaction_success"
        ></font-awesome-icon>
        <span class="flex-col">
          <span class="text-lg">
            {{ EVENT_TYPE_OP[txn.activity_type?.split('::').pop()] }}
          </span>
          <span class="text-text/70 text-xs flex-col gap-2">
            {{ txn.is_transaction_success ? 'Confirmed' : 'Failed' }}
            {{ dayjs(txn.transaction_timestamp).format('MMM,DD YYYY') }}
          </span>
        </span>
      </span>

      <span class="flex items-center gap-2">
        <span class="flex-col items-end text-text/70">
          <span
            class="text-lg font-bold break-all truncate"
            :class="
              txn.activity_type?.split('::').pop() == 'DepositEvent' ? 'text-green' : 'text-red'
            "
          >
            {{ txn.activity_type?.split('::').pop() == 'DepositEvent' ? '+' : '-' }}
            {{ NumberWithDecimal(txn.amount) }}
          </span>
          <span>{{ TokenNameFormat(txn.coin_type.split('::').pop()) }}</span>
        </span>
        <font-awesome-icon
          icon="fa-solid fa-chevron-right"
          class="text-text/30"
        ></font-awesome-icon>
      </span>
    </div>

    <div
      class="act-item text-text/70 gap-2 !justify-center"
      @click="openExplorerAccount(accountStore.address)"
    >
      More
      <font-awesome-icon icon="fa-solid fa-external-link"></font-awesome-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useWallet from '@/hooks/useWallet';
  import useAccountStore from '@/store/AccountStore';
  import { NumberWithDecimal, TokenNameFormat } from '@/utils';
  import dayjs from 'dayjs';

  const EVENT_TYPE_OP: any = {
    WithdrawEvent: 'Sent',
    DepositEvent: 'Received',
    GasFeeEvent: 'Gas Fee',
  };

  const { fetchActivitiesByAddress } = useWallet();
  const accountStore = useAccountStore();

  const txns = ref<any[]>([]);
  const openExplorer = (txn: any) => {
    window.open(`https://explorer.aptoslabs.com/txn/${txn.transaction_version}?network=testnet`);
  };

  const openExplorerAccount = (address: any) => {
    window.open(`https://explorer.aptoslabs.com/account/${address}?network=testnet`);
  };

  const init = async () => {
    if (!accountStore.address) {
      txns.value = [];
      return;
    }
    txns.value = await fetchActivitiesByAddress(accountStore.address);
  };

  watch(
    () => accountStore.address,
    () => {
      init();
    },
    {
      immediate: true,
    },
  );
</script>

<style lang="less" scoped>
  .act-item {
    @apply px-4 py-2 bg-white rounded-lg shadow transition-all;
    @apply break-all;
    @apply flex justify-between items-center;

    &:hover {
      @apply bg-background;
    }
  }
</style>

<route lang="yaml">
meta:
  layout: wallet
</route>

