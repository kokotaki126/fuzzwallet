import { APT_COIN_TYPE, FUZZ_LOGIN_JWT } from '@/config';
import { AssetsQuery } from '@/config/graphQuery';
import { PasskeyAptosClient } from '@/config/passkey';
import axios from '@/utils/axios';
import { defineStore } from 'pinia';

interface AccountStore {
  address: Ref<string>;
  balance: Ref<number>;
  assets: Ref<any[]>;
  profile: Ref<any>;

  fetchBalance: () => void;
  fetchAssets: () => void;
  fetchProfile: () => void;
}

const useAccountStore = defineStore('accountStore', (): AccountStore => {
  const address = ref('');
  const balance = ref(0);
  const assets = ref([]);
  const profile = ref<any>([]);

  const balanceTimer = ref<any>(null);
  const fetchBalance = () => {
    if (balanceTimer.value) {
      return;
    }

    if (address.value) {
      PasskeyAptosClient.getAccountCoinAmount({
        accountAddress: address.value,
        coinType: APT_COIN_TYPE,
      })
        .then((res: any) => {
          balance.value = res;
        })
        .catch(() => {
          balance.value = 0;
        });

      console.log('go');
      balanceTimer.value = setTimeout(() => {
        balanceTimer.value = null;
        fetchBalance();
      }, 5000);
    } else {
      balance.value = 0;
      clearTimeout(balanceTimer.value);
      balanceTimer.value = null;
    }
  };

  const fetchAssets = async () => {
    if (address.value) {
      await axios
        .post(import.meta.env.VITE_APP_GRAPHQL_ENDPOINT, {
          query: AssetsQuery,
          variables: {
            address: address.value,
            limit: 20,
            offset: 0,
            where: [],
          },
          operationName: 'getAccountCurrentTokens',
        })
        .then((res: any) => {
          assets.value = res.data?.current_token_ownerships_v2;
        })
        .catch(() => {
          assets.value = [];
        });
    } else {
      assets.value = [];
    }
  };

  const fetchProfile = async () => {
    try {
      const result: any = await axios.get(`/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(FUZZ_LOGIN_JWT)}`,
        },
      });
      profile.value = result;
    } catch (e: any) {
      profile.value = {};
    }
  };

  return {
    address,
    balance,
    assets,
    profile,

    fetchBalance,
    fetchAssets,
    fetchProfile,
  };
});

export default useAccountStore;

