import EventEmitter from 'eventemitter3';
import { AptosConfig } from '../aptosConfig.mjs';
import { Account } from '../../core/account.mjs';
import { TransactionWorkerEvents, TransactionWorker } from '../../transactions/management/transactionWorker.mjs';
import { InputGenerateTransactionPayloadData, InputGenerateTransactionOptions } from '../../transactions/types.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../utils/const.mjs';
import '../../core/accountAddress.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../bcs/deserializer.mjs';
import '../../transactions/instances/transactionArgument.mjs';
import '../../core/authenticationKey.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../transactions/management/accountSequenceNumber.mjs';
import '../../transactions/management/asyncQueue.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
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

declare class TransactionManagement extends EventEmitter<TransactionWorkerEvents> {
    account: Account;
    transactionWorker: TransactionWorker;
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Internal function to start the transaction worker and
     * listen to worker events
     *
     * @param args.sender The sender account to sign and submit the transaction
     */
    private start;
    /**
     * Internal function to push transaction data to the transaction worker.
     *
     * @param args.data An array of transaction payloads
     * @param args.options optional. Transaction generation configurations (excluding accountSequenceNumber)
     *
     * TODO - make this public once worker supports adding transactions to existing queue
     */
    private push;
    /**
     * Internal function to start listening to transaction worker events
     *
     * TODO - should we ask events to listen to as an input?
     */
    private registerToEvents;
    /**
     * Send batch transactions for a single account.
     *
     * This function uses a transaction worker that receives payloads to be processed
     * and submitted to chain.
     * Note that this process is best for submitting multiple transactions that
     * dont rely on each other, i.e batch funds, batch token mints, etc.
     *
     * If any worker failure, the functions throws an error.
     *
     * @param args.sender The sender account to sign and submit the transaction
     * @param args.data An array of transaction payloads
     * @param args.options optional. Transaction generation configurations (excluding accountSequenceNumber)
     *
     * @return void. Throws if any error
     */
    forSingleAccount(args: {
        sender: Account;
        data: InputGenerateTransactionPayloadData[];
        options?: Omit<InputGenerateTransactionOptions, "accountSequenceNumber">;
    }): void;
}

export { TransactionManagement };
