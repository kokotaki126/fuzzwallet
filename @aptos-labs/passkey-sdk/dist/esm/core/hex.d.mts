import { ParsingResult } from './common.mjs';
import { HexInput } from '../types/index.mjs';
import '../utils/apiEndpoints.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * This enum is used to explain why parsing might have failed.
 */
declare enum HexInvalidReason {
    TOO_SHORT = "too_short",
    INVALID_LENGTH = "invalid_length",
    INVALID_HEX_CHARS = "invalid_hex_chars"
}
/**
 * NOTE: Do not use this class when working with account addresses, use AccountAddress.
 *
 * NOTE: When accepting hex data as input to a function, prefer to accept HexInput and
 * then use the static helper methods of this class to convert it into the desired
 * format. This enables the greatest flexibility for the developer.
 *
 * Hex is a helper class for working with hex data. Hex data, when represented as a
 * string, generally looks like this, for example: 0xaabbcc, 45cd32, etc.
 *
 * You might use this class like this:
 *
 * ```ts
 * getTransactionByHash(txnHash: HexInput): Promise<Transaction> {
 *   const txnHashString = Hex.fromHexInput(txnHash).toString();
 *   return await getTransactionByHashInner(txnHashString);
 * }
 * ```
 *
 * This call to `Hex.fromHexInput().toString()` converts the HexInput to a hex string
 * with a leading 0x prefix, regardless of what the input format was.
 *
 * These are some other ways to chain the functions together:
 * - `Hex.fromString({ hexInput: "0x1f" }).toUint8Array()`
 * - `new Hex([1, 3]).toStringWithoutPrefix()`
 */
declare class Hex {
    private readonly data;
    /**
     * Create a new Hex instance from a Uint8Array.
     *
     * @param data Uint8Array
     */
    constructor(data: Uint8Array);
    /**
     * Get the inner hex data. The inner data is already a Uint8Array so no conversion
     * is taking place here, it just returns the inner data.
     *
     * @returns Hex data as Uint8Array
     */
    toUint8Array(): Uint8Array;
    /**
     * Get the hex data as a string without the 0x prefix.
     *
     * @returns Hex string without 0x prefix
     */
    toStringWithoutPrefix(): string;
    /**
     * Get the hex data as a string with the 0x prefix.
     *
     * @returns Hex string with 0x prefix
     */
    toString(): string;
    /**
     * Static method to convert a hex string to Hex
     *
     * @param str A hex string, with or without the 0x prefix
     *
     * @returns Hex
     */
    static fromString(str: string): Hex;
    /**
     * Static method to convert an instance of HexInput to Hex
     *
     * @param hexInput A HexInput (string or Uint8Array)
     *
     * @returns Hex
     */
    static fromHexInput(hexInput: HexInput): Hex;
    /**
     * Check if the string is valid hex.
     *
     * @param str A hex string representing byte data.
     *
     * @returns valid = true if the string is valid, false if not. If the string is not
     * valid, invalidReason and invalidReasonMessage will be set explaining why it is
     * invalid.
     */
    static isValid(str: string): ParsingResult<HexInvalidReason>;
    /**
     * Return whether Hex instances are equal. Hex instances are considered equal if
     * their underlying byte data is identical.
     *
     * @param other The Hex instance to compare to.
     * @returns true if the Hex instances are equal, false if not.
     */
    equals(other: Hex): boolean;
}

export { Hex, HexInvalidReason };
