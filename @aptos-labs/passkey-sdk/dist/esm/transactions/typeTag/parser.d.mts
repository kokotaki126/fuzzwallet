import { TypeTag } from './index.mjs';
import '../../bcs/deserializer.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/serializer.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../core/accountAddress.mjs';
import '../instances/transactionArgument.mjs';
import '../instances/identifier.mjs';

declare enum TypeTagParserErrorType {
    InvalidTypeTag = "unknown type",
    UnexpectedGenericType = "unexpected generic type",
    UnexpectedTypeArgumentClose = "unexpected '>'",
    UnexpectedWhitespaceCharacter = "unexpected whitespace character",
    UnexpectedComma = "unexpected ','",
    TypeArgumentCountMismatch = "type argument count doesn't match expected amount",
    MissingTypeArgumentClose = "no matching '>' for '<'",
    UnexpectedPrimitiveTypeArguments = "primitive types not expected to have type arguments",
    UnexpectedVectorTypeArgumentCount = "vector type expected to have exactly one type argument",
    UnexpectedStructFormat = "unexpected struct format, must be of the form 0xaddress::module_name::struct_name",
    InvalidModuleNameCharacter = "module name must only contain alphanumeric or '_' characters",
    InvalidStructNameCharacter = "struct name must only contain alphanumeric or '_' characters"
}
declare class TypeTagParserError extends Error {
    constructor(typeTagStr: string, invalidReason: TypeTagParserErrorType);
}
/**
 * All types are made of a few parts they're either:
 * 1. A simple type e.g. u8
 * 2. A standalone struct e.g. 0x1::account::Account
 * 3. A nested struct e.g. 0x1::coin::Coin<0x1234::coin::MyCoin>
 *
 * There are a few more special cases that need to be handled, however.
 * 1. Multiple generics e.g 0x1::pair::Pair<u8, u16>
 * 2. Spacing in the generics e.g. 0x1::pair::Pair< u8 , u16>
 * 3. Nested generics of different depths e.g. 0x1::pair::Pair<0x1::coin::Coin<0x1234::coin::MyCoin>, u8>
 * 4. Generics for types in ABIs are filled in with placeholders e.g T1, T2, T3
 */
declare function parseTypeTag(typeStr: string, options?: {
    allowGenerics?: boolean;
}): TypeTag;

export { TypeTagParserError, TypeTagParserErrorType, parseTypeTag };
