import { AptosConfig } from './aptosConfig.mjs';
import { PaginationArgs, TransactionResponse, AnyNumber, HexInput, WaitForTransactionOptions, CommittedTransactionResponse, GasEstimation, PendingTransactionResponse } from '../types/index.mjs';
import { AccountAuthenticator } from '../transactions/authenticator/account.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { PrivateKey } from '../core/crypto/asymmetricCrypto.mjs';
import { AnyRawTransaction, InputGenerateTransactionOptions, SimpleTransaction, InputGenerateTransactionPayloadData } from '../transactions/types.mjs';
import { Build } from './transactionSubmission/build.mjs';
import { Simulate } from './transactionSubmission/simulate.mjs';
import { Submit } from './transactionSubmission/submit.mjs';
import { TransactionManagement } from './transactionSubmission/management.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/deserializer.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../core/crypto/anyPublicKey.mjs';
import '../core/crypto/anySignature.mjs';
import '../core/crypto/ed25519.mjs';
import '../core/crypto/secp256k1.mjs';
import '../core/crypto/multiEd25519.mjs';
import '../core/crypto/multiKey.mjs';
import '../core/authenticationKey.mjs';
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
import 'eventemitter3';
import '../transactions/management/transactionWorker.mjs';
import '../transactions/management/accountSequenceNumber.mjs';
import '../transactions/management/asyncQueue.mjs';

declare class Transaction {
    readonly config: AptosConfig;
    readonly build: Build;
    readonly simulate: Simulate;
    readonly submit: Submit;
    readonly batch: TransactionManagement;
    constructor(config: AptosConfig);
    /**
     * Queries on-chain transactions. This function will not return pending
     * transactions. For that, use `getTransactionsByHash`.
     *
     * @param args.options.offset The number transaction to start with
     * @param args.options.limit Number of results to return
     *
     * @returns Array of on-chain transactions
     */
    getTransactions(args?: {
        options?: PaginationArgs;
    }): Promise<TransactionResponse[]>;
    /**
     * Queries on-chain transaction by version. This function will not return pending transactions.
     *
     * @param args.ledgerVersion - Transaction version is an unsigned 64-bit number.
     * @returns On-chain transaction. Only on-chain transactions have versions, so this
     * function cannot be used to query pending transactions.
     */
    getTransactionByVersion(args: {
        ledgerVersion: AnyNumber;
    }): Promise<TransactionResponse>;
    /**
     * Queries on-chain transaction by transaction hash. This function will return pending transactions.
     * @param args.transactionHash - Transaction hash should be hex-encoded bytes string with 0x prefix.
     * @returns Transaction from mempool (pending) or on-chain (committed) transaction
     */
    getTransactionByHash(args: {
        transactionHash: HexInput;
    }): Promise<TransactionResponse>;
    /**
     * Defines if specified transaction is currently in pending state
     *
     * To create a transaction hash:
     *
     * 1. Create a hash message from the bytes: "Aptos::Transaction" bytes + the BCS-serialized Transaction bytes.
     * 2. Apply hash algorithm SHA3-256 to the hash message bytes.
     * 3. Hex-encode the hash bytes with 0x prefix.
     *
     * @param args.transactionHash A hash of transaction
     * @returns `true` if transaction is in pending state and `false` otherwise
     */
    isPendingTransaction(args: {
        transactionHash: HexInput;
    }): Promise<boolean>;
    /**
     * Waits for a transaction to move past the pending state.
     *
     * There are 4 cases.
     * 1. Transaction is successfully processed and committed to the chain.
     *    - The function will resolve with the transaction response from the API.
     * 2. Transaction is rejected for some reason, and is therefore not committed to the blockchain.
     *    - The function will throw an AptosApiError with an HTTP status code indicating some problem with the request.
     * 3. Transaction is committed but execution failed, meaning no changes were
     *    written to the blockchain state.
     *    - If `checkSuccess` is true, the function will throw a FailedTransactionError
     *      If `checkSuccess` is false, the function will resolve with the transaction response where the `success` field is false.
     * 4. Transaction does not move past the pending state within `args.options.timeoutSecs` seconds.
     *    - The function will throw a WaitForTransactionError
     *
     *
     * @param args.transactionHash The hash of a transaction previously submitted to the blockchain.
     * @param args.options.timeoutSecs Timeout in seconds. Defaults to 20 seconds.
     * @param args.options.checkSuccess A boolean which controls whether the function will error if the transaction failed.
     *   Defaults to true.  See case 3 above.
     * @returns The transaction on-chain.  See above for more details.
     */
    waitForTransaction(args: {
        transactionHash: HexInput;
        options?: WaitForTransactionOptions;
    }): Promise<CommittedTransactionResponse>;
    /**
     * Gives an estimate of the gas unit price required to get a
     * transaction on chain in a reasonable amount of time.
     * For more information {@link https://fullnode.mainnet.aptoslabs.com/v1/spec#/operations/estimate_gas_price}
     *
     * @returns Object holding the outputs of the estimate gas API
     * @example
     * ```
     * {
     *  gas_estimate: number;
     *  deprioritized_gas_estimate?: number;
     *  prioritized_gas_estimate?: number;
     * }
     * ```
     */
    getGasPriceEstimation(): Promise<GasEstimation>;
    /**
     * Returns a signing message for a transaction.
     *
     * This allows a user to sign a transaction using their own preferred signing method, and
     * then submit it to the network.
     * @param args.transaction A raw transaction for signing elsewhere
     */
    getSigningMessage(args: {
        transaction: AnyRawTransaction;
    }): Uint8Array;
    /**
     * Generates a transaction to publish a move package to chain.
     *
     * To get the `metadataBytes` and `byteCode`, can compile using Aptos CLI with command
     * `aptos move compile --save-metadata ...`,
     * For more info {@link https://aptos.dev/tutorials/your-first-dapp/#step-4-publish-a-move-module}
     *
     * @param args.account The publisher account
     * @param args.metadataBytes The package metadata bytes
     * @param args.moduleBytecode An array of the bytecode of each module in the package in compiler output order
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    publishPackageTransaction(args: {
        account: AccountAddressInput;
        metadataBytes: HexInput;
        moduleBytecode: Array<HexInput>;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Rotate an account's auth key. After rotation, only the new private key can be used to sign txns for
     * the account.
     * Note: Only legacy Ed25519 scheme is supported for now.
     * More info: {@link https://aptos.dev/guides/account-management/key-rotation/}
     * @param args.fromAccount The account to rotate the auth key for
     * @param args.toNewPrivateKey The new private key to rotate to
     *
     * @returns PendingTransactionResponse
     */
    rotateAuthKey(args: {
        fromAccount: Account;
        toNewPrivateKey: PrivateKey;
    }): Promise<TransactionResponse>;
    /**
     * Sign a transaction that can later be submitted to chain
     *
     * @param args.signer The signer account
     * @param args.transaction A raw transaction to sign on
     *
     * @returns AccountAuthenticator
     */
    sign(args: {
        signer: Account;
        transaction: AnyRawTransaction;
    }): AccountAuthenticator;
    /**
     * Sign a transaction as a fee payer that can later be submitted to chain
     *
     * @param args.signer The fee payer signer account
     * @param args.transaction A raw transaction to sign on
     *
     * @returns AccountAuthenticator
     */
    signAsFeePayer(args: {
        signer: Account;
        transaction: AnyRawTransaction;
    }): AccountAuthenticator;
    /**
     * @deprecated Prefer to use `aptos.transaction.batch.forSingleAccount()`
     *
     * Batch transactions for a single account.
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
    batchTransactionsForSingleAccount(args: {
        sender: Account;
        data: InputGenerateTransactionPayloadData[];
        options?: Omit<InputGenerateTransactionOptions, "accountSequenceNumber">;
    }): Promise<void>;
    /**
     * Sign and submit a single signer transaction to chain
     *
     * @param args.signer The signer account to sign the transaction
     * @param args.transaction An instance of a RawTransaction, plus optional secondary/fee payer addresses
     * ```
     * {
     *  rawTransaction: RawTransaction,
     *  secondarySignerAddresses? : Array<AccountAddress>,
     *  feePayerAddress?: AccountAddress
     * }
     * ```
     *
     * @return PendingTransactionResponse
     */
    signAndSubmitTransaction(args: {
        signer: Account;
        transaction: AnyRawTransaction;
    }): Promise<PendingTransactionResponse>;
}

export { Transaction };
