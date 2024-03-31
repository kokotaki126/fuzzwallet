import { Aptos, AptosConfig, Network } from 'keyless-sdk';

export const KeylessAptosClient = new Aptos(
  new AptosConfig({
    network: Network.TESTNET,
  }),
);

export const APT_DECIMAL = 8;
export const APT_COIN_TYPE = '0x1::aptos_coin::AptosCoin';

export const FUZZ_LOGIN_JWT = 'fuzz_login_jwt';

export const CONTRACT_ADDRESS =
  '0x4aa91a2878c2050fad21187c7bce5ed7c55831ab1b099acc01e3a6579f9b60c7';

