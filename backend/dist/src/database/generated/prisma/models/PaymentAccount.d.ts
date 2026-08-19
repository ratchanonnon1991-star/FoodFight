import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaymentAccountModel = runtime.Types.Result.DefaultSelection<Prisma.$PaymentAccountPayload>;
export type AggregatePaymentAccount = {
    _count: PaymentAccountCountAggregateOutputType | null;
    _min: PaymentAccountMinAggregateOutputType | null;
    _max: PaymentAccountMaxAggregateOutputType | null;
};
export type PaymentAccountMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.PaymentAccountType | null;
    accountName: string | null;
    promptPayId: string | null;
    qrImageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PaymentAccountMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.PaymentAccountType | null;
    accountName: string | null;
    promptPayId: string | null;
    qrImageUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PaymentAccountCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    accountName: number;
    promptPayId: number;
    qrImageUrl: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PaymentAccountMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    accountName?: true;
    promptPayId?: true;
    qrImageUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PaymentAccountMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    accountName?: true;
    promptPayId?: true;
    qrImageUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PaymentAccountCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    accountName?: true;
    promptPayId?: true;
    qrImageUrl?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PaymentAccountAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentAccountWhereInput;
    orderBy?: Prisma.PaymentAccountOrderByWithRelationInput | Prisma.PaymentAccountOrderByWithRelationInput[];
    cursor?: Prisma.PaymentAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaymentAccountCountAggregateInputType;
    _min?: PaymentAccountMinAggregateInputType;
    _max?: PaymentAccountMaxAggregateInputType;
};
export type GetPaymentAccountAggregateType<T extends PaymentAccountAggregateArgs> = {
    [P in keyof T & keyof AggregatePaymentAccount]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePaymentAccount[P]> : Prisma.GetScalarType<T[P], AggregatePaymentAccount[P]>;
};
export type PaymentAccountGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentAccountWhereInput;
    orderBy?: Prisma.PaymentAccountOrderByWithAggregationInput | Prisma.PaymentAccountOrderByWithAggregationInput[];
    by: Prisma.PaymentAccountScalarFieldEnum[] | Prisma.PaymentAccountScalarFieldEnum;
    having?: Prisma.PaymentAccountScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaymentAccountCountAggregateInputType | true;
    _min?: PaymentAccountMinAggregateInputType;
    _max?: PaymentAccountMaxAggregateInputType;
};
export type PaymentAccountGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.PaymentAccountType;
    accountName: string;
    promptPayId: string;
    qrImageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PaymentAccountCountAggregateOutputType | null;
    _min: PaymentAccountMinAggregateOutputType | null;
    _max: PaymentAccountMaxAggregateOutputType | null;
};
export type GetPaymentAccountGroupByPayload<T extends PaymentAccountGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaymentAccountGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaymentAccountGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaymentAccountGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaymentAccountGroupByOutputType[P]>;
}>>;
export type PaymentAccountWhereInput = {
    AND?: Prisma.PaymentAccountWhereInput | Prisma.PaymentAccountWhereInput[];
    OR?: Prisma.PaymentAccountWhereInput[];
    NOT?: Prisma.PaymentAccountWhereInput | Prisma.PaymentAccountWhereInput[];
    id?: Prisma.StringFilter<"PaymentAccount"> | string;
    userId?: Prisma.StringFilter<"PaymentAccount"> | string;
    type?: Prisma.EnumPaymentAccountTypeFilter<"PaymentAccount"> | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFilter<"PaymentAccount"> | string;
    promptPayId?: Prisma.StringFilter<"PaymentAccount"> | string;
    qrImageUrl?: Prisma.StringNullableFilter<"PaymentAccount"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PaymentAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PaymentAccount"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PaymentAccountOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    promptPayId?: Prisma.SortOrder;
    qrImageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PaymentAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.PaymentAccountWhereInput | Prisma.PaymentAccountWhereInput[];
    OR?: Prisma.PaymentAccountWhereInput[];
    NOT?: Prisma.PaymentAccountWhereInput | Prisma.PaymentAccountWhereInput[];
    type?: Prisma.EnumPaymentAccountTypeFilter<"PaymentAccount"> | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFilter<"PaymentAccount"> | string;
    promptPayId?: Prisma.StringFilter<"PaymentAccount"> | string;
    qrImageUrl?: Prisma.StringNullableFilter<"PaymentAccount"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PaymentAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PaymentAccount"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type PaymentAccountOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    promptPayId?: Prisma.SortOrder;
    qrImageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PaymentAccountCountOrderByAggregateInput;
    _max?: Prisma.PaymentAccountMaxOrderByAggregateInput;
    _min?: Prisma.PaymentAccountMinOrderByAggregateInput;
};
export type PaymentAccountScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaymentAccountScalarWhereWithAggregatesInput | Prisma.PaymentAccountScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaymentAccountScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaymentAccountScalarWhereWithAggregatesInput | Prisma.PaymentAccountScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PaymentAccount"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PaymentAccount"> | string;
    type?: Prisma.EnumPaymentAccountTypeWithAggregatesFilter<"PaymentAccount"> | $Enums.PaymentAccountType;
    accountName?: Prisma.StringWithAggregatesFilter<"PaymentAccount"> | string;
    promptPayId?: Prisma.StringWithAggregatesFilter<"PaymentAccount"> | string;
    qrImageUrl?: Prisma.StringNullableWithAggregatesFilter<"PaymentAccount"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PaymentAccount"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PaymentAccount"> | Date | string;
};
export type PaymentAccountCreateInput = {
    id?: string;
    type?: $Enums.PaymentAccountType;
    accountName: string;
    promptPayId: string;
    qrImageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPaymentAccountInput;
};
export type PaymentAccountUncheckedCreateInput = {
    id?: string;
    userId: string;
    type?: $Enums.PaymentAccountType;
    accountName: string;
    promptPayId: string;
    qrImageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PaymentAccountUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPaymentAccountTypeFieldUpdateOperationsInput | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    promptPayId?: Prisma.StringFieldUpdateOperationsInput | string;
    qrImageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPaymentAccountNestedInput;
};
export type PaymentAccountUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPaymentAccountTypeFieldUpdateOperationsInput | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    promptPayId?: Prisma.StringFieldUpdateOperationsInput | string;
    qrImageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentAccountCreateManyInput = {
    id?: string;
    userId: string;
    type?: $Enums.PaymentAccountType;
    accountName: string;
    promptPayId: string;
    qrImageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PaymentAccountUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPaymentAccountTypeFieldUpdateOperationsInput | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    promptPayId?: Prisma.StringFieldUpdateOperationsInput | string;
    qrImageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentAccountUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPaymentAccountTypeFieldUpdateOperationsInput | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    promptPayId?: Prisma.StringFieldUpdateOperationsInput | string;
    qrImageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentAccountNullableScalarRelationFilter = {
    is?: Prisma.PaymentAccountWhereInput | null;
    isNot?: Prisma.PaymentAccountWhereInput | null;
};
export type PaymentAccountCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    promptPayId?: Prisma.SortOrder;
    qrImageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PaymentAccountMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    promptPayId?: Prisma.SortOrder;
    qrImageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PaymentAccountMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    accountName?: Prisma.SortOrder;
    promptPayId?: Prisma.SortOrder;
    qrImageUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PaymentAccountCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PaymentAccountCreateWithoutUserInput, Prisma.PaymentAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PaymentAccountCreateOrConnectWithoutUserInput;
    connect?: Prisma.PaymentAccountWhereUniqueInput;
};
export type PaymentAccountUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PaymentAccountCreateWithoutUserInput, Prisma.PaymentAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PaymentAccountCreateOrConnectWithoutUserInput;
    connect?: Prisma.PaymentAccountWhereUniqueInput;
};
export type PaymentAccountUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentAccountCreateWithoutUserInput, Prisma.PaymentAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PaymentAccountCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PaymentAccountUpsertWithoutUserInput;
    disconnect?: Prisma.PaymentAccountWhereInput | boolean;
    delete?: Prisma.PaymentAccountWhereInput | boolean;
    connect?: Prisma.PaymentAccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentAccountUpdateToOneWithWhereWithoutUserInput, Prisma.PaymentAccountUpdateWithoutUserInput>, Prisma.PaymentAccountUncheckedUpdateWithoutUserInput>;
};
export type PaymentAccountUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PaymentAccountCreateWithoutUserInput, Prisma.PaymentAccountUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.PaymentAccountCreateOrConnectWithoutUserInput;
    upsert?: Prisma.PaymentAccountUpsertWithoutUserInput;
    disconnect?: Prisma.PaymentAccountWhereInput | boolean;
    delete?: Prisma.PaymentAccountWhereInput | boolean;
    connect?: Prisma.PaymentAccountWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaymentAccountUpdateToOneWithWhereWithoutUserInput, Prisma.PaymentAccountUpdateWithoutUserInput>, Prisma.PaymentAccountUncheckedUpdateWithoutUserInput>;
};
export type EnumPaymentAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.PaymentAccountType;
};
export type PaymentAccountCreateWithoutUserInput = {
    id?: string;
    type?: $Enums.PaymentAccountType;
    accountName: string;
    promptPayId: string;
    qrImageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PaymentAccountUncheckedCreateWithoutUserInput = {
    id?: string;
    type?: $Enums.PaymentAccountType;
    accountName: string;
    promptPayId: string;
    qrImageUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PaymentAccountCreateOrConnectWithoutUserInput = {
    where: Prisma.PaymentAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentAccountCreateWithoutUserInput, Prisma.PaymentAccountUncheckedCreateWithoutUserInput>;
};
export type PaymentAccountUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.PaymentAccountUpdateWithoutUserInput, Prisma.PaymentAccountUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PaymentAccountCreateWithoutUserInput, Prisma.PaymentAccountUncheckedCreateWithoutUserInput>;
    where?: Prisma.PaymentAccountWhereInput;
};
export type PaymentAccountUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.PaymentAccountWhereInput;
    data: Prisma.XOR<Prisma.PaymentAccountUpdateWithoutUserInput, Prisma.PaymentAccountUncheckedUpdateWithoutUserInput>;
};
export type PaymentAccountUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPaymentAccountTypeFieldUpdateOperationsInput | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    promptPayId?: Prisma.StringFieldUpdateOperationsInput | string;
    qrImageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentAccountUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumPaymentAccountTypeFieldUpdateOperationsInput | $Enums.PaymentAccountType;
    accountName?: Prisma.StringFieldUpdateOperationsInput | string;
    promptPayId?: Prisma.StringFieldUpdateOperationsInput | string;
    qrImageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PaymentAccountSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    accountName?: boolean;
    promptPayId?: boolean;
    qrImageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paymentAccount"]>;
export type PaymentAccountSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    accountName?: boolean;
    promptPayId?: boolean;
    qrImageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paymentAccount"]>;
export type PaymentAccountSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    accountName?: boolean;
    promptPayId?: boolean;
    qrImageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["paymentAccount"]>;
export type PaymentAccountSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    accountName?: boolean;
    promptPayId?: boolean;
    qrImageUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PaymentAccountOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "accountName" | "promptPayId" | "qrImageUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["paymentAccount"]>;
export type PaymentAccountInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PaymentAccountIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PaymentAccountIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PaymentAccountPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PaymentAccount";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.PaymentAccountType;
        accountName: string;
        promptPayId: string;
        qrImageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["paymentAccount"]>;
    composites: {};
};
export type PaymentAccountGetPayload<S extends boolean | null | undefined | PaymentAccountDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload, S>;
export type PaymentAccountCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaymentAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaymentAccountCountAggregateInputType | true;
};
export interface PaymentAccountDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PaymentAccount'];
        meta: {
            name: 'PaymentAccount';
        };
    };
    findUnique<T extends PaymentAccountFindUniqueArgs>(args: Prisma.SelectSubset<T, PaymentAccountFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaymentAccountFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaymentAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaymentAccountFindFirstArgs>(args?: Prisma.SelectSubset<T, PaymentAccountFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaymentAccountFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaymentAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaymentAccountFindManyArgs>(args?: Prisma.SelectSubset<T, PaymentAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaymentAccountCreateArgs>(args: Prisma.SelectSubset<T, PaymentAccountCreateArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaymentAccountCreateManyArgs>(args?: Prisma.SelectSubset<T, PaymentAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PaymentAccountCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PaymentAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PaymentAccountDeleteArgs>(args: Prisma.SelectSubset<T, PaymentAccountDeleteArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaymentAccountUpdateArgs>(args: Prisma.SelectSubset<T, PaymentAccountUpdateArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaymentAccountDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaymentAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaymentAccountUpdateManyArgs>(args: Prisma.SelectSubset<T, PaymentAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PaymentAccountUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PaymentAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PaymentAccountUpsertArgs>(args: Prisma.SelectSubset<T, PaymentAccountUpsertArgs<ExtArgs>>): Prisma.Prisma__PaymentAccountClient<runtime.Types.Result.GetResult<Prisma.$PaymentAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaymentAccountCountArgs>(args?: Prisma.Subset<T, PaymentAccountCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaymentAccountCountAggregateOutputType> : number>;
    aggregate<T extends PaymentAccountAggregateArgs>(args: Prisma.Subset<T, PaymentAccountAggregateArgs>): Prisma.PrismaPromise<GetPaymentAccountAggregateType<T>>;
    groupBy<T extends PaymentAccountGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaymentAccountGroupByArgs['orderBy'];
    } : {
        orderBy?: PaymentAccountGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaymentAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaymentAccountFieldRefs;
}
export interface Prisma__PaymentAccountClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaymentAccountFieldRefs {
    readonly id: Prisma.FieldRef<"PaymentAccount", 'String'>;
    readonly userId: Prisma.FieldRef<"PaymentAccount", 'String'>;
    readonly type: Prisma.FieldRef<"PaymentAccount", 'PaymentAccountType'>;
    readonly accountName: Prisma.FieldRef<"PaymentAccount", 'String'>;
    readonly promptPayId: Prisma.FieldRef<"PaymentAccount", 'String'>;
    readonly qrImageUrl: Prisma.FieldRef<"PaymentAccount", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PaymentAccount", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PaymentAccount", 'DateTime'>;
}
export type PaymentAccountFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where: Prisma.PaymentAccountWhereUniqueInput;
};
export type PaymentAccountFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where: Prisma.PaymentAccountWhereUniqueInput;
};
export type PaymentAccountFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where?: Prisma.PaymentAccountWhereInput;
    orderBy?: Prisma.PaymentAccountOrderByWithRelationInput | Prisma.PaymentAccountOrderByWithRelationInput[];
    cursor?: Prisma.PaymentAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentAccountScalarFieldEnum | Prisma.PaymentAccountScalarFieldEnum[];
};
export type PaymentAccountFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where?: Prisma.PaymentAccountWhereInput;
    orderBy?: Prisma.PaymentAccountOrderByWithRelationInput | Prisma.PaymentAccountOrderByWithRelationInput[];
    cursor?: Prisma.PaymentAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentAccountScalarFieldEnum | Prisma.PaymentAccountScalarFieldEnum[];
};
export type PaymentAccountFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where?: Prisma.PaymentAccountWhereInput;
    orderBy?: Prisma.PaymentAccountOrderByWithRelationInput | Prisma.PaymentAccountOrderByWithRelationInput[];
    cursor?: Prisma.PaymentAccountWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentAccountScalarFieldEnum | Prisma.PaymentAccountScalarFieldEnum[];
};
export type PaymentAccountCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentAccountCreateInput, Prisma.PaymentAccountUncheckedCreateInput>;
};
export type PaymentAccountCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaymentAccountCreateManyInput | Prisma.PaymentAccountCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaymentAccountCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    data: Prisma.PaymentAccountCreateManyInput | Prisma.PaymentAccountCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PaymentAccountIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PaymentAccountUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentAccountUpdateInput, Prisma.PaymentAccountUncheckedUpdateInput>;
    where: Prisma.PaymentAccountWhereUniqueInput;
};
export type PaymentAccountUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaymentAccountUpdateManyMutationInput, Prisma.PaymentAccountUncheckedUpdateManyInput>;
    where?: Prisma.PaymentAccountWhereInput;
    limit?: number;
};
export type PaymentAccountUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaymentAccountUpdateManyMutationInput, Prisma.PaymentAccountUncheckedUpdateManyInput>;
    where?: Prisma.PaymentAccountWhereInput;
    limit?: number;
    include?: Prisma.PaymentAccountIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PaymentAccountUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where: Prisma.PaymentAccountWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaymentAccountCreateInput, Prisma.PaymentAccountUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaymentAccountUpdateInput, Prisma.PaymentAccountUncheckedUpdateInput>;
};
export type PaymentAccountDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
    where: Prisma.PaymentAccountWhereUniqueInput;
};
export type PaymentAccountDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentAccountWhereInput;
    limit?: number;
};
export type PaymentAccountDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaymentAccountSelect<ExtArgs> | null;
    omit?: Prisma.PaymentAccountOmit<ExtArgs> | null;
    include?: Prisma.PaymentAccountInclude<ExtArgs> | null;
};
