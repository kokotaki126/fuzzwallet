import { Signature } from './asymmetricCrypto.mjs';
import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializer } from '../../bcs/serializer.mjs';
import { HexInput } from '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../hex.mjs';
import '../common.mjs';

declare class AssertionSignature extends Signature {
    readonly signature: Signature;
    constructor(signature: Signature);
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
    static deserialize(deserializer: Deserializer): AssertionSignature;
}
declare class PartialAuthenticatorAssertionResponse {
    readonly signature: AssertionSignature;
    readonly authenticatorData: Uint8Array;
    readonly clientDataJSON: Uint8Array;
    constructor(signature: Signature, authenticatorData: HexInput, clientDataJSON: HexInput);
}
type ClientDataJSON = {
    type: string;
    challenge: string;
    origin: string;
    crossOrigin?: boolean;
    tokenBinding?: {
        id?: string;
        status: "present" | "supported" | "not-supported";
    };
};
/**
 * A signature of WebAuthn transaction
 */
declare class WebAuthnSignature extends Signature {
    /**
     * The signature bytes
     */
    readonly paar: PartialAuthenticatorAssertionResponse;
    /**
     * Create a new Signature instance from a Uint8Array or String.
     *
     * @param hexInput A HexInput (string or Uint8Array)
     */
    constructor(signature: Signature, authenticatorData: HexInput, clientDataJSON: HexInput);
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
    getCollectedClientData(): ClientDataJSON;
    getVerificationData(): Uint8Array;
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): WebAuthnSignature;
    static load(deserializer: Deserializer): WebAuthnSignature;
}

export { AssertionSignature, type ClientDataJSON, PartialAuthenticatorAssertionResponse, WebAuthnSignature };
