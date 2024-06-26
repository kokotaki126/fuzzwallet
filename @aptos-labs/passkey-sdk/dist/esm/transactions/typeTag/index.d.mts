import { Deserializer } from '../../bcs/deserializer.mjs';
import { Serializable, Serializer } from '../../bcs/serializer.mjs';
import { AccountAddress } from '../../core/accountAddress.mjs';
import { Identifier } from '../instances/identifier.mjs';
import '../../types/index.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../instances/transactionArgument.mjs';

declare abstract class TypeTag extends Serializable {
    abstract serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): TypeTag;
    abstract toString(): string;
    isBool(): this is TypeTagBool;
    isAddress(): this is TypeTagAddress;
    isGeneric(): this is TypeTagGeneric;
    isSigner(): this is TypeTagSigner;
    isVector(): this is TypeTagVector;
    isStruct(): this is TypeTagStruct;
    isU8(): this is TypeTagU8;
    isU16(): this is TypeTagU16;
    isU32(): this is TypeTagU32;
    isU64(): this is TypeTagU64;
    isU128(): this is TypeTagU128;
    isU256(): this is TypeTagU256;
}
declare class TypeTagBool extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagBool;
}
declare class TypeTagU8 extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagU8;
}
declare class TypeTagU16 extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagU16;
}
declare class TypeTagU32 extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagU32;
}
declare class TypeTagU64 extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagU64;
}
declare class TypeTagU128 extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagU128;
}
declare class TypeTagU256 extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagU256;
}
declare class TypeTagAddress extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagAddress;
}
declare class TypeTagSigner extends TypeTag {
    toString(): string;
    serialize(serializer: Serializer): void;
    static load(_deserializer: Deserializer): TypeTagSigner;
}
declare class TypeTagReference extends TypeTag {
    readonly value: TypeTag;
    toString(): `&${string}`;
    constructor(value: TypeTag);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TypeTagReference;
}
/**
 * Generics are used for type parameters in entry functions.  However,
 * they are not actually serialized into a real type, so they cannot be
 * used as a type directly.
 */
declare class TypeTagGeneric extends TypeTag {
    readonly value: number;
    toString(): `T${number}`;
    constructor(value: number);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TypeTagGeneric;
}
declare class TypeTagVector extends TypeTag {
    readonly value: TypeTag;
    toString(): `vector<${string}>`;
    constructor(value: TypeTag);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TypeTagVector;
}
declare class TypeTagStruct extends TypeTag {
    readonly value: StructTag;
    toString(): `0x${string}::${string}::${string}`;
    constructor(value: StructTag);
    serialize(serializer: Serializer): void;
    static load(deserializer: Deserializer): TypeTagStruct;
    isTypeTag(address: AccountAddress, moduleName: string, structName: string): boolean;
    isString(): boolean;
    isOption(): boolean;
    isObject(): boolean;
}
declare class StructTag extends Serializable {
    readonly address: AccountAddress;
    readonly moduleName: Identifier;
    readonly name: Identifier;
    readonly typeArgs: Array<TypeTag>;
    constructor(address: AccountAddress, module_name: Identifier, name: Identifier, type_args: Array<TypeTag>);
    serialize(serializer: Serializer): void;
    static deserialize(deserializer: Deserializer): StructTag;
}
declare function aptosCoinStructTag(): StructTag;
declare function stringStructTag(): StructTag;
declare function optionStructTag(typeArg: TypeTag): StructTag;
declare function objectStructTag(typeArg: TypeTag): StructTag;

export { StructTag, TypeTag, TypeTagAddress, TypeTagBool, TypeTagGeneric, TypeTagReference, TypeTagSigner, TypeTagStruct, TypeTagU128, TypeTagU16, TypeTagU256, TypeTagU32, TypeTagU64, TypeTagU8, TypeTagVector, aptosCoinStructTag, objectStructTag, optionStructTag, stringStructTag };
