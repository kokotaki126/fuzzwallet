<template>
  <div class="page-container py-5">
    <div class="text-3xl font-bold text-red text-shadow-sm">Red Envelope</div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-10">
      <div class="envelope" v-for="(n, index) in envelopeList" :key="index">
        <span class="text-xs">Env. {{ n.index }}</span>
        <span class="text-4xl font-bold py-3 truncate px-3 max-w-full break-all text-center">
          {{ n.data?.[1] }}
        </span>
        <span>{{ n.data?.[3] }} / {{ n.data?.[2] }}</span>
        <Button
          class="!w-1/2 mt-10"
          v-if="n.data?.[3] != n.data?.[2]"
          @click="openEnvelopeHandler(n)"
        >
          Open
        </Button>
        <Button class="!min-w-1/2 mt-10" :disabled="true" v-else>All Claimed</Button>
      </div>
    </div>
  </div>
  <PasskeyModal
    :open="!isEmpty(currentPayload)"
    :jwt="FuzzLoginJWT"
    :transaction-payload="currentPayload"
    @cancel="
      () => {
        currentSelectIndex = -1;
      }
    "
    @success="onSuccess"
  ></PasskeyModal>
</template>

<script lang="ts" setup>
  import { CONTRACT_ADDRESS, FUZZ_LOGIN_JWT, KeylessAptosClient } from '@/config';
  import useKeyless from '@/hooks/useKeyless';
  import Button from '@/lib/Button.vue';
  import { message } from 'ant-design-vue';
  import { isEmpty } from 'lodash-es';

  const FuzzLoginJWT = localStorage.getItem(FUZZ_LOGIN_JWT) as string;
  const { loginGoogle } = useKeyless();

  const currentSelectIndex = ref(-1);
  const currentPayload = computed(() => {
    if (currentSelectIndex.value == -1) return {};
    return {
      function: `${CONTRACT_ADDRESS}::RedPackage::unpackRedPackage`,
      typeArguments: [],
      functionArguments: [currentSelectIndex.value.toString()],
    };
  });

  const openEnvelopeHandler = (current: any) => {
    if (FuzzLoginJWT) {
      currentSelectIndex.value = current.index;
    } else {
      message.error('Please login first');
      loginGoogle();
    }
  };

  const envelopeList = ref<any[]>([]);
  const totalRedEnvelope = ref(0);
  const initRedEnvelopePage = async () => {
    const result: any = await KeylessAptosClient.view({
      payload: {
        function: `${CONTRACT_ADDRESS}::RedPackage::redPackageTotal`,
        typeArguments: [],
        functionArguments: [],
      },
    });

    totalRedEnvelope.value = Number(result?.[0]);

    envelopeList.value = Array.from({ length: totalRedEnvelope.value }, (_, index) => ({
      index,
    })).reverse();

    envelopeList.value.forEach(async (item, index) => {
      const result: any = await KeylessAptosClient.view({
        payload: {
          function: `${CONTRACT_ADDRESS}::RedPackage::redPackage`,
          typeArguments: [],
          functionArguments: [item.index.toString()],
        },
      });

      envelopeList.value[index] = {
        data: result,
        index: item.index,
      };
    });
  };

  const onSuccess = () => {
    currentSelectIndex.value = -1;
    initRedEnvelopePage();
  };

  onMounted(() => {
    initRedEnvelopePage();
  });
</script>

<style lang="less" scoped>
  .envelope {
    @apply bg-red text-white py-3 hover:shadow-lg cursor-pointer gap-2;
    @apply rounded-md p-[10px] w-full aspect-3/4;
    @apply flex-col-center;
  }
</style>

