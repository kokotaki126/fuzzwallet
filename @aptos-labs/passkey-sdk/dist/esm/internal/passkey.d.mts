import { VerifiedRegistrationResponse, VerifiedAuthenticationResponse } from '@simplewebauthn/server';
import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON, PublicKeyCredentialRequestOptionsJSON, AuthenticationResponseJSON, AuthenticatorDevice } from '@simplewebauthn/server/esm/deps';
import { AptosConfig } from '../api/aptosConfig.mjs';
import { AccountAddress } from '../core/accountAddress.mjs';
import { PublicKey } from '../core/crypto/asymmetricCrypto.mjs';
import { PendingTransactionResponse, HexInput } from '../types/index.mjs';
import { AnyRawTransaction } from '../transactions/types.mjs';
export { signWithPasskey } from '../transactions/transactionBuilder/transactionBuilder.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../bcs/serializable/moveStructs.mjs';
import '../bcs/serializable/movePrimitives.mjs';
import '../bcs/serializable/fixedBytes.mjs';
import '../transactions/instances/rawTransaction.mjs';
import '../transactions/instances/chainId.mjs';
import '../transactions/instances/transactionPayload.mjs';
import '../transactions/instances/identifier.mjs';
import '../transactions/instances/moduleId.mjs';
import '../transactions/typeTag/index.mjs';
import '../transactions/authenticator/account.mjs';
import '../core/crypto/anyPublicKey.mjs';
import '../core/crypto/anySignature.mjs';
import '../core/crypto/ed25519.mjs';
import '../core/crypto/secp256k1.mjs';
import '../core/crypto/multiEd25519.mjs';
import '../core/crypto/multiKey.mjs';
import '../core/account.mjs';
import '../core/authenticationKey.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/passkeysBrowser}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * faucet namespace and without having a dependency cycle error.
 */

declare function generateRegistrationOptions(args: {
    rpName: string;
    rpID: string;
    userID: string;
    userName: string;
    challenge?: string | Uint8Array;
    userDisplayName?: string;
    timeout?: number;
    attestationType?: AttestationConveyancePreference;
    authenticatorAttachment?: AuthenticatorAttachment;
}): Promise<PublicKeyCredentialCreationOptionsJSON>;
declare function registerCredential(creationOptionsJSON: PublicKeyCredentialCreationOptionsJSON): Promise<RegistrationResponseJSON>;
declare function verifyRegistrationResponse(args: {
    response: RegistrationResponseJSON;
    expectedChallenge: string | ((challenge: string) => boolean | Promise<boolean>);
    expectedOrigin: string | string[];
    expectedRPID?: string | string[];
}): Promise<VerifiedRegistrationResponse>;
declare function generateAuthenticationOptions(args: {
    credentialId: string | Uint8Array;
    timeout?: number;
    rpID?: string;
}): Promise<PublicKeyCredentialRequestOptionsJSON>;
declare function authenticateCredential(requestOptionsJSON: PublicKeyCredentialRequestOptionsJSON): Promise<AuthenticationResponseJSON>;
declare function verifyAuthenticationResponse(args: {
    response: AuthenticationResponseJSON;
    expectedChallenge: string | ((challenge: string) => boolean | Promise<boolean>);
    expectedOrigin: string | string[];
    expectedRPID: string | string[];
    expectedType?: string | string[];
    authenticator: AuthenticatorDevice;
    requireUserVerification?: boolean;
    advancedFIDOConfig?: {
        userVerification?: UserVerificationRequirement;
    };
}): Promise<VerifiedAuthenticationResponse>;
declare function parsePublicKey(response: RegistrationResponseJSON): PublicKey;
declare function signAndSubmitWithPasskey(args: {
    aptosConfig: AptosConfig;
    credentialId: string | Uint8Array;
    publicKey: PublicKey;
    transaction: AnyRawTransaction;
    timeout?: number;
    rpID?: string;
    options?: {
        allowCredentials?: PublicKeyCredentialDescriptor[];
    };
}): Promise<PendingTransactionResponse>;
declare function getPasskeyAccountAddress(args: {
    publicKey: HexInput;
    alg?: number;
}): Promise<AccountAddress>;

export { AnyRawTransaction, authenticateCredential, generateAuthenticationOptions, generateRegistrationOptions, getPasskeyAccountAddress, parsePublicKey, registerCredential, signAndSubmitWithPasskey, verifyAuthenticationResponse, verifyRegistrationResponse };
