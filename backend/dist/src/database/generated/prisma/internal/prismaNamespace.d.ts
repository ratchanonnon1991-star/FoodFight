import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Account: "Account";
    readonly RefreshToken: "RefreshToken";
    readonly EmailVerification: "EmailVerification";
    readonly PasswordReset: "PasswordReset";
    readonly FoodProfile: "FoodProfile";
    readonly PaymentAccount: "PaymentAccount";
    readonly Room: "Room";
    readonly RoomMember: "RoomMember";
    readonly FoodFightSession: "FoodFightSession";
    readonly SessionMember: "SessionMember";
    readonly MealPreference: "MealPreference";
    readonly RecommendationRound: "RecommendationRound";
    readonly RecommendationItem: "RecommendationItem";
    readonly Vote: "Vote";
    readonly FinalVote: "FinalVote";
    readonly FinalSelection: "FinalSelection";
    readonly RestaurantRecommendation: "RestaurantRecommendation";
    readonly RestaurantSelection: "RestaurantSelection";
    readonly Bill: "Bill";
    readonly Receipt: "Receipt";
    readonly ReceiptItem: "ReceiptItem";
    readonly ItemShare: "ItemShare";
    readonly UserPayment: "UserPayment";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "account" | "refreshToken" | "emailVerification" | "passwordReset" | "foodProfile" | "paymentAccount" | "room" | "roomMember" | "foodFightSession" | "sessionMember" | "mealPreference" | "recommendationRound" | "recommendationItem" | "vote" | "finalVote" | "finalSelection" | "restaurantRecommendation" | "restaurantSelection" | "bill" | "receipt" | "receiptItem" | "itemShare" | "userPayment";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Account: {
            payload: Prisma.$AccountPayload<ExtArgs>;
            fields: Prisma.AccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findFirst: {
                    args: Prisma.AccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                findMany: {
                    args: Prisma.AccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                create: {
                    args: Prisma.AccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                createMany: {
                    args: Prisma.AccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                delete: {
                    args: Prisma.AccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                update: {
                    args: Prisma.AccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                deleteMany: {
                    args: Prisma.AccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>[];
                };
                upsert: {
                    args: Prisma.AccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AccountPayload>;
                };
                aggregate: {
                    args: Prisma.AccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAccount>;
                };
                groupBy: {
                    args: Prisma.AccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AccountCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        EmailVerification: {
            payload: Prisma.$EmailVerificationPayload<ExtArgs>;
            fields: Prisma.EmailVerificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailVerificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailVerificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                findFirst: {
                    args: Prisma.EmailVerificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailVerificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                findMany: {
                    args: Prisma.EmailVerificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[];
                };
                create: {
                    args: Prisma.EmailVerificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                createMany: {
                    args: Prisma.EmailVerificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EmailVerificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[];
                };
                delete: {
                    args: Prisma.EmailVerificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                update: {
                    args: Prisma.EmailVerificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailVerificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailVerificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EmailVerificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>[];
                };
                upsert: {
                    args: Prisma.EmailVerificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationPayload>;
                };
                aggregate: {
                    args: Prisma.EmailVerificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailVerification>;
                };
                groupBy: {
                    args: Prisma.EmailVerificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailVerificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationCountAggregateOutputType> | number;
                };
            };
        };
        PasswordReset: {
            payload: Prisma.$PasswordResetPayload<ExtArgs>;
            fields: Prisma.PasswordResetFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PasswordResetCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                delete: {
                    args: Prisma.PasswordResetDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                update: {
                    args: Prisma.PasswordResetUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PasswordResetUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>[];
                };
                upsert: {
                    args: Prisma.PasswordResetUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordReset>;
                };
                groupBy: {
                    args: Prisma.PasswordResetGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetCountAggregateOutputType> | number;
                };
            };
        };
        FoodProfile: {
            payload: Prisma.$FoodProfilePayload<ExtArgs>;
            fields: Prisma.FoodProfileFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FoodProfileFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FoodProfileFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>;
                };
                findFirst: {
                    args: Prisma.FoodProfileFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FoodProfileFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>;
                };
                findMany: {
                    args: Prisma.FoodProfileFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>[];
                };
                create: {
                    args: Prisma.FoodProfileCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>;
                };
                createMany: {
                    args: Prisma.FoodProfileCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FoodProfileCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>[];
                };
                delete: {
                    args: Prisma.FoodProfileDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>;
                };
                update: {
                    args: Prisma.FoodProfileUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>;
                };
                deleteMany: {
                    args: Prisma.FoodProfileDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FoodProfileUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FoodProfileUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>[];
                };
                upsert: {
                    args: Prisma.FoodProfileUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodProfilePayload>;
                };
                aggregate: {
                    args: Prisma.FoodProfileAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFoodProfile>;
                };
                groupBy: {
                    args: Prisma.FoodProfileGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodProfileGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FoodProfileCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodProfileCountAggregateOutputType> | number;
                };
            };
        };
        PaymentAccount: {
            payload: Prisma.$PaymentAccountPayload<ExtArgs>;
            fields: Prisma.PaymentAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaymentAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaymentAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>;
                };
                findFirst: {
                    args: Prisma.PaymentAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaymentAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>;
                };
                findMany: {
                    args: Prisma.PaymentAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>[];
                };
                create: {
                    args: Prisma.PaymentAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>;
                };
                createMany: {
                    args: Prisma.PaymentAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PaymentAccountCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>[];
                };
                delete: {
                    args: Prisma.PaymentAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>;
                };
                update: {
                    args: Prisma.PaymentAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.PaymentAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaymentAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PaymentAccountUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>[];
                };
                upsert: {
                    args: Prisma.PaymentAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaymentAccountPayload>;
                };
                aggregate: {
                    args: Prisma.PaymentAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePaymentAccount>;
                };
                groupBy: {
                    args: Prisma.PaymentAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaymentAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaymentAccountCountAggregateOutputType> | number;
                };
            };
        };
        Room: {
            payload: Prisma.$RoomPayload<ExtArgs>;
            fields: Prisma.RoomFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoomFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>;
                };
                findFirst: {
                    args: Prisma.RoomFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>;
                };
                findMany: {
                    args: Prisma.RoomFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>[];
                };
                create: {
                    args: Prisma.RoomCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>;
                };
                createMany: {
                    args: Prisma.RoomCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>[];
                };
                delete: {
                    args: Prisma.RoomDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>;
                };
                update: {
                    args: Prisma.RoomUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>;
                };
                deleteMany: {
                    args: Prisma.RoomDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoomUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>[];
                };
                upsert: {
                    args: Prisma.RoomUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomPayload>;
                };
                aggregate: {
                    args: Prisma.RoomAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoom>;
                };
                groupBy: {
                    args: Prisma.RoomGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoomCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomCountAggregateOutputType> | number;
                };
            };
        };
        RoomMember: {
            payload: Prisma.$RoomMemberPayload<ExtArgs>;
            fields: Prisma.RoomMemberFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RoomMemberFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RoomMemberFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
                };
                findFirst: {
                    args: Prisma.RoomMemberFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RoomMemberFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
                };
                findMany: {
                    args: Prisma.RoomMemberFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>[];
                };
                create: {
                    args: Prisma.RoomMemberCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
                };
                createMany: {
                    args: Prisma.RoomMemberCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RoomMemberCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>[];
                };
                delete: {
                    args: Prisma.RoomMemberDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
                };
                update: {
                    args: Prisma.RoomMemberUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
                };
                deleteMany: {
                    args: Prisma.RoomMemberDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RoomMemberUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RoomMemberUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>[];
                };
                upsert: {
                    args: Prisma.RoomMemberUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RoomMemberPayload>;
                };
                aggregate: {
                    args: Prisma.RoomMemberAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRoomMember>;
                };
                groupBy: {
                    args: Prisma.RoomMemberGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomMemberGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RoomMemberCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RoomMemberCountAggregateOutputType> | number;
                };
            };
        };
        FoodFightSession: {
            payload: Prisma.$FoodFightSessionPayload<ExtArgs>;
            fields: Prisma.FoodFightSessionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FoodFightSessionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FoodFightSessionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>;
                };
                findFirst: {
                    args: Prisma.FoodFightSessionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FoodFightSessionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>;
                };
                findMany: {
                    args: Prisma.FoodFightSessionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>[];
                };
                create: {
                    args: Prisma.FoodFightSessionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>;
                };
                createMany: {
                    args: Prisma.FoodFightSessionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FoodFightSessionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>[];
                };
                delete: {
                    args: Prisma.FoodFightSessionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>;
                };
                update: {
                    args: Prisma.FoodFightSessionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>;
                };
                deleteMany: {
                    args: Prisma.FoodFightSessionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FoodFightSessionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FoodFightSessionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>[];
                };
                upsert: {
                    args: Prisma.FoodFightSessionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodFightSessionPayload>;
                };
                aggregate: {
                    args: Prisma.FoodFightSessionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFoodFightSession>;
                };
                groupBy: {
                    args: Prisma.FoodFightSessionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodFightSessionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FoodFightSessionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodFightSessionCountAggregateOutputType> | number;
                };
            };
        };
        SessionMember: {
            payload: Prisma.$SessionMemberPayload<ExtArgs>;
            fields: Prisma.SessionMemberFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SessionMemberFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SessionMemberFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>;
                };
                findFirst: {
                    args: Prisma.SessionMemberFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SessionMemberFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>;
                };
                findMany: {
                    args: Prisma.SessionMemberFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>[];
                };
                create: {
                    args: Prisma.SessionMemberCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>;
                };
                createMany: {
                    args: Prisma.SessionMemberCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SessionMemberCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>[];
                };
                delete: {
                    args: Prisma.SessionMemberDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>;
                };
                update: {
                    args: Prisma.SessionMemberUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>;
                };
                deleteMany: {
                    args: Prisma.SessionMemberDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SessionMemberUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SessionMemberUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>[];
                };
                upsert: {
                    args: Prisma.SessionMemberUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SessionMemberPayload>;
                };
                aggregate: {
                    args: Prisma.SessionMemberAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSessionMember>;
                };
                groupBy: {
                    args: Prisma.SessionMemberGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionMemberGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SessionMemberCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SessionMemberCountAggregateOutputType> | number;
                };
            };
        };
        MealPreference: {
            payload: Prisma.$MealPreferencePayload<ExtArgs>;
            fields: Prisma.MealPreferenceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MealPreferenceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MealPreferenceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>;
                };
                findFirst: {
                    args: Prisma.MealPreferenceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MealPreferenceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>;
                };
                findMany: {
                    args: Prisma.MealPreferenceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>[];
                };
                create: {
                    args: Prisma.MealPreferenceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>;
                };
                createMany: {
                    args: Prisma.MealPreferenceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MealPreferenceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>[];
                };
                delete: {
                    args: Prisma.MealPreferenceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>;
                };
                update: {
                    args: Prisma.MealPreferenceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>;
                };
                deleteMany: {
                    args: Prisma.MealPreferenceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MealPreferenceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MealPreferenceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>[];
                };
                upsert: {
                    args: Prisma.MealPreferenceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MealPreferencePayload>;
                };
                aggregate: {
                    args: Prisma.MealPreferenceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMealPreference>;
                };
                groupBy: {
                    args: Prisma.MealPreferenceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MealPreferenceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MealPreferenceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MealPreferenceCountAggregateOutputType> | number;
                };
            };
        };
        RecommendationRound: {
            payload: Prisma.$RecommendationRoundPayload<ExtArgs>;
            fields: Prisma.RecommendationRoundFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecommendationRoundFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecommendationRoundFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>;
                };
                findFirst: {
                    args: Prisma.RecommendationRoundFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecommendationRoundFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>;
                };
                findMany: {
                    args: Prisma.RecommendationRoundFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>[];
                };
                create: {
                    args: Prisma.RecommendationRoundCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>;
                };
                createMany: {
                    args: Prisma.RecommendationRoundCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecommendationRoundCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>[];
                };
                delete: {
                    args: Prisma.RecommendationRoundDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>;
                };
                update: {
                    args: Prisma.RecommendationRoundUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>;
                };
                deleteMany: {
                    args: Prisma.RecommendationRoundDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecommendationRoundUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecommendationRoundUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>[];
                };
                upsert: {
                    args: Prisma.RecommendationRoundUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationRoundPayload>;
                };
                aggregate: {
                    args: Prisma.RecommendationRoundAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecommendationRound>;
                };
                groupBy: {
                    args: Prisma.RecommendationRoundGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecommendationRoundGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecommendationRoundCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecommendationRoundCountAggregateOutputType> | number;
                };
            };
        };
        RecommendationItem: {
            payload: Prisma.$RecommendationItemPayload<ExtArgs>;
            fields: Prisma.RecommendationItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RecommendationItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RecommendationItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>;
                };
                findFirst: {
                    args: Prisma.RecommendationItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RecommendationItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>;
                };
                findMany: {
                    args: Prisma.RecommendationItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>[];
                };
                create: {
                    args: Prisma.RecommendationItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>;
                };
                createMany: {
                    args: Prisma.RecommendationItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RecommendationItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>[];
                };
                delete: {
                    args: Prisma.RecommendationItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>;
                };
                update: {
                    args: Prisma.RecommendationItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>;
                };
                deleteMany: {
                    args: Prisma.RecommendationItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RecommendationItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RecommendationItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>[];
                };
                upsert: {
                    args: Prisma.RecommendationItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RecommendationItemPayload>;
                };
                aggregate: {
                    args: Prisma.RecommendationItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRecommendationItem>;
                };
                groupBy: {
                    args: Prisma.RecommendationItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecommendationItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RecommendationItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RecommendationItemCountAggregateOutputType> | number;
                };
            };
        };
        Vote: {
            payload: Prisma.$VotePayload<ExtArgs>;
            fields: Prisma.VoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>;
                };
                findFirst: {
                    args: Prisma.VoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>;
                };
                findMany: {
                    args: Prisma.VoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>[];
                };
                create: {
                    args: Prisma.VoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>;
                };
                createMany: {
                    args: Prisma.VoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>[];
                };
                delete: {
                    args: Prisma.VoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>;
                };
                update: {
                    args: Prisma.VoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>;
                };
                deleteMany: {
                    args: Prisma.VoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.VoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>[];
                };
                upsert: {
                    args: Prisma.VoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VotePayload>;
                };
                aggregate: {
                    args: Prisma.VoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVote>;
                };
                groupBy: {
                    args: Prisma.VoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VoteCountAggregateOutputType> | number;
                };
            };
        };
        FinalVote: {
            payload: Prisma.$FinalVotePayload<ExtArgs>;
            fields: Prisma.FinalVoteFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FinalVoteFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FinalVoteFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>;
                };
                findFirst: {
                    args: Prisma.FinalVoteFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FinalVoteFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>;
                };
                findMany: {
                    args: Prisma.FinalVoteFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>[];
                };
                create: {
                    args: Prisma.FinalVoteCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>;
                };
                createMany: {
                    args: Prisma.FinalVoteCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FinalVoteCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>[];
                };
                delete: {
                    args: Prisma.FinalVoteDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>;
                };
                update: {
                    args: Prisma.FinalVoteUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>;
                };
                deleteMany: {
                    args: Prisma.FinalVoteDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FinalVoteUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FinalVoteUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>[];
                };
                upsert: {
                    args: Prisma.FinalVoteUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalVotePayload>;
                };
                aggregate: {
                    args: Prisma.FinalVoteAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFinalVote>;
                };
                groupBy: {
                    args: Prisma.FinalVoteGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FinalVoteGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FinalVoteCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FinalVoteCountAggregateOutputType> | number;
                };
            };
        };
        FinalSelection: {
            payload: Prisma.$FinalSelectionPayload<ExtArgs>;
            fields: Prisma.FinalSelectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FinalSelectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FinalSelectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>;
                };
                findFirst: {
                    args: Prisma.FinalSelectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FinalSelectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>;
                };
                findMany: {
                    args: Prisma.FinalSelectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>[];
                };
                create: {
                    args: Prisma.FinalSelectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>;
                };
                createMany: {
                    args: Prisma.FinalSelectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FinalSelectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>[];
                };
                delete: {
                    args: Prisma.FinalSelectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>;
                };
                update: {
                    args: Prisma.FinalSelectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>;
                };
                deleteMany: {
                    args: Prisma.FinalSelectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FinalSelectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FinalSelectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>[];
                };
                upsert: {
                    args: Prisma.FinalSelectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FinalSelectionPayload>;
                };
                aggregate: {
                    args: Prisma.FinalSelectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFinalSelection>;
                };
                groupBy: {
                    args: Prisma.FinalSelectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FinalSelectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FinalSelectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FinalSelectionCountAggregateOutputType> | number;
                };
            };
        };
        RestaurantRecommendation: {
            payload: Prisma.$RestaurantRecommendationPayload<ExtArgs>;
            fields: Prisma.RestaurantRecommendationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RestaurantRecommendationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RestaurantRecommendationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>;
                };
                findFirst: {
                    args: Prisma.RestaurantRecommendationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RestaurantRecommendationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>;
                };
                findMany: {
                    args: Prisma.RestaurantRecommendationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>[];
                };
                create: {
                    args: Prisma.RestaurantRecommendationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>;
                };
                createMany: {
                    args: Prisma.RestaurantRecommendationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RestaurantRecommendationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>[];
                };
                delete: {
                    args: Prisma.RestaurantRecommendationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>;
                };
                update: {
                    args: Prisma.RestaurantRecommendationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>;
                };
                deleteMany: {
                    args: Prisma.RestaurantRecommendationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RestaurantRecommendationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RestaurantRecommendationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>[];
                };
                upsert: {
                    args: Prisma.RestaurantRecommendationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantRecommendationPayload>;
                };
                aggregate: {
                    args: Prisma.RestaurantRecommendationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRestaurantRecommendation>;
                };
                groupBy: {
                    args: Prisma.RestaurantRecommendationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RestaurantRecommendationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RestaurantRecommendationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RestaurantRecommendationCountAggregateOutputType> | number;
                };
            };
        };
        RestaurantSelection: {
            payload: Prisma.$RestaurantSelectionPayload<ExtArgs>;
            fields: Prisma.RestaurantSelectionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RestaurantSelectionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RestaurantSelectionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>;
                };
                findFirst: {
                    args: Prisma.RestaurantSelectionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RestaurantSelectionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>;
                };
                findMany: {
                    args: Prisma.RestaurantSelectionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>[];
                };
                create: {
                    args: Prisma.RestaurantSelectionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>;
                };
                createMany: {
                    args: Prisma.RestaurantSelectionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RestaurantSelectionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>[];
                };
                delete: {
                    args: Prisma.RestaurantSelectionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>;
                };
                update: {
                    args: Prisma.RestaurantSelectionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>;
                };
                deleteMany: {
                    args: Prisma.RestaurantSelectionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RestaurantSelectionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RestaurantSelectionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>[];
                };
                upsert: {
                    args: Prisma.RestaurantSelectionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantSelectionPayload>;
                };
                aggregate: {
                    args: Prisma.RestaurantSelectionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRestaurantSelection>;
                };
                groupBy: {
                    args: Prisma.RestaurantSelectionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RestaurantSelectionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RestaurantSelectionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RestaurantSelectionCountAggregateOutputType> | number;
                };
            };
        };
        Bill: {
            payload: Prisma.$BillPayload<ExtArgs>;
            fields: Prisma.BillFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.BillFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.BillFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>;
                };
                findFirst: {
                    args: Prisma.BillFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.BillFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>;
                };
                findMany: {
                    args: Prisma.BillFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>[];
                };
                create: {
                    args: Prisma.BillCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>;
                };
                createMany: {
                    args: Prisma.BillCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.BillCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>[];
                };
                delete: {
                    args: Prisma.BillDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>;
                };
                update: {
                    args: Prisma.BillUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>;
                };
                deleteMany: {
                    args: Prisma.BillDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.BillUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.BillUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>[];
                };
                upsert: {
                    args: Prisma.BillUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$BillPayload>;
                };
                aggregate: {
                    args: Prisma.BillAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateBill>;
                };
                groupBy: {
                    args: Prisma.BillGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BillGroupByOutputType>[];
                };
                count: {
                    args: Prisma.BillCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.BillCountAggregateOutputType> | number;
                };
            };
        };
        Receipt: {
            payload: Prisma.$ReceiptPayload<ExtArgs>;
            fields: Prisma.ReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.ReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                findMany: {
                    args: Prisma.ReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>[];
                };
                create: {
                    args: Prisma.ReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                createMany: {
                    args: Prisma.ReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>[];
                };
                delete: {
                    args: Prisma.ReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                update: {
                    args: Prisma.ReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.ReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.ReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.ReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReceipt>;
                };
                groupBy: {
                    args: Prisma.ReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReceiptCountAggregateOutputType> | number;
                };
            };
        };
        ReceiptItem: {
            payload: Prisma.$ReceiptItemPayload<ExtArgs>;
            fields: Prisma.ReceiptItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReceiptItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReceiptItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>;
                };
                findFirst: {
                    args: Prisma.ReceiptItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReceiptItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>;
                };
                findMany: {
                    args: Prisma.ReceiptItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>[];
                };
                create: {
                    args: Prisma.ReceiptItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>;
                };
                createMany: {
                    args: Prisma.ReceiptItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReceiptItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>[];
                };
                delete: {
                    args: Prisma.ReceiptItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>;
                };
                update: {
                    args: Prisma.ReceiptItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>;
                };
                deleteMany: {
                    args: Prisma.ReceiptItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReceiptItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReceiptItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>[];
                };
                upsert: {
                    args: Prisma.ReceiptItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptItemPayload>;
                };
                aggregate: {
                    args: Prisma.ReceiptItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReceiptItem>;
                };
                groupBy: {
                    args: Prisma.ReceiptItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReceiptItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReceiptItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReceiptItemCountAggregateOutputType> | number;
                };
            };
        };
        ItemShare: {
            payload: Prisma.$ItemSharePayload<ExtArgs>;
            fields: Prisma.ItemShareFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ItemShareFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ItemShareFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>;
                };
                findFirst: {
                    args: Prisma.ItemShareFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ItemShareFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>;
                };
                findMany: {
                    args: Prisma.ItemShareFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>[];
                };
                create: {
                    args: Prisma.ItemShareCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>;
                };
                createMany: {
                    args: Prisma.ItemShareCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ItemShareCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>[];
                };
                delete: {
                    args: Prisma.ItemShareDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>;
                };
                update: {
                    args: Prisma.ItemShareUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>;
                };
                deleteMany: {
                    args: Prisma.ItemShareDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ItemShareUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ItemShareUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>[];
                };
                upsert: {
                    args: Prisma.ItemShareUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ItemSharePayload>;
                };
                aggregate: {
                    args: Prisma.ItemShareAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateItemShare>;
                };
                groupBy: {
                    args: Prisma.ItemShareGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemShareGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ItemShareCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ItemShareCountAggregateOutputType> | number;
                };
            };
        };
        UserPayment: {
            payload: Prisma.$UserPaymentPayload<ExtArgs>;
            fields: Prisma.UserPaymentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserPaymentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserPaymentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>;
                };
                findFirst: {
                    args: Prisma.UserPaymentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserPaymentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>;
                };
                findMany: {
                    args: Prisma.UserPaymentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>[];
                };
                create: {
                    args: Prisma.UserPaymentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>;
                };
                createMany: {
                    args: Prisma.UserPaymentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserPaymentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>[];
                };
                delete: {
                    args: Prisma.UserPaymentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>;
                };
                update: {
                    args: Prisma.UserPaymentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>;
                };
                deleteMany: {
                    args: Prisma.UserPaymentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserPaymentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserPaymentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>[];
                };
                upsert: {
                    args: Prisma.UserPaymentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPaymentPayload>;
                };
                aggregate: {
                    args: Prisma.UserPaymentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserPayment>;
                };
                groupBy: {
                    args: Prisma.UserPaymentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserPaymentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserPaymentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserPaymentCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly displayName: "displayName";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly avatarUrl: "avatarUrl";
    readonly emailVerified: "emailVerified";
    readonly role: "role";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const AccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly provider: "provider";
    readonly providerAccountId: "providerAccountId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly revokedAt: "revokedAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const EmailVerificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly otpHash: "otpHash";
    readonly expiresAt: "expiresAt";
    readonly resendAvailableAt: "resendAvailableAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EmailVerificationScalarFieldEnum = (typeof EmailVerificationScalarFieldEnum)[keyof typeof EmailVerificationScalarFieldEnum];
export declare const PasswordResetScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly resendAvailableAt: "resendAvailableAt";
    readonly used: "used";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PasswordResetScalarFieldEnum = (typeof PasswordResetScalarFieldEnum)[keyof typeof PasswordResetScalarFieldEnum];
export declare const FoodProfileScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly allergies: "allergies";
    readonly otherAllergies: "otherAllergies";
    readonly restrictions: "restrictions";
    readonly otherRestrictions: "otherRestrictions";
    readonly additionalNotes: "additionalNotes";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FoodProfileScalarFieldEnum = (typeof FoodProfileScalarFieldEnum)[keyof typeof FoodProfileScalarFieldEnum];
export declare const PaymentAccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly paymentType: "paymentType";
    readonly accountName: "accountName";
    readonly promptPayNumber: "promptPayNumber";
    readonly qrCodeUrl: "qrCodeUrl";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PaymentAccountScalarFieldEnum = (typeof PaymentAccountScalarFieldEnum)[keyof typeof PaymentAccountScalarFieldEnum];
export declare const RoomScalarFieldEnum: {
    readonly id: "id";
    readonly hostId: "hostId";
    readonly name: "name";
    readonly roomCode: "roomCode";
    readonly inviteToken: "inviteToken";
    readonly maxMembers: "maxMembers";
    readonly locationName: "locationName";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly searchRadiusKm: "searchRadiusKm";
    readonly scheduledAt: "scheduledAt";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum];
export declare const RoomMemberScalarFieldEnum: {
    readonly id: "id";
    readonly roomId: "roomId";
    readonly userId: "userId";
    readonly isReady: "isReady";
    readonly joinedAt: "joinedAt";
    readonly leftAt: "leftAt";
};
export type RoomMemberScalarFieldEnum = (typeof RoomMemberScalarFieldEnum)[keyof typeof RoomMemberScalarFieldEnum];
export declare const FoodFightSessionScalarFieldEnum: {
    readonly id: "id";
    readonly roomId: "roomId";
    readonly status: "status";
    readonly startedAt: "startedAt";
    readonly finalizedAt: "finalizedAt";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FoodFightSessionScalarFieldEnum = (typeof FoodFightSessionScalarFieldEnum)[keyof typeof FoodFightSessionScalarFieldEnum];
export declare const SessionMemberScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly userId: "userId";
    readonly role: "role";
    readonly joinedAt: "joinedAt";
};
export type SessionMemberScalarFieldEnum = (typeof SessionMemberScalarFieldEnum)[keyof typeof SessionMemberScalarFieldEnum];
export declare const MealPreferenceScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly userId: "userId";
    readonly cookingTypes: "cookingTypes";
    readonly otherCookingType: "otherCookingType";
    readonly cuisines: "cuisines";
    readonly otherCuisine: "otherCuisine";
    readonly ingredients: "ingredients";
    readonly otherIngredient: "otherIngredient";
    readonly budgetRange: "budgetRange";
    readonly restaurantStyles: "restaurantStyles";
    readonly otherRestaurantStyle: "otherRestaurantStyle";
    readonly otherNote: "otherNote";
    readonly submittedAt: "submittedAt";
    readonly updatedAt: "updatedAt";
};
export type MealPreferenceScalarFieldEnum = (typeof MealPreferenceScalarFieldEnum)[keyof typeof MealPreferenceScalarFieldEnum];
export declare const RecommendationRoundScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly roundNumber: "roundNumber";
    readonly status: "status";
    readonly generatedAt: "generatedAt";
    readonly completedAt: "completedAt";
};
export type RecommendationRoundScalarFieldEnum = (typeof RecommendationRoundScalarFieldEnum)[keyof typeof RecommendationRoundScalarFieldEnum];
export declare const RecommendationItemScalarFieldEnum: {
    readonly id: "id";
    readonly recommendationRoundId: "recommendationRoundId";
    readonly menuName: "menuName";
    readonly description: "description";
    readonly reason: "reason";
    readonly imageUrl: "imageUrl";
    readonly recommendationScore: "recommendationScore";
    readonly metadata: "metadata";
    readonly displayOrder: "displayOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RecommendationItemScalarFieldEnum = (typeof RecommendationItemScalarFieldEnum)[keyof typeof RecommendationItemScalarFieldEnum];
export declare const VoteScalarFieldEnum: {
    readonly id: "id";
    readonly recommendationItemId: "recommendationItemId";
    readonly userId: "userId";
    readonly action: "action";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum];
export declare const FinalVoteScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly userId: "userId";
    readonly recommendationItemId: "recommendationItemId";
    readonly voteType: "voteType";
    readonly createdAt: "createdAt";
};
export type FinalVoteScalarFieldEnum = (typeof FinalVoteScalarFieldEnum)[keyof typeof FinalVoteScalarFieldEnum];
export declare const FinalSelectionScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly recommendationItemId: "recommendationItemId";
    readonly selectedById: "selectedById";
    readonly method: "method";
    readonly selectedAt: "selectedAt";
};
export type FinalSelectionScalarFieldEnum = (typeof FinalSelectionScalarFieldEnum)[keyof typeof FinalSelectionScalarFieldEnum];
export declare const RestaurantRecommendationScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly externalPlaceId: "externalPlaceId";
    readonly name: "name";
    readonly address: "address";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly distanceMeters: "distanceMeters";
    readonly phone: "phone";
    readonly openingHours: "openingHours";
    readonly imageUrl: "imageUrl";
    readonly finalMenuMatch: "finalMenuMatch";
    readonly varietyScore: "varietyScore";
    readonly groupCompatibilityScore: "groupCompatibilityScore";
    readonly rankingScore: "rankingScore";
    readonly reason: "reason";
    readonly status: "status";
    readonly displayOrder: "displayOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RestaurantRecommendationScalarFieldEnum = (typeof RestaurantRecommendationScalarFieldEnum)[keyof typeof RestaurantRecommendationScalarFieldEnum];
export declare const RestaurantSelectionScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly selectedById: "selectedById";
    readonly externalPlaceId: "externalPlaceId";
    readonly name: "name";
    readonly address: "address";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly distanceMeters: "distanceMeters";
    readonly phone: "phone";
    readonly openingHours: "openingHours";
    readonly imageUrl: "imageUrl";
    readonly selectedAt: "selectedAt";
};
export type RestaurantSelectionScalarFieldEnum = (typeof RestaurantSelectionScalarFieldEnum)[keyof typeof RestaurantSelectionScalarFieldEnum];
export declare const BillScalarFieldEnum: {
    readonly id: "id";
    readonly sessionId: "sessionId";
    readonly createdById: "createdById";
    readonly status: "status";
    readonly subtotal: "subtotal";
    readonly serviceCharge: "serviceCharge";
    readonly tax: "tax";
    readonly discount: "discount";
    readonly totalAmount: "totalAmount";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BillScalarFieldEnum = (typeof BillScalarFieldEnum)[keyof typeof BillScalarFieldEnum];
export declare const ReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly billId: "billId";
    readonly imageUrl: "imageUrl";
    readonly ocrStatus: "ocrStatus";
    readonly rawOcrText: "rawOcrText";
    readonly parsedData: "parsedData";
    readonly uploadedAt: "uploadedAt";
    readonly updatedAt: "updatedAt";
};
export type ReceiptScalarFieldEnum = (typeof ReceiptScalarFieldEnum)[keyof typeof ReceiptScalarFieldEnum];
export declare const ReceiptItemScalarFieldEnum: {
    readonly id: "id";
    readonly billId: "billId";
    readonly name: "name";
    readonly imageUrl: "imageUrl";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly totalPrice: "totalPrice";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReceiptItemScalarFieldEnum = (typeof ReceiptItemScalarFieldEnum)[keyof typeof ReceiptItemScalarFieldEnum];
export declare const ItemShareScalarFieldEnum: {
    readonly id: "id";
    readonly receiptItemId: "receiptItemId";
    readonly userId: "userId";
    readonly amount: "amount";
    readonly createdAt: "createdAt";
};
export type ItemShareScalarFieldEnum = (typeof ItemShareScalarFieldEnum)[keyof typeof ItemShareScalarFieldEnum];
export declare const UserPaymentScalarFieldEnum: {
    readonly id: "id";
    readonly billId: "billId";
    readonly userId: "userId";
    readonly amount: "amount";
    readonly status: "status";
    readonly slipImageUrl: "slipImageUrl";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserPaymentScalarFieldEnum = (typeof UserPaymentScalarFieldEnum)[keyof typeof UserPaymentScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type EnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider'>;
export type ListEnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type EnumRoomStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomStatus'>;
export type ListEnumRoomStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RoomStatus[]'>;
export type EnumFoodFightStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FoodFightStatus'>;
export type ListEnumFoodFightStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FoodFightStatus[]'>;
export type EnumSessionMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionMemberRole'>;
export type ListEnumSessionMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionMemberRole[]'>;
export type EnumMealBudgetRangeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MealBudgetRange'>;
export type ListEnumMealBudgetRangeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MealBudgetRange[]'>;
export type EnumRecommendationRoundStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecommendationRoundStatus'>;
export type ListEnumRecommendationRoundStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RecommendationRoundStatus[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumVoteActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoteAction'>;
export type ListEnumVoteActionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoteAction[]'>;
export type EnumFinalVoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FinalVoteType'>;
export type ListEnumFinalVoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FinalVoteType[]'>;
export type EnumFinalSelectionMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FinalSelectionMethod'>;
export type ListEnumFinalSelectionMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FinalSelectionMethod[]'>;
export type EnumRestaurantRecommendationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RestaurantRecommendationStatus'>;
export type ListEnumRestaurantRecommendationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RestaurantRecommendationStatus[]'>;
export type EnumBillStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillStatus'>;
export type ListEnumBillStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BillStatus[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumOcrStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OcrStatus'>;
export type ListEnumOcrStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OcrStatus[]'>;
export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>;
export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    account?: Prisma.AccountOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    emailVerification?: Prisma.EmailVerificationOmit;
    passwordReset?: Prisma.PasswordResetOmit;
    foodProfile?: Prisma.FoodProfileOmit;
    paymentAccount?: Prisma.PaymentAccountOmit;
    room?: Prisma.RoomOmit;
    roomMember?: Prisma.RoomMemberOmit;
    foodFightSession?: Prisma.FoodFightSessionOmit;
    sessionMember?: Prisma.SessionMemberOmit;
    mealPreference?: Prisma.MealPreferenceOmit;
    recommendationRound?: Prisma.RecommendationRoundOmit;
    recommendationItem?: Prisma.RecommendationItemOmit;
    vote?: Prisma.VoteOmit;
    finalVote?: Prisma.FinalVoteOmit;
    finalSelection?: Prisma.FinalSelectionOmit;
    restaurantRecommendation?: Prisma.RestaurantRecommendationOmit;
    restaurantSelection?: Prisma.RestaurantSelectionOmit;
    bill?: Prisma.BillOmit;
    receipt?: Prisma.ReceiptOmit;
    receiptItem?: Prisma.ReceiptItemOmit;
    itemShare?: Prisma.ItemShareOmit;
    userPayment?: Prisma.UserPaymentOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
