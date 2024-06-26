import { WaitForTransactionOptions, UserTransactionResponse } from '../types/index.mjs';
import { AccountAddressInput } from '../core/accountAddress.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
import '../bcs/serializer.mjs';
import '../core/hex.mjs';
import '../core/common.mjs';
import '../bcs/deserializer.mjs';
import '../transactions/instances/transactionArgument.mjs';
import '../utils/const.mjs';

/**
 * A class to query all `Faucet` related queries on Aptos.
 */
declare class Faucet {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * This creates an account if it does not exist and mints the specified amount of
     * coins into that account
     *
     * @param args.accountAddress Address of the account to fund
     * @param args.amount Amount of tokens to fund the account with
     * @param args.options Configuration options for waitForTransaction
     * @returns Transaction hash of the transaction that funded the account
     */
    fundAccount(args: {
        accountAddress: AccountAddressInput;
        amount: number;
        options?: WaitForTransactionOptions;
    }): Promise<UserTransactionResponse>;
}

export { Faucet };
