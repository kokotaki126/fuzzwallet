import { AptosConfig } from '../api/aptosConfig.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddress, AccountAddressInput } from '../core/accountAddress.mjs';
import { PaginationArgs, OrderByArg, AnyNumber, TokenStandardArg, MoveStructId } from '../types/index.mjs';
import { InputGenerateTransactionOptions, SimpleTransaction } from '../transactions/types.mjs';
import { GetTokenDataResponse, GetCurrentTokenOwnershipResponse, GetTokenActivityResponse, GetOwnedTokensResponse, GetCollectionDataResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';
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
 * the {@link api/digitalAsset}. By moving the methods out into a separate file,
 * other namespaces and processes can access these methods without depending on the entire
 * digitalAsset namespace and without having a dependency cycle error.
 */

declare const PropertyTypeMap: {
    BOOLEAN: string;
    U8: string;
    U16: string;
    U32: string;
    U64: string;
    U128: string;
    U256: string;
    ADDRESS: string;
    STRING: string;
    ARRAY: string;
};
type PropertyType = keyof typeof PropertyTypeMap;
type PropertyValue = boolean | number | bigint | string | AccountAddress | Uint8Array;
declare function getDigitalAssetData(args: {
    aptosConfig: AptosConfig;
    digitalAssetAddress: AccountAddressInput;
}): Promise<GetTokenDataResponse>;
declare function getCurrentDigitalAssetOwnership(args: {
    aptosConfig: AptosConfig;
    digitalAssetAddress: AccountAddressInput;
}): Promise<GetCurrentTokenOwnershipResponse>;
declare function getOwnedDigitalAssets(args: {
    aptosConfig: AptosConfig;
    ownerAddress: AccountAddressInput;
    options?: PaginationArgs & OrderByArg<GetTokenActivityResponse[0]>;
}): Promise<GetOwnedTokensResponse>;
declare function getDigitalAssetActivity(args: {
    aptosConfig: AptosConfig;
    digitalAssetAddress: AccountAddressInput;
    options?: PaginationArgs & OrderByArg<GetTokenActivityResponse[0]>;
}): Promise<GetTokenActivityResponse>;
interface CreateCollectionOptions {
    maxSupply?: AnyNumber;
    mutableDescription?: boolean;
    mutableRoyalty?: boolean;
    mutableURI?: boolean;
    mutableTokenDescription?: boolean;
    mutableTokenName?: boolean;
    mutableTokenProperties?: boolean;
    mutableTokenURI?: boolean;
    tokensBurnableByCreator?: boolean;
    tokensFreezableByCreator?: boolean;
    royaltyNumerator?: number;
    royaltyDenominator?: number;
}
declare function createCollectionTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    description: string;
    name: string;
    uri: string;
    options?: InputGenerateTransactionOptions;
} & CreateCollectionOptions): Promise<SimpleTransaction>;
declare function getCollectionData(args: {
    aptosConfig: AptosConfig;
    creatorAddress: AccountAddressInput;
    collectionName: string;
    options?: TokenStandardArg;
}): Promise<GetCollectionDataResponse>;
declare function getCollectionId(args: {
    aptosConfig: AptosConfig;
    creatorAddress: AccountAddressInput;
    collectionName: string;
    options?: TokenStandardArg;
}): Promise<string>;
declare function mintDigitalAssetTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    collection: string;
    description: string;
    name: string;
    uri: string;
    propertyKeys?: Array<string>;
    propertyTypes?: Array<PropertyType>;
    propertyValues?: Array<PropertyValue>;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function transferDigitalAssetTransaction(args: {
    aptosConfig: AptosConfig;
    sender: Account;
    digitalAssetAddress: AccountAddressInput;
    recipient: AccountAddress;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function mintSoulBoundTransaction(args: {
    aptosConfig: AptosConfig;
    account: Account;
    collection: string;
    description: string;
    name: string;
    uri: string;
    recipient: AccountAddress;
    propertyKeys?: Array<string>;
    propertyTypes?: Array<PropertyType>;
    propertyValues?: Array<PropertyValue>;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function burnDigitalAssetTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function freezeDigitalAssetTransaferTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function unfreezeDigitalAssetTransaferTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function setDigitalAssetDescriptionTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    description: string;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function setDigitalAssetNameTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    name: string;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function setDigitalAssetURITransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    uri: string;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function addDigitalAssetPropertyTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    propertyKey: string;
    propertyType: PropertyType;
    propertyValue: PropertyValue;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function removeDigitalAssetPropertyTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    propertyKey: string;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function updateDigitalAssetPropertyTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    propertyKey: string;
    propertyType: PropertyType;
    propertyValue: PropertyValue;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function addDigitalAssetTypedPropertyTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    propertyKey: string;
    propertyType: PropertyType;
    propertyValue: PropertyValue;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;
declare function updateDigitalAssetTypedPropertyTransaction(args: {
    aptosConfig: AptosConfig;
    creator: Account;
    propertyKey: string;
    propertyType: PropertyType;
    propertyValue: PropertyValue;
    digitalAssetAddress: AccountAddressInput;
    digitalAssetType?: MoveStructId;
    options?: InputGenerateTransactionOptions;
}): Promise<SimpleTransaction>;

export { type CreateCollectionOptions, type PropertyType, type PropertyValue, addDigitalAssetPropertyTransaction, addDigitalAssetTypedPropertyTransaction, burnDigitalAssetTransaction, createCollectionTransaction, freezeDigitalAssetTransaferTransaction, getCollectionData, getCollectionId, getCurrentDigitalAssetOwnership, getDigitalAssetActivity, getDigitalAssetData, getOwnedDigitalAssets, mintDigitalAssetTransaction, mintSoulBoundTransaction, removeDigitalAssetPropertyTransaction, setDigitalAssetDescriptionTransaction, setDigitalAssetNameTransaction, setDigitalAssetURITransaction, transferDigitalAssetTransaction, unfreezeDigitalAssetTransaferTransaction, updateDigitalAssetPropertyTransaction, updateDigitalAssetTypedPropertyTransaction };
