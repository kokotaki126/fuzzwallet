import { UserTransactionResponse } from '../../types/index.mjs';
import { PublicKey } from '../../core/crypto/asymmetricCrypto.mjs';
import { AnyRawTransaction, InputSimulateTransactionOptions } from '../../transactions/types.mjs';
import { AptosConfig } from '../aptosConfig.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/deserializer.mjs';
import '../../transactions/instances/transactionArgument.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
import '../../core/accountAddress.mjs';
import '../../transactions/instances/rawTransaction.mjs';
import '../../transactions/instances/chainId.mjs';
import '../../transactions/instances/transactionPayload.mjs';
import '../../transactions/instances/identifier.mjs';
import '../../transactions/instances/moduleId.mjs';
import '../../transactions/typeTag/index.mjs';
import '../../transactions/authenticator/account.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/secp256k1.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';
import '../../utils/const.mjs';

/**
 * A class to handle all `Simulate` transaction operations
 */
declare class Simulate {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Simulate a simple transaction
     *
     * @param args.signerPublicKey The signer public key
     * @param args.transaction An instance of a raw transaction
     * @param args.options optional. Optional transaction configurations
     * @param args.feePayerPublicKey optional. The fee payer public key if it is a fee payer transaction
     *
     * @returns Array<UserTransactionResponse>
     */
    simple(args: {
        signerPublicKey: PublicKey;
        transaction: AnyRawTransaction;
        feePayerPublicKey?: PublicKey;
        options?: InputSimulateTransactionOptions;
    }): Promise<Array<UserTransactionResponse>>;
    /**
     * Simulate a multi agent transaction
     *
     * @param args.signerPublicKey The signer public key
     * @param args.transaction An instance of a raw transaction
     * @param args.secondarySignersPublicKeys An array of the secondary signers public keys
     * @param args.options optional. Optional transaction configurations
     * @param args.feePayerPublicKey optional. The fee payer public key if it is a fee payer transaction
     *
     * @returns Array<UserTransactionResponse>
     */
    multiAgent(args: {
        signerPublicKey: PublicKey;
        transaction: AnyRawTransaction;
        secondarySignersPublicKeys: Array<PublicKey>;
        feePayerPublicKey?: PublicKey;
        options?: InputSimulateTransactionOptions;
    }): Promise<Array<UserTransactionResponse>>;
}

export { Simulate };
