import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace.js";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.PrismaClientConstructorArgs<Options>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = Prisma.PrismaClientOptions['omit'], in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    $connect(): runtime.Types.Utils.JsPromise<void>;
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get account(): Prisma.AccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get emailVerification(): Prisma.EmailVerificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get passwordReset(): Prisma.PasswordResetDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get foodProfile(): Prisma.FoodProfileDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get paymentAccount(): Prisma.PaymentAccountDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get room(): Prisma.RoomDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get roomMember(): Prisma.RoomMemberDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get foodFightSession(): Prisma.FoodFightSessionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get sessionMember(): Prisma.SessionMemberDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get mealPreference(): Prisma.MealPreferenceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get recommendationRound(): Prisma.RecommendationRoundDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get recommendationItem(): Prisma.RecommendationItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get vote(): Prisma.VoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get finalVote(): Prisma.FinalVoteDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get finalSelection(): Prisma.FinalSelectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get restaurantRecommendation(): Prisma.RestaurantRecommendationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get restaurantSelection(): Prisma.RestaurantSelectionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get bill(): Prisma.BillDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get receipt(): Prisma.ReceiptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get receiptItem(): Prisma.ReceiptItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get itemShare(): Prisma.ItemShareDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    get userPayment(): Prisma.UserPaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
