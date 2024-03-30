import { AptosConfig } from '../api/aptosConfig.mjs';
import { PaginationArgs, WhereArg, AnyNumber } from '../types/index.mjs';
import { FungibleAssetMetadataBoolExp, FungibleAssetActivitiesBoolExp, CurrentFungibleAssetBalancesBoolExp } from '../types/generated/types.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddress } from '../core/accountAddress.mjs';
import { InputGenerateTransactionOptions, SimpleTransaction } from '../transactions/types.mjs';
import { GetFungibleAssetMetadataResponse, GetFungibleAssetActivitiesResponse, GetCurrentFungibleAssetBalancesResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
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

/**
 * This file contains the underlying implementations for exposed API surface in
 * the {@link api/fungible_asset}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * fungible_asset namespace and without having a dependency cycle error.
 */

declare function getFungibleAssetMetadata(args: {
    aptosConfig: AptosConfig;
    options?: PaginationArgs & WhereArg<FungibleAssetMetadataBoolExp>;
}): Promise<GetFungibleAssetMetadataResponse>;
declare function getFungibleAssetActivities(args: {
    aptosConfig: AptosConfig;
    options?: PaginationArgs & WhereArg<FungibleAssetActivitiesBoolExp>;
}): Promise<GetFungibleAssetActivitiesResponse>;
declare function getCurrentFungibleAssetBalances(args: {
    aptosConfig: AptosConfig;
    options?: PaginationArgs & WhereArg<CurrentFungibleAssetBalancesBoolExp>;
}): Promise<GetCurrentFungibleAssetBalancesResponse>;
declare function transferFungibleAsset(args: {
    aptosConfig: AptosConfig;
    sender: Account;
    fungibleAssetMetadataAddress: AccountAddress;
    recipient: AccountAddress;
    amount: AnyNumber;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;

export { getCurrentFungibleAssetBalances, getFungibleAssetActivities, getFungibleAssetMetadata, transferFungibleAsset };
