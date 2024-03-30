<template>
  <div class="page-container"></div>
</template>

<script lang="ts" setup>
  import { FUZZ_LOGIN_JWT } from '@/config';
  import usekeyless from '@/hooks/useKeyless';

  const { connectGoogle } = usekeyless();
  const route = useRoute();

  onMounted(() => {
    if (route.query.access_token) {
      localStorage.setItem(FUZZ_LOGIN_JWT, route.query.access_token as string);
      connectGoogle();
    }
  });
</script>

<route lang="yaml">
meta:
  layout: mobile
</route>

