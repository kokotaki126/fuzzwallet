import { FUZZ_LOGIN_JWT, KeylessAptosClient } from '@/config';
import axios from '@/utils/axios';
import { message } from 'ant-design-vue';
import { jwtDecode } from 'jwt-decode';
import { Ed25519PrivateKey, EphemeralKeyPair } from 'keyless-sdk';
import { wrapHeaderAuthorization } from './../utils/index';

const EPHEMERAL_ACCOUNT_KEY = 'ephemeral-accounts';

const EphemeralKeyPairEncoding = {
  decode: (e: any) =>
    new EphemeralKeyPair({
      blinder: new Uint8Array(e.blinder),
      expiryDateSecs: BigInt(e.expiryDateSecs),
      privateKey: new Ed25519PrivateKey(e.privateKey),
    }),
  encode: (e: EphemeralKeyPair) => ({
    __type: 'EphemeralKeyPair',
    blinder: Array.from(e.blinder),
    expiryDateSecs: e.expiryDateSecs.toString(),
    privateKey: e.privateKey.toString(),
  }),
};

export type StoredEphemeralKeyPairs = { [nonce: string]: EphemeralKeyPair };

/**
 * Stringify the ephemeral key pairs to be stored in localStorage
 */
export const encodeEphemeralKeyPairs = (keyPairs: StoredEphemeralKeyPairs): string =>
  JSON.stringify(keyPairs, (_, e) => {
    if (typeof e === 'bigint') return { __type: 'bigint', value: e.toString() };
    if (e instanceof EphemeralKeyPair) return EphemeralKeyPairEncoding.encode(e);
    return e;
  });

/**
 * Parse the ephemeral key pairs from a string
 */
export const decodeEphemeralKeyPairs = (
  encodedEphemeralKeyPairs: string,
): StoredEphemeralKeyPairs => {
  try {
    return JSON.parse(encodedEphemeralKeyPairs, (_, e) => {
      if (e && e.__type === 'bigint') return BigInt(e.value);
      if (e && e.__type === 'EphemeralKeyPair') return EphemeralKeyPairEncoding.decode(e);
      return e;
    });
  } catch (error) {
    console.warn('Failed to parse ephemeral key pairs from localStorage', error);
    return {};
  }
};
const getLocalEphemeralKeyPairs = () => {
  const rawEphemeralKeyPairs = localStorage.getItem(EPHEMERAL_ACCOUNT_KEY);
  try {
    return rawEphemeralKeyPairs ? decodeEphemeralKeyPairs(rawEphemeralKeyPairs) : {};
  } catch (error) {
    console.warn('Failed to decode ephemeral key pairs from localStorage');
    return {};
  }
};

export const getLocalEphemeralKeyPair = (nonce: string): EphemeralKeyPair | null => {
  const keyPairs = getLocalEphemeralKeyPairs();

  // Get the account with the given nonce (the generated nonce of the ephemeral key pair may not match
  // the nonce in localStorage), so we need to validate it before returning it (implementation specific).
  const ephemeralKeyPair = keyPairs[nonce];
  if (!ephemeralKeyPair) return null;

  // If the account is valid, return it, otherwise remove it from the device and return null
  return validateEphemeralKeyPair(nonce, ephemeralKeyPair);
};

export const validateEphemeralKeyPair = (
  nonce: string,
  ephemeralKeyPair: EphemeralKeyPair,
): EphemeralKeyPair | null => {
  // Check the nonce and the expiry timestamp of the account to see if it is valid
  if (
    nonce === ephemeralKeyPair.nonce &&
    ephemeralKeyPair.expiryDateSecs > BigInt(Math.floor(Date.now() / 1000))
  ) {
    return ephemeralKeyPair;
  }
  removeEphemeralKeyPair(nonce);
  return null;
};

export const removeEphemeralKeyPair = (nonce: string): void => {
  const keyPairs = getLocalEphemeralKeyPairs();
  delete keyPairs[nonce];
  localStorage.setItem(EPHEMERAL_ACCOUNT_KEY, encodeEphemeralKeyPairs(keyPairs));
};

const parseJWTFromURL = (url: string): string | null => {
  const urlObject = new URL(url);
  const fragment = urlObject.hash.substring(1);
  const params = new URLSearchParams(fragment);
  return params.get('id_token');
};

const useKeyless = () => {
  const CLIENT_ID = '941546503912-v988leaaoq83rvparl5q425h217vsveu.apps.googleusercontent.com';

  const connectGoogle = () => {
    const REDIRECT_URI = `${window.location.origin}/connect/google`;

    const accounts = getLocalEphemeralKeyPairs();
    const ephemeralKeyPair = EphemeralKeyPair.generate();

    accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair;
    localStorage.setItem(EPHEMERAL_ACCOUNT_KEY, encodeEphemeralKeyPairs(accounts));

    let NONCE = ephemeralKeyPair.nonce;
    const GoogleProviderAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email&nonce=${NONCE}`;

    window.open(GoogleProviderAuthUrl, '_self');
  };

  const loginGoogle = () => {
    const REDIRECT_URI = `${window.location.origin}/login/google`;

    const accounts = getLocalEphemeralKeyPairs();
    const ephemeralKeyPair = EphemeralKeyPair.generate();

    accounts[ephemeralKeyPair.nonce] = ephemeralKeyPair;
    localStorage.setItem(EPHEMERAL_ACCOUNT_KEY, encodeEphemeralKeyPairs(accounts));

    let NONCE = ephemeralKeyPair.nonce;
    const GoogleProviderAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=id_token&scope=openid%20email&nonce=${NONCE}`;
    window.open(GoogleProviderAuthUrl, '_self');
  };

  const decodeGoogleJWT = async () => {
    const jwt = parseJWTFromURL(window.location.href);
    if (!jwt) return;

    const payload = jwtDecode<{ nonce: string }>(jwt);
    const jwtNonce = payload.nonce;
    const ephemeralKeyPair = getLocalEphemeralKeyPair(jwtNonce);

    if (ephemeralKeyPair) {
      const kla = await KeylessAptosClient.deriveKeylessAccount({
        jwt,
        ephemeralKeyPair,
      });

      await axios.post(
        '/auth/google_bind',
        {
          idToken: jwt,
          address: kla.accountAddress.toStringLong(),
        },
        {
          headers: {
            ...wrapHeaderAuthorization(localStorage.getItem(FUZZ_LOGIN_JWT) as string),
          },
        },
      );
      message.success('Google account bind success');
    }
  };

  const loginGoogleJWT = async () => {
    // google_login
    const jwt = parseJWTFromURL(window.location.href);
    if (!jwt) return;

    const payload = jwtDecode<{ nonce: string }>(jwt);
    const jwtNonce = payload.nonce;
    const ephemeralKeyPair = getLocalEphemeralKeyPair(jwtNonce);

    if (ephemeralKeyPair) {
      const kla = await KeylessAptosClient.deriveKeylessAccount({
        jwt,
        ephemeralKeyPair,
      });

      const result: any = await axios.post('/auth/google_login', {
        idToken: jwt,
        address: kla.accountAddress.toStringLong(),
      });

      localStorage.setItem(FUZZ_LOGIN_JWT, result);
      message.success('Google account login success');
    }
  };

  return {
    connectGoogle,
    loginGoogle,

    decodeGoogleJWT,
    loginGoogleJWT,
  };
};

export default useKeyless;

