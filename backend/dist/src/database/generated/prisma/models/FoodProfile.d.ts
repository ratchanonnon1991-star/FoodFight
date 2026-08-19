import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FoodProfileModel = runtime.Types.Result.DefaultSelection<Prisma.$FoodProfilePayload>;
export type AggregateFoodProfile = {
    _count: FoodProfileCountAggregateOutputType | null;
    _min: FoodProfileMinAggregateOutputType | null;
    _max: FoodProfileMaxAggregateOutputType | null;
};
export type FoodProfileMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    otherAllergies: string | null;
    otherRestrictions: string | null;
    additionalNotes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodProfileMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    otherAllergies: string | null;
    otherRestrictions: string | null;
    additionalNotes: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodProfileCountAggregateOutputType = {
    id: number;
    userId: number;
    allergies: number;
    otherAllergies: number;
    restrictions: number;
    otherRestrictions: number;
    additionalNotes: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FoodProfileMinAggregateInputType = {
    id?: true;
    userId?: true;
    otherAllergies?: true;
    otherRestrictions?: true;
    additionalNotes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodProfileMaxAggregateInputType = {
    id?: true;
    userId?: true;
    otherAllergies?: true;
    otherRestrictions?: true;
    additionalNotes?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodProfileCountAggregateInputType = {
    id?: true;
    userId?: true;
    allergies?: true;
    otherAllergies?: true;
    restrictions?: true;
    otherRestrictions?: true;
    additionalNotes?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FoodProfileAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodProfileWhereInput;
    orderBy?: Prisma.FoodProfileOrderByWithRelationInput | Prisma.FoodProfileOrderByWithRelationInput[];
    cursor?: Prisma.FoodProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FoodProfileCountAggregateInputType;
    _min?: FoodProfileMinAggregateInputType;
    _max?: FoodProfileMaxAggregateInputType;
};
export type GetFoodProfileAggregateType<T extends FoodProfileAggregateArgs> = {
    [P in keyof T & keyof AggregateFoodProfile]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFoodProfile[P]> : Prisma.GetScalarType<T[P], AggregateFoodProfile[P]>;
};
export type FoodProfileGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodProfileWhereInput;
    orderBy?: Prisma.FoodProfileOrderByWithAggregationInput | Prisma.FoodProfileOrderByWithAggregationInput[];
    by: Prisma.FoodProfileScalarFieldEnum[] | Prisma.FoodProfileScalarFieldEnum;
    having?: Prisma.FoodProfileScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FoodProfileCountAggregateInputType | true;
    _min?: FoodProfileMinAggregateInputType;
    _max?: FoodProfileMaxAggregateInputType;
};
export type FoodProfileGroupByOutputType = {
    id: string;
    userId: string;
    allergies: string[];
    otherAllergies: string | null;
    restrictions: string[];
    otherRestrictions: string | null;
    additionalNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FoodProfileCountAggregateOutputType | null;
    _min: FoodProfileMinAggregateOutputType | null;
    _max: FoodProfileMaxAggregateOutputType | null;
};
export type GetFoodProfileGroupByPayload<T extends FoodProfileGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FoodProfileGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FoodProfileGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FoodProfileGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FoodProfileGroupByOutputType[P]>;
}>>;
export type FoodProfileWhereInput = {
    AND?: Prisma.FoodProfileWhereInput | Prisma.FoodProfileWhereInput[];
    OR?: Prisma.FoodProfileWhereInput[];
    NOT?: Prisma.FoodProfileWhereInput | Prisma.FoodProfileWhereInput[];
    id?: Prisma.StringFilter<"FoodProfile"> | string;
    userId?: Prisma.StringFilter<"FoodProfile"> | string;
    allergies?: Prisma.StringNullableListFilter<"FoodProfile">;
    otherAllergies?: Prisma.StringNullableFilter<"FoodProfile"> | string | null;
    restrictions?: Prisma.StringNullableListFilter<"FoodProfile">;
    otherRestrictions?: Prisma.StringNullableFilter<"FoodProfile"> | string | null;
    additionalNotes?: Prisma.StringNullableFilter<"FoodProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"FoodProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FoodProfileOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    allergies?: Prisma.SortOrder;
    otherAllergies?: Prisma.SortOrderInput | Prisma.SortOrder;
    restrictions?: Prisma.SortOrder;
    otherRestrictions?: Prisma.SortOrderInput | Prisma.SortOrder;
    additionalNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FoodProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.FoodProfileWhereInput | Prisma.FoodProfileWhereInput[];
    OR?: Prisma.FoodProfileWhereInput[];
    NOT?: Prisma.FoodProfileWhereInput | Prisma.FoodProfileWhereInput[];
    allergies?: Prisma.StringNullableListFilter<"FoodProfile">;
    otherAllergies?: Prisma.StringNullableFilter<"FoodProfile"> | string | null;
    restrictions?: Prisma.StringNullableListFilter<"FoodProfile">;
    otherRestrictions?: Prisma.StringNullableFilter<"FoodProfile"> | string | null;
    additionalNotes?: Prisma.StringNullableFilter<"FoodProfile"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"FoodProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodProfile"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type FoodProfileOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    allergies?: Prisma.SortOrder;
    otherAllergies?: Prisma.SortOrderInput | Prisma.SortOrder;
    restrictions?: Prisma.SortOrder;
    otherRestrictions?: Prisma.SortOrderInput | Prisma.SortOrder;
    additionalNotes?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FoodProfileCountOrderByAggregateInput;
    _max?: Prisma.FoodProfileMaxOrderByAggregateInput;
    _min?: Prisma.FoodProfileMinOrderByAggregateInput;
};
export type FoodProfileScalarWhereWithAggregatesInput = {
    AND?: Prisma.FoodProfileScalarWhereWithAggregatesInput | Prisma.FoodProfileScalarWhereWithAggregatesInput[];
    OR?: Prisma.FoodProfileScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FoodProfileScalarWhereWithAggregatesInput | Prisma.FoodProfileScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FoodProfile"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FoodProfile"> | string;
    allergies?: Prisma.StringNullableListFilter<"FoodProfile">;
    otherAllergies?: Prisma.StringNullableWithAggregatesFilter<"FoodProfile"> | string | null;
    restrictions?: Prisma.StringNullableListFilter<"FoodProfile">;
    otherRestrictions?: Prisma.StringNullableWithAggregatesFilter<"FoodProfile"> | string | null;
    additionalNotes?: Prisma.StringNullableWithAggregatesFilter<"FoodProfile"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FoodProfile"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FoodProfile"> | Date | string;
};
export type FoodProfileCreateInput = {
    id?: string;
    allergies?: Prisma.FoodProfileCreateallergiesInput | string[];
    otherAllergies?: string | null;
    restrictions?: Prisma.FoodProfileCreaterestrictionsInput | string[];
    otherRestrictions?: string | null;
    additionalNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFoodProfileInput;
};
export type FoodProfileUncheckedCreateInput = {
    id?: string;
    userId: string;
    allergies?: Prisma.FoodProfileCreateallergiesInput | string[];
    otherAllergies?: string | null;
    restrictions?: Prisma.FoodProfileCreaterestrictionsInput | string[];
    otherRestrictions?: string | null;
    additionalNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodProfileUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    allergies?: Prisma.FoodProfileUpdateallergiesInput | string[];
    otherAllergies?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    restrictions?: Prisma.FoodProfileUpdaterestrictionsInput | string[];
    otherRestrictions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFoodProfileNestedInput;
};
export type FoodProfileUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    allergies?: Prisma.FoodProfileUpdateallergiesInput | string[];
    otherAllergies?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    restrictions?: Prisma.FoodProfileUpdaterestrictionsInput | string[];
    otherRestrictions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodProfileCreateManyInput = {
    id?: string;
    userId: string;
    allergies?: Prisma.FoodProfileCreateallergiesInput | string[];
    otherAllergies?: string | null;
    restrictions?: Prisma.FoodProfileCreaterestrictionsInput | string[];
    otherRestrictions?: string | null;
    additionalNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodProfileUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    allergies?: Prisma.FoodProfileUpdateallergiesInput | string[];
    otherAllergies?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    restrictions?: Prisma.FoodProfileUpdaterestrictionsInput | string[];
    otherRestrictions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodProfileUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    allergies?: Prisma.FoodProfileUpdateallergiesInput | string[];
    otherAllergies?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    restrictions?: Prisma.FoodProfileUpdaterestrictionsInput | string[];
    otherRestrictions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodProfileNullableScalarRelationFilter = {
    is?: Prisma.FoodProfileWhereInput | null;
    isNot?: Prisma.FoodProfileWhereInput | null;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type FoodProfileCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    allergies?: Prisma.SortOrder;
    otherAllergies?: Prisma.SortOrder;
    restrictions?: Prisma.SortOrder;
    otherRestrictions?: Prisma.SortOrder;
    additionalNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodProfileMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otherAllergies?: Prisma.SortOrder;
    otherRestrictions?: Prisma.SortOrder;
    additionalNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodProfileMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otherAllergies?: Prisma.SortOrder;
    otherRestrictions?: Prisma.SortOrder;
    additionalNotes?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodProfileCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FoodProfileCreateWithoutUserInput, Prisma.FoodProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.FoodProfileWhereUniqueInput;
};
export type FoodProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FoodProfileCreateWithoutUserInput, Prisma.FoodProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodProfileCreateOrConnectWithoutUserInput;
    connect?: Prisma.FoodProfileWhereUniqueInput;
};
export type FoodProfileUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FoodProfileCreateWithoutUserInput, Prisma.FoodProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FoodProfileUpsertWithoutUserInput;
    disconnect?: Prisma.FoodProfileWhereInput | boolean;
    delete?: Prisma.FoodProfileWhereInput | boolean;
    connect?: Prisma.FoodProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodProfileUpdateToOneWithWhereWithoutUserInput, Prisma.FoodProfileUpdateWithoutUserInput>, Prisma.FoodProfileUncheckedUpdateWithoutUserInput>;
};
export type FoodProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FoodProfileCreateWithoutUserInput, Prisma.FoodProfileUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodProfileCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FoodProfileUpsertWithoutUserInput;
    disconnect?: Prisma.FoodProfileWhereInput | boolean;
    delete?: Prisma.FoodProfileWhereInput | boolean;
    connect?: Prisma.FoodProfileWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodProfileUpdateToOneWithWhereWithoutUserInput, Prisma.FoodProfileUpdateWithoutUserInput>, Prisma.FoodProfileUncheckedUpdateWithoutUserInput>;
};
export type FoodProfileCreateallergiesInput = {
    set: string[];
};
export type FoodProfileCreaterestrictionsInput = {
    set: string[];
};
export type FoodProfileUpdateallergiesInput = {
    set?: string[];
    push?: string | string[];
};
export type FoodProfileUpdaterestrictionsInput = {
    set?: string[];
    push?: string | string[];
};
export type FoodProfileCreateWithoutUserInput = {
    id?: string;
    allergies?: Prisma.FoodProfileCreateallergiesInput | string[];
    otherAllergies?: string | null;
    restrictions?: Prisma.FoodProfileCreaterestrictionsInput | string[];
    otherRestrictions?: string | null;
    additionalNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodProfileUncheckedCreateWithoutUserInput = {
    id?: string;
    allergies?: Prisma.FoodProfileCreateallergiesInput | string[];
    otherAllergies?: string | null;
    restrictions?: Prisma.FoodProfileCreaterestrictionsInput | string[];
    otherRestrictions?: string | null;
    additionalNotes?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodProfileCreateOrConnectWithoutUserInput = {
    where: Prisma.FoodProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodProfileCreateWithoutUserInput, Prisma.FoodProfileUncheckedCreateWithoutUserInput>;
};
export type FoodProfileUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.FoodProfileUpdateWithoutUserInput, Prisma.FoodProfileUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FoodProfileCreateWithoutUserInput, Prisma.FoodProfileUncheckedCreateWithoutUserInput>;
    where?: Prisma.FoodProfileWhereInput;
};
export type FoodProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.FoodProfileWhereInput;
    data: Prisma.XOR<Prisma.FoodProfileUpdateWithoutUserInput, Prisma.FoodProfileUncheckedUpdateWithoutUserInput>;
};
export type FoodProfileUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    allergies?: Prisma.FoodProfileUpdateallergiesInput | string[];
    otherAllergies?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    restrictions?: Prisma.FoodProfileUpdaterestrictionsInput | string[];
    otherRestrictions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodProfileUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    allergies?: Prisma.FoodProfileUpdateallergiesInput | string[];
    otherAllergies?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    restrictions?: Prisma.FoodProfileUpdaterestrictionsInput | string[];
    otherRestrictions?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    additionalNotes?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodProfileSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    allergies?: boolean;
    otherAllergies?: boolean;
    restrictions?: boolean;
    otherRestrictions?: boolean;
    additionalNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodProfile"]>;
export type FoodProfileSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    allergies?: boolean;
    otherAllergies?: boolean;
    restrictions?: boolean;
    otherRestrictions?: boolean;
    additionalNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodProfile"]>;
export type FoodProfileSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    allergies?: boolean;
    otherAllergies?: boolean;
    restrictions?: boolean;
    otherRestrictions?: boolean;
    additionalNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodProfile"]>;
export type FoodProfileSelectScalar = {
    id?: boolean;
    userId?: boolean;
    allergies?: boolean;
    otherAllergies?: boolean;
    restrictions?: boolean;
    otherRestrictions?: boolean;
    additionalNotes?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FoodProfileOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "allergies" | "otherAllergies" | "restrictions" | "otherRestrictions" | "additionalNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["foodProfile"]>;
export type FoodProfileInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FoodProfileIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FoodProfileIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FoodProfilePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FoodProfile";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        allergies: string[];
        otherAllergies: string | null;
        restrictions: string[];
        otherRestrictions: string | null;
        additionalNotes: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["foodProfile"]>;
    composites: {};
};
export type FoodProfileGetPayload<S extends boolean | null | undefined | FoodProfileDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload, S>;
export type FoodProfileCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FoodProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FoodProfileCountAggregateInputType | true;
};
export interface FoodProfileDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FoodProfile'];
        meta: {
            name: 'FoodProfile';
        };
    };
    findUnique<T extends FoodProfileFindUniqueArgs>(args: Prisma.SelectSubset<T, FoodProfileFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FoodProfileFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FoodProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FoodProfileFindFirstArgs>(args?: Prisma.SelectSubset<T, FoodProfileFindFirstArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FoodProfileFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FoodProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FoodProfileFindManyArgs>(args?: Prisma.SelectSubset<T, FoodProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FoodProfileCreateArgs>(args: Prisma.SelectSubset<T, FoodProfileCreateArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FoodProfileCreateManyArgs>(args?: Prisma.SelectSubset<T, FoodProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FoodProfileCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FoodProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FoodProfileDeleteArgs>(args: Prisma.SelectSubset<T, FoodProfileDeleteArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FoodProfileUpdateArgs>(args: Prisma.SelectSubset<T, FoodProfileUpdateArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FoodProfileDeleteManyArgs>(args?: Prisma.SelectSubset<T, FoodProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FoodProfileUpdateManyArgs>(args: Prisma.SelectSubset<T, FoodProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FoodProfileUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FoodProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FoodProfileUpsertArgs>(args: Prisma.SelectSubset<T, FoodProfileUpsertArgs<ExtArgs>>): Prisma.Prisma__FoodProfileClient<runtime.Types.Result.GetResult<Prisma.$FoodProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FoodProfileCountArgs>(args?: Prisma.Subset<T, FoodProfileCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FoodProfileCountAggregateOutputType> : number>;
    aggregate<T extends FoodProfileAggregateArgs>(args: Prisma.Subset<T, FoodProfileAggregateArgs>): Prisma.PrismaPromise<GetFoodProfileAggregateType<T>>;
    groupBy<T extends FoodProfileGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FoodProfileGroupByArgs['orderBy'];
    } : {
        orderBy?: FoodProfileGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FoodProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FoodProfileFieldRefs;
}
export interface Prisma__FoodProfileClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FoodProfileFieldRefs {
    readonly id: Prisma.FieldRef<"FoodProfile", 'String'>;
    readonly userId: Prisma.FieldRef<"FoodProfile", 'String'>;
    readonly allergies: Prisma.FieldRef<"FoodProfile", 'String[]'>;
    readonly otherAllergies: Prisma.FieldRef<"FoodProfile", 'String'>;
    readonly restrictions: Prisma.FieldRef<"FoodProfile", 'String[]'>;
    readonly otherRestrictions: Prisma.FieldRef<"FoodProfile", 'String'>;
    readonly additionalNotes: Prisma.FieldRef<"FoodProfile", 'String'>;
    readonly createdAt: Prisma.FieldRef<"FoodProfile", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FoodProfile", 'DateTime'>;
}
export type FoodProfileFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where: Prisma.FoodProfileWhereUniqueInput;
};
export type FoodProfileFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where: Prisma.FoodProfileWhereUniqueInput;
};
export type FoodProfileFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where?: Prisma.FoodProfileWhereInput;
    orderBy?: Prisma.FoodProfileOrderByWithRelationInput | Prisma.FoodProfileOrderByWithRelationInput[];
    cursor?: Prisma.FoodProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodProfileScalarFieldEnum | Prisma.FoodProfileScalarFieldEnum[];
};
export type FoodProfileFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where?: Prisma.FoodProfileWhereInput;
    orderBy?: Prisma.FoodProfileOrderByWithRelationInput | Prisma.FoodProfileOrderByWithRelationInput[];
    cursor?: Prisma.FoodProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodProfileScalarFieldEnum | Prisma.FoodProfileScalarFieldEnum[];
};
export type FoodProfileFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where?: Prisma.FoodProfileWhereInput;
    orderBy?: Prisma.FoodProfileOrderByWithRelationInput | Prisma.FoodProfileOrderByWithRelationInput[];
    cursor?: Prisma.FoodProfileWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodProfileScalarFieldEnum | Prisma.FoodProfileScalarFieldEnum[];
};
export type FoodProfileCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FoodProfileCreateInput, Prisma.FoodProfileUncheckedCreateInput>;
};
export type FoodProfileCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FoodProfileCreateManyInput | Prisma.FoodProfileCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FoodProfileCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    data: Prisma.FoodProfileCreateManyInput | Prisma.FoodProfileCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FoodProfileIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FoodProfileUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FoodProfileUpdateInput, Prisma.FoodProfileUncheckedUpdateInput>;
    where: Prisma.FoodProfileWhereUniqueInput;
};
export type FoodProfileUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FoodProfileUpdateManyMutationInput, Prisma.FoodProfileUncheckedUpdateManyInput>;
    where?: Prisma.FoodProfileWhereInput;
    limit?: number;
};
export type FoodProfileUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FoodProfileUpdateManyMutationInput, Prisma.FoodProfileUncheckedUpdateManyInput>;
    where?: Prisma.FoodProfileWhereInput;
    limit?: number;
    include?: Prisma.FoodProfileIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FoodProfileUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where: Prisma.FoodProfileWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodProfileCreateInput, Prisma.FoodProfileUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FoodProfileUpdateInput, Prisma.FoodProfileUncheckedUpdateInput>;
};
export type FoodProfileDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
    where: Prisma.FoodProfileWhereUniqueInput;
};
export type FoodProfileDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodProfileWhereInput;
    limit?: number;
};
export type FoodProfileDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodProfileSelect<ExtArgs> | null;
    omit?: Prisma.FoodProfileOmit<ExtArgs> | null;
    include?: Prisma.FoodProfileInclude<ExtArgs> | null;
};
