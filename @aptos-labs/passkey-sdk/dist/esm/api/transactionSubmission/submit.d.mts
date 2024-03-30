import { AccountAuthenticator } from '../../transactions/authenticator/account.mjs';
import { PendingTransactionResponse } from '../../types/index.mjs';
import { AnyRawTransaction } from '../../transactions/types.mjs';
import { AptosConfig } from '../aptosConfig.mjs';
import '../../bcs/deserializer.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/secp256k1.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../transactions/instances/transactionArgument.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
import '../../core/accountAddress.mjs';
import '../../transactions/instances/rawTransaction.mjs';
import '../../transactions/instances/chainId.mjs';
import '../../transactions/instances/transactionPayload.mjs';
import '../../transactions/instances/identifier.mjs';
import '../../transactions/instances/moduleId.mjs';
import '../../transactions/typeTag/index.mjs';
import '../../utils/const.mjs';

/**
 * A class to handle all `Submit` transaction operations
 */
declare class Submit {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Submit a simple transaction
     *
     * @param args.transaction An instance of a raw transaction
     * @param args.senderAuthenticator optional. The sender account authenticator
     * @param args.feePayerAuthenticator optional. The fee payer account authenticator if it is a fee payer transaction
     *
     * @returns PendingTransactionResponse
     */
    simple(args: {
        transaction: AnyRawTransaction;
        senderAuthenticator: AccountAuthenticator;
        feePayerAuthenticator?: AccountAuthenticator;
    }): Promise<PendingTransactionResponse>;
    /**
     * Submit a multi agent transaction
     *
     * @param args.transaction An instance of a raw transaction
     * @param args.senderAuthenticator optional. The sender account authenticator
     * @param args.additionalSignersAuthenticators An array of the secondary signers account authenticators
     * @param args.feePayerAuthenticator optional. The fee payer account authenticator if it is a fee payer transaction
     *
     * @returns PendingTransactionResponse
     */
    multiAgent(args: {
        transaction: AnyRawTransaction;
        senderAuthenticator: AccountAuthenticator;
        additionalSignersAuthenticators: Array<AccountAuthenticator>;
        feePayerAuthenticator?: AccountAuthenticator;
    }): Promise<PendingTransactionResponse>;
}

export { Submit };
