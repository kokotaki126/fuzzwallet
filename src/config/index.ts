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
  '0x22d2fc78d41f3bcc134a3cd33a3035d8bb3e640c77367b50161bf7cb69191a5e';

