import { Serializable, Serializer } from '../../bcs/serializer.mjs';
import { AccountAddress } from '../../core/accountAddress.mjs';
import { AnyNumber } from '../../types/index.mjs';
import { PublicKey } from '../../core/crypto/asymmetricCrypto.mjs';
import { U8, U64 } from '../../bcs/serializable/movePrimitives.mjs';
import { MoveString, MoveVector } from '../../bcs/serializable/moveStructs.mjs';
import '../../core/hex.mjs';
import '../../core/common.mjs';
import '../../utils/apiEndpoints.mjs';
import '../../types/indexer.mjs';
import '../../types/generated/operations.mjs';
import '../../types/generated/types.mjs';
import '../../bcs/deserializer.mjs';
import './transactionArgument.mjs';

/**
 * Representation of the challenge which is needed to sign by owner of the account
 * to rotate the authentication key.
 */
declare class RotationProofChallenge extends Serializable {
    readonly accountAddress: AccountAddress;
    readonly moduleName: MoveString;
    readonly structName: MoveString;
    readonly originator: AccountAddress;
    readonly currentAuthKey: AccountAddress;
    readonly newPublicKey: MoveVector<U8>;
    readonly sequenceNumber: U64;
    constructor(args: {
        sequenceNumber: AnyNumber;
        originator: AccountAddress;
        currentAuthKey: AccountAddress;
        newPublicKey: PublicKey;
    });
    serialize(serializer: Serializer): void;
}

export { RotationProofChallenge };
