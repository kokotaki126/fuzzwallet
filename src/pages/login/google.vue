<template>
  <div class="flex-col-center w-full my-10" v-if="googleConnecting">Google Login...</div>
</template>

<script lang="ts" setup>
  import useKeyless from '@/hooks/useKeyless';
  import { message } from 'ant-design-vue';

  const { loginGoogleJWT } = useKeyless();
  const router = useRouter();

  const googleConnecting = ref(false);
  const initPage = async () => {
    if (document.referrer === 'https://accounts.google.com/') {
      try {
        googleConnecting.value = true;
        await loginGoogleJWT();
        router.replace('/redenvelope');
      } catch (e: any) {
        message.error(e.message);
      } finally {
        googleConnecting.value = false;
      }
    }
  };

  onMounted(() => {
    initPage();
  });
</script>

<route lang="yaml">
meta:
  layout: mobile
</route>

<style lang="less" scoped></style>

