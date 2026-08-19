import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FinalSelectionModel = runtime.Types.Result.DefaultSelection<Prisma.$FinalSelectionPayload>;
export type AggregateFinalSelection = {
    _count: FinalSelectionCountAggregateOutputType | null;
    _min: FinalSelectionMinAggregateOutputType | null;
    _max: FinalSelectionMaxAggregateOutputType | null;
};
export type FinalSelectionMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    recommendationItemId: string | null;
    selectedById: string | null;
    method: $Enums.FinalSelectionMethod | null;
    selectedAt: Date | null;
};
export type FinalSelectionMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    recommendationItemId: string | null;
    selectedById: string | null;
    method: $Enums.FinalSelectionMethod | null;
    selectedAt: Date | null;
};
export type FinalSelectionCountAggregateOutputType = {
    id: number;
    sessionId: number;
    recommendationItemId: number;
    selectedById: number;
    method: number;
    selectedAt: number;
    _all: number;
};
export type FinalSelectionMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    recommendationItemId?: true;
    selectedById?: true;
    method?: true;
    selectedAt?: true;
};
export type FinalSelectionMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    recommendationItemId?: true;
    selectedById?: true;
    method?: true;
    selectedAt?: true;
};
export type FinalSelectionCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    recommendationItemId?: true;
    selectedById?: true;
    method?: true;
    selectedAt?: true;
    _all?: true;
};
export type FinalSelectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalSelectionWhereInput;
    orderBy?: Prisma.FinalSelectionOrderByWithRelationInput | Prisma.FinalSelectionOrderByWithRelationInput[];
    cursor?: Prisma.FinalSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FinalSelectionCountAggregateInputType;
    _min?: FinalSelectionMinAggregateInputType;
    _max?: FinalSelectionMaxAggregateInputType;
};
export type GetFinalSelectionAggregateType<T extends FinalSelectionAggregateArgs> = {
    [P in keyof T & keyof AggregateFinalSelection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFinalSelection[P]> : Prisma.GetScalarType<T[P], AggregateFinalSelection[P]>;
};
export type FinalSelectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalSelectionWhereInput;
    orderBy?: Prisma.FinalSelectionOrderByWithAggregationInput | Prisma.FinalSelectionOrderByWithAggregationInput[];
    by: Prisma.FinalSelectionScalarFieldEnum[] | Prisma.FinalSelectionScalarFieldEnum;
    having?: Prisma.FinalSelectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FinalSelectionCountAggregateInputType | true;
    _min?: FinalSelectionMinAggregateInputType;
    _max?: FinalSelectionMaxAggregateInputType;
};
export type FinalSelectionGroupByOutputType = {
    id: string;
    sessionId: string;
    recommendationItemId: string;
    selectedById: string | null;
    method: $Enums.FinalSelectionMethod;
    selectedAt: Date;
    _count: FinalSelectionCountAggregateOutputType | null;
    _min: FinalSelectionMinAggregateOutputType | null;
    _max: FinalSelectionMaxAggregateOutputType | null;
};
export type GetFinalSelectionGroupByPayload<T extends FinalSelectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FinalSelectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FinalSelectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FinalSelectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FinalSelectionGroupByOutputType[P]>;
}>>;
export type FinalSelectionWhereInput = {
    AND?: Prisma.FinalSelectionWhereInput | Prisma.FinalSelectionWhereInput[];
    OR?: Prisma.FinalSelectionWhereInput[];
    NOT?: Prisma.FinalSelectionWhereInput | Prisma.FinalSelectionWhereInput[];
    id?: Prisma.StringFilter<"FinalSelection"> | string;
    sessionId?: Prisma.StringFilter<"FinalSelection"> | string;
    recommendationItemId?: Prisma.StringFilter<"FinalSelection"> | string;
    selectedById?: Prisma.StringNullableFilter<"FinalSelection"> | string | null;
    method?: Prisma.EnumFinalSelectionMethodFilter<"FinalSelection"> | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFilter<"FinalSelection"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    recommendationItem?: Prisma.XOR<Prisma.RecommendationItemScalarRelationFilter, Prisma.RecommendationItemWhereInput>;
    selectedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type FinalSelectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    method?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    recommendationItem?: Prisma.RecommendationItemOrderByWithRelationInput;
    selectedBy?: Prisma.UserOrderByWithRelationInput;
};
export type FinalSelectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId?: string;
    AND?: Prisma.FinalSelectionWhereInput | Prisma.FinalSelectionWhereInput[];
    OR?: Prisma.FinalSelectionWhereInput[];
    NOT?: Prisma.FinalSelectionWhereInput | Prisma.FinalSelectionWhereInput[];
    recommendationItemId?: Prisma.StringFilter<"FinalSelection"> | string;
    selectedById?: Prisma.StringNullableFilter<"FinalSelection"> | string | null;
    method?: Prisma.EnumFinalSelectionMethodFilter<"FinalSelection"> | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFilter<"FinalSelection"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    recommendationItem?: Prisma.XOR<Prisma.RecommendationItemScalarRelationFilter, Prisma.RecommendationItemWhereInput>;
    selectedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "sessionId">;
export type FinalSelectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    method?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
    _count?: Prisma.FinalSelectionCountOrderByAggregateInput;
    _max?: Prisma.FinalSelectionMaxOrderByAggregateInput;
    _min?: Prisma.FinalSelectionMinOrderByAggregateInput;
};
export type FinalSelectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.FinalSelectionScalarWhereWithAggregatesInput | Prisma.FinalSelectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.FinalSelectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FinalSelectionScalarWhereWithAggregatesInput | Prisma.FinalSelectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FinalSelection"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"FinalSelection"> | string;
    recommendationItemId?: Prisma.StringWithAggregatesFilter<"FinalSelection"> | string;
    selectedById?: Prisma.StringNullableWithAggregatesFilter<"FinalSelection"> | string | null;
    method?: Prisma.EnumFinalSelectionMethodWithAggregatesFilter<"FinalSelection"> | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeWithAggregatesFilter<"FinalSelection"> | Date | string;
};
export type FinalSelectionCreateInput = {
    id?: string;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutFinalSelectionInput;
    recommendationItem: Prisma.RecommendationItemCreateNestedOneWithoutFinalSelectionsInput;
    selectedBy?: Prisma.UserCreateNestedOneWithoutFinalSelectionsInput;
};
export type FinalSelectionUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    recommendationItemId: string;
    selectedById?: string | null;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutFinalSelectionNestedInput;
    recommendationItem?: Prisma.RecommendationItemUpdateOneRequiredWithoutFinalSelectionsNestedInput;
    selectedBy?: Prisma.UserUpdateOneWithoutFinalSelectionsNestedInput;
};
export type FinalSelectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionCreateManyInput = {
    id?: string;
    sessionId: string;
    recommendationItemId: string;
    selectedById?: string | null;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionListRelationFilter = {
    every?: Prisma.FinalSelectionWhereInput;
    some?: Prisma.FinalSelectionWhereInput;
    none?: Prisma.FinalSelectionWhereInput;
};
export type FinalSelectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FinalSelectionNullableScalarRelationFilter = {
    is?: Prisma.FinalSelectionWhereInput | null;
    isNot?: Prisma.FinalSelectionWhereInput | null;
};
export type FinalSelectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
};
export type FinalSelectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
};
export type FinalSelectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
};
export type FinalSelectionCreateNestedManyWithoutSelectedByInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.FinalSelectionCreateWithoutSelectedByInput[] | Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput | Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput[];
    createMany?: Prisma.FinalSelectionCreateManySelectedByInputEnvelope;
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
};
export type FinalSelectionUncheckedCreateNestedManyWithoutSelectedByInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.FinalSelectionCreateWithoutSelectedByInput[] | Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput | Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput[];
    createMany?: Prisma.FinalSelectionCreateManySelectedByInputEnvelope;
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
};
export type FinalSelectionUpdateManyWithoutSelectedByNestedInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.FinalSelectionCreateWithoutSelectedByInput[] | Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput | Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput[];
    upsert?: Prisma.FinalSelectionUpsertWithWhereUniqueWithoutSelectedByInput | Prisma.FinalSelectionUpsertWithWhereUniqueWithoutSelectedByInput[];
    createMany?: Prisma.FinalSelectionCreateManySelectedByInputEnvelope;
    set?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    disconnect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    delete?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    update?: Prisma.FinalSelectionUpdateWithWhereUniqueWithoutSelectedByInput | Prisma.FinalSelectionUpdateWithWhereUniqueWithoutSelectedByInput[];
    updateMany?: Prisma.FinalSelectionUpdateManyWithWhereWithoutSelectedByInput | Prisma.FinalSelectionUpdateManyWithWhereWithoutSelectedByInput[];
    deleteMany?: Prisma.FinalSelectionScalarWhereInput | Prisma.FinalSelectionScalarWhereInput[];
};
export type FinalSelectionUncheckedUpdateManyWithoutSelectedByNestedInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.FinalSelectionCreateWithoutSelectedByInput[] | Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput | Prisma.FinalSelectionCreateOrConnectWithoutSelectedByInput[];
    upsert?: Prisma.FinalSelectionUpsertWithWhereUniqueWithoutSelectedByInput | Prisma.FinalSelectionUpsertWithWhereUniqueWithoutSelectedByInput[];
    createMany?: Prisma.FinalSelectionCreateManySelectedByInputEnvelope;
    set?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    disconnect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    delete?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    update?: Prisma.FinalSelectionUpdateWithWhereUniqueWithoutSelectedByInput | Prisma.FinalSelectionUpdateWithWhereUniqueWithoutSelectedByInput[];
    updateMany?: Prisma.FinalSelectionUpdateManyWithWhereWithoutSelectedByInput | Prisma.FinalSelectionUpdateManyWithWhereWithoutSelectedByInput[];
    deleteMany?: Prisma.FinalSelectionScalarWhereInput | Prisma.FinalSelectionScalarWhereInput[];
};
export type FinalSelectionCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSessionInput, Prisma.FinalSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSessionInput;
    connect?: Prisma.FinalSelectionWhereUniqueInput;
};
export type FinalSelectionUncheckedCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSessionInput, Prisma.FinalSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSessionInput;
    connect?: Prisma.FinalSelectionWhereUniqueInput;
};
export type FinalSelectionUpdateOneWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSessionInput, Prisma.FinalSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.FinalSelectionUpsertWithoutSessionInput;
    disconnect?: Prisma.FinalSelectionWhereInput | boolean;
    delete?: Prisma.FinalSelectionWhereInput | boolean;
    connect?: Prisma.FinalSelectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FinalSelectionUpdateToOneWithWhereWithoutSessionInput, Prisma.FinalSelectionUpdateWithoutSessionInput>, Prisma.FinalSelectionUncheckedUpdateWithoutSessionInput>;
};
export type FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSessionInput, Prisma.FinalSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.FinalSelectionUpsertWithoutSessionInput;
    disconnect?: Prisma.FinalSelectionWhereInput | boolean;
    delete?: Prisma.FinalSelectionWhereInput | boolean;
    connect?: Prisma.FinalSelectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FinalSelectionUpdateToOneWithWhereWithoutSessionInput, Prisma.FinalSelectionUpdateWithoutSessionInput>, Prisma.FinalSelectionUncheckedUpdateWithoutSessionInput>;
};
export type FinalSelectionCreateNestedManyWithoutRecommendationItemInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalSelectionCreateWithoutRecommendationItemInput[] | Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalSelectionCreateManyRecommendationItemInputEnvelope;
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
};
export type FinalSelectionUncheckedCreateNestedManyWithoutRecommendationItemInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalSelectionCreateWithoutRecommendationItemInput[] | Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalSelectionCreateManyRecommendationItemInputEnvelope;
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
};
export type FinalSelectionUpdateManyWithoutRecommendationItemNestedInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalSelectionCreateWithoutRecommendationItemInput[] | Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput[];
    upsert?: Prisma.FinalSelectionUpsertWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalSelectionUpsertWithWhereUniqueWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalSelectionCreateManyRecommendationItemInputEnvelope;
    set?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    disconnect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    delete?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    update?: Prisma.FinalSelectionUpdateWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalSelectionUpdateWithWhereUniqueWithoutRecommendationItemInput[];
    updateMany?: Prisma.FinalSelectionUpdateManyWithWhereWithoutRecommendationItemInput | Prisma.FinalSelectionUpdateManyWithWhereWithoutRecommendationItemInput[];
    deleteMany?: Prisma.FinalSelectionScalarWhereInput | Prisma.FinalSelectionScalarWhereInput[];
};
export type FinalSelectionUncheckedUpdateManyWithoutRecommendationItemNestedInput = {
    create?: Prisma.XOR<Prisma.FinalSelectionCreateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalSelectionCreateWithoutRecommendationItemInput[] | Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalSelectionCreateOrConnectWithoutRecommendationItemInput[];
    upsert?: Prisma.FinalSelectionUpsertWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalSelectionUpsertWithWhereUniqueWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalSelectionCreateManyRecommendationItemInputEnvelope;
    set?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    disconnect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    delete?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    connect?: Prisma.FinalSelectionWhereUniqueInput | Prisma.FinalSelectionWhereUniqueInput[];
    update?: Prisma.FinalSelectionUpdateWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalSelectionUpdateWithWhereUniqueWithoutRecommendationItemInput[];
    updateMany?: Prisma.FinalSelectionUpdateManyWithWhereWithoutRecommendationItemInput | Prisma.FinalSelectionUpdateManyWithWhereWithoutRecommendationItemInput[];
    deleteMany?: Prisma.FinalSelectionScalarWhereInput | Prisma.FinalSelectionScalarWhereInput[];
};
export type EnumFinalSelectionMethodFieldUpdateOperationsInput = {
    set?: $Enums.FinalSelectionMethod;
};
export type FinalSelectionCreateWithoutSelectedByInput = {
    id?: string;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutFinalSelectionInput;
    recommendationItem: Prisma.RecommendationItemCreateNestedOneWithoutFinalSelectionsInput;
};
export type FinalSelectionUncheckedCreateWithoutSelectedByInput = {
    id?: string;
    sessionId: string;
    recommendationItemId: string;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionCreateOrConnectWithoutSelectedByInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput>;
};
export type FinalSelectionCreateManySelectedByInputEnvelope = {
    data: Prisma.FinalSelectionCreateManySelectedByInput | Prisma.FinalSelectionCreateManySelectedByInput[];
    skipDuplicates?: boolean;
};
export type FinalSelectionUpsertWithWhereUniqueWithoutSelectedByInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinalSelectionUpdateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedUpdateWithoutSelectedByInput>;
    create: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedCreateWithoutSelectedByInput>;
};
export type FinalSelectionUpdateWithWhereUniqueWithoutSelectedByInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateWithoutSelectedByInput, Prisma.FinalSelectionUncheckedUpdateWithoutSelectedByInput>;
};
export type FinalSelectionUpdateManyWithWhereWithoutSelectedByInput = {
    where: Prisma.FinalSelectionScalarWhereInput;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateManyMutationInput, Prisma.FinalSelectionUncheckedUpdateManyWithoutSelectedByInput>;
};
export type FinalSelectionScalarWhereInput = {
    AND?: Prisma.FinalSelectionScalarWhereInput | Prisma.FinalSelectionScalarWhereInput[];
    OR?: Prisma.FinalSelectionScalarWhereInput[];
    NOT?: Prisma.FinalSelectionScalarWhereInput | Prisma.FinalSelectionScalarWhereInput[];
    id?: Prisma.StringFilter<"FinalSelection"> | string;
    sessionId?: Prisma.StringFilter<"FinalSelection"> | string;
    recommendationItemId?: Prisma.StringFilter<"FinalSelection"> | string;
    selectedById?: Prisma.StringNullableFilter<"FinalSelection"> | string | null;
    method?: Prisma.EnumFinalSelectionMethodFilter<"FinalSelection"> | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFilter<"FinalSelection"> | Date | string;
};
export type FinalSelectionCreateWithoutSessionInput = {
    id?: string;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
    recommendationItem: Prisma.RecommendationItemCreateNestedOneWithoutFinalSelectionsInput;
    selectedBy?: Prisma.UserCreateNestedOneWithoutFinalSelectionsInput;
};
export type FinalSelectionUncheckedCreateWithoutSessionInput = {
    id?: string;
    recommendationItemId: string;
    selectedById?: string | null;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionCreateOrConnectWithoutSessionInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSessionInput, Prisma.FinalSelectionUncheckedCreateWithoutSessionInput>;
};
export type FinalSelectionUpsertWithoutSessionInput = {
    update: Prisma.XOR<Prisma.FinalSelectionUpdateWithoutSessionInput, Prisma.FinalSelectionUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.FinalSelectionCreateWithoutSessionInput, Prisma.FinalSelectionUncheckedCreateWithoutSessionInput>;
    where?: Prisma.FinalSelectionWhereInput;
};
export type FinalSelectionUpdateToOneWithWhereWithoutSessionInput = {
    where?: Prisma.FinalSelectionWhereInput;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateWithoutSessionInput, Prisma.FinalSelectionUncheckedUpdateWithoutSessionInput>;
};
export type FinalSelectionUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    recommendationItem?: Prisma.RecommendationItemUpdateOneRequiredWithoutFinalSelectionsNestedInput;
    selectedBy?: Prisma.UserUpdateOneWithoutFinalSelectionsNestedInput;
};
export type FinalSelectionUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionCreateWithoutRecommendationItemInput = {
    id?: string;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutFinalSelectionInput;
    selectedBy?: Prisma.UserCreateNestedOneWithoutFinalSelectionsInput;
};
export type FinalSelectionUncheckedCreateWithoutRecommendationItemInput = {
    id?: string;
    sessionId: string;
    selectedById?: string | null;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionCreateOrConnectWithoutRecommendationItemInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalSelectionCreateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput>;
};
export type FinalSelectionCreateManyRecommendationItemInputEnvelope = {
    data: Prisma.FinalSelectionCreateManyRecommendationItemInput | Prisma.FinalSelectionCreateManyRecommendationItemInput[];
    skipDuplicates?: boolean;
};
export type FinalSelectionUpsertWithWhereUniqueWithoutRecommendationItemInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinalSelectionUpdateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedUpdateWithoutRecommendationItemInput>;
    create: Prisma.XOR<Prisma.FinalSelectionCreateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedCreateWithoutRecommendationItemInput>;
};
export type FinalSelectionUpdateWithWhereUniqueWithoutRecommendationItemInput = {
    where: Prisma.FinalSelectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateWithoutRecommendationItemInput, Prisma.FinalSelectionUncheckedUpdateWithoutRecommendationItemInput>;
};
export type FinalSelectionUpdateManyWithWhereWithoutRecommendationItemInput = {
    where: Prisma.FinalSelectionScalarWhereInput;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateManyMutationInput, Prisma.FinalSelectionUncheckedUpdateManyWithoutRecommendationItemInput>;
};
export type FinalSelectionCreateManySelectedByInput = {
    id?: string;
    sessionId: string;
    recommendationItemId: string;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionUpdateWithoutSelectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutFinalSelectionNestedInput;
    recommendationItem?: Prisma.RecommendationItemUpdateOneRequiredWithoutFinalSelectionsNestedInput;
};
export type FinalSelectionUncheckedUpdateWithoutSelectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionUncheckedUpdateManyWithoutSelectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionCreateManyRecommendationItemInput = {
    id?: string;
    sessionId: string;
    selectedById?: string | null;
    method: $Enums.FinalSelectionMethod;
    selectedAt?: Date | string;
};
export type FinalSelectionUpdateWithoutRecommendationItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutFinalSelectionNestedInput;
    selectedBy?: Prisma.UserUpdateOneWithoutFinalSelectionsNestedInput;
};
export type FinalSelectionUncheckedUpdateWithoutRecommendationItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionUncheckedUpdateManyWithoutRecommendationItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    method?: Prisma.EnumFinalSelectionMethodFieldUpdateOperationsInput | $Enums.FinalSelectionMethod;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalSelectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    recommendationItemId?: boolean;
    selectedById?: boolean;
    method?: boolean;
    selectedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.FinalSelection$selectedByArgs<ExtArgs>;
}, ExtArgs["result"]["finalSelection"]>;
export type FinalSelectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    recommendationItemId?: boolean;
    selectedById?: boolean;
    method?: boolean;
    selectedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.FinalSelection$selectedByArgs<ExtArgs>;
}, ExtArgs["result"]["finalSelection"]>;
export type FinalSelectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    recommendationItemId?: boolean;
    selectedById?: boolean;
    method?: boolean;
    selectedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.FinalSelection$selectedByArgs<ExtArgs>;
}, ExtArgs["result"]["finalSelection"]>;
export type FinalSelectionSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    recommendationItemId?: boolean;
    selectedById?: boolean;
    method?: boolean;
    selectedAt?: boolean;
};
export type FinalSelectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "recommendationItemId" | "selectedById" | "method" | "selectedAt", ExtArgs["result"]["finalSelection"]>;
export type FinalSelectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.FinalSelection$selectedByArgs<ExtArgs>;
};
export type FinalSelectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.FinalSelection$selectedByArgs<ExtArgs>;
};
export type FinalSelectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.FinalSelection$selectedByArgs<ExtArgs>;
};
export type $FinalSelectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FinalSelection";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        recommendationItem: Prisma.$RecommendationItemPayload<ExtArgs>;
        selectedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        recommendationItemId: string;
        selectedById: string | null;
        method: $Enums.FinalSelectionMethod;
        selectedAt: Date;
    }, ExtArgs["result"]["finalSelection"]>;
    composites: {};
};
export type FinalSelectionGetPayload<S extends boolean | null | undefined | FinalSelectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload, S>;
export type FinalSelectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FinalSelectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FinalSelectionCountAggregateInputType | true;
};
export interface FinalSelectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FinalSelection'];
        meta: {
            name: 'FinalSelection';
        };
    };
    findUnique<T extends FinalSelectionFindUniqueArgs>(args: Prisma.SelectSubset<T, FinalSelectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FinalSelectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FinalSelectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FinalSelectionFindFirstArgs>(args?: Prisma.SelectSubset<T, FinalSelectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FinalSelectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FinalSelectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FinalSelectionFindManyArgs>(args?: Prisma.SelectSubset<T, FinalSelectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FinalSelectionCreateArgs>(args: Prisma.SelectSubset<T, FinalSelectionCreateArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FinalSelectionCreateManyArgs>(args?: Prisma.SelectSubset<T, FinalSelectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FinalSelectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FinalSelectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FinalSelectionDeleteArgs>(args: Prisma.SelectSubset<T, FinalSelectionDeleteArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FinalSelectionUpdateArgs>(args: Prisma.SelectSubset<T, FinalSelectionUpdateArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FinalSelectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, FinalSelectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FinalSelectionUpdateManyArgs>(args: Prisma.SelectSubset<T, FinalSelectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FinalSelectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FinalSelectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FinalSelectionUpsertArgs>(args: Prisma.SelectSubset<T, FinalSelectionUpsertArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FinalSelectionCountArgs>(args?: Prisma.Subset<T, FinalSelectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FinalSelectionCountAggregateOutputType> : number>;
    aggregate<T extends FinalSelectionAggregateArgs>(args: Prisma.Subset<T, FinalSelectionAggregateArgs>): Prisma.PrismaPromise<GetFinalSelectionAggregateType<T>>;
    groupBy<T extends FinalSelectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FinalSelectionGroupByArgs['orderBy'];
    } : {
        orderBy?: FinalSelectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FinalSelectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinalSelectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FinalSelectionFieldRefs;
}
export interface Prisma__FinalSelectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    recommendationItem<T extends Prisma.RecommendationItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationItemDefaultArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    selectedBy<T extends Prisma.FinalSelection$selectedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FinalSelection$selectedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FinalSelectionFieldRefs {
    readonly id: Prisma.FieldRef<"FinalSelection", 'String'>;
    readonly sessionId: Prisma.FieldRef<"FinalSelection", 'String'>;
    readonly recommendationItemId: Prisma.FieldRef<"FinalSelection", 'String'>;
    readonly selectedById: Prisma.FieldRef<"FinalSelection", 'String'>;
    readonly method: Prisma.FieldRef<"FinalSelection", 'FinalSelectionMethod'>;
    readonly selectedAt: Prisma.FieldRef<"FinalSelection", 'DateTime'>;
}
export type FinalSelectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where: Prisma.FinalSelectionWhereUniqueInput;
};
export type FinalSelectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where: Prisma.FinalSelectionWhereUniqueInput;
};
export type FinalSelectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where?: Prisma.FinalSelectionWhereInput;
    orderBy?: Prisma.FinalSelectionOrderByWithRelationInput | Prisma.FinalSelectionOrderByWithRelationInput[];
    cursor?: Prisma.FinalSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinalSelectionScalarFieldEnum | Prisma.FinalSelectionScalarFieldEnum[];
};
export type FinalSelectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where?: Prisma.FinalSelectionWhereInput;
    orderBy?: Prisma.FinalSelectionOrderByWithRelationInput | Prisma.FinalSelectionOrderByWithRelationInput[];
    cursor?: Prisma.FinalSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinalSelectionScalarFieldEnum | Prisma.FinalSelectionScalarFieldEnum[];
};
export type FinalSelectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where?: Prisma.FinalSelectionWhereInput;
    orderBy?: Prisma.FinalSelectionOrderByWithRelationInput | Prisma.FinalSelectionOrderByWithRelationInput[];
    cursor?: Prisma.FinalSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinalSelectionScalarFieldEnum | Prisma.FinalSelectionScalarFieldEnum[];
};
export type FinalSelectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinalSelectionCreateInput, Prisma.FinalSelectionUncheckedCreateInput>;
};
export type FinalSelectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FinalSelectionCreateManyInput | Prisma.FinalSelectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FinalSelectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    data: Prisma.FinalSelectionCreateManyInput | Prisma.FinalSelectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FinalSelectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FinalSelectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateInput, Prisma.FinalSelectionUncheckedUpdateInput>;
    where: Prisma.FinalSelectionWhereUniqueInput;
};
export type FinalSelectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FinalSelectionUpdateManyMutationInput, Prisma.FinalSelectionUncheckedUpdateManyInput>;
    where?: Prisma.FinalSelectionWhereInput;
    limit?: number;
};
export type FinalSelectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinalSelectionUpdateManyMutationInput, Prisma.FinalSelectionUncheckedUpdateManyInput>;
    where?: Prisma.FinalSelectionWhereInput;
    limit?: number;
    include?: Prisma.FinalSelectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FinalSelectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where: Prisma.FinalSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalSelectionCreateInput, Prisma.FinalSelectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FinalSelectionUpdateInput, Prisma.FinalSelectionUncheckedUpdateInput>;
};
export type FinalSelectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where: Prisma.FinalSelectionWhereUniqueInput;
};
export type FinalSelectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalSelectionWhereInput;
    limit?: number;
};
export type FinalSelection$selectedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type FinalSelectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
};
