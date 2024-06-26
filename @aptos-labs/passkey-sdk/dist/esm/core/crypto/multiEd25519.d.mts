import { PublicKey, Signature } from './asymmetricCrypto.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { Ed25519PublicKey, Ed25519Signature } from './ed25519.mjs';
import { HexInput } from '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';

/**
 * Represents the public key of a K-of-N Ed25519 multi-sig transaction.
 */
declare class MultiEd25519PublicKey extends PublicKey {
    /**
     * Maximum number of public keys supported
     */
    static readonly MAX_KEYS = 32;
    /**
     * Minimum number of public keys needed
     */
    static readonly MIN_KEYS = 2;
    /**
     * Minimum threshold for the number of valid signatures required
     */
    static readonly MIN_THRESHOLD = 1;
    /**
     * List of Ed25519 public keys for this MultiEd25519PublicKey
     */
    readonly publicKeys: Ed25519PublicKey[];
    /**
     * The minimum number of valid signatures required, for the number of public keys specified
     */
    readonly threshold: number;
    /**
     * Public key for a K-of-N multi-sig transaction. A K-of-N multi-sig transaction means that for such a
     * transaction to be executed, at least K out of the N authorized signers have signed the transaction
     * and passed the check conducted by the chain.
     *
     * @see {@link
     * https://aptos.dev/integration/creating-a-signed-transaction/ | Creating a Signed Transaction}
     *
     * @param args.publicKeys A list of public keys
     * @param args.threshold At least "threshold" signatures must be valid
     */
    constructor(args: {
        publicKeys: Ed25519PublicKey[];
        threshold: number;
    });
    /**
     * Converts a PublicKeys into Uint8Array (bytes) with: bytes = p1_bytes | ... | pn_bytes | threshold
     */
    toUint8Array(): Uint8Array;
    toString(): string;
    verifySignature(args: {
        message: HexInput;
        signature: MultiEd25519Signature;
    }): boolean;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): MultiEd25519PublicKey;
}
/**
 * Represents the signature of a K-of-N Ed25519 multi-sig transaction.
 */
declare class MultiEd25519Signature extends Signature {
    /**
     * Maximum number of Ed25519 signatures supported
     */
    static MAX_SIGNATURES_SUPPORTED: number;
    /**
     * Number of bytes in the bitmap representing who signed the transaction (32-bits)
     */
    static BITMAP_LEN: number;
    /**
     * The list of underlying Ed25519 signatures
     */
    readonly signatures: Ed25519Signature[];
    /**
     * 32-bit Bitmap representing who signed the transaction
     *
     * This is represented where each public key can be masked to determine whether the message was signed by that key.
     */
    readonly bitmap: Uint8Array;
    /**
     * Signature for a K-of-N multi-sig transaction.
     *
     * @see {@link
     * https://aptos.dev/integration/creating-a-signed-transaction/#multisignature-transactions | Creating a Signed Transaction}
     *
     * @param args.signatures A list of signatures
     * @param args.bitmap 4 bytes, at most 32 signatures are supported. If Nth bit value is `1`, the Nth
     * signature should be provided in `signatures`. Bits are read from left to right
     */
    constructor(args: {
        signatures: Ed25519Signature[];
        bitmap: Uint8Array;
    });
    /**
     * Converts a MultiSignature into Uint8Array (bytes) with `bytes = s1_bytes | ... | sn_bytes | bitmap`
     */
    toUint8Array(): Uint8Array;
    toString(): string;
    /**
     * Helper method to create a bitmap out of the specified bit positions
     * @param args.bits The bitmap positions that should be set. A position starts at index 0.
     * Valid position should range between 0 and 31.
     * @example
     * Here's an example of valid `bits`
     * ```
     * [0, 2, 31]
     * ```
     * `[0, 2, 31]` means the 1st, 3rd and 32nd bits should be set in the bitmap.
     * The result bitmap should be 0b1010000000000000000000000000001
     *
     * @returns bitmap that is 32bit long
     */
    static createBitmap(args: {
        bits: number[];
    }): Uint8Array;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): MultiEd25519Signature;
}

export { MultiEd25519PublicKey, MultiEd25519Signature };
