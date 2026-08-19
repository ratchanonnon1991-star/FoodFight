import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RecommendationItemModel = runtime.Types.Result.DefaultSelection<Prisma.$RecommendationItemPayload>;
export type AggregateRecommendationItem = {
    _count: RecommendationItemCountAggregateOutputType | null;
    _avg: RecommendationItemAvgAggregateOutputType | null;
    _sum: RecommendationItemSumAggregateOutputType | null;
    _min: RecommendationItemMinAggregateOutputType | null;
    _max: RecommendationItemMaxAggregateOutputType | null;
};
export type RecommendationItemAvgAggregateOutputType = {
    recommendationScore: number | null;
    displayOrder: number | null;
};
export type RecommendationItemSumAggregateOutputType = {
    recommendationScore: number | null;
    displayOrder: number | null;
};
export type RecommendationItemMinAggregateOutputType = {
    id: string | null;
    recommendationRoundId: string | null;
    menuName: string | null;
    description: string | null;
    reason: string | null;
    imageUrl: string | null;
    recommendationScore: number | null;
    displayOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecommendationItemMaxAggregateOutputType = {
    id: string | null;
    recommendationRoundId: string | null;
    menuName: string | null;
    description: string | null;
    reason: string | null;
    imageUrl: string | null;
    recommendationScore: number | null;
    displayOrder: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RecommendationItemCountAggregateOutputType = {
    id: number;
    recommendationRoundId: number;
    menuName: number;
    description: number;
    reason: number;
    imageUrl: number;
    recommendationScore: number;
    metadata: number;
    displayOrder: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RecommendationItemAvgAggregateInputType = {
    recommendationScore?: true;
    displayOrder?: true;
};
export type RecommendationItemSumAggregateInputType = {
    recommendationScore?: true;
    displayOrder?: true;
};
export type RecommendationItemMinAggregateInputType = {
    id?: true;
    recommendationRoundId?: true;
    menuName?: true;
    description?: true;
    reason?: true;
    imageUrl?: true;
    recommendationScore?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecommendationItemMaxAggregateInputType = {
    id?: true;
    recommendationRoundId?: true;
    menuName?: true;
    description?: true;
    reason?: true;
    imageUrl?: true;
    recommendationScore?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RecommendationItemCountAggregateInputType = {
    id?: true;
    recommendationRoundId?: true;
    menuName?: true;
    description?: true;
    reason?: true;
    imageUrl?: true;
    recommendationScore?: true;
    metadata?: true;
    displayOrder?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RecommendationItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationItemWhereInput;
    orderBy?: Prisma.RecommendationItemOrderByWithRelationInput | Prisma.RecommendationItemOrderByWithRelationInput[];
    cursor?: Prisma.RecommendationItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RecommendationItemCountAggregateInputType;
    _avg?: RecommendationItemAvgAggregateInputType;
    _sum?: RecommendationItemSumAggregateInputType;
    _min?: RecommendationItemMinAggregateInputType;
    _max?: RecommendationItemMaxAggregateInputType;
};
export type GetRecommendationItemAggregateType<T extends RecommendationItemAggregateArgs> = {
    [P in keyof T & keyof AggregateRecommendationItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRecommendationItem[P]> : Prisma.GetScalarType<T[P], AggregateRecommendationItem[P]>;
};
export type RecommendationItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationItemWhereInput;
    orderBy?: Prisma.RecommendationItemOrderByWithAggregationInput | Prisma.RecommendationItemOrderByWithAggregationInput[];
    by: Prisma.RecommendationItemScalarFieldEnum[] | Prisma.RecommendationItemScalarFieldEnum;
    having?: Prisma.RecommendationItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RecommendationItemCountAggregateInputType | true;
    _avg?: RecommendationItemAvgAggregateInputType;
    _sum?: RecommendationItemSumAggregateInputType;
    _min?: RecommendationItemMinAggregateInputType;
    _max?: RecommendationItemMaxAggregateInputType;
};
export type RecommendationItemGroupByOutputType = {
    id: string;
    recommendationRoundId: string;
    menuName: string;
    description: string | null;
    reason: string | null;
    imageUrl: string | null;
    recommendationScore: number | null;
    metadata: runtime.JsonValue | null;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
    _count: RecommendationItemCountAggregateOutputType | null;
    _avg: RecommendationItemAvgAggregateOutputType | null;
    _sum: RecommendationItemSumAggregateOutputType | null;
    _min: RecommendationItemMinAggregateOutputType | null;
    _max: RecommendationItemMaxAggregateOutputType | null;
};
export type GetRecommendationItemGroupByPayload<T extends RecommendationItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RecommendationItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RecommendationItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RecommendationItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RecommendationItemGroupByOutputType[P]>;
}>>;
export type RecommendationItemWhereInput = {
    AND?: Prisma.RecommendationItemWhereInput | Prisma.RecommendationItemWhereInput[];
    OR?: Prisma.RecommendationItemWhereInput[];
    NOT?: Prisma.RecommendationItemWhereInput | Prisma.RecommendationItemWhereInput[];
    id?: Prisma.StringFilter<"RecommendationItem"> | string;
    recommendationRoundId?: Prisma.StringFilter<"RecommendationItem"> | string;
    menuName?: Prisma.StringFilter<"RecommendationItem"> | string;
    description?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    reason?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    recommendationScore?: Prisma.FloatNullableFilter<"RecommendationItem"> | number | null;
    metadata?: Prisma.JsonNullableFilter<"RecommendationItem">;
    displayOrder?: Prisma.IntFilter<"RecommendationItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"RecommendationItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RecommendationItem"> | Date | string;
    round?: Prisma.XOR<Prisma.RecommendationRoundScalarRelationFilter, Prisma.RecommendationRoundWhereInput>;
    votes?: Prisma.VoteListRelationFilter;
    finalVotes?: Prisma.FinalVoteListRelationFilter;
    finalSelections?: Prisma.FinalSelectionListRelationFilter;
};
export type RecommendationItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    recommendationRoundId?: Prisma.SortOrder;
    menuName?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommendationScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    round?: Prisma.RecommendationRoundOrderByWithRelationInput;
    votes?: Prisma.VoteOrderByRelationAggregateInput;
    finalVotes?: Prisma.FinalVoteOrderByRelationAggregateInput;
    finalSelections?: Prisma.FinalSelectionOrderByRelationAggregateInput;
};
export type RecommendationItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RecommendationItemWhereInput | Prisma.RecommendationItemWhereInput[];
    OR?: Prisma.RecommendationItemWhereInput[];
    NOT?: Prisma.RecommendationItemWhereInput | Prisma.RecommendationItemWhereInput[];
    recommendationRoundId?: Prisma.StringFilter<"RecommendationItem"> | string;
    menuName?: Prisma.StringFilter<"RecommendationItem"> | string;
    description?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    reason?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    recommendationScore?: Prisma.FloatNullableFilter<"RecommendationItem"> | number | null;
    metadata?: Prisma.JsonNullableFilter<"RecommendationItem">;
    displayOrder?: Prisma.IntFilter<"RecommendationItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"RecommendationItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RecommendationItem"> | Date | string;
    round?: Prisma.XOR<Prisma.RecommendationRoundScalarRelationFilter, Prisma.RecommendationRoundWhereInput>;
    votes?: Prisma.VoteListRelationFilter;
    finalVotes?: Prisma.FinalVoteListRelationFilter;
    finalSelections?: Prisma.FinalSelectionListRelationFilter;
}, "id">;
export type RecommendationItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    recommendationRoundId?: Prisma.SortOrder;
    menuName?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    recommendationScore?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RecommendationItemCountOrderByAggregateInput;
    _avg?: Prisma.RecommendationItemAvgOrderByAggregateInput;
    _max?: Prisma.RecommendationItemMaxOrderByAggregateInput;
    _min?: Prisma.RecommendationItemMinOrderByAggregateInput;
    _sum?: Prisma.RecommendationItemSumOrderByAggregateInput;
};
export type RecommendationItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.RecommendationItemScalarWhereWithAggregatesInput | Prisma.RecommendationItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.RecommendationItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RecommendationItemScalarWhereWithAggregatesInput | Prisma.RecommendationItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RecommendationItem"> | string;
    recommendationRoundId?: Prisma.StringWithAggregatesFilter<"RecommendationItem"> | string;
    menuName?: Prisma.StringWithAggregatesFilter<"RecommendationItem"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"RecommendationItem"> | string | null;
    reason?: Prisma.StringNullableWithAggregatesFilter<"RecommendationItem"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"RecommendationItem"> | string | null;
    recommendationScore?: Prisma.FloatNullableWithAggregatesFilter<"RecommendationItem"> | number | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"RecommendationItem">;
    displayOrder?: Prisma.IntWithAggregatesFilter<"RecommendationItem"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RecommendationItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"RecommendationItem"> | Date | string;
};
export type RecommendationItemCreateInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    round: Prisma.RecommendationRoundCreateNestedOneWithoutItemsInput;
    votes?: Prisma.VoteCreateNestedManyWithoutRecommendationItemInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemUncheckedCreateInput = {
    id?: string;
    recommendationRoundId: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionUncheckedCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    round?: Prisma.RecommendationRoundUpdateOneRequiredWithoutItemsNestedInput;
    votes?: Prisma.VoteUpdateManyWithoutRecommendationItemNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationRoundId?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUncheckedUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemCreateManyInput = {
    id?: string;
    recommendationRoundId: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecommendationItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationRoundId?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationItemListRelationFilter = {
    every?: Prisma.RecommendationItemWhereInput;
    some?: Prisma.RecommendationItemWhereInput;
    none?: Prisma.RecommendationItemWhereInput;
};
export type RecommendationItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RecommendationItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recommendationRoundId?: Prisma.SortOrder;
    menuName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    recommendationScore?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecommendationItemAvgOrderByAggregateInput = {
    recommendationScore?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
};
export type RecommendationItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recommendationRoundId?: Prisma.SortOrder;
    menuName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    recommendationScore?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecommendationItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    recommendationRoundId?: Prisma.SortOrder;
    menuName?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    recommendationScore?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RecommendationItemSumOrderByAggregateInput = {
    recommendationScore?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
};
export type RecommendationItemScalarRelationFilter = {
    is?: Prisma.RecommendationItemWhereInput;
    isNot?: Prisma.RecommendationItemWhereInput;
};
export type RecommendationItemCreateNestedManyWithoutRoundInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutRoundInput, Prisma.RecommendationItemUncheckedCreateWithoutRoundInput> | Prisma.RecommendationItemCreateWithoutRoundInput[] | Prisma.RecommendationItemUncheckedCreateWithoutRoundInput[];
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutRoundInput | Prisma.RecommendationItemCreateOrConnectWithoutRoundInput[];
    createMany?: Prisma.RecommendationItemCreateManyRoundInputEnvelope;
    connect?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
};
export type RecommendationItemUncheckedCreateNestedManyWithoutRoundInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutRoundInput, Prisma.RecommendationItemUncheckedCreateWithoutRoundInput> | Prisma.RecommendationItemCreateWithoutRoundInput[] | Prisma.RecommendationItemUncheckedCreateWithoutRoundInput[];
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutRoundInput | Prisma.RecommendationItemCreateOrConnectWithoutRoundInput[];
    createMany?: Prisma.RecommendationItemCreateManyRoundInputEnvelope;
    connect?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
};
export type RecommendationItemUpdateManyWithoutRoundNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutRoundInput, Prisma.RecommendationItemUncheckedCreateWithoutRoundInput> | Prisma.RecommendationItemCreateWithoutRoundInput[] | Prisma.RecommendationItemUncheckedCreateWithoutRoundInput[];
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutRoundInput | Prisma.RecommendationItemCreateOrConnectWithoutRoundInput[];
    upsert?: Prisma.RecommendationItemUpsertWithWhereUniqueWithoutRoundInput | Prisma.RecommendationItemUpsertWithWhereUniqueWithoutRoundInput[];
    createMany?: Prisma.RecommendationItemCreateManyRoundInputEnvelope;
    set?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    disconnect?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    delete?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    connect?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    update?: Prisma.RecommendationItemUpdateWithWhereUniqueWithoutRoundInput | Prisma.RecommendationItemUpdateWithWhereUniqueWithoutRoundInput[];
    updateMany?: Prisma.RecommendationItemUpdateManyWithWhereWithoutRoundInput | Prisma.RecommendationItemUpdateManyWithWhereWithoutRoundInput[];
    deleteMany?: Prisma.RecommendationItemScalarWhereInput | Prisma.RecommendationItemScalarWhereInput[];
};
export type RecommendationItemUncheckedUpdateManyWithoutRoundNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutRoundInput, Prisma.RecommendationItemUncheckedCreateWithoutRoundInput> | Prisma.RecommendationItemCreateWithoutRoundInput[] | Prisma.RecommendationItemUncheckedCreateWithoutRoundInput[];
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutRoundInput | Prisma.RecommendationItemCreateOrConnectWithoutRoundInput[];
    upsert?: Prisma.RecommendationItemUpsertWithWhereUniqueWithoutRoundInput | Prisma.RecommendationItemUpsertWithWhereUniqueWithoutRoundInput[];
    createMany?: Prisma.RecommendationItemCreateManyRoundInputEnvelope;
    set?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    disconnect?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    delete?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    connect?: Prisma.RecommendationItemWhereUniqueInput | Prisma.RecommendationItemWhereUniqueInput[];
    update?: Prisma.RecommendationItemUpdateWithWhereUniqueWithoutRoundInput | Prisma.RecommendationItemUpdateWithWhereUniqueWithoutRoundInput[];
    updateMany?: Prisma.RecommendationItemUpdateManyWithWhereWithoutRoundInput | Prisma.RecommendationItemUpdateManyWithWhereWithoutRoundInput[];
    deleteMany?: Prisma.RecommendationItemScalarWhereInput | Prisma.RecommendationItemScalarWhereInput[];
};
export type RecommendationItemCreateNestedOneWithoutVotesInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutVotesInput;
    connect?: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemUpdateOneRequiredWithoutVotesNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutVotesInput>;
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutVotesInput;
    upsert?: Prisma.RecommendationItemUpsertWithoutVotesInput;
    connect?: Prisma.RecommendationItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecommendationItemUpdateToOneWithWhereWithoutVotesInput, Prisma.RecommendationItemUpdateWithoutVotesInput>, Prisma.RecommendationItemUncheckedUpdateWithoutVotesInput>;
};
export type RecommendationItemCreateNestedOneWithoutFinalVotesInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalVotesInput>;
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutFinalVotesInput;
    connect?: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemUpdateOneRequiredWithoutFinalVotesNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalVotesInput>;
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutFinalVotesInput;
    upsert?: Prisma.RecommendationItemUpsertWithoutFinalVotesInput;
    connect?: Prisma.RecommendationItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecommendationItemUpdateToOneWithWhereWithoutFinalVotesInput, Prisma.RecommendationItemUpdateWithoutFinalVotesInput>, Prisma.RecommendationItemUncheckedUpdateWithoutFinalVotesInput>;
};
export type RecommendationItemCreateNestedOneWithoutFinalSelectionsInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalSelectionsInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalSelectionsInput>;
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutFinalSelectionsInput;
    connect?: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemUpdateOneRequiredWithoutFinalSelectionsNestedInput = {
    create?: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalSelectionsInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalSelectionsInput>;
    connectOrCreate?: Prisma.RecommendationItemCreateOrConnectWithoutFinalSelectionsInput;
    upsert?: Prisma.RecommendationItemUpsertWithoutFinalSelectionsInput;
    connect?: Prisma.RecommendationItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RecommendationItemUpdateToOneWithWhereWithoutFinalSelectionsInput, Prisma.RecommendationItemUpdateWithoutFinalSelectionsInput>, Prisma.RecommendationItemUncheckedUpdateWithoutFinalSelectionsInput>;
};
export type RecommendationItemCreateWithoutRoundInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    votes?: Prisma.VoteCreateNestedManyWithoutRecommendationItemInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemUncheckedCreateWithoutRoundInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionUncheckedCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemCreateOrConnectWithoutRoundInput = {
    where: Prisma.RecommendationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutRoundInput, Prisma.RecommendationItemUncheckedCreateWithoutRoundInput>;
};
export type RecommendationItemCreateManyRoundInputEnvelope = {
    data: Prisma.RecommendationItemCreateManyRoundInput | Prisma.RecommendationItemCreateManyRoundInput[];
    skipDuplicates?: boolean;
};
export type RecommendationItemUpsertWithWhereUniqueWithoutRoundInput = {
    where: Prisma.RecommendationItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutRoundInput, Prisma.RecommendationItemUncheckedUpdateWithoutRoundInput>;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutRoundInput, Prisma.RecommendationItemUncheckedCreateWithoutRoundInput>;
};
export type RecommendationItemUpdateWithWhereUniqueWithoutRoundInput = {
    where: Prisma.RecommendationItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutRoundInput, Prisma.RecommendationItemUncheckedUpdateWithoutRoundInput>;
};
export type RecommendationItemUpdateManyWithWhereWithoutRoundInput = {
    where: Prisma.RecommendationItemScalarWhereInput;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateManyMutationInput, Prisma.RecommendationItemUncheckedUpdateManyWithoutRoundInput>;
};
export type RecommendationItemScalarWhereInput = {
    AND?: Prisma.RecommendationItemScalarWhereInput | Prisma.RecommendationItemScalarWhereInput[];
    OR?: Prisma.RecommendationItemScalarWhereInput[];
    NOT?: Prisma.RecommendationItemScalarWhereInput | Prisma.RecommendationItemScalarWhereInput[];
    id?: Prisma.StringFilter<"RecommendationItem"> | string;
    recommendationRoundId?: Prisma.StringFilter<"RecommendationItem"> | string;
    menuName?: Prisma.StringFilter<"RecommendationItem"> | string;
    description?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    reason?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"RecommendationItem"> | string | null;
    recommendationScore?: Prisma.FloatNullableFilter<"RecommendationItem"> | number | null;
    metadata?: Prisma.JsonNullableFilter<"RecommendationItem">;
    displayOrder?: Prisma.IntFilter<"RecommendationItem"> | number;
    createdAt?: Prisma.DateTimeFilter<"RecommendationItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"RecommendationItem"> | Date | string;
};
export type RecommendationItemCreateWithoutVotesInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    round: Prisma.RecommendationRoundCreateNestedOneWithoutItemsInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemUncheckedCreateWithoutVotesInput = {
    id?: string;
    recommendationRoundId: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionUncheckedCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemCreateOrConnectWithoutVotesInput = {
    where: Prisma.RecommendationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutVotesInput>;
};
export type RecommendationItemUpsertWithoutVotesInput = {
    update: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutVotesInput, Prisma.RecommendationItemUncheckedUpdateWithoutVotesInput>;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutVotesInput>;
    where?: Prisma.RecommendationItemWhereInput;
};
export type RecommendationItemUpdateToOneWithWhereWithoutVotesInput = {
    where?: Prisma.RecommendationItemWhereInput;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutVotesInput, Prisma.RecommendationItemUncheckedUpdateWithoutVotesInput>;
};
export type RecommendationItemUpdateWithoutVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    round?: Prisma.RecommendationRoundUpdateOneRequiredWithoutItemsNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemUncheckedUpdateWithoutVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationRoundId?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUncheckedUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemCreateWithoutFinalVotesInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    round: Prisma.RecommendationRoundCreateNestedOneWithoutItemsInput;
    votes?: Prisma.VoteCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemUncheckedCreateWithoutFinalVotesInput = {
    id?: string;
    recommendationRoundId: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalSelections?: Prisma.FinalSelectionUncheckedCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemCreateOrConnectWithoutFinalVotesInput = {
    where: Prisma.RecommendationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalVotesInput>;
};
export type RecommendationItemUpsertWithoutFinalVotesInput = {
    update: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutFinalVotesInput, Prisma.RecommendationItemUncheckedUpdateWithoutFinalVotesInput>;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalVotesInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalVotesInput>;
    where?: Prisma.RecommendationItemWhereInput;
};
export type RecommendationItemUpdateToOneWithWhereWithoutFinalVotesInput = {
    where?: Prisma.RecommendationItemWhereInput;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutFinalVotesInput, Prisma.RecommendationItemUncheckedUpdateWithoutFinalVotesInput>;
};
export type RecommendationItemUpdateWithoutFinalVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    round?: Prisma.RecommendationRoundUpdateOneRequiredWithoutItemsNestedInput;
    votes?: Prisma.VoteUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemUncheckedUpdateWithoutFinalVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationRoundId?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUncheckedUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemCreateWithoutFinalSelectionsInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    round: Prisma.RecommendationRoundCreateNestedOneWithoutItemsInput;
    votes?: Prisma.VoteCreateNestedManyWithoutRecommendationItemInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemUncheckedCreateWithoutFinalSelectionsInput = {
    id?: string;
    recommendationRoundId: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    votes?: Prisma.VoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutRecommendationItemInput;
};
export type RecommendationItemCreateOrConnectWithoutFinalSelectionsInput = {
    where: Prisma.RecommendationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalSelectionsInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalSelectionsInput>;
};
export type RecommendationItemUpsertWithoutFinalSelectionsInput = {
    update: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutFinalSelectionsInput, Prisma.RecommendationItemUncheckedUpdateWithoutFinalSelectionsInput>;
    create: Prisma.XOR<Prisma.RecommendationItemCreateWithoutFinalSelectionsInput, Prisma.RecommendationItemUncheckedCreateWithoutFinalSelectionsInput>;
    where?: Prisma.RecommendationItemWhereInput;
};
export type RecommendationItemUpdateToOneWithWhereWithoutFinalSelectionsInput = {
    where?: Prisma.RecommendationItemWhereInput;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateWithoutFinalSelectionsInput, Prisma.RecommendationItemUncheckedUpdateWithoutFinalSelectionsInput>;
};
export type RecommendationItemUpdateWithoutFinalSelectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    round?: Prisma.RecommendationRoundUpdateOneRequiredWithoutItemsNestedInput;
    votes?: Prisma.VoteUpdateManyWithoutRecommendationItemNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemUncheckedUpdateWithoutFinalSelectionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationRoundId?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemCreateManyRoundInput = {
    id?: string;
    menuName: string;
    description?: string | null;
    reason?: string | null;
    imageUrl?: string | null;
    recommendationScore?: number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RecommendationItemUpdateWithoutRoundInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.VoteUpdateManyWithoutRecommendationItemNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemUncheckedUpdateWithoutRoundInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    votes?: Prisma.VoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutRecommendationItemNestedInput;
    finalSelections?: Prisma.FinalSelectionUncheckedUpdateManyWithoutRecommendationItemNestedInput;
};
export type RecommendationItemUncheckedUpdateManyWithoutRoundInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuName?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    recommendationScore?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RecommendationItemCountOutputType = {
    votes: number;
    finalVotes: number;
    finalSelections: number;
};
export type RecommendationItemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    votes?: boolean | RecommendationItemCountOutputTypeCountVotesArgs;
    finalVotes?: boolean | RecommendationItemCountOutputTypeCountFinalVotesArgs;
    finalSelections?: boolean | RecommendationItemCountOutputTypeCountFinalSelectionsArgs;
};
export type RecommendationItemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemCountOutputTypeSelect<ExtArgs> | null;
};
export type RecommendationItemCountOutputTypeCountVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VoteWhereInput;
};
export type RecommendationItemCountOutputTypeCountFinalVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalVoteWhereInput;
};
export type RecommendationItemCountOutputTypeCountFinalSelectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalSelectionWhereInput;
};
export type RecommendationItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recommendationRoundId?: boolean;
    menuName?: boolean;
    description?: boolean;
    reason?: boolean;
    imageUrl?: boolean;
    recommendationScore?: boolean;
    metadata?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    round?: boolean | Prisma.RecommendationRoundDefaultArgs<ExtArgs>;
    votes?: boolean | Prisma.RecommendationItem$votesArgs<ExtArgs>;
    finalVotes?: boolean | Prisma.RecommendationItem$finalVotesArgs<ExtArgs>;
    finalSelections?: boolean | Prisma.RecommendationItem$finalSelectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.RecommendationItemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationItem"]>;
export type RecommendationItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recommendationRoundId?: boolean;
    menuName?: boolean;
    description?: boolean;
    reason?: boolean;
    imageUrl?: boolean;
    recommendationScore?: boolean;
    metadata?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    round?: boolean | Prisma.RecommendationRoundDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationItem"]>;
export type RecommendationItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    recommendationRoundId?: boolean;
    menuName?: boolean;
    description?: boolean;
    reason?: boolean;
    imageUrl?: boolean;
    recommendationScore?: boolean;
    metadata?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    round?: boolean | Prisma.RecommendationRoundDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["recommendationItem"]>;
export type RecommendationItemSelectScalar = {
    id?: boolean;
    recommendationRoundId?: boolean;
    menuName?: boolean;
    description?: boolean;
    reason?: boolean;
    imageUrl?: boolean;
    recommendationScore?: boolean;
    metadata?: boolean;
    displayOrder?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RecommendationItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "recommendationRoundId" | "menuName" | "description" | "reason" | "imageUrl" | "recommendationScore" | "metadata" | "displayOrder" | "createdAt" | "updatedAt", ExtArgs["result"]["recommendationItem"]>;
export type RecommendationItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    round?: boolean | Prisma.RecommendationRoundDefaultArgs<ExtArgs>;
    votes?: boolean | Prisma.RecommendationItem$votesArgs<ExtArgs>;
    finalVotes?: boolean | Prisma.RecommendationItem$finalVotesArgs<ExtArgs>;
    finalSelections?: boolean | Prisma.RecommendationItem$finalSelectionsArgs<ExtArgs>;
    _count?: boolean | Prisma.RecommendationItemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RecommendationItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    round?: boolean | Prisma.RecommendationRoundDefaultArgs<ExtArgs>;
};
export type RecommendationItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    round?: boolean | Prisma.RecommendationRoundDefaultArgs<ExtArgs>;
};
export type $RecommendationItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RecommendationItem";
    objects: {
        round: Prisma.$RecommendationRoundPayload<ExtArgs>;
        votes: Prisma.$VotePayload<ExtArgs>[];
        finalVotes: Prisma.$FinalVotePayload<ExtArgs>[];
        finalSelections: Prisma.$FinalSelectionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        recommendationRoundId: string;
        menuName: string;
        description: string | null;
        reason: string | null;
        imageUrl: string | null;
        recommendationScore: number | null;
        metadata: runtime.JsonValue | null;
        displayOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["recommendationItem"]>;
    composites: {};
};
export type RecommendationItemGetPayload<S extends boolean | null | undefined | RecommendationItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload, S>;
export type RecommendationItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RecommendationItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RecommendationItemCountAggregateInputType | true;
};
export interface RecommendationItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RecommendationItem'];
        meta: {
            name: 'RecommendationItem';
        };
    };
    findUnique<T extends RecommendationItemFindUniqueArgs>(args: Prisma.SelectSubset<T, RecommendationItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RecommendationItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RecommendationItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RecommendationItemFindFirstArgs>(args?: Prisma.SelectSubset<T, RecommendationItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RecommendationItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RecommendationItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RecommendationItemFindManyArgs>(args?: Prisma.SelectSubset<T, RecommendationItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RecommendationItemCreateArgs>(args: Prisma.SelectSubset<T, RecommendationItemCreateArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RecommendationItemCreateManyArgs>(args?: Prisma.SelectSubset<T, RecommendationItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RecommendationItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RecommendationItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RecommendationItemDeleteArgs>(args: Prisma.SelectSubset<T, RecommendationItemDeleteArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RecommendationItemUpdateArgs>(args: Prisma.SelectSubset<T, RecommendationItemUpdateArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RecommendationItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, RecommendationItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RecommendationItemUpdateManyArgs>(args: Prisma.SelectSubset<T, RecommendationItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RecommendationItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RecommendationItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RecommendationItemUpsertArgs>(args: Prisma.SelectSubset<T, RecommendationItemUpsertArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RecommendationItemCountArgs>(args?: Prisma.Subset<T, RecommendationItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RecommendationItemCountAggregateOutputType> : number>;
    aggregate<T extends RecommendationItemAggregateArgs>(args: Prisma.Subset<T, RecommendationItemAggregateArgs>): Prisma.PrismaPromise<GetRecommendationItemAggregateType<T>>;
    groupBy<T extends RecommendationItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RecommendationItemGroupByArgs['orderBy'];
    } : {
        orderBy?: RecommendationItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RecommendationItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecommendationItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RecommendationItemFieldRefs;
}
export interface Prisma__RecommendationItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    round<T extends Prisma.RecommendationRoundDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationRoundDefaultArgs<ExtArgs>>): Prisma.Prisma__RecommendationRoundClient<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    votes<T extends Prisma.RecommendationItem$votesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationItem$votesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    finalVotes<T extends Prisma.RecommendationItem$finalVotesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationItem$finalVotesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    finalSelections<T extends Prisma.RecommendationItem$finalSelectionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationItem$finalSelectionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RecommendationItemFieldRefs {
    readonly id: Prisma.FieldRef<"RecommendationItem", 'String'>;
    readonly recommendationRoundId: Prisma.FieldRef<"RecommendationItem", 'String'>;
    readonly menuName: Prisma.FieldRef<"RecommendationItem", 'String'>;
    readonly description: Prisma.FieldRef<"RecommendationItem", 'String'>;
    readonly reason: Prisma.FieldRef<"RecommendationItem", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"RecommendationItem", 'String'>;
    readonly recommendationScore: Prisma.FieldRef<"RecommendationItem", 'Float'>;
    readonly metadata: Prisma.FieldRef<"RecommendationItem", 'Json'>;
    readonly displayOrder: Prisma.FieldRef<"RecommendationItem", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"RecommendationItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"RecommendationItem", 'DateTime'>;
}
export type RecommendationItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    where: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    where: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecommendationItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecommendationItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecommendationItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationItemCreateInput, Prisma.RecommendationItemUncheckedCreateInput>;
};
export type RecommendationItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RecommendationItemCreateManyInput | Prisma.RecommendationItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RecommendationItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    data: Prisma.RecommendationItemCreateManyInput | Prisma.RecommendationItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RecommendationItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RecommendationItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateInput, Prisma.RecommendationItemUncheckedUpdateInput>;
    where: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RecommendationItemUpdateManyMutationInput, Prisma.RecommendationItemUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationItemWhereInput;
    limit?: number;
};
export type RecommendationItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RecommendationItemUpdateManyMutationInput, Prisma.RecommendationItemUncheckedUpdateManyInput>;
    where?: Prisma.RecommendationItemWhereInput;
    limit?: number;
    include?: Prisma.RecommendationItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RecommendationItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    where: Prisma.RecommendationItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.RecommendationItemCreateInput, Prisma.RecommendationItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RecommendationItemUpdateInput, Prisma.RecommendationItemUncheckedUpdateInput>;
};
export type RecommendationItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
    where: Prisma.RecommendationItemWhereUniqueInput;
};
export type RecommendationItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationItemWhereInput;
    limit?: number;
};
export type RecommendationItem$votesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VoteSelect<ExtArgs> | null;
    omit?: Prisma.VoteOmit<ExtArgs> | null;
    include?: Prisma.VoteInclude<ExtArgs> | null;
    where?: Prisma.VoteWhereInput;
    orderBy?: Prisma.VoteOrderByWithRelationInput | Prisma.VoteOrderByWithRelationInput[];
    cursor?: Prisma.VoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VoteScalarFieldEnum | Prisma.VoteScalarFieldEnum[];
};
export type RecommendationItem$finalVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    where?: Prisma.FinalVoteWhereInput;
    orderBy?: Prisma.FinalVoteOrderByWithRelationInput | Prisma.FinalVoteOrderByWithRelationInput[];
    cursor?: Prisma.FinalVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FinalVoteScalarFieldEnum | Prisma.FinalVoteScalarFieldEnum[];
};
export type RecommendationItem$finalSelectionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RecommendationItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RecommendationItemSelect<ExtArgs> | null;
    omit?: Prisma.RecommendationItemOmit<ExtArgs> | null;
    include?: Prisma.RecommendationItemInclude<ExtArgs> | null;
};
