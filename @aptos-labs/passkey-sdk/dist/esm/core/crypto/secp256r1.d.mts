import { PublicKey, PrivateKey, Signature } from './asymmetricCrypto.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { HexInput } from '../../types/index.mjs';
import { WebAuthnSignature } from './webauthn.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';

/**
 * Represents the Secp256r1 public key
 *
 * Secp256r1 authentication key is represented in the SDK as `AnyPublicKey`.  It is used to verify WebAuthnSignatures.
 */
declare class Secp256r1PublicKey extends PublicKey {
    static readonly LENGTH: number;
    private readonly key;
    /**
     * Create a new PublicKey instance from a Uint8Array or String.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
    constructor(hexInput: HexInput);
    /**
     * Get the public key in bytes (Uint8Array).
     *
     * @returns Uint8Array representation of the public key
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the public key as a hex string with the 0x prefix.
     *
     * @returns string representation of the public key
     */
    toString(): string;
    /**
     * Verifies a signed data with a public key
     *
     * @param args.message message
     * @param args.signature The signature
     * @returns true if the signature is valid
     */
    verifySignature(args: {
        message: HexInput;
        signature: Secp256r1Signature;
    }): boolean;
    /**
     * Verifies a signed data with a public key
     *
     * @param args.message message
     * @param args.signature The signature
     * @returns true if the signature is valid
     */
    verifyWebAuthnSignature(args: {
        message: HexInput;
        signature: WebAuthnSignature;
    }): boolean;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Secp256r1PublicKey;
    static load(deserializer: Deserializer): Secp256r1PublicKey;
}
/**
 * A Secp256r1 ecdsa private key - this is only used for test purposes as signing is done via passkeys
 */
declare class Secp256r1PrivateKey extends PrivateKey {
    /**
     * Length of Secp256r1 ecdsa private key
     */
    static readonly LENGTH: number;
    /**
     * The private key bytes
     * @private
     */
    private readonly key;
    /**
     * Create a new PrivateKey instance from a Uint8Array or String.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
    constructor(hexInput: HexInput);
    /**
     * Get the private key in bytes (Uint8Array).
     *
     * @returns
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the private key as a hex string with the 0x prefix.
     *
     * @returns string representation of the private key
     */
    toString(): string;
    /**
     * Sign the given message with the private key.
     *
     * @param message in HexInput format
     * @returns Signature
     */
    sign(message: HexInput): Secp256r1Signature;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Secp256r1PrivateKey;
    /**
     * Generate a new random private key.
     *
     * @returns Secp256r1PrivateKey
     */
    static generate(): Secp256r1PrivateKey;
    /**
     * Derive the Secp256r1PublicKey from this private key.
     *
     * @returns Secp256r1PublicKey
     */
    publicKey(): Secp256r1PublicKey;
}
/**
 * A signature of a message signed using an Secp256r1 ecdsa private key
 */
declare class Secp256r1Signature extends Signature {
    /**
     * Secp256r1 ecdsa signatures are 256-bit.
     */
    static readonly LENGTH = 64;
    /**
     * The signature bytes
     * @private
     */
    private readonly data;
    /**
     * Create a new Signature instance from a Uint8Array or String.  It will convert the signature to its canonical if needed.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
    constructor(hexInput: HexInput);
    /**
     * Get the signature in bytes (Uint8Array).
     *
     * @returns Uint8Array representation of the signature
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the signature as a hex string with the 0x prefix.
     *
     * @returns string representation of the signature
     */
    toString(): string;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): Secp256r1Signature;
    static load(deserializer: Deserializer): Secp256r1Signature;
}

export { Secp256r1PrivateKey, Secp256r1PublicKey, Secp256r1Signature };
