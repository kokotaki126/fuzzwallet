<template>
  <h2 class="my-4 text-center text-3xl font-bold">PassKey Manage</h2>

  <div class="flex-col items-center w-full gap-2 mt-4 pb-10">
    <Panel
      class="flex-col break-all !gap-0 w-full"
      v-for="(n, index) in accountStore.profile?.passKey?.slice(-1)"
      :key="index"
    >
      <!-- <DataColumnItem title="Index" :value="index + 1"></DataColumnItem> -->
      <DataColumnItem title="Address" :value="ShortAddress(n.address)">
        <template #value>
          <span class="flex gap-2 items-center">
            {{ ShortAddress(n.address) }}
            <font-awesome-icon
              icon="fa-regular fa-copy"
              class="cursor-pointer"
              @click="copy(n.address)"
            ></font-awesome-icon>
          </span>
        </template>
      </DataColumnItem>
      <DataColumnItem title="PublicKey" :value="ShortAddress(n.publicKey)"></DataColumnItem>
      <!-- <DataColumnItem title="">
        <template #value>
          <Button class="!h-10 !text-sm">Remove</Button>
        </template>
      </DataColumnItem> -->
    </Panel>
  </div>

  <div class="w-full max-w-750px pb-10">
    <div
      class="border-2 border-dashed border-black/10 bg-background transition-all hover:border-black/70 text-accent rounded-xl p-4 h-15 flex-center text-xl font-bold border-box"
      @click="addPasskeyhandler"
      v-if="accountStore.profile?.passKey?.length < 1"
    >
      Add New Passkey
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FUZZ_LOGIN_JWT } from '@/config';
  import usePasskey from '@/hooks/usePasskey';
  import DataColumnItem from '@/lib/DataColumnItem.vue';
  import Panel from '@/lib/Panel.vue';
  import useAccountStore from '@/store/AccountStore';
  import { ShortAddress, copy } from '@/utils';
  import { message } from 'ant-design-vue';

  const route = useRoute();
  const { addPasskey } = usePasskey();
  const accountStore = useAccountStore();

  const initPasskeyPage = async () => {
    // TODO: can not override the jwt
    console.log(route.query.access_token);
    if (route.query.access_token) {
      localStorage.setItem(FUZZ_LOGIN_JWT, route.query.access_token as string);
    }

    if (!localStorage.getItem(FUZZ_LOGIN_JWT)) {
      message.error('Invalid Access Token');
      return;
    }

    await accountStore.fetchProfile();
  };

  const addPasskeyhandler = async () => {
    if (!accountStore.profile.id) {
      return;
    }

    try {
      await addPasskey();
      await accountStore.fetchProfile();
      message.success('Passkey added');
    } catch (e: any) {
      message.error(e.message);
    }
  };

  watch(
    () => route.query.access_token,
    () => {
      initPasskeyPage();
    },
    {
      immediate: true,
    },
  );
</script>

<route lang="yaml">
meta:
  layout: mobile
</route>

