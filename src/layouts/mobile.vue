<template>
  <span
    class="max-w-750px mx-auto text-xl font-bold flex items-center gap-4 justify-between bg-primary py-5 px-4"
  >
    <span class="flex gap-4 items-center">
      <LogoImg class="!w-10 !h-10" />
      <span class="flex-col">
        <span class="text-sm">Fuzz Wallet</span>
        <span class="">
          {{ ShortAddress(accountStore.profile?.multiSigAddress) }}
          <font-awesome-icon
            icon="fa-regular fa-copy"
            @click="copy(accountStore.profile?.multiSigAddress)"
            v-if="accountStore.profile?.multiSigAddress"
          ></font-awesome-icon>
        </span>
      </span>
    </span>

    <span>{{ accountStore.profile?.telegramUser?.username }}</span>
  </span>
  <div class="page-container !max-w-750px min-h-screen mx-auto">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
  import useAccountStore from '@/store/AccountStore';
  import { ShortAddress, copy } from '@/utils';

  const accountStore = useAccountStore();
</script>

