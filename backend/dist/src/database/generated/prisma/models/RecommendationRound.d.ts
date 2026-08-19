import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RecommendationRoundModel = runtime.Types.Result.DefaultSelection<Prisma.$RecommendationRoundPayload>;
export type AggregateRecommendationRound = {
    _count: RecommendationRoundCountAggregateOutputType | null;
    _avg: RecommendationRoundAvgAggregateOutputType | null;
    _sum: RecommendationRoundSumAggregateOutputType | null;
    _min: RecommendationRoundMinAggregateOutputType | null;
    _max: RecommendationRoundMaxAggregateOutputType | null;
};
export type RecommendationRoundAvgAggregateOutputType = {
    roundNumber: number | null;
};
export type RecommendationRoundSumAggregateOutputType = {
    roundNumber: number | null;
};
export type RecommendationRoundMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    roundNumber: number | null;
    status: $Enums.RecommendationRoundStatus | null;
    generatedAt: Date | null;
    completedAt: Date | null;
};
export type RecommendationRoundMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    roundNumber: number | null;
    status: $Enums.RecommendationRoundStatus | null;
    generatedAt: Date | null;
    completedAt: Date | null;
};
export type RecommendationRoundCountAggregateOutputType = {
    id: number;
    sessionId: number;
    roundNumber: number;
    status: number;
    generatedAt: number;
    completedAt: number;
    _all: number;
};
export type RecommendationRoundAvgAggregateInputType = {
    roundNumber?: true;
};
export type RecommendationRoundSumAggregateInputType = {
    roundNumber?: true;
};
export type RecommendationRoundMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    roundNumber?: true;
    status?: true;
    generatedAt?: true;
    completedAt?: true;
};
export type RecommendationRoundMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    roundNumber?: true;
    status?: true;
    generatedAt?: true;
    completedAt?: true;
};
export type RecommendationRoundCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    roundNumber?: true;
    status?: true;
    generatedAt?: true;
    completedAt?: true;
    _all?: true;
};
export type RecommendationRoundAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationRoundWhereInput;
    orderBy?: Prisma.RecommendationRoundOrderByWithRelationInput | Prisma.RecommendationRoundOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationRoundWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecommendationRoundCountAggregateInputType;
    _avg?: RecommendationRoundAvgAggregateInputType;
    _sum?: RecommendationRoundSumAggregateInputType;
    _min?: RecommendationRoundMinAggregateInputType;
    _max?: RecommendationRoundMaxAggregateInputType;
};
export type GetRecommendationRoundAggregateType<T extends RecommendationRoundAggregateArgs> = {
    [P in keyof T & keyof AggregateRecommendationRound]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecommendationRound[P]> : Prisma.GetScalarType<T[P], AggregateRecommendationRound[P]>;
};
export type RecommendationRoundGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationRoundWhereInput;
    orderBy?: Prisma.RecommendationRoundOrderByWithAggregationInput | Prisma.RecommendationRoundOrderByWithAggregationInput[];
    by: Prisma.RecommendationRoundScalarFieldEnum[] | Prisma.RecommendationRoundScalarFieldEnum;
    having?: Prisma.RecommendationRoundScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecommendationRoundCountAggregateInputType | true;
    _avg?: RecommendationRoundAvgAggregateInputType;
    _sum?: RecommendationRoundSumAggregateInputType;
    _min?: RecommendationRoundMinAggregateInputType;
    _max?: RecommendationRoundMaxAggregateInputType;
};
export type RecommendationRoundGroupByOutputType = {
    id: string;
    sessionId: string;
    roundNumber: number;
    status: $Enums.RecommendationRoundStatus;
    generatedAt: Date;
    completedAt: Date | null;
    _count: RecommendationRoundCountAggregateOutputType | null;
    _avg: RecommendationRoundAvgAggregateOutputType | null;
    _sum: RecommendationRoundSumAggregateOutputType | null;
    _min: RecommendationRoundMinAggregateOutputType | null;
    _max: RecommendationRoundMaxAggregateOutputType | null;
};
export type GetRecommendationRoundGroupByPayload<T extends RecommendationRoundGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecommendationRoundGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecommendationRoundGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecommendationRoundGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecommendationRoundGroupByOutputType[P]>;
}>>;
export type RecommendationRoundWhereInput = {
    AND?: Prisma.RecommendationRoundWhereInput | Prisma.RecommendationRoundWhereInput[];
    OR?: Prisma.RecommendationRoundWhereInput[];
    NOT?: Prisma.RecommendationRoundWhereInput | Prisma.RecommendationRoundWhereInput[];
    id?: Prisma.StringFilter<"RecommendationRound"> | string;
    sessionId?: Prisma.StringFilter<"RecommendationRound"> | string;
    roundNumber?: Prisma.IntFilter<"RecommendationRound"> | number;
    status?: Prisma.EnumRecommendationRoundStatusFilter<"RecommendationRound"> | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFilter<"RecommendationRound"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"RecommendationRound"> | Date | string | null;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    items?: Prisma.RecommendationItemListRelationFilter;
};
export type RecommendationRoundOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    roundNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    items?: Prisma.RecommendationItemOrderByRelationAggregateInput;
};
export type RecommendationRoundWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId_roundNumber?: Prisma.RecommendationRoundSessionIdRoundNumberCompoundUniqueInput;
    AND?: Prisma.RecommendationRoundWhereInput | Prisma.RecommendationRoundWhereInput[];
    OR?: Prisma.RecommendationRoundWhereInput[];
    NOT?: Prisma.RecommendationRoundWhereInput | Prisma.RecommendationRoundWhereInput[];
    sessionId?: Prisma.StringFilter<"RecommendationRound"> | string;
    roundNumber?: Prisma.IntFilter<"RecommendationRound"> | number;
    status?: Prisma.EnumRecommendationRoundStatusFilter<"RecommendationRound"> | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFilter<"RecommendationRound"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"RecommendationRound"> | Date | string | null;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    items?: Prisma.RecommendationItemListRelationFilter;
}, "id" | "sessionId_roundNumber">;
export type RecommendationRoundOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    roundNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.RecommendationRoundCountOrderByAggregateInput;
    _avg?: Prisma.RecommendationRoundAvgOrderByAggregateInput;
    _max?: Prisma.RecommendationRoundMaxOrderByAggregateInput;
    _min?: Prisma.RecommendationRoundMinOrderByAggregateInput;
    _sum?: Prisma.RecommendationRoundSumOrderByAggregateInput;
};
export type RecommendationRoundScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecommendationRoundScalarWhereWithAggregatesInput | Prisma.RecommendationRoundScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecommendationRoundScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecommendationRoundScalarWhereWithAggregatesInput | Prisma.RecommendationRoundScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecommendationRound"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"RecommendationRound"> | string;
    roundNumber?: Prisma.IntWithAggregatesFilter<"RecommendationRound"> | number;
    status?: Prisma.EnumRecommendationRoundStatusWithAggregatesFilter<"RecommendationRound"> | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeWithAggregatesFilter<"RecommendationRound"> | Date | string;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RecommendationRound"> | Date | string | null;
};
export type RecommendationRoundCreateInput = {
    id?: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutRecommendationRoundsInput;
    items?: Prisma.RecommendationItemCreateNestedManyWithoutRoundInput;
};
export type RecommendationRoundUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
    items?: Prisma.RecommendationItemUncheckedCreateNestedManyWithoutRoundInput;
};
export type RecommendationRoundUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutRecommendationRoundsNestedInput;
    items?: Prisma.RecommendationItemUpdateManyWithoutRoundNestedInput;
};
export type RecommendationRoundUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.RecommendationItemUncheckedUpdateManyWithoutRoundNestedInput;
};
export type RecommendationRoundCreateManyInput = {
    id?: string;
    sessionId: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
};
export type RecommendationRoundUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RecommendationRoundUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RecommendationRoundListRelationFilter = {
    every?: Prisma.RecommendationRoundWhereInput;
    some?: Prisma.RecommendationRoundWhereInput;
    none?: Prisma.RecommendationRoundWhereInput;
};
export type RecommendationRoundOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecommendationRoundSessionIdRoundNumberCompoundUniqueInput = {
    sessionId: string;
    roundNumber: number;
};
export type RecommendationRoundCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    roundNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type RecommendationRoundAvgOrderByAggregateInput = {
    roundNumber?: Prisma.SortOrder;
};
export type RecommendationRoundMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    roundNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type RecommendationRoundMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    roundNumber?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    generatedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
};
export type RecommendationRoundSumOrderByAggregateInput = {
    roundNumber?: Prisma.SortOrder;
};
export type RecommendationRoundScalarRelationFilter = {
    is?: Prisma.RecommendationRoundWhereInput;
    isNot?: Prisma.RecommendationRoundWhereInput;
};
export type RecommendationRoundCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutSessionInput, Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput> | Prisma.RecommendationRoundCreateWithoutSessionInput[] | Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput | Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.RecommendationRoundCreateManySessionInputEnvelope;
    connect?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
};
export type RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutSessionInput, Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput> | Prisma.RecommendationRoundCreateWithoutSessionInput[] | Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput | Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.RecommendationRoundCreateManySessionInputEnvelope;
    connect?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
};
export type RecommendationRoundUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutSessionInput, Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput> | Prisma.RecommendationRoundCreateWithoutSessionInput[] | Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput | Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.RecommendationRoundUpsertWithWhereUniqueWithoutSessionInput | Prisma.RecommendationRoundUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.RecommendationRoundCreateManySessionInputEnvelope;
    set?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    disconnect?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    delete?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    connect?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    update?: Prisma.RecommendationRoundUpdateWithWhereUniqueWithoutSessionInput | Prisma.RecommendationRoundUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.RecommendationRoundUpdateManyWithWhereWithoutSessionInput | Prisma.RecommendationRoundUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.RecommendationRoundScalarWhereInput | Prisma.RecommendationRoundScalarWhereInput[];
};
export type RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutSessionInput, Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput> | Prisma.RecommendationRoundCreateWithoutSessionInput[] | Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput | Prisma.RecommendationRoundCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.RecommendationRoundUpsertWithWhereUniqueWithoutSessionInput | Prisma.RecommendationRoundUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.RecommendationRoundCreateManySessionInputEnvelope;
    set?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    disconnect?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    delete?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    connect?: Prisma.RecommendationRoundWhereUniqueInput | Prisma.RecommendationRoundWhereUniqueInput[];
    update?: Prisma.RecommendationRoundUpdateWithWhereUniqueWithoutSessionInput | Prisma.RecommendationRoundUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.RecommendationRoundUpdateManyWithWhereWithoutSessionInput | Prisma.RecommendationRoundUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.RecommendationRoundScalarWhereInput | Prisma.RecommendationRoundScalarWhereInput[];
};
export type EnumRecommendationRoundStatusFieldUpdateOperationsInput = {
    set?: $Enums.RecommendationRoundStatus;
};
export type RecommendationRoundCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutItemsInput, Prisma.RecommendationRoundUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.RecommendationRoundCreateOrConnectWithoutItemsInput;
    connect?: Prisma.RecommendationRoundWhereUniqueInput;
};
export type RecommendationRoundUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutItemsInput, Prisma.RecommendationRoundUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.RecommendationRoundCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.RecommendationRoundUpsertWithoutItemsInput;
    connect?: Prisma.RecommendationRoundWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecommendationRoundUpdateToOneWithWhereWithoutItemsInput, Prisma.RecommendationRoundUpdateWithoutItemsInput>, Prisma.RecommendationRoundUncheckedUpdateWithoutItemsInput>;
};
export type RecommendationRoundCreateWithoutSessionInput = {
    id?: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
    items?: Prisma.RecommendationItemCreateNestedManyWithoutRoundInput;
};
export type RecommendationRoundUncheckedCreateWithoutSessionInput = {
    id?: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
    items?: Prisma.RecommendationItemUncheckedCreateNestedManyWithoutRoundInput;
};
export type RecommendationRoundCreateOrConnectWithoutSessionInput = {
    where: Prisma.RecommendationRoundWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutSessionInput, Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput>;
};
export type RecommendationRoundCreateManySessionInputEnvelope = {
    data: Prisma.RecommendationRoundCreateManySessionInput | Prisma.RecommendationRoundCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type RecommendationRoundUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.RecommendationRoundWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecommendationRoundUpdateWithoutSessionInput, Prisma.RecommendationRoundUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutSessionInput, Prisma.RecommendationRoundUncheckedCreateWithoutSessionInput>;
};
export type RecommendationRoundUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.RecommendationRoundWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecommendationRoundUpdateWithoutSessionInput, Prisma.RecommendationRoundUncheckedUpdateWithoutSessionInput>;
};
export type RecommendationRoundUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.RecommendationRoundScalarWhereInput;
    data: Prisma.XOR<Prisma.RecommendationRoundUpdateManyMutationInput, Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionInput>;
};
export type RecommendationRoundScalarWhereInput = {
    AND?: Prisma.RecommendationRoundScalarWhereInput | Prisma.RecommendationRoundScalarWhereInput[];
    OR?: Prisma.RecommendationRoundScalarWhereInput[];
    NOT?: Prisma.RecommendationRoundScalarWhereInput | Prisma.RecommendationRoundScalarWhereInput[];
    id?: Prisma.StringFilter<"RecommendationRound"> | string;
    sessionId?: Prisma.StringFilter<"RecommendationRound"> | string;
    roundNumber?: Prisma.IntFilter<"RecommendationRound"> | number;
    status?: Prisma.EnumRecommendationRoundStatusFilter<"RecommendationRound"> | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFilter<"RecommendationRound"> | Date | string;
    completedAt?: Prisma.DateTimeNullableFilter<"RecommendationRound"> | Date | string | null;
};
export type RecommendationRoundCreateWithoutItemsInput = {
    id?: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutRecommendationRoundsInput;
};
export type RecommendationRoundUncheckedCreateWithoutItemsInput = {
    id?: string;
    sessionId: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
};
export type RecommendationRoundCreateOrConnectWithoutItemsInput = {
    where: Prisma.RecommendationRoundWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutItemsInput, Prisma.RecommendationRoundUncheckedCreateWithoutItemsInput>;
};
export type RecommendationRoundUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.RecommendationRoundUpdateWithoutItemsInput, Prisma.RecommendationRoundUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.RecommendationRoundCreateWithoutItemsInput, Prisma.RecommendationRoundUncheckedCreateWithoutItemsInput>;
    where?: Prisma.RecommendationRoundWhereInput;
};
export type RecommendationRoundUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.RecommendationRoundWhereInput;
    data: Prisma.XOR<Prisma.RecommendationRoundUpdateWithoutItemsInput, Prisma.RecommendationRoundUncheckedUpdateWithoutItemsInput>;
};
export type RecommendationRoundUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutRecommendationRoundsNestedInput;
};
export type RecommendationRoundUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RecommendationRoundCreateManySessionInput = {
    id?: string;
    roundNumber: number;
    status?: $Enums.RecommendationRoundStatus;
    generatedAt?: Date | string;
    completedAt?: Date | string | null;
};
export type RecommendationRoundUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.RecommendationItemUpdateManyWithoutRoundNestedInput;
};
export type RecommendationRoundUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    items?: Prisma.RecommendationItemUncheckedUpdateManyWithoutRoundNestedInput;
};
export type RecommendationRoundUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roundNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumRecommendationRoundStatusFieldUpdateOperationsInput | $Enums.RecommendationRoundStatus;
    generatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RecommendationRoundCountOutputType = {
    items: number;
};
export type RecommendationRoundCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | RecommendationRoundCountOutputTypeCountItemsArgs;
};
export type RecommendationRoundCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundCountOutputTypeSelect<ExtArgs> | null;
};
export type RecommendationRoundCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationItemWhereInput;
};
export type RecommendationRoundSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    roundNumber?: boolean;
    status?: boolean;
    generatedAt?: boolean;
    completedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.RecommendationRound$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.RecommendationRoundCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationRound"]>;
export type RecommendationRoundSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    roundNumber?: boolean;
    status?: boolean;
    generatedAt?: boolean;
    completedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationRound"]>;
export type RecommendationRoundSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    roundNumber?: boolean;
    status?: boolean;
    generatedAt?: boolean;
    completedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationRound"]>;
export type RecommendationRoundSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    roundNumber?: boolean;
    status?: boolean;
    generatedAt?: boolean;
    completedAt?: boolean;
};
export type RecommendationRoundOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "roundNumber" | "status" | "generatedAt" | "completedAt", ExtArgs["result"]["recommendationRound"]>;
export type RecommendationRoundInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    items?: boolean | Prisma.RecommendationRound$itemsArgs<ExtArgs>;
    _count?: boolean | Prisma.RecommendationRoundCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RecommendationRoundIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
};
export type RecommendationRoundIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
};
export type $RecommendationRoundPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecommendationRound";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        items: Prisma.$RecommendationItemPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        roundNumber: number;
        status: $Enums.RecommendationRoundStatus;
        generatedAt: Date;
        completedAt: Date | null;
    }, ExtArgs["result"]["recommendationRound"]>;
    composites: {};
};
export type RecommendationRoundGetPayload<S extends boolean | null | undefined | RecommendationRoundDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload, S>;
export type RecommendationRoundCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecommendationRoundFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecommendationRoundCountAggregateInputType | true;
};
export interface RecommendationRoundDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecommendationRound'];
        meta: {
            name: 'RecommendationRound';
        };
    };
    findUnique<T extends RecommendationRoundFindUniqueArgs>(args: Prisma.SelectSubset<T, RecommendationRoundFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecommendationRoundFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecommendationRoundFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecommendationRoundFindFirstArgs>(args?: Prisma.SelectSubset<T, RecommendationRoundFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecommendationRoundFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecommendationRoundFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecommendationRoundFindManyArgs>(args?: Prisma.SelectSubset<T, RecommendationRoundFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecommendationRoundCreateArgs>(args: Prisma.SelectSubset<T, RecommendationRoundCreateArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecommendationRoundCreateManyArgs>(args?: Prisma.SelectSubset<T, RecommendationRoundCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecommendationRoundCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecommendationRoundCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecommendationRoundDeleteArgs>(args: Prisma.SelectSubset<T, RecommendationRoundDeleteArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecommendationRoundUpdateArgs>(args: Prisma.SelectSubset<T, RecommendationRoundUpdateArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecommendationRoundDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecommendationRoundDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecommendationRoundUpdateManyArgs>(args: Prisma.SelectSubset<T, RecommendationRoundUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecommendationRoundUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecommendationRoundUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecommendationRoundUpsertArgs>(args: Prisma.SelectSubset<T, RecommendationRoundUpsertArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecommendationRoundCountArgs>(args?: Prisma.Subset<T, RecommendationRoundCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecommendationRoundCountAggregateOutputType> : number>;
    aggregate<T extends RecommendationRoundAggregateArgs>(args: Prisma.Subset<T, RecommendationRoundAggregateArgs>): Prisma.PrismaPromise<GetRecommendationRoundAggregateType<T>>;
    groupBy<T extends RecommendationRoundGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecommendationRoundGroupByArgs['orderBy'];
    } : {
        orderBy?: RecommendationRoundGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecommendationRoundGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationRoundGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecommendationRoundFieldRefs;
}
export interface Prisma__RecommendationRoundClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.RecommendationRound$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationRound$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecommendationRoundFieldRefs {
    readonly id: Prisma.FieldRef<"RecommendationRound", 'String'>;
    readonly sessionId: Prisma.FieldRef<"RecommendationRound", 'String'>;
    readonly roundNumber: Prisma.FieldRef<"RecommendationRound", 'Int'>;
    readonly status: Prisma.FieldRef<"RecommendationRound", 'RecommendationRoundStatus'>;
    readonly generatedAt: Prisma.FieldRef<"RecommendationRound", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"RecommendationRound", 'DateTime'>;
}
export type RecommendationRoundFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where: Prisma.RecommendationRoundWhereUniqueInput;
};
export type RecommendationRoundFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where: Prisma.RecommendationRoundWhereUniqueInput;
};
export type RecommendationRoundFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where?: Prisma.RecommendationRoundWhereInput;
    orderBy?: Prisma.RecommendationRoundOrderByWithRelationInput | Prisma.RecommendationRoundOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationRoundWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationRoundScalarFieldEnum | Prisma.RecommendationRoundScalarFieldEnum[];
};
export type RecommendationRoundFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where?: Prisma.RecommendationRoundWhereInput;
    orderBy?: Prisma.RecommendationRoundOrderByWithRelationInput | Prisma.RecommendationRoundOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationRoundWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationRoundScalarFieldEnum | Prisma.RecommendationRoundScalarFieldEnum[];
};
export type RecommendationRoundFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where?: Prisma.RecommendationRoundWhereInput;
    orderBy?: Prisma.RecommendationRoundOrderByWithRelationInput | Prisma.RecommendationRoundOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationRoundWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationRoundScalarFieldEnum | Prisma.RecommendationRoundScalarFieldEnum[];
};
export type RecommendationRoundCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationRoundCreateInput, Prisma.RecommendationRoundUncheckedCreateInput>;
};
export type RecommendationRoundCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecommendationRoundCreateManyInput | Prisma.RecommendationRoundCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecommendationRoundCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    data: Prisma.RecommendationRoundCreateManyInput | Prisma.RecommendationRoundCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecommendationRoundIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecommendationRoundUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationRoundUpdateInput, Prisma.RecommendationRoundUncheckedUpdateInput>;
    where: Prisma.RecommendationRoundWhereUniqueInput;
};
export type RecommendationRoundUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecommendationRoundUpdateManyMutationInput, Prisma.RecommendationRoundUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationRoundWhereInput;
    limit?: number;
};
export type RecommendationRoundUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationRoundUpdateManyMutationInput, Prisma.RecommendationRoundUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationRoundWhereInput;
    limit?: number;
    include?: Prisma.RecommendationRoundIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecommendationRoundUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where: Prisma.RecommendationRoundWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationRoundCreateInput, Prisma.RecommendationRoundUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecommendationRoundUpdateInput, Prisma.RecommendationRoundUncheckedUpdateInput>;
};
export type RecommendationRoundDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
    where: Prisma.RecommendationRoundWhereUniqueInput;
};
export type RecommendationRoundDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationRoundWhereInput;
    limit?: number;
};
export type RecommendationRound$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    where?: Prisma.RecommendationItemWhereInput;
    orderBy?: Prisma.RecommendationItemOrderByWithRelationInput | Prisma.RecommendationItemOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RecommendationItemScalarFieldEnum | Prisma.RecommendationItemScalarFieldEnum[];
};
export type RecommendationRoundDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationRoundSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationRoundOmit<ExtArgs> | null;
    include?: Prisma.RecommendationRoundInclude<ExtArgs> | null;
};
