<template>
  <div class="flex-col items-center">
    <LogoImg class="mt-20 animate__animated animate__fadeInUp" />
    <div
      class="font-bold text-5xl mt-10 text-shadow-xl animate__animated animate__fadeIn animate__delay-1s"
    >
      Fuzz Wallet
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emits = defineEmits(['loading-done']);

  //   maybe loading user data
  onMounted(() => {
    setTimeout(() => {
      emits('loading-done');
    }, 2300);
  });
</script>

