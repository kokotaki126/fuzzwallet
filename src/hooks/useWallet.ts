import { APT_DECIMAL } from '@/config';
import { PasskeyAptosClient } from '@/config/passkey';
import axios from '@/utils/axios';
import BigNumber from 'bignumber.js';

const getAccountCoinActivityQuery =
  'query getAccountCoinActivity($address: String!, $offset: Int, $limit: Int) {\n  coin_activities(\n    where: {owner_address: {_eq: $address}}\n    limit: $limit\n    offset: $offset\n    order_by: [{transaction_version: desc}, {event_account_address: desc}, {event_creation_number: desc}, {event_sequence_number: desc}]\n  ) {\n    ...CoinActivityFields\n  }\n}\n\nfragment CoinActivityFields on coin_activities {\n  transaction_timestamp\n  transaction_version\n  amount\n  activity_type\n  coin_type\n  is_gas_fee\n  is_transaction_success\n  event_account_address\n  event_creation_number\n  event_sequence_number\n  entry_function_id_str\n  block_height\n}';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_APP_GRAPHQL_ENDPOINT;
const useWallet = () => {
  const getFaucet = async (address: string) => {
    await PasskeyAptosClient.fundAccount({
      accountAddress: address,
      amount: new BigNumber(1).shiftedBy(APT_DECIMAL).toNumber(),
      options: {
        checkSuccess: true,
      },
    });
  };

  const transfer = async (from: string, to: string, amount: number) => {
    const transaction = await PasskeyAptosClient.transferCoinTransaction({
      sender: from,
      recipient: to,
      amount: new BigNumber(amount).shiftedBy(APT_DECIMAL).toNumber(),
    });

    // Sign and submit the transaction
    console.log(transaction);
    // check if passkey
    // check if google
    // passkey or platform
  };

  const fetchActivitiesByAddress = async (address: string) => {
    return (
      await axios.post(GRAPHQL_ENDPOINT, {
        query: getAccountCoinActivityQuery,
        variables: {
          address,
          limit: 20,
          offset: 0,
        },
        operationName: 'getAccountCoinActivity',
      })
    )?.data?.coin_activities;
    // ?.filter((activity: any) => activity.event_creation_number > 0)
  };

  return { getFaucet, transfer, fetchActivitiesByAddress };
};

export default useWallet;

