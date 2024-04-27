<template>
  <div class="py-4 px-2 flex-col gap-4">
    <Collapse :active="openPasskeyCollapse" class="!gap-1 bg-accent/10 shadow-lg">
      <template #header>
        <span
          class="flex items-center justify-between p-3 py-4 rounded-1 transition-all"
          :class="{
            '!rounded-b-0 bg-accent/50': openPasskeyCollapse,
          }"
          @click="openPasskeyCollapse = !openPasskeyCollapse"
        >
          <span class="font-bold">Passkey Management</span>
          <!-- <span>
            <font-awesome-icon
              icon="fa-solid fa-chevron-down"
              class="transition-all"
              :class="{
                'transform -rotate-180': openPasskeyCollapse,
              }"
            ></font-awesome-icon>
          </span> -->
        </span>
      </template>
      <div class="w-full flex-col gap-1 mt-2 text-sm px-2 pb-2">
        <div
          class="bg-accent/10 px-2 py-1 rounded-1 font-bold text-center text-xl"
          @click="openpasskey"
        >
          +
        </div>
        <div>1 Passkey</div>
      </div>
    </Collapse>

    <Collapse :active="openKeylessCollapse" class="!gap-1 bg-accent/10 shadow-lg">
      <template #header>
        <span
          class="flex items-center justify-between p-3 py-4 rounded-1 transition-all"
          :class="{
            '!rounded-b-0 bg-accent/50': openKeylessCollapse,
          }"
          @click="openKeylessCollapse = !openKeylessCollapse"
        >
          <span class="font-bold">KeyLess</span>
          <!-- <span>
            <font-awesome-icon
              icon="fa-solid fa-chevron-down"
              class="transition-all"
              :class="{
                'transform -rotate-180': openKeylessCollapse,
              }"
            ></font-awesome-icon>
          </span> -->
        </span>
      </template>
      <div class="w-full flex-col gap-1 mt-2 text-sm px-2 pb-2">
        <div class="flex justify-between px-2 items-center py-1 rounded-1">
          <span class="text-base font-bold">Google</span>
          <span class="text-xs" v-if="accountStore.profile?.googleUser?.email">
            {{ accountStore.profile?.googleUser?.email }}
          </span>
          <span class="text-xs" v-else>
            <Button class="!h-8 text-sm" @click="toConnectGoogle">Connect &gt;</Button>
          </span>
        </div>
      </div>
    </Collapse>
  </div>
</template>

<script lang="ts" setup>
  import { FUZZ_LOGIN_JWT } from '@/config';
  import Button from '@/lib/Button.vue';
  import Collapse from '@/lib/Collapse.vue';
  import useAccountStore from '@/store/AccountStore';

  const openPasskeyCollapse = ref(true);
  const openKeylessCollapse = ref(true);

  const accountStore = useAccountStore();

  const toConnectGoogle = () => {
    window.open(`/google/connect?access_token=${localStorage.getItem(FUZZ_LOGIN_JWT)}`, '_blank');
  };

  const openpasskey = () => {
    window.Telegram.WebApp.openLink(
      `/passkey?access_token=${localStorage.getItem(FUZZ_LOGIN_JWT)}`,
      '_blank',
    );
  };
</script>

<route lang="yaml">
meta:
  layout: wallet
</route>

