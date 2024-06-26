import { AptosConfig } from '../../api/aptosConfig.mjs';
import { Account } from '../../core/account.mjs';
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
import '../instances/transactionArgument.mjs';
import '../../core/authenticationKey.mjs';
import '../../core/crypto/asymmetricCrypto.mjs';

/**
 * A wrapper that handles and manages an account sequence number.
 *
 * Submit up to `maximumInFlight` transactions per account in parallel with a timeout of `sleepTime`
 * If local assumes `maximumInFlight` are in flight, determine the actual committed state from the network
 * If there are less than `maximumInFlight` due to some being committed, adjust the window
 * If `maximumInFlight` are in flight, wait `sleepTime` seconds before re-evaluating
 * If ever waiting more than `maxWaitTime` restart the sequence number to the current on-chain state
 *
 * Assumptions:
 * Accounts are expected to be managed by a single AccountSequenceNumber and not used otherwise.
 * They are initialized to the current on-chain state, so if there are already transactions in
 * flight, they may take some time to reset.
 * Accounts are automatically initialized if not explicitly
 *
 * Notes:
 * This is co-routine safe, that is many async tasks can be reading from this concurrently.
 * The state of an account cannot be used across multiple AccountSequenceNumber services.
 * The synchronize method will create a barrier that prevents additional nextSequenceNumber
 * calls until it is complete.
 * This only manages the distribution of sequence numbers it does not help handle transaction
 * failures.
 * If a transaction fails, you should call synchronize and wait for timeouts.
 */

declare class AccountSequenceNumber {
    readonly aptosConfig: AptosConfig;
    readonly account: Account;
    lastUncommintedNumber: bigint | null;
    currentNumber: bigint | null;
    /**
     * We want to guarantee that we preserve ordering of workers to requests.
     *
     * `lock` is used to try to prevent multiple coroutines from accessing a shared resource at the same time,
     * which can result in race conditions and data inconsistency.
     * This code actually doesn't do it though, since we aren't giving out a slot, it is still somewhat a race condition.
     *
     * The ideal solution is likely that each thread grabs the next number from a incremental integer.
     * When they complete, they increment that number and that entity is able to enter the `lock`.
     * That would guarantee ordering.
     */
    lock: boolean;
    maxWaitTime: number;
    maximumInFlight: number;
    sleepTime: number;
    constructor(aptosConfig: AptosConfig, account: Account, maxWaitTime: number, maximumInFlight: number, sleepTime: number);
    /**
     * Returns the next available sequence number for this account
     *
     * @returns next available sequence number
     */
    nextSequenceNumber(): Promise<bigint | null>;
    /**
     * Initializes this account with the sequence number on chain
     */
    initialize(): Promise<void>;
    /**
     * Updates this account sequence number with the one on-chain
     *
     * @returns on-chain sequence number for this account
     */
    update(): Promise<bigint>;
    /**
     * Synchronizes local sequence number with the seqeunce number on chain for this account.
     *
     * Poll the network until all submitted transactions have either been committed or until
     * the maximum wait time has elapsed
     */
    synchronize(): Promise<void>;
}

export { AccountSequenceNumber };
