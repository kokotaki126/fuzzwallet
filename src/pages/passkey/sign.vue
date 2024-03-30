<template>
  <PasskeyModal
    :open="true"
    :jwt="FuzzLoginJwt"
    :transaction-payload="transactionPayload"
    @cancel="cancelHandler"
    @success="approvePasskeyHandler"
    :closable="false"
    :maskClosable="false"
  ></PasskeyModal>
</template>

<script lang="ts" setup>
  import { FUZZ_LOGIN_JWT } from '@/config';
  import useAccountStore from '@/store/AccountStore';
  import { message } from 'ant-design-vue';
  import { computed } from 'vue';

  const route = useRoute();
  const accountStore = useAccountStore();
  const FuzzLoginJwt = localStorage.getItem(FUZZ_LOGIN_JWT) || '';

  const transactionPayload = computed<any>(() => {
    try {
      return JSON.parse(window.atob(route.query.payload as string));
    } catch {
      return {};
    }
  });

  const cancelHandler = () => {
    if (route.query.redirect_uri) {
      window.open(route.query.redirect_uri as string, '_self');
    } else {
      window.close();
    }
  };

  const approvePasskeyHandler = async () => {
    if (route.query.redirect_uri) {
      window.open(route.query.redirect_uri as string, '_self');
    }
  };

  const init = async () => {
    if (route.query.access_token) {
      localStorage.setItem(FUZZ_LOGIN_JWT, route.query.access_token as string);
    }

    if (!localStorage.getItem(FUZZ_LOGIN_JWT)) {
      message.error('Invalid Access Token');
      return;
    }

    await accountStore.fetchProfile();
  };
  onMounted(() => {
    init();
  });
</script>

<route lang="yaml">
meta:
  layout: mobile
</route>

