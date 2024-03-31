<template>
  <div class="flex-col-center w-full my-10" v-if="googleConnecting">Google Connecting...</div>
</template>

<script lang="ts" setup>
  import useKeyless from '@/hooks/useKeyless';
  import { message } from 'ant-design-vue';

  const { decodeGoogleJWT } = useKeyless();

  const googleConnecting = ref(false);
  const initPage = async () => {
    try {
      googleConnecting.value = true;
      await decodeGoogleJWT();
      window.open('https://t.me/FuzzWalletBot', '_self');
    } catch (e: any) {
      message.error(e.message);
    } finally {
      googleConnecting.value = false;
    }
  };

  onMounted(() => {
    initPage();
  });
</script>

<route lang="yaml">
meta:
  layout: default
</route>

<style lang="less" scoped></style>

