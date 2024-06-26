import { AccountSequenceNumber } from './accountSequenceNumber.mjs';
import EventEmitter from 'eventemitter3';
import { AptosConfig } from '../../api/aptosConfig.mjs';
import { Account } from '../../core/account.mjs';
import { PendingTransactionResponse } from '../../types/index.mjs';
import { InputGenerateTransactionPayloadData, InputGenerateTransactionOptions, SimpleTransaction } from '../types.mjs';
import { AsyncQueue } from './asyncQueue.mjs';
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
import '../instances/transactionArgument.mjs';
import '../../core/authenticationKey.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';
import '../../bcs/serializable/moveStructs.mjs';
import '../../bcs/serializable/movePrimitives.mjs';
import '../../bcs/serializable/fixedBytes.mjs';
import '../instances/rawTransaction.mjs';
import '../instances/chainId.mjs';
import '../instances/transactionPayload.mjs';
import '../instances/identifier.mjs';
import '../instances/moduleId.mjs';
import '../typeTag/index.mjs';
import '../authenticator/account.mjs';
import '../../core/crypto/anyPublicKey.mjs';
import '../../core/crypto/anySignature.mjs';
import '../../core/crypto/ed25519.mjs';
import '../../core/crypto/secp256k1.mjs';
import '../../core/crypto/multiEd25519.mjs';
import '../../core/crypto/multiKey.mjs';

declare const promiseFulfilledStatus = "fulfilled";
declare enum TransactionWorkerEventsEnum {
    TransactionSent = "transactionSent",
    TransactionSendFailed = "transactionSendFailed",
    TransactionExecuted = "transactionExecuted",
    TransactionExecutionFailed = "transactionExecutionFailed",
    ExecutionFinish = "executionFinish"
}
interface TransactionWorkerEvents {
    transactionSent: (data: SuccessEventData) => void;
    transactionSendFailed: (data: FailureEventData) => void;
    transactionExecuted: (data: SuccessEventData) => void;
    transactionExecutionFailed: (data: FailureEventData) => void;
    executionFinish: (data: ExecutionFinishEventData) => void;
}
type ExecutionFinishEventData = {
    message: string;
};
type SuccessEventData = {
    message: string;
    transactionHash: string;
};
type FailureEventData = {
    message: string;
    error: string;
};
/**
 * TransactionWorker provides a simple framework for receiving payloads to be processed.
 *
 * Once one `start()` the process and pushes a new transaction, the worker acquires
 * the current account's next sequence number (by using the AccountSequenceNumber class),
 * generates a signed transaction and pushes an async submission process into the `outstandingTransactions` queue.
 * At the same time, the worker processes transactions by reading the `outstandingTransactions` queue
 * and submits the next transaction to chain, it
 * 1) waits for resolution of the submission process or get pre-execution validation error
 * and 2) waits for the resolution of the execution process or get an execution error.
 * The worker fires events for any submission and/or execution success and/or failure.
 */
declare class TransactionWorker extends EventEmitter<TransactionWorkerEvents> {
    readonly aptosConfig: AptosConfig;
    readonly account: Account;
    readonly accountSequnceNumber: AccountSequenceNumber;
    readonly taskQueue: AsyncQueue<() => Promise<void>>;
    started: boolean;
    /**
     * transactions payloads waiting to be generated and signed
     *
     * TODO support entry function payload from ABI builder
     */
    transactionsQueue: AsyncQueue<[InputGenerateTransactionPayloadData, InputGenerateTransactionOptions | undefined]>;
    /**
     * signed transactions waiting to be submitted
     */
    outstandingTransactions: AsyncQueue<[Promise<PendingTransactionResponse>, bigint]>;
    /**
     * transactions that have been submitted to chain
     */
    sentTransactions: Array<[string, bigint, any]>;
    /**
     * transactions that have been committed to chain
     */
    executedTransactions: Array<[string, bigint, any]>;
    /**
     * Provides a simple framework for receiving payloads to be processed.
     *
     * @param aptosConfig - a config object
     * @param sender - a sender as Account
     * @param maxWaitTime - the max wait time to wait before resyncing the sequence number
     * to the current on-chain state, default to 30
     * @param maximumInFlight - submit up to `maximumInFlight` transactions per account.
     * Mempool limits the number of transactions per account to 100, hence why we default to 100.
     * @param sleepTime - If `maximumInFlight` are in flight, wait `sleepTime` seconds before re-evaluating, default to 10
     */
    constructor(aptosConfig: AptosConfig, account: Account, maxWaitTime?: number, maximumInFlight?: number, sleepTime?: number);
    /**
     * Gets the current account sequence number,
     * generates the transaction with the account sequence number,
     * adds the transaction to the outstanding transaction queue
     * to be processed later.
     */
    submitNextTransaction(): Promise<void>;
    /**
     * Reads the outstanding transaction queue and submits the transaction to chain.
     *
     * If the transaction has fulfilled, it pushes the transaction to the processed
     * transactions queue and fires a transactionsFulfilled event.
     *
     * If the transaction has failed, it pushes the transaction to the processed
     * transactions queue with the failure reason and fires a transactionsFailed event.
     */
    processTransactions(): Promise<void>;
    /**
     * Once transaction has been sent to chain, we check for its execution status.
     * @param sentTransaction transactions that were sent to chain and are now waiting to be executed
     * @param sequenceNumber the account's sequence number that was sent with the transaction
     */
    checkTransaction(sentTransaction: PromiseFulfilledResult<PendingTransactionResponse>, sequenceNumber: bigint): Promise<void>;
    /**
     * Push transaction to the transactions queue
     * @param payload Transaction payload
     */
    push(transactionData: InputGenerateTransactionPayloadData, options?: InputGenerateTransactionOptions): Promise<void>;
    /**
     * Generates a signed transaction that can be submitted to chain
     * @param account an Aptos account
     * @param sequenceNumber a sequence number the transaction will be generated with
     * @returns
     */
    generateNextTransaction(account: Account, sequenceNumber: bigint): Promise<SimpleTransaction | undefined>;
    /**
     * Starts transaction submission and transaction processing.
     */
    run(): Promise<void>;
    /**
     * Starts the transaction management process.
     */
    start(): void;
    /**
     * Stops the the transaction management process.
     */
    stop(): void;
}

export { type ExecutionFinishEventData, type FailureEventData, type SuccessEventData, TransactionWorker, type TransactionWorkerEvents, TransactionWorkerEventsEnum, promiseFulfilledStatus };
