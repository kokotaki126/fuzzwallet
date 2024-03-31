<template>
  <div class="pb-20">
    <div class="flex-col gap-2 w-full bg-accent text-white">
      <div
        class="page-container !min-h-fit !p-6 transition-all"
        :class="{
          '!flex-row justify-between items-center !py-2': !isHome,
        }"
      >
        <LogoImg class="!w-12 md:!w-20 mb-3" />
        <div
          class="flex-col"
          :class="{
            'items-end': !isHome,
          }"
        >
          <span class="font-medium flex items-center gap-3">
            {{
              ShortAddress(accountStore.address, {
                prefixLen: 6,
                suffixLen: 4,
              })
            }}
            <font-awesome-icon
              icon="fa-regular fa-copy"
              class="cursor-pointer"
              @click="copy(accountStore.address)"
            />
          </span>
          <span class="text-2xl">
            <span class="font-bold text-4xl">{{ NumberWithDecimal(accountStore.balance) }}</span>
            APT
          </span>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <div class="tabbar">
      <span
        class="tabbar-item"
        :class="{ active: route.path === m.path }"
        @click="router.push({ path: m.path })"
        v-for="(m, index) in MENUS"
        :key="index"
      >
        <font-awesome-icon :icon="m.icon" class="w-5 h-5" />
        <span>{{ m.text }}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useTelegram from '@/hooks/useTelegram';
  import useAccountStore from '@/store/AccountStore';
  import { NumberWithDecimal, ShortAddress, copy } from '@/utils';

  const router = useRouter();
  const route = useRoute();
  const accountStore = useAccountStore();
  const { TGInit } = useTelegram();

  const isHome = computed(() => route.path === '/wallet');

  const MENUS = [
    {
      icon: 'fa-solid fa-house-user',
      text: 'Home',
      path: '/wallet',
    },
    {
      icon: 'fa-solid fa-book',
      text: 'Library',
      path: '/wallet/library',
    },
    {
      icon: 'fa-solid fa-bolt',
      text: 'Activity',
      path: '/wallet/activity',
    },
    {
      icon: 'fa-solid fa-gears',
      text: 'Settings',
      path: '/wallet/settings',
    },
  ];

  const init = async () => {
    await TGInit(window.Telegram.WebApp.initData);
    await accountStore.fetchProfile();

    if (accountStore.profile?.multiSigAddress) {
      accountStore.address = accountStore.profile.multiSigAddress;
    } else {
      router.replace('/telegram');
    }
  };

  watch(
    () => accountStore.address,
    () => {
      accountStore.fetchBalance();
    },
    {
      immediate: true,
    },
  );

  onMounted(() => {
    init();
  });
</script>

<style lang="less" scoped>
  .tabbar {
    @apply min-h-15 text-sm;
    @apply border-t-1 border-t-solid border-t-accent/30;
    @apply fixed bottom-0 left-0 right-0;
    @apply bg-background justify-items-center items-center grid grid-cols-4;

    .tabbar-item {
      @apply flex-col-center items-center gap-2px py-3 pb-5 cursor-pointer transition-all w-full h-full;

      &.active,
      &:hover {
        @apply text-accent;
      }
    }
  }
</style>

