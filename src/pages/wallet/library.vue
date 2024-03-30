<template>
  <div class="py-4 px-2">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-2">
      <div
        class="break-all rounded-xl overflow-hidden bg-primary/50 relative flex-col items-center gap-4"
        v-for="(asset, index) in accountStore.assets"
        :key="index"
      >
        <a
          :href="`https://explorer.aptoslabs.com/token/${asset.current_token_data.token_data_id}/0?network=testnet`"
          target="_blank"
        >
          <font-awesome-icon
            icon="fa-solid fa-external-link"
            class="cursor-pointer absolute right-4 top-4"
          />
        </a>
        <img :src="asset.current_token_data.token_uri" class="w-3/4 aspect-1" />
        <span class="py-2 font-bold break-all">{{ asset.current_token_data.token_name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import useAccountStore from '@/store/AccountStore';

  const accountStore = useAccountStore();

  const init = async () => {
    await accountStore.fetchAssets();
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

<route lang="yaml">
meta:
  layout: wallet
</route>

