import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EmailVerificationModel = runtime.Types.Result.DefaultSelection<Prisma.$EmailVerificationPayload>;
export type AggregateEmailVerification = {
    _count: EmailVerificationCountAggregateOutputType | null;
    _min: EmailVerificationMinAggregateOutputType | null;
    _max: EmailVerificationMaxAggregateOutputType | null;
};
export type EmailVerificationMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    otpHash: string | null;
    expiresAt: Date | null;
    resendAvailableAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EmailVerificationMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    otpHash: string | null;
    expiresAt: Date | null;
    resendAvailableAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EmailVerificationCountAggregateOutputType = {
    id: number;
    userId: number;
    otpHash: number;
    expiresAt: number;
    resendAvailableAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EmailVerificationMinAggregateInputType = {
    id?: true;
    userId?: true;
    otpHash?: true;
    expiresAt?: true;
    resendAvailableAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EmailVerificationMaxAggregateInputType = {
    id?: true;
    userId?: true;
    otpHash?: true;
    expiresAt?: true;
    resendAvailableAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EmailVerificationCountAggregateInputType = {
    id?: true;
    userId?: true;
    otpHash?: true;
    expiresAt?: true;
    resendAvailableAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EmailVerificationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailVerificationWhereInput;
    orderBy?: Prisma.EmailVerificationOrderByWithRelationInput | Prisma.EmailVerificationOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EmailVerificationCountAggregateInputType;
    _min?: EmailVerificationMinAggregateInputType;
    _max?: EmailVerificationMaxAggregateInputType;
};
export type GetEmailVerificationAggregateType<T extends EmailVerificationAggregateArgs> = {
    [P in keyof T & keyof AggregateEmailVerification]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEmailVerification[P]> : Prisma.GetScalarType<T[P], AggregateEmailVerification[P]>;
};
export type EmailVerificationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailVerificationWhereInput;
    orderBy?: Prisma.EmailVerificationOrderByWithAggregationInput | Prisma.EmailVerificationOrderByWithAggregationInput[];
    by: Prisma.EmailVerificationScalarFieldEnum[] | Prisma.EmailVerificationScalarFieldEnum;
    having?: Prisma.EmailVerificationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EmailVerificationCountAggregateInputType | true;
    _min?: EmailVerificationMinAggregateInputType;
    _max?: EmailVerificationMaxAggregateInputType;
};
export type EmailVerificationGroupByOutputType = {
    id: string;
    userId: string;
    otpHash: string;
    expiresAt: Date;
    resendAvailableAt: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: EmailVerificationCountAggregateOutputType | null;
    _min: EmailVerificationMinAggregateOutputType | null;
    _max: EmailVerificationMaxAggregateOutputType | null;
};
export type GetEmailVerificationGroupByPayload<T extends EmailVerificationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EmailVerificationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EmailVerificationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EmailVerificationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EmailVerificationGroupByOutputType[P]>;
}>>;
export type EmailVerificationWhereInput = {
    AND?: Prisma.EmailVerificationWhereInput | Prisma.EmailVerificationWhereInput[];
    OR?: Prisma.EmailVerificationWhereInput[];
    NOT?: Prisma.EmailVerificationWhereInput | Prisma.EmailVerificationWhereInput[];
    id?: Prisma.StringFilter<"EmailVerification"> | string;
    userId?: Prisma.StringFilter<"EmailVerification"> | string;
    otpHash?: Prisma.StringFilter<"EmailVerification"> | string;
    expiresAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type EmailVerificationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type EmailVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.EmailVerificationWhereInput | Prisma.EmailVerificationWhereInput[];
    OR?: Prisma.EmailVerificationWhereInput[];
    NOT?: Prisma.EmailVerificationWhereInput | Prisma.EmailVerificationWhereInput[];
    otpHash?: Prisma.StringFilter<"EmailVerification"> | string;
    expiresAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EmailVerification"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type EmailVerificationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EmailVerificationCountOrderByAggregateInput;
    _max?: Prisma.EmailVerificationMaxOrderByAggregateInput;
    _min?: Prisma.EmailVerificationMinOrderByAggregateInput;
};
export type EmailVerificationScalarWhereWithAggregatesInput = {
    AND?: Prisma.EmailVerificationScalarWhereWithAggregatesInput | Prisma.EmailVerificationScalarWhereWithAggregatesInput[];
    OR?: Prisma.EmailVerificationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EmailVerificationScalarWhereWithAggregatesInput | Prisma.EmailVerificationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"EmailVerification"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"EmailVerification"> | string;
    otpHash?: Prisma.StringWithAggregatesFilter<"EmailVerification"> | string;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string;
    resendAvailableAt?: Prisma.DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"EmailVerification"> | Date | string;
};
export type EmailVerificationCreateInput = {
    id?: string;
    otpHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutEmailVerificationInput;
};
export type EmailVerificationUncheckedCreateInput = {
    id?: string;
    userId: string;
    otpHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EmailVerificationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutEmailVerificationNestedInput;
};
export type EmailVerificationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailVerificationCreateManyInput = {
    id?: string;
    userId: string;
    otpHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EmailVerificationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailVerificationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailVerificationNullableScalarRelationFilter = {
    is?: Prisma.EmailVerificationWhereInput | null;
    isNot?: Prisma.EmailVerificationWhereInput | null;
};
export type EmailVerificationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EmailVerificationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EmailVerificationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otpHash?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    resendAvailableAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EmailVerificationCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailVerificationCreateWithoutUserInput, Prisma.EmailVerificationUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.EmailVerificationCreateOrConnectWithoutUserInput;
    connect?: Prisma.EmailVerificationWhereUniqueInput;
};
export type EmailVerificationUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.EmailVerificationCreateWithoutUserInput, Prisma.EmailVerificationUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.EmailVerificationCreateOrConnectWithoutUserInput;
    connect?: Prisma.EmailVerificationWhereUniqueInput;
};
export type EmailVerificationUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailVerificationCreateWithoutUserInput, Prisma.EmailVerificationUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.EmailVerificationCreateOrConnectWithoutUserInput;
    upsert?: Prisma.EmailVerificationUpsertWithoutUserInput;
    disconnect?: Prisma.EmailVerificationWhereInput | boolean;
    delete?: Prisma.EmailVerificationWhereInput | boolean;
    connect?: Prisma.EmailVerificationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmailVerificationUpdateToOneWithWhereWithoutUserInput, Prisma.EmailVerificationUpdateWithoutUserInput>, Prisma.EmailVerificationUncheckedUpdateWithoutUserInput>;
};
export type EmailVerificationUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.EmailVerificationCreateWithoutUserInput, Prisma.EmailVerificationUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.EmailVerificationCreateOrConnectWithoutUserInput;
    upsert?: Prisma.EmailVerificationUpsertWithoutUserInput;
    disconnect?: Prisma.EmailVerificationWhereInput | boolean;
    delete?: Prisma.EmailVerificationWhereInput | boolean;
    connect?: Prisma.EmailVerificationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EmailVerificationUpdateToOneWithWhereWithoutUserInput, Prisma.EmailVerificationUpdateWithoutUserInput>, Prisma.EmailVerificationUncheckedUpdateWithoutUserInput>;
};
export type EmailVerificationCreateWithoutUserInput = {
    id?: string;
    otpHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EmailVerificationUncheckedCreateWithoutUserInput = {
    id?: string;
    otpHash: string;
    expiresAt: Date | string;
    resendAvailableAt: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EmailVerificationCreateOrConnectWithoutUserInput = {
    where: Prisma.EmailVerificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailVerificationCreateWithoutUserInput, Prisma.EmailVerificationUncheckedCreateWithoutUserInput>;
};
export type EmailVerificationUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.EmailVerificationUpdateWithoutUserInput, Prisma.EmailVerificationUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.EmailVerificationCreateWithoutUserInput, Prisma.EmailVerificationUncheckedCreateWithoutUserInput>;
    where?: Prisma.EmailVerificationWhereInput;
};
export type EmailVerificationUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.EmailVerificationWhereInput;
    data: Prisma.XOR<Prisma.EmailVerificationUpdateWithoutUserInput, Prisma.EmailVerificationUncheckedUpdateWithoutUserInput>;
};
export type EmailVerificationUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailVerificationUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    otpHash?: Prisma.StringFieldUpdateOperationsInput | string;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    resendAvailableAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EmailVerificationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailVerification"]>;
export type EmailVerificationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailVerification"]>;
export type EmailVerificationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["emailVerification"]>;
export type EmailVerificationSelectScalar = {
    id?: boolean;
    userId?: boolean;
    otpHash?: boolean;
    expiresAt?: boolean;
    resendAvailableAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EmailVerificationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "otpHash" | "expiresAt" | "resendAvailableAt" | "createdAt" | "updatedAt", ExtArgs["result"]["emailVerification"]>;
export type EmailVerificationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EmailVerificationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EmailVerificationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EmailVerificationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EmailVerification";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        otpHash: string;
        expiresAt: Date;
        resendAvailableAt: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["emailVerification"]>;
    composites: {};
};
export type EmailVerificationGetPayload<S extends boolean | null | undefined | EmailVerificationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload, S>;
export type EmailVerificationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EmailVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EmailVerificationCountAggregateInputType | true;
};
export interface EmailVerificationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EmailVerification'];
        meta: {
            name: 'EmailVerification';
        };
    };
    findUnique<T extends EmailVerificationFindUniqueArgs>(args: Prisma.SelectSubset<T, EmailVerificationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EmailVerificationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EmailVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EmailVerificationFindFirstArgs>(args?: Prisma.SelectSubset<T, EmailVerificationFindFirstArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EmailVerificationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EmailVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EmailVerificationFindManyArgs>(args?: Prisma.SelectSubset<T, EmailVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EmailVerificationCreateArgs>(args: Prisma.SelectSubset<T, EmailVerificationCreateArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EmailVerificationCreateManyArgs>(args?: Prisma.SelectSubset<T, EmailVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EmailVerificationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EmailVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EmailVerificationDeleteArgs>(args: Prisma.SelectSubset<T, EmailVerificationDeleteArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EmailVerificationUpdateArgs>(args: Prisma.SelectSubset<T, EmailVerificationUpdateArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EmailVerificationDeleteManyArgs>(args?: Prisma.SelectSubset<T, EmailVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EmailVerificationUpdateManyArgs>(args: Prisma.SelectSubset<T, EmailVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EmailVerificationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EmailVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EmailVerificationUpsertArgs>(args: Prisma.SelectSubset<T, EmailVerificationUpsertArgs<ExtArgs>>): Prisma.Prisma__EmailVerificationClient<runtime.Types.Result.GetResult<Prisma.$EmailVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EmailVerificationCountArgs>(args?: Prisma.Subset<T, EmailVerificationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EmailVerificationCountAggregateOutputType> : number>;
    aggregate<T extends EmailVerificationAggregateArgs>(args: Prisma.Subset<T, EmailVerificationAggregateArgs>): Prisma.PrismaPromise<GetEmailVerificationAggregateType<T>>;
    groupBy<T extends EmailVerificationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EmailVerificationGroupByArgs['orderBy'];
    } : {
        orderBy?: EmailVerificationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EmailVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmailVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EmailVerificationFieldRefs;
}
export interface Prisma__EmailVerificationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EmailVerificationFieldRefs {
    readonly id: Prisma.FieldRef<"EmailVerification", 'String'>;
    readonly userId: Prisma.FieldRef<"EmailVerification", 'String'>;
    readonly otpHash: Prisma.FieldRef<"EmailVerification", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"EmailVerification", 'DateTime'>;
    readonly resendAvailableAt: Prisma.FieldRef<"EmailVerification", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"EmailVerification", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"EmailVerification", 'DateTime'>;
}
export type EmailVerificationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where: Prisma.EmailVerificationWhereUniqueInput;
};
export type EmailVerificationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where: Prisma.EmailVerificationWhereUniqueInput;
};
export type EmailVerificationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where?: Prisma.EmailVerificationWhereInput;
    orderBy?: Prisma.EmailVerificationOrderByWithRelationInput | Prisma.EmailVerificationOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailVerificationScalarFieldEnum | Prisma.EmailVerificationScalarFieldEnum[];
};
export type EmailVerificationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where?: Prisma.EmailVerificationWhereInput;
    orderBy?: Prisma.EmailVerificationOrderByWithRelationInput | Prisma.EmailVerificationOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailVerificationScalarFieldEnum | Prisma.EmailVerificationScalarFieldEnum[];
};
export type EmailVerificationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where?: Prisma.EmailVerificationWhereInput;
    orderBy?: Prisma.EmailVerificationOrderByWithRelationInput | Prisma.EmailVerificationOrderByWithRelationInput[];
    cursor?: Prisma.EmailVerificationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EmailVerificationScalarFieldEnum | Prisma.EmailVerificationScalarFieldEnum[];
};
export type EmailVerificationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailVerificationCreateInput, Prisma.EmailVerificationUncheckedCreateInput>;
};
export type EmailVerificationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EmailVerificationCreateManyInput | Prisma.EmailVerificationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EmailVerificationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    data: Prisma.EmailVerificationCreateManyInput | Prisma.EmailVerificationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EmailVerificationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EmailVerificationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailVerificationUpdateInput, Prisma.EmailVerificationUncheckedUpdateInput>;
    where: Prisma.EmailVerificationWhereUniqueInput;
};
export type EmailVerificationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EmailVerificationUpdateManyMutationInput, Prisma.EmailVerificationUncheckedUpdateManyInput>;
    where?: Prisma.EmailVerificationWhereInput;
    limit?: number;
};
export type EmailVerificationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EmailVerificationUpdateManyMutationInput, Prisma.EmailVerificationUncheckedUpdateManyInput>;
    where?: Prisma.EmailVerificationWhereInput;
    limit?: number;
    include?: Prisma.EmailVerificationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EmailVerificationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where: Prisma.EmailVerificationWhereUniqueInput;
    create: Prisma.XOR<Prisma.EmailVerificationCreateInput, Prisma.EmailVerificationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EmailVerificationUpdateInput, Prisma.EmailVerificationUncheckedUpdateInput>;
};
export type EmailVerificationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
    where: Prisma.EmailVerificationWhereUniqueInput;
};
export type EmailVerificationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EmailVerificationWhereInput;
    limit?: number;
};
export type EmailVerificationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EmailVerificationSelect<ExtArgs> | null;
    omit?: Prisma.EmailVerificationOmit<ExtArgs> | null;
    include?: Prisma.EmailVerificationInclude<ExtArgs> | null;
};
