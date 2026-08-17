import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PasswordResetModel = runtime.Types.Result.DefaultSelection<Prisma.$PasswordResetPayload>;
export type AggregatePasswordReset = {
    _count: PasswordResetCountAggregateOutputType | null;
    _min: PasswordResetMinAggregateOutputType | null;
    _max: PasswordResetMaxAggregateOutputType | null;
};
export type PasswordResetMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    resendAvailableAt: Date | null;
    used: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PasswordResetMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    expiresAt: Date | null;
    resendAvailableAt: Date | null;
    used: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PasswordResetCountAggregateOutputType = {
    id: number;
    userId: number;
    tokenHash: number;
    expiresAt: number;
    resendAvailableAt: number;
    used: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PasswordResetMinAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    resendAvailableAt?: true;
    used?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PasswordResetMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    resendAvailableAt?: true;
    used?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PasswordResetCountAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    expiresAt?: true;
    resendAvailableAt?: true;
    used?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PasswordResetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetWhereInput;
    orderBy?: Prisma.PasswordResetOrderByWithRelationInput | Prisma.PasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PasswordResetCountAggregateInputType;
    _min?: PasswordResetMinAggregateInputType;
    _max?: PasswordResetMaxAggregateInputType;
};
export type GetPasswordResetAggregateType<T extends PasswordResetAggregateArgs> = {
    [P in keyof T & keyof AggregatePasswordReset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePasswordReset[P]> : Prisma.GetScalarType<T[P], AggregatePasswordReset[P]>;
};
export type PasswordResetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetWhereInput;
    orderBy?: Prisma.PasswordResetOrderByWithAggregationInput | Prisma.PasswordResetOrderByWithAggregationInput[];
    by: Prisma.PasswordResetScalarFieldEnum[] | Prisma.PasswordResetScalarFieldEnum;
    having?: Prisma.PasswordResetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PasswordResetCountAggregateInputType | true;
    _min?: PasswordResetMinAggregateInputType;
    _max?: PasswordResetMaxAggregateInputType;
};
export type PasswordResetGroupByOutputType = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
    resendAvailableAt: Date;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PasswordResetCountAggregateOutputType | null;
    _min: PasswordResetMinAggregateOutputType | null;
    _max: PasswordResetMaxAggregateOutputType | null;
};
export type GetPasswordResetGroupByPayload<T extends PasswordResetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PasswordResetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PasswordResetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PasswordResetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PasswordResetGroupByOutputType[P]>;
}>>;
export type PasswordResetWhereInput = {
    AND?: Prisma.PasswordResetWhereInput | Prisma.PasswordResetWhereInput[];
    OR?: Prisma.PasswordResetWhereInput[];
    NOT?: Prisma.PasswordResetWhereInput | Prisma.PasswordResetWhereInput[];
    id?: Prisma.StringFilter<"PasswordReset"> | string;
    userId?: Prisma.StringFilter<"PasswordReset"> | string;
    tokenHash?: Prisma.StringFilter<"PasswordReset"> | string;
    expiresAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    used?: Prisma.BoolFilter<"PasswordReset"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PasswordResetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    used?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PasswordResetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    AND?: Prisma.PasswordResetWhereInput | Prisma.PasswordResetWhereInput[];
    OR?: Prisma.PasswordResetWhereInput[];
    NOT?: Prisma.PasswordResetWhereInput | Prisma.PasswordResetWhereInput[];
    userId?: Prisma.StringFilter<"PasswordReset"> | string;
    expiresAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    used?: Prisma.BoolFilter<"PasswordReset"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "tokenHash">;
export type PasswordResetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    used?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PasswordResetCountOrderByAggregateInput;
    _max?: Prisma.PasswordResetMaxOrderByAggregateInput;
    _min?: Prisma.PasswordResetMinOrderByAggregateInput;
};
export type PasswordResetScalarWhereWithAggregatesInput = {
    AND?: Prisma.PasswordResetScalarWhereWithAggregatesInput | Prisma.PasswordResetScalarWhereWithAggregatesInput[];
    OR?: Prisma.PasswordResetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PasswordResetScalarWhereWithAggregatesInput | Prisma.PasswordResetScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PasswordReset"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PasswordReset"> | string;
    tokenHash?: Prisma.StringWithAggregatesFilter<"PasswordReset"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string;
    used?: Prisma.BoolWithAggregatesFilter<"PasswordReset"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PasswordReset"> | Date | string;
};
export type PasswordResetCreateInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    used?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPasswordResetsInput;
};
export type PasswordResetUncheckedCreateInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    used?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PasswordResetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPasswordResetsNestedInput;
};
export type PasswordResetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PasswordResetCreateManyInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    used?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PasswordResetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PasswordResetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PasswordResetListRelationFilter = {
    every?: Prisma.PasswordResetWhereInput;
    some?: Prisma.PasswordResetWhereInput;
    none?: Prisma.PasswordResetWhereInput;
};
export type PasswordResetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PasswordResetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    used?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PasswordResetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    used?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PasswordResetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    used?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PasswordResetCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PasswordResetCreateWithoutUserInput, Prisma.PasswordResetUncheckedCreateWithoutUserInput> | Prisma.PasswordResetCreateWithoutUserInput[] | Prisma.PasswordResetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PasswordResetCreateOrConnectWithoutUserInput | Prisma.PasswordResetCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PasswordResetCreateManyUserInputEnvelope;
    connect?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
};
export type PasswordResetUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PasswordResetCreateWithoutUserInput, Prisma.PasswordResetUncheckedCreateWithoutUserInput> | Prisma.PasswordResetCreateWithoutUserInput[] | Prisma.PasswordResetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PasswordResetCreateOrConnectWithoutUserInput | Prisma.PasswordResetCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PasswordResetCreateManyUserInputEnvelope;
    connect?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
};
export type PasswordResetUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PasswordResetCreateWithoutUserInput, Prisma.PasswordResetUncheckedCreateWithoutUserInput> | Prisma.PasswordResetCreateWithoutUserInput[] | Prisma.PasswordResetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PasswordResetCreateOrConnectWithoutUserInput | Prisma.PasswordResetCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PasswordResetUpsertWithWhereUniqueWithoutUserInput | Prisma.PasswordResetUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PasswordResetCreateManyUserInputEnvelope;
    set?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    disconnect?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    delete?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    connect?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    update?: Prisma.PasswordResetUpdateWithWhereUniqueWithoutUserInput | Prisma.PasswordResetUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PasswordResetUpdateManyWithWhereWithoutUserInput | Prisma.PasswordResetUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PasswordResetScalarWhereInput | Prisma.PasswordResetScalarWhereInput[];
};
export type PasswordResetUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PasswordResetCreateWithoutUserInput, Prisma.PasswordResetUncheckedCreateWithoutUserInput> | Prisma.PasswordResetCreateWithoutUserInput[] | Prisma.PasswordResetUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PasswordResetCreateOrConnectWithoutUserInput | Prisma.PasswordResetCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PasswordResetUpsertWithWhereUniqueWithoutUserInput | Prisma.PasswordResetUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PasswordResetCreateManyUserInputEnvelope;
    set?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    disconnect?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    delete?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    connect?: Prisma.PasswordResetWhereUniqueInput | Prisma.PasswordResetWhereUniqueInput[];
    update?: Prisma.PasswordResetUpdateWithWhereUniqueWithoutUserInput | Prisma.PasswordResetUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PasswordResetUpdateManyWithWhereWithoutUserInput | Prisma.PasswordResetUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PasswordResetScalarWhereInput | Prisma.PasswordResetScalarWhereInput[];
};
export type PasswordResetCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    used?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PasswordResetUncheckedCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    used?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PasswordResetCreateOrConnectWithoutUserInput = {
    where: Prisma.PasswordResetWhereUniqueInput;
    create: Prisma.XOR<Prisma.PasswordResetCreateWithoutUserInput, Prisma.PasswordResetUncheckedCreateWithoutUserInput>;
};
export type PasswordResetCreateManyUserInputEnvelope = {
    data: Prisma.PasswordResetCreateManyUserInput | Prisma.PasswordResetCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PasswordResetUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PasswordResetWhereUniqueInput;
    update: Prisma.XOR<Prisma.PasswordResetUpdateWithoutUserInput, Prisma.PasswordResetUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PasswordResetCreateWithoutUserInput, Prisma.PasswordResetUncheckedCreateWithoutUserInput>;
};
export type PasswordResetUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PasswordResetWhereUniqueInput;
    data: Prisma.XOR<Prisma.PasswordResetUpdateWithoutUserInput, Prisma.PasswordResetUncheckedUpdateWithoutUserInput>;
};
export type PasswordResetUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PasswordResetScalarWhereInput;
    data: Prisma.XOR<Prisma.PasswordResetUpdateManyMutationInput, Prisma.PasswordResetUncheckedUpdateManyWithoutUserInput>;
};
export type PasswordResetScalarWhereInput = {
    AND?: Prisma.PasswordResetScalarWhereInput | Prisma.PasswordResetScalarWhereInput[];
    OR?: Prisma.PasswordResetScalarWhereInput[];
    NOT?: Prisma.PasswordResetScalarWhereInput | Prisma.PasswordResetScalarWhereInput[];
    id?: Prisma.StringFilter<"PasswordReset"> | string;
    userId?: Prisma.StringFilter<"PasswordReset"> | string;
    tokenHash?: Prisma.StringFilter<"PasswordReset"> | string;
    expiresAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    used?: Prisma.BoolFilter<"PasswordReset"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PasswordReset"> | Date | string;
};
export type PasswordResetCreateManyUserInput = {
    id?: string;
    tokenHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    used?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PasswordResetUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PasswordResetUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PasswordResetUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    used?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PasswordResetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    used?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["passwordReset"]>;
export type PasswordResetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    used?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["passwordReset"]>;
export type PasswordResetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    used?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["passwordReset"]>;
export type PasswordResetSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    used?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PasswordResetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "tokenHash" | "expiresAt" | "resendAvailableAt" | "used" | "createdAt" | "updatedAt", ExtArgs["result"]["passwordReset"]>;
export type PasswordResetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PasswordResetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PasswordResetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PasswordResetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PasswordReset";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        tokenHash: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        used: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["passwordReset"]>;
    composites: {};
};
export type PasswordResetGetPayload<S extends boolean | null | undefined | PasswordResetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload, S>;
export type PasswordResetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PasswordResetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PasswordResetCountAggregateInputType | true;
};
export interface PasswordResetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PasswordReset'];
        meta: {
            name: 'PasswordReset';
        };
    };
    findUnique<T extends PasswordResetFindUniqueArgs>(args: Prisma.SelectSubset<T, PasswordResetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PasswordResetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PasswordResetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PasswordResetFindFirstArgs>(args?: Prisma.SelectSubset<T, PasswordResetFindFirstArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PasswordResetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PasswordResetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PasswordResetFindManyArgs>(args?: Prisma.SelectSubset<T, PasswordResetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PasswordResetCreateArgs>(args: Prisma.SelectSubset<T, PasswordResetCreateArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PasswordResetCreateManyArgs>(args?: Prisma.SelectSubset<T, PasswordResetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PasswordResetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PasswordResetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PasswordResetDeleteArgs>(args: Prisma.SelectSubset<T, PasswordResetDeleteArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PasswordResetUpdateArgs>(args: Prisma.SelectSubset<T, PasswordResetUpdateArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PasswordResetDeleteManyArgs>(args?: Prisma.SelectSubset<T, PasswordResetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PasswordResetUpdateManyArgs>(args: Prisma.SelectSubset<T, PasswordResetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PasswordResetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PasswordResetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PasswordResetUpsertArgs>(args: Prisma.SelectSubset<T, PasswordResetUpsertArgs<ExtArgs>>): Prisma.Prisma__PasswordResetClient<runtime.Types.Result.GetResult<Prisma.$PasswordResetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PasswordResetCountArgs>(args?: Prisma.Subset<T, PasswordResetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PasswordResetCountAggregateOutputType> : number>;
    aggregate<T extends PasswordResetAggregateArgs>(args: Prisma.Subset<T, PasswordResetAggregateArgs>): Prisma.PrismaPromise<GetPasswordResetAggregateType<T>>;
    groupBy<T extends PasswordResetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PasswordResetGroupByArgs['orderBy'];
    } : {
        orderBy?: PasswordResetGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PasswordResetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordResetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PasswordResetFieldRefs;
}
export interface Prisma__PasswordResetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PasswordResetFieldRefs {
    readonly id: Prisma.FieldRef<"PasswordReset", 'String'>;
    readonly userId: Prisma.FieldRef<"PasswordReset", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"PasswordReset", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"PasswordReset", 'DateTime'>;
    readonly resendAvailableAt: Prisma.FieldRef<"PasswordReset", 'DateTime'>;
    readonly used: Prisma.FieldRef<"PasswordReset", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PasswordReset", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PasswordReset", 'DateTime'>;
}
export type PasswordResetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where: Prisma.PasswordResetWhereUniqueInput;
};
export type PasswordResetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where: Prisma.PasswordResetWhereUniqueInput;
};
export type PasswordResetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetWhereInput;
    orderBy?: Prisma.PasswordResetOrderByWithRelationInput | Prisma.PasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetScalarFieldEnum | Prisma.PasswordResetScalarFieldEnum[];
};
export type PasswordResetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetWhereInput;
    orderBy?: Prisma.PasswordResetOrderByWithRelationInput | Prisma.PasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetScalarFieldEnum | Prisma.PasswordResetScalarFieldEnum[];
};
export type PasswordResetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where?: Prisma.PasswordResetWhereInput;
    orderBy?: Prisma.PasswordResetOrderByWithRelationInput | Prisma.PasswordResetOrderByWithRelationInput[];
    cursor?: Prisma.PasswordResetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PasswordResetScalarFieldEnum | Prisma.PasswordResetScalarFieldEnum[];
};
export type PasswordResetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PasswordResetCreateInput, Prisma.PasswordResetUncheckedCreateInput>;
};
export type PasswordResetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PasswordResetCreateManyInput | Prisma.PasswordResetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PasswordResetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    data: Prisma.PasswordResetCreateManyInput | Prisma.PasswordResetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PasswordResetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PasswordResetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PasswordResetUpdateInput, Prisma.PasswordResetUncheckedUpdateInput>;
    where: Prisma.PasswordResetWhereUniqueInput;
};
export type PasswordResetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PasswordResetUpdateManyMutationInput, Prisma.PasswordResetUncheckedUpdateManyInput>;
    where?: Prisma.PasswordResetWhereInput;
    limit?: number;
};
export type PasswordResetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PasswordResetUpdateManyMutationInput, Prisma.PasswordResetUncheckedUpdateManyInput>;
    where?: Prisma.PasswordResetWhereInput;
    limit?: number;
    include?: Prisma.PasswordResetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PasswordResetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where: Prisma.PasswordResetWhereUniqueInput;
    create: Prisma.XOR<Prisma.PasswordResetCreateInput, Prisma.PasswordResetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PasswordResetUpdateInput, Prisma.PasswordResetUncheckedUpdateInput>;
};
export type PasswordResetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
    where: Prisma.PasswordResetWhereUniqueInput;
};
export type PasswordResetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PasswordResetWhereInput;
    limit?: number;
};
export type PasswordResetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PasswordResetSelect<ExtArgs> | null;
    omit?: Prisma.PasswordResetOmit<ExtArgs> | null;
    include?: Prisma.PasswordResetInclude<ExtArgs> | null;
};
