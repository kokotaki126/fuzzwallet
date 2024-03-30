import { Aptos, AptosConfig, Network } from '@aptos-labs/passkey-sdk';

export const PasskeyAptosClient = new Aptos(
  new AptosConfig({
    network: Network.TESTNET,
  }),
);

