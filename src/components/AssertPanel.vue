<template>
  <div class="w-full flex-col gap-2">
    <span class="text-xl font-bold mb-2">Assets</span>
    <div class="bg-primary p-4 py-3 rounded-xl flex gap-4 items-center">
      <AptosSvg class="rounded-full flex-shrink-0 w-12 h-12" />
      <div class="flex-col text-text/50 text-sm">
        <span class="text-text font-bold text-lg">APT</span>
        <span>{{ NumberWithDecimal(accountStore.balance) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import AptosSvg from '@/assets/svg/aptos.svg';
  import useAccountStore from '@/store/AccountStore';
  import { NumberWithDecimal } from '@/utils';

  const accountStore = useAccountStore();
</script>

