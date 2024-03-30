import { PublicKeyCredentialCreationOptionsJSON, RegistrationResponseJSON } from '@simplewebauthn/server/esm/deps';
import { AptosConfig } from './aptosConfig.mjs';
import { PendingTransactionResponse, HexInput } from '../types/index.mjs';
import { PublicKey } from '../core/crypto/asymmetricCrypto.mjs';
import { AccountAddress } from '../core/accountAddress.mjs';
import { AnyRawTransaction } from '../transactions/types.mjs';
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

/**
 * A class for all `Passkeys` related operations on Aptos on the browser.
 */
declare class PasskeysBrowser {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Given a credentialId and a transaction, it prompts the client to sign the transaction
     *
     * @param args.credentialId The credential ID of the passkey
     * @param args.publicKey The public key associated with the passkey
     * @param args.transaction The transaction to sign
     * @returns The pending transaction response
     */
    signAndSubmitWithPasskey(args: {
        credentialId: string | Uint8Array;
        publicKey: PublicKey;
        transaction: AnyRawTransaction;
        timeout?: number;
        rpID?: string;
        options?: {
            allowCredentials?: PublicKeyCredentialDescriptor[];
        };
    }): Promise<PendingTransactionResponse>;
    getPasskeyAccountAddress(args: {
        publicKey: HexInput;
    }): Promise<AccountAddress>;
    generateRegistrationOptions(args: {
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
    registerCredential(creationOptionsJSON: PublicKeyCredentialCreationOptionsJSON): Promise<RegistrationResponseJSON>;
    parsePublicKey(response: RegistrationResponseJSON): PublicKey;
}

export { PasskeysBrowser };
