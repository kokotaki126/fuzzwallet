<template>
  <Modal
    v-bind="$attrs"
    :footer="false"
    :centered="true"
    title="Transaction Confirm"
    @cancel="emits('cancel')"
  >
    <div class="max-h-70vh overflow-y-auto">
      <DataColumnGroup class="mt-4">
        <DataColumnItem class="!flex-col !items-start" title="Function:">
          <template #value>
            <span class="break-all bg-red/10 rounded-md w-full p-2">
              {{ transactionPayload?.function }}
            </span>
          </template>
        </DataColumnItem>
        <DataColumnItem class="!flex-col !items-start" title="Arguments:">
          <template #value>
            <pre class="whitespace-pre-line p-4 w-full bg-red/10 rounded-md text-xs">
            {{ JSON.stringify(transactionPayload?.functionArguments, null, 4) }}
          </pre
            >
          </template>
        </DataColumnItem>
      </DataColumnGroup>
      <Panel>
        <div class="flex-col gap-2 w-full">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-bold">Choose Passkey:</span>
            <Button
              class="cursor-pointer !h-8 !text-xs !font-normal"
              @click="
                async () => {
                  await accountStore.fetchProfile();
                  message.success('Refreshed');
                }
              "
            >
              Refresh
            </Button>
          </div>
          <div class="flex-col gap-2 max-h-100 overflow-y-auto">
            <div
              class="p-4 py-2 rounded-md border-dashed border-2 border-black/30 hover:border-black/70 transition-all cursor-pointer"
              v-for="(passkey, index) in accountStore.profile?.passKey?.slice(-1)"
              :key="passkey?.address"
            >
              {{ index + 1 }}.
              {{ ShortAddress(passkey?.address, { prefixLen: 10, suffixLen: 10 }) }}
            </div>
          </div>
        </div>
      </Panel>
      <div class="grid grid-cols-2 gap-4 justify-items-center mt-4">
        <Button class="!w-full" @click="emits('cancel')">Cancel</Button>
        <Button class="!w-full" @click="approvePasskeyHandler" :loading="approving">Approve</Button>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
  import usePasskey from '@/hooks/usePasskey';
  import Button from '@/lib/Button.vue';
  import DataColumnGroup from '@/lib/DataColumnGroup.vue';
  import DataColumnItem from '@/lib/DataColumnItem.vue';
  import Panel from '@/lib/Panel.vue';
  import useAccountStore from '@/store/AccountStore';
  import { ShortAddress } from '@/utils';
  import { Modal, message } from 'ant-design-vue';

  const props = defineProps<{
    jwt: string;
    transactionPayload: any;
  }>();
  const emits = defineEmits(['cancel', 'success']);

  const accountStore = useAccountStore();
  const { signTransactionWithPassKey } = usePasskey();

  const approving = ref(false);
  const approvePasskeyHandler = async () => {
    if (approving.value) return;

    const passkey = accountStore.profile?.passKey?.slice(-1)?.[0];
    if (!passkey) {
      message.error('Invalid Passkey');
      return;
    }

    try {
      approving.value = true;
      await signTransactionWithPassKey({
        passkeyData: passkey as any,
        transactionPayload: props.transactionPayload,
      });
      message.success('Transaction Approved');
      emits('success');
    } catch (e: any) {
      if (e.name == 'NotAllowedError') {
        message.error('User denied the transaction');
      } else {
        message.error(e.message || e);
      }
    } finally {
      approving.value = false;
    }
  };

  onMounted(() => {
    if (props.jwt) {
      accountStore.fetchProfile();
    }
  });
</script>

