import { AnyNumber, PaginationArgs, WhereArg } from '../types/index.mjs';
import { FungibleAssetMetadataBoolExp, FungibleAssetActivitiesBoolExp, CurrentFungibleAssetBalancesBoolExp } from '../types/generated/types.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddress } from '../core/accountAddress.mjs';
import { InputGenerateTransactionOptions, SimpleTransaction } from '../transactions/types.mjs';
import { GetFungibleAssetMetadataResponse, GetFungibleAssetActivitiesResponse, GetCurrentFungibleAssetBalancesResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../core/authenticationKey.mjs';
import '../core/crypto/asymmetricCrypto.mjs';
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
import '../types/generated/operations.mjs';

/**
 * A class to query all `FungibleAsset` related queries on Aptos.
 */
declare class FungibleAsset {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Queries all fungible asset metadata.
     *
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns A list of fungible asset metadata
     */
    getFungibleAssetMetadata(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: PaginationArgs & WhereArg<FungibleAssetMetadataBoolExp>;
    }): Promise<GetFungibleAssetMetadataResponse>;
    /**
     * Queries a fungible asset metadata
     *
     * This query returns the fungible asset metadata for a specific fungible asset.
     *
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.assetType The asset type of the fungible asset.
     * e.g
     * "0x1::aptos_coin::AptosCoin" for Aptos Coin
     * "0xc2948283c2ce03aafbb294821de7ee684b06116bb378ab614fa2de07a99355a8" - address format if this is fungible asset
     *
     * @returns A fungible asset metadata item
     */
    getFungibleAssetMetadataByAssetType(args: {
        assetType: string;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetFungibleAssetMetadataResponse[0]>;
    /**
     * Queries all fungible asset activities
     *
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns A list of fungible asset metadata
     */
    getFungibleAssetActivities(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: PaginationArgs & WhereArg<FungibleAssetActivitiesBoolExp>;
    }): Promise<GetFungibleAssetActivitiesResponse>;
    /**
     * Queries all fungible asset balances
     *
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns A list of fungible asset metadata
     */
    getCurrentFungibleAssetBalances(args?: {
        minimumLedgerVersion?: AnyNumber;
        options?: PaginationArgs & WhereArg<CurrentFungibleAssetBalancesBoolExp>;
    }): Promise<GetCurrentFungibleAssetBalancesResponse>;
    /**
     *  Transfer `amount` of fungible asset from sender's primary store to recipient's primary store.
     *
     * Use this method to transfer any fungible asset including fungible token.
     *
     * @param sender The sender account
     * @param fungibleAssetMetadataAddress The fungible asset account address.
     * For example if you’re transferring USDT this would be the USDT address
     * @param recipient The recipient account address
     * @param amount Number of assets to transfer
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain.
     */
    transferFungibleAsset(args: {
        sender: Account;
        fungibleAssetMetadataAddress: AccountAddress;
        recipient: AccountAddress;
        amount: AnyNumber;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
}

export { FungibleAsset };
