import { AptosConfig } from '../api/aptosConfig.mjs';
import { PaginationArgs, TransactionResponse, GasEstimation, AnyNumber, HexInput, WaitForTransactionOptions, CommittedTransactionResponse } from '../types/index.mjs';
import { ProcessorType } from '../utils/const.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/transaction}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * transaction namespace and without having a dependency cycle error.
 */

declare function getTransactions(args: {
    aptosConfig: AptosConfig;
    options?: PaginationArgs;
}): Promise<TransactionResponse[]>;
declare function getGasPriceEstimation(args: {
    aptosConfig: AptosConfig;
}): Promise<GasEstimation>;
declare function getTransactionByVersion(args: {
    aptosConfig: AptosConfig;
    ledgerVersion: AnyNumber;
}): Promise<TransactionResponse>;
declare function getTransactionByHash(args: {
    aptosConfig: AptosConfig;
    transactionHash: HexInput;
}): Promise<TransactionResponse>;
declare function isTransactionPending(args: {
    aptosConfig: AptosConfig;
    transactionHash: HexInput;
}): Promise<boolean>;
declare function waitForTransaction(args: {
    aptosConfig: AptosConfig;
    transactionHash: HexInput;
    options?: WaitForTransactionOptions;
}): Promise<CommittedTransactionResponse>;
/**
 * Waits for the indexer to sync up to the ledgerVersion. Timeout is 3 seconds.
 */
declare function waitForIndexer(args: {
    aptosConfig: AptosConfig;
    minimumLedgerVersion: AnyNumber;
    processorType?: ProcessorType;
}): Promise<void>;
/**
 * This error is used by `waitForTransaction` when waiting for a
 * transaction to time out or when the transaction response is undefined
 */
declare class WaitForTransactionError extends Error {
    readonly lastSubmittedTransaction: TransactionResponse | undefined;
    constructor(message: string, lastSubmittedTransaction: TransactionResponse | undefined);
}
/**
 * This error is used by `waitForTransaction` if `checkSuccess` is true.
 * See that function for more information.
 */
declare class FailedTransactionError extends Error {
    readonly transaction: TransactionResponse;
    constructor(message: string, transaction: TransactionResponse);
}

export { FailedTransactionError, WaitForTransactionError, getGasPriceEstimation, getTransactionByHash, getTransactionByVersion, getTransactions, isTransactionPending, waitForIndexer, waitForTransaction };
