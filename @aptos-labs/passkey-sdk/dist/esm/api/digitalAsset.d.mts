import { AnyNumber, TokenStandardArg, PaginationArgs, OrderByArg, MoveStructId } from '../types/index.mjs';
import { Account } from '../core/account.mjs';
import { AccountAddressInput, AccountAddress } from '../core/accountAddress.mjs';
import { InputGenerateTransactionOptions, SimpleTransaction } from '../transactions/types.mjs';
import { CreateCollectionOptions, PropertyType, PropertyValue } from '../internal/digitalAsset.mjs';
import { AptosConfig } from './aptosConfig.mjs';
import { GetCollectionDataResponse, GetTokenDataResponse, GetCurrentTokenOwnershipResponse, GetOwnedTokensResponse, GetTokenActivityResponse } from '../types/indexer.mjs';
import '../utils/apiEndpoints.mjs';
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
import '../utils/const.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * A class to query all `DigitalAsset` related queries on Aptos.
 */
declare class DigitalAsset {
    readonly config: AptosConfig;
    constructor(config: AptosConfig);
    /**
     * Queries data of a specific collection by the collection creator address and the collection name.
     *
     * If, for some reason, a creator account has 2 collections with the same name in v1 and v2,
     * can pass an optional `tokenStandard` parameter to query a specific standard
     *
     * @param args.creatorAddress the address of the collection's creator
     * @param args.collectionName the name of the collection
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard the token standard to query
     * @returns GetCollectionDataResponse response type
     */
    getCollectionData(args: {
        creatorAddress: AccountAddressInput;
        collectionName: string;
        minimumLedgerVersion?: AnyNumber;
        options?: TokenStandardArg;
    }): Promise<GetCollectionDataResponse>;
    /**
     * Queries a collection's ID.
     *
     * This is the same as the collection's object address in V2, but V1 does
     * not use objects, and does not have an address
     *
     * @param args.creatorAddress the address of the collection's creator
     * @param args.collectionName the name of the collection
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @param args.options.tokenStandard the token standard to query
     * @returns the collection id
     */
    getCollectionId(args: {
        creatorAddress: AccountAddressInput;
        collectionName: string;
        minimumLedgerVersion?: AnyNumber;
        options?: TokenStandardArg;
    }): Promise<string>;
    /**
     * Gets digital asset data given the address of a digital asset.
     *
     * @param args.tokenAddress The address of the digital asset
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     * @returns GetTokenDataResponse containing relevant data to the digital asset.
     */
    getDigitalAssetData(args: {
        digitalAssetAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetTokenDataResponse>;
    /**
     * Gets digital asset ownership data given the address of a digital asset.
     *
     * @param args.tokenAddress The address of the digital asset
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns GetCurrentTokenOwnershipResponse containing relevant ownership data of the digital asset.
     */
    getCurrentDigitalAssetOwnership(args: {
        digitalAssetAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
    }): Promise<GetCurrentTokenOwnershipResponse>;
    /**
     * Gets the digital assets that the given address owns.
     *
     * @param args.ownerAddress The address of the owner
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns GetOwnedTokensResponse containing ownership data of the digital assets belonging to the ownerAddresss.
     */
    getOwnedDigitalAssets(args: {
        ownerAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: PaginationArgs & OrderByArg<GetOwnedTokensResponse[0]>;
    }): Promise<GetOwnedTokensResponse>;
    /**
     * Gets the activity data given the address of a digital asset.
     *
     * @param args.tokenAddress The address of the digital asset
     * @param args.minimumLedgerVersion Optional ledger version to sync up to, before querying
     *
     * @returns GetTokenActivityResponse containing relevant activity data to the digital asset.
     */
    getDigitalAssetActivity(args: {
        digitalAssetAddress: AccountAddressInput;
        minimumLedgerVersion?: AnyNumber;
        options?: PaginationArgs & OrderByArg<GetTokenActivityResponse[0]>;
    }): Promise<GetTokenActivityResponse>;
    /**
     * Creates a new collection within the specified account
     *
     * @param args.creator the account of the collection's creator
     * @param args.description the description of the collection
     * @param args.name the name of the collection
     * @param args.uri the URI to additional info about the collection
     *
     * The parameters below are optional.
     * @param args.maxSupply controls the max supply of the digital assets - defaults MAX_U64_BIG_INT
     * @param args.mutableDescription controls mutability of the collection's description - defaults true
     * @param args.mutableRoyalty controls mutability of the collection's description - defaults true
     * @param args.mutableUri controls mutability of the collection's URI - defaults true
     * @param args.mutableTokenDescription controls mutability of the digital asset's description - defaults true
     * @param args.mutableTokenName controls mutability of the digital asset's name - defaults true
     * @param args.mutableTokenProperties controls mutability of digital asset's properties - defaults true
     * @param args.mutableTokenUri controls mutability of the digital asset's URI - defaults true
     * @param args.tokensBurnableByCreator controls whether digital assets can be burnable by the creator - defaults true
     * @param args.tokensFreezableByCreator controls whether digital assets can be frozen by the creator - defaults true
     * @param args.royaltyNumerator the numerator of the royalty to be paid to the creator when
     * a digital asset is transferred - defaults 0
     * @param args.royaltyDenominator the denominator of the royalty to be paid to the creator
     * when a digital asset is transferred - defaults 1
     *
     * @returns A SimpleTransaction that when submitted will create the collection.
     */
    createCollectionTransaction(args: {
        creator: Account;
        description: string;
        name: string;
        uri: string;
        options?: InputGenerateTransactionOptions;
    } & CreateCollectionOptions): Promise<SimpleTransaction>;
    /**
     * Create a transaction to mint a digital asset into the creators account within an existing collection.
     *
     * @param args.creator the creator of the collection
     * @param args.collection the name of the collection the digital asset belongs to
     * @param args.description the description of the digital asset
     * @param args.name the name of the digital asset
     * @param args.uri the URI to additional info about the digital asset
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    mintDigitalAssetTransaction(args: {
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
    /**
     * Transfer a digital asset (non fungible digital asset) ownership.
     *
     * We can transfer a digital asset only when the digital asset is not frozen
     * (i.e. owner transfer is not disabled such as for soul bound digital assets)
     *
     * @param args.sender The sender account of the current digital asset owner
     * @param args.digitalAssetAddress The digital asset address
     * @param args.recipient The recipient account address
     * @param args.digitalAssetType optional. The digital asset type, default to "0x4::token::Token"
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    transferDigitalAssetTransaction(args: {
        sender: Account;
        digitalAssetAddress: AccountAddressInput;
        recipient: AccountAddress;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Mint a soul bound digital asset into a recipient's account
     *
     * @param args.account The account that mints the digital asset
     * @param args.collection The collection name that the digital asset belongs to
     * @param args.description The digital asset description
     * @param args.name The digital asset name
     * @param args.uri The digital asset URL
     * @param args.recipient The account address where the digital asset will be created
     * @param args.propertyKeys The property keys for storing on-chain properties
     * @param args.propertyTypes The type of property values
     * @param args.propertyValues The property values to be stored on-chain
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    mintSoulBoundTransaction(args: {
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
    /**
     * Burn a digital asset by its creator
     *
     * @param args.creator The creator account
     * @param args.digitalAssetAddress The digital asset address
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    burnDigitalAssetTransaction(args: {
        creator: Account;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Freeze digital asset transfer ability
     *
     * @param args.creator The creator account
     * @param args.digitalAssetAddress The digital asset address
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    freezeDigitalAssetTransaferTransaction(args: {
        creator: Account;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Unfreeze digital asset transfer ability
     *
     * @param args.creator The creator account
     * @param args.digitalAssetAddress The digital asset address
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    unfreezeDigitalAssetTransaferTransaction(args: {
        creator: Account;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Set the digital asset description
     *
     * @param args.creator The creator account
     * @param args.description The digital asset description
     * @param args.digitalAssetAddress The digital asset address
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    setDigitalAssetDescriptionTransaction(args: {
        creator: Account;
        description: string;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Set the digital asset name
     *
     * @param args.creator The creator account
     * @param args.name The digital asset name
     * @param args.digitalAssetAddress The digital asset address
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    setDigitalAssetNameTransaction(args: {
        creator: Account;
        name: string;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Set the digital asset name
     *
     * @param args.creator The creator account
     * @param args.uri The digital asset uri
     * @param args.digitalAssetAddress The digital asset address
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    setDigitalAssetURITransaction(args: {
        creator: Account;
        uri: string;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Add a digital asset property
     *
     * @param args.account The account that mints the digital asset
     * @param args.digitalAssetAddress The digital asset address
     * @param args.propertyKey The property key for storing on-chain properties
     * @param args.propertyType The type of property value
     * @param args.propertyValue The property value to be stored on-chain
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    addDigitalAssetPropertyTransaction(args: {
        creator: Account;
        propertyKey: string;
        propertyType: PropertyType;
        propertyValue: PropertyValue;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Remove a digital asset property
     *
     * @param args.account The account that mints the digital asset
     * @param args.digitalAssetAddress The digital asset address
     * @param args.propertyKey The property key for storing on-chain properties
     * @param args.propertyType The type of property value
     * @param args.propertyValue The property value to be stored on-chain
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    removeDigitalAssetPropertyTransaction(args: {
        creator: Account;
        propertyKey: string;
        propertyType: PropertyType;
        propertyValue: PropertyValue;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Update a digital asset property
     *
     * @param args.account The account that mints the digital asset
     * @param args.digitalAssetAddress The digital asset address
     * @param args.propertyKey The property key for storing on-chain properties
     * @param args.propertyType The type of property value
     * @param args.propertyValue The property value to be stored on-chain
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    updateDigitalAssetPropertyTransaction(args: {
        creator: Account;
        propertyKey: string;
        propertyType: PropertyType;
        propertyValue: PropertyValue;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Add a typed digital asset property
     *
     * @param args.account The account that mints the digital asset
     * @param args.digitalAssetAddress The digital asset address
     * @param args.propertyKey The property key for storing on-chain properties
     * @param args.propertyType The type of property value
     * @param args.propertyValue The property value to be stored on-chain
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    addDigitalAssetTypedPropertyTransaction(args: {
        creator: Account;
        propertyKey: string;
        propertyType: PropertyType;
        propertyValue: PropertyValue;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
    /**
     * Update a typed digital asset property
     *
     * @param args.account The account that mints the digital asset
     * @param args.digitalAssetAddress The digital asset address
     * @param args.propertyKey The property key for storing on-chain properties
     * @param args.propertyType The type of property value
     * @param args.propertyValue The property value to be stored on-chain
     *
     * @returns A SimpleTransaction that can be simulated or submitted to chain
     */
    updateDigitalAssetTypedPropertyTransaction(args: {
        creator: Account;
        propertyKey: string;
        propertyType: PropertyType;
        propertyValue: PropertyValue;
        digitalAssetAddress: AccountAddressInput;
        digitalAssetType?: MoveStructId;
        options?: InputGenerateTransactionOptions;
    }): Promise<SimpleTransaction>;
}

export { DigitalAsset };
