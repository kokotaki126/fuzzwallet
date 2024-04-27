import { FUZZ_LOGIN_JWT, KeylessAptosClient } from '@/config';
import { PasskeyAptosClient } from '@/config/passkey';
import useAccountStore from '@/store/AccountStore';
import axios from '@/utils/axios';
import { Secp256r1PublicKey, signWithPasskey } from '@aptos-labs/passkey-sdk';
import { message } from 'ant-design-vue';
import { AptosConfig, Network, generateTransactionPayload } from 'keyless-sdk';
import { wrapHeaderAuthorization } from './../utils/index';

const usePasskey = () => {
  const accountStore = useAccountStore();

  const addPasskey = async () => {
    if (!accountStore.profile?.id) {
      message.error('Please login first');
      return;
    }

    const options: any = await PasskeyAptosClient.generateRegistrationOptions({
      rpName: `${window.location.origin}`,
      rpID: window.location.hostname,
      userName: accountStore.profile?.telegramUser?.tgId,
      userID: accountStore.profile.id,
      authenticatorAttachment: 'platform',
    });

    const cred = await PasskeyAptosClient.registerCredential(options);
    const pubKey = PasskeyAptosClient.parsePublicKey(cred);
    const addr = await PasskeyAptosClient.getPasskeyAccountAddress({
      publicKey: pubKey.toString(),
    });

    return await axios.post(
      `/auth/passkey`,
      {
        publicKey: pubKey.toString(),
        credential: cred.rawId,
        address: addr.toString(),
      },
      {
        headers: {
          ...wrapHeaderAuthorization(localStorage.getItem(FUZZ_LOGIN_JWT) as string),
        },
      },
    );
  };

  const aptosConfig = new AptosConfig({ network: Network.TESTNET });

  const signTransactionWithPassKey = async ({
    passkeyData: { credential, publicKey, address: PasskeyAddress },
    transactionPayload,
  }: {
    passkeyData: {
      credential: string;
      publicKey: string;
      address: string;
    };
    transactionPayload: any;
  }) => {
    if (!localStorage.getItem(FUZZ_LOGIN_JWT)) {
      message.error('Please login first');
      return;
    }

    const payload: any = await generateTransactionPayload({
      multisigAddress: accountStore.profile?.multiSigAddress,
      aptosConfig,
      ...transactionPayload,
    });

    const createMultisigTx = await KeylessAptosClient.transaction.build.simple({
      sender: PasskeyAddress,
      withFeePayer: true,
      data: {
        function: '0x1::multisig_account::create_transaction',
        functionArguments: [
          accountStore.profile?.multiSigAddress,
          payload.multiSig.transaction_payload.bcsToBytes(),
        ],
      },
    });

    const createMultisigTxAuthenticator = await signWithPasskey({
      credentialId: credential,
      transaction: createMultisigTx as any,
      publicKey: new Secp256r1PublicKey(publicKey),
      rpID: window.location.hostname,
      options: {},
    });

    // Multisig transaction submit
    const hash: any = await axios.post(
      `/transaction/sponsorTxnSubmit`,
      {
        transaction: createMultisigTx.rawTransaction.bcsToHex().toString(),
        signature: createMultisigTxAuthenticator.bcsToHex().toString(),
        payload: window.btoa(JSON.stringify(transactionPayload)),
      },
      {
        headers: {
          ...wrapHeaderAuthorization(localStorage.getItem(FUZZ_LOGIN_JWT) as string),
        },
      },
    );

    return hash;
  };

  return {
    addPasskey,
    signTransactionWithPassKey,
  };
};

export default usePasskey;

