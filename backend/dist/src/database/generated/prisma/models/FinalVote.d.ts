import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FinalVoteModel = runtime.Types.Result.DefaultSelection<Prisma.$FinalVotePayload>;
export type AggregateFinalVote = {
    _count: FinalVoteCountAggregateOutputType | null;
    _min: FinalVoteMinAggregateOutputType | null;
    _max: FinalVoteMaxAggregateOutputType | null;
};
export type FinalVoteMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    recommendationItemId: string | null;
    voteType: $Enums.FinalVoteType | null;
    createdAt: Date | null;
};
export type FinalVoteMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    recommendationItemId: string | null;
    voteType: $Enums.FinalVoteType | null;
    createdAt: Date | null;
};
export type FinalVoteCountAggregateOutputType = {
    id: number;
    sessionId: number;
    userId: number;
    recommendationItemId: number;
    voteType: number;
    createdAt: number;
    _all: number;
};
export type FinalVoteMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    recommendationItemId?: true;
    voteType?: true;
    createdAt?: true;
};
export type FinalVoteMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    recommendationItemId?: true;
    voteType?: true;
    createdAt?: true;
};
export type FinalVoteCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    recommendationItemId?: true;
    voteType?: true;
    createdAt?: true;
    _all?: true;
};
export type FinalVoteAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalVoteWhereInput;
    orderBy?: Prisma.FinalVoteOrderByWithRelationInput | Prisma.FinalVoteOrderByWithRelationInput[];
    cursor?: Prisma.FinalVoteWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FinalVoteCountAggregateInputType;
    _min?: FinalVoteMinAggregateInputType;
    _max?: FinalVoteMaxAggregateInputType;
};
export type GetFinalVoteAggregateType<T extends FinalVoteAggregateArgs> = {
    [P in keyof T & keyof AggregateFinalVote]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFinalVote[P]> : Prisma.GetScalarType<T[P], AggregateFinalVote[P]>;
};
export type FinalVoteGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalVoteWhereInput;
    orderBy?: Prisma.FinalVoteOrderByWithAggregationInput | Prisma.FinalVoteOrderByWithAggregationInput[];
    by: Prisma.FinalVoteScalarFieldEnum[] | Prisma.FinalVoteScalarFieldEnum;
    having?: Prisma.FinalVoteScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FinalVoteCountAggregateInputType | true;
    _min?: FinalVoteMinAggregateInputType;
    _max?: FinalVoteMaxAggregateInputType;
};
export type FinalVoteGroupByOutputType = {
    id: string;
    sessionId: string;
    userId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt: Date;
    _count: FinalVoteCountAggregateOutputType | null;
    _min: FinalVoteMinAggregateOutputType | null;
    _max: FinalVoteMaxAggregateOutputType | null;
};
export type GetFinalVoteGroupByPayload<T extends FinalVoteGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FinalVoteGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FinalVoteGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FinalVoteGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FinalVoteGroupByOutputType[P]>;
}>>;
export type FinalVoteWhereInput = {
    AND?: Prisma.FinalVoteWhereInput | Prisma.FinalVoteWhereInput[];
    OR?: Prisma.FinalVoteWhereInput[];
    NOT?: Prisma.FinalVoteWhereInput | Prisma.FinalVoteWhereInput[];
    id?: Prisma.StringFilter<"FinalVote"> | string;
    sessionId?: Prisma.StringFilter<"FinalVote"> | string;
    userId?: Prisma.StringFilter<"FinalVote"> | string;
    recommendationItemId?: Prisma.StringFilter<"FinalVote"> | string;
    voteType?: Prisma.EnumFinalVoteTypeFilter<"FinalVote"> | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFilter<"FinalVote"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    recommendationItem?: Prisma.XOR<Prisma.RecommendationItemScalarRelationFilter, Prisma.RecommendationItemWhereInput>;
};
export type FinalVoteOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    voteType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    recommendationItem?: Prisma.RecommendationItemOrderByWithRelationInput;
};
export type FinalVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId_userId_voteType?: Prisma.FinalVoteSessionIdUserIdVoteTypeCompoundUniqueInput;
    AND?: Prisma.FinalVoteWhereInput | Prisma.FinalVoteWhereInput[];
    OR?: Prisma.FinalVoteWhereInput[];
    NOT?: Prisma.FinalVoteWhereInput | Prisma.FinalVoteWhereInput[];
    sessionId?: Prisma.StringFilter<"FinalVote"> | string;
    userId?: Prisma.StringFilter<"FinalVote"> | string;
    recommendationItemId?: Prisma.StringFilter<"FinalVote"> | string;
    voteType?: Prisma.EnumFinalVoteTypeFilter<"FinalVote"> | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFilter<"FinalVote"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    recommendationItem?: Prisma.XOR<Prisma.RecommendationItemScalarRelationFilter, Prisma.RecommendationItemWhereInput>;
}, "id" | "sessionId_userId_voteType">;
export type FinalVoteOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    voteType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.FinalVoteCountOrderByAggregateInput;
    _max?: Prisma.FinalVoteMaxOrderByAggregateInput;
    _min?: Prisma.FinalVoteMinOrderByAggregateInput;
};
export type FinalVoteScalarWhereWithAggregatesInput = {
    AND?: Prisma.FinalVoteScalarWhereWithAggregatesInput | Prisma.FinalVoteScalarWhereWithAggregatesInput[];
    OR?: Prisma.FinalVoteScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FinalVoteScalarWhereWithAggregatesInput | Prisma.FinalVoteScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FinalVote"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"FinalVote"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FinalVote"> | string;
    recommendationItemId?: Prisma.StringWithAggregatesFilter<"FinalVote"> | string;
    voteType?: Prisma.EnumFinalVoteTypeWithAggregatesFilter<"FinalVote"> | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FinalVote"> | Date | string;
};
export type FinalVoteCreateInput = {
    id?: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutFinalVotesInput;
    user: Prisma.UserCreateNestedOneWithoutFinalVotesInput;
    recommendationItem: Prisma.RecommendationItemCreateNestedOneWithoutFinalVotesInput;
};
export type FinalVoteUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    userId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutFinalVotesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutFinalVotesNestedInput;
    recommendationItem?: Prisma.RecommendationItemUpdateOneRequiredWithoutFinalVotesNestedInput;
};
export type FinalVoteUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteCreateManyInput = {
    id?: string;
    sessionId: string;
    userId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteListRelationFilter = {
    every?: Prisma.FinalVoteWhereInput;
    some?: Prisma.FinalVoteWhereInput;
    none?: Prisma.FinalVoteWhereInput;
};
export type FinalVoteOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FinalVoteSessionIdUserIdVoteTypeCompoundUniqueInput = {
    sessionId: string;
    userId: string;
    voteType: $Enums.FinalVoteType;
};
export type FinalVoteCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    voteType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FinalVoteMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    voteType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FinalVoteMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    recommendationItemId?: Prisma.SortOrder;
    voteType?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type FinalVoteCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutUserInput, Prisma.FinalVoteUncheckedCreateWithoutUserInput> | Prisma.FinalVoteCreateWithoutUserInput[] | Prisma.FinalVoteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutUserInput | Prisma.FinalVoteCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FinalVoteCreateManyUserInputEnvelope;
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
};
export type FinalVoteUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutUserInput, Prisma.FinalVoteUncheckedCreateWithoutUserInput> | Prisma.FinalVoteCreateWithoutUserInput[] | Prisma.FinalVoteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutUserInput | Prisma.FinalVoteCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.FinalVoteCreateManyUserInputEnvelope;
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
};
export type FinalVoteUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutUserInput, Prisma.FinalVoteUncheckedCreateWithoutUserInput> | Prisma.FinalVoteCreateWithoutUserInput[] | Prisma.FinalVoteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutUserInput | Prisma.FinalVoteCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FinalVoteUpsertWithWhereUniqueWithoutUserInput | Prisma.FinalVoteUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FinalVoteCreateManyUserInputEnvelope;
    set?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    disconnect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    delete?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    update?: Prisma.FinalVoteUpdateWithWhereUniqueWithoutUserInput | Prisma.FinalVoteUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FinalVoteUpdateManyWithWhereWithoutUserInput | Prisma.FinalVoteUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
};
export type FinalVoteUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutUserInput, Prisma.FinalVoteUncheckedCreateWithoutUserInput> | Prisma.FinalVoteCreateWithoutUserInput[] | Prisma.FinalVoteUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutUserInput | Prisma.FinalVoteCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.FinalVoteUpsertWithWhereUniqueWithoutUserInput | Prisma.FinalVoteUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.FinalVoteCreateManyUserInputEnvelope;
    set?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    disconnect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    delete?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    update?: Prisma.FinalVoteUpdateWithWhereUniqueWithoutUserInput | Prisma.FinalVoteUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.FinalVoteUpdateManyWithWhereWithoutUserInput | Prisma.FinalVoteUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
};
export type FinalVoteCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutSessionInput, Prisma.FinalVoteUncheckedCreateWithoutSessionInput> | Prisma.FinalVoteCreateWithoutSessionInput[] | Prisma.FinalVoteUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutSessionInput | Prisma.FinalVoteCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.FinalVoteCreateManySessionInputEnvelope;
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
};
export type FinalVoteUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutSessionInput, Prisma.FinalVoteUncheckedCreateWithoutSessionInput> | Prisma.FinalVoteCreateWithoutSessionInput[] | Prisma.FinalVoteUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutSessionInput | Prisma.FinalVoteCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.FinalVoteCreateManySessionInputEnvelope;
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
};
export type FinalVoteUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutSessionInput, Prisma.FinalVoteUncheckedCreateWithoutSessionInput> | Prisma.FinalVoteCreateWithoutSessionInput[] | Prisma.FinalVoteUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutSessionInput | Prisma.FinalVoteCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.FinalVoteUpsertWithWhereUniqueWithoutSessionInput | Prisma.FinalVoteUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.FinalVoteCreateManySessionInputEnvelope;
    set?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    disconnect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    delete?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    update?: Prisma.FinalVoteUpdateWithWhereUniqueWithoutSessionInput | Prisma.FinalVoteUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.FinalVoteUpdateManyWithWhereWithoutSessionInput | Prisma.FinalVoteUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
};
export type FinalVoteUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutSessionInput, Prisma.FinalVoteUncheckedCreateWithoutSessionInput> | Prisma.FinalVoteCreateWithoutSessionInput[] | Prisma.FinalVoteUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutSessionInput | Prisma.FinalVoteCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.FinalVoteUpsertWithWhereUniqueWithoutSessionInput | Prisma.FinalVoteUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.FinalVoteCreateManySessionInputEnvelope;
    set?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    disconnect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    delete?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    update?: Prisma.FinalVoteUpdateWithWhereUniqueWithoutSessionInput | Prisma.FinalVoteUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.FinalVoteUpdateManyWithWhereWithoutSessionInput | Prisma.FinalVoteUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
};
export type FinalVoteCreateNestedManyWithoutRecommendationItemInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalVoteCreateWithoutRecommendationItemInput[] | Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalVoteCreateManyRecommendationItemInputEnvelope;
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
};
export type FinalVoteUncheckedCreateNestedManyWithoutRecommendationItemInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalVoteCreateWithoutRecommendationItemInput[] | Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalVoteCreateManyRecommendationItemInputEnvelope;
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
};
export type FinalVoteUpdateManyWithoutRecommendationItemNestedInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalVoteCreateWithoutRecommendationItemInput[] | Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput[];
    upsert?: Prisma.FinalVoteUpsertWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalVoteUpsertWithWhereUniqueWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalVoteCreateManyRecommendationItemInputEnvelope;
    set?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    disconnect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    delete?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    update?: Prisma.FinalVoteUpdateWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalVoteUpdateWithWhereUniqueWithoutRecommendationItemInput[];
    updateMany?: Prisma.FinalVoteUpdateManyWithWhereWithoutRecommendationItemInput | Prisma.FinalVoteUpdateManyWithWhereWithoutRecommendationItemInput[];
    deleteMany?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
};
export type FinalVoteUncheckedUpdateManyWithoutRecommendationItemNestedInput = {
    create?: Prisma.XOR<Prisma.FinalVoteCreateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput> | Prisma.FinalVoteCreateWithoutRecommendationItemInput[] | Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput[];
    connectOrCreate?: Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput | Prisma.FinalVoteCreateOrConnectWithoutRecommendationItemInput[];
    upsert?: Prisma.FinalVoteUpsertWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalVoteUpsertWithWhereUniqueWithoutRecommendationItemInput[];
    createMany?: Prisma.FinalVoteCreateManyRecommendationItemInputEnvelope;
    set?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    disconnect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    delete?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    connect?: Prisma.FinalVoteWhereUniqueInput | Prisma.FinalVoteWhereUniqueInput[];
    update?: Prisma.FinalVoteUpdateWithWhereUniqueWithoutRecommendationItemInput | Prisma.FinalVoteUpdateWithWhereUniqueWithoutRecommendationItemInput[];
    updateMany?: Prisma.FinalVoteUpdateManyWithWhereWithoutRecommendationItemInput | Prisma.FinalVoteUpdateManyWithWhereWithoutRecommendationItemInput[];
    deleteMany?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
};
export type EnumFinalVoteTypeFieldUpdateOperationsInput = {
    set?: $Enums.FinalVoteType;
};
export type FinalVoteCreateWithoutUserInput = {
    id?: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutFinalVotesInput;
    recommendationItem: Prisma.RecommendationItemCreateNestedOneWithoutFinalVotesInput;
};
export type FinalVoteUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteCreateOrConnectWithoutUserInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalVoteCreateWithoutUserInput, Prisma.FinalVoteUncheckedCreateWithoutUserInput>;
};
export type FinalVoteCreateManyUserInputEnvelope = {
    data: Prisma.FinalVoteCreateManyUserInput | Prisma.FinalVoteCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type FinalVoteUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinalVoteUpdateWithoutUserInput, Prisma.FinalVoteUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FinalVoteCreateWithoutUserInput, Prisma.FinalVoteUncheckedCreateWithoutUserInput>;
};
export type FinalVoteUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinalVoteUpdateWithoutUserInput, Prisma.FinalVoteUncheckedUpdateWithoutUserInput>;
};
export type FinalVoteUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.FinalVoteScalarWhereInput;
    data: Prisma.XOR<Prisma.FinalVoteUpdateManyMutationInput, Prisma.FinalVoteUncheckedUpdateManyWithoutUserInput>;
};
export type FinalVoteScalarWhereInput = {
    AND?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
    OR?: Prisma.FinalVoteScalarWhereInput[];
    NOT?: Prisma.FinalVoteScalarWhereInput | Prisma.FinalVoteScalarWhereInput[];
    id?: Prisma.StringFilter<"FinalVote"> | string;
    sessionId?: Prisma.StringFilter<"FinalVote"> | string;
    userId?: Prisma.StringFilter<"FinalVote"> | string;
    recommendationItemId?: Prisma.StringFilter<"FinalVote"> | string;
    voteType?: Prisma.EnumFinalVoteTypeFilter<"FinalVote"> | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFilter<"FinalVote"> | Date | string;
};
export type FinalVoteCreateWithoutSessionInput = {
    id?: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFinalVotesInput;
    recommendationItem: Prisma.RecommendationItemCreateNestedOneWithoutFinalVotesInput;
};
export type FinalVoteUncheckedCreateWithoutSessionInput = {
    id?: string;
    userId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteCreateOrConnectWithoutSessionInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalVoteCreateWithoutSessionInput, Prisma.FinalVoteUncheckedCreateWithoutSessionInput>;
};
export type FinalVoteCreateManySessionInputEnvelope = {
    data: Prisma.FinalVoteCreateManySessionInput | Prisma.FinalVoteCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type FinalVoteUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinalVoteUpdateWithoutSessionInput, Prisma.FinalVoteUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.FinalVoteCreateWithoutSessionInput, Prisma.FinalVoteUncheckedCreateWithoutSessionInput>;
};
export type FinalVoteUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinalVoteUpdateWithoutSessionInput, Prisma.FinalVoteUncheckedUpdateWithoutSessionInput>;
};
export type FinalVoteUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.FinalVoteScalarWhereInput;
    data: Prisma.XOR<Prisma.FinalVoteUpdateManyMutationInput, Prisma.FinalVoteUncheckedUpdateManyWithoutSessionInput>;
};
export type FinalVoteCreateWithoutRecommendationItemInput = {
    id?: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutFinalVotesInput;
    user: Prisma.UserCreateNestedOneWithoutFinalVotesInput;
};
export type FinalVoteUncheckedCreateWithoutRecommendationItemInput = {
    id?: string;
    sessionId: string;
    userId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteCreateOrConnectWithoutRecommendationItemInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalVoteCreateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput>;
};
export type FinalVoteCreateManyRecommendationItemInputEnvelope = {
    data: Prisma.FinalVoteCreateManyRecommendationItemInput | Prisma.FinalVoteCreateManyRecommendationItemInput[];
    skipDuplicates?: boolean;
};
export type FinalVoteUpsertWithWhereUniqueWithoutRecommendationItemInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    update: Prisma.XOR<Prisma.FinalVoteUpdateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedUpdateWithoutRecommendationItemInput>;
    create: Prisma.XOR<Prisma.FinalVoteCreateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedCreateWithoutRecommendationItemInput>;
};
export type FinalVoteUpdateWithWhereUniqueWithoutRecommendationItemInput = {
    where: Prisma.FinalVoteWhereUniqueInput;
    data: Prisma.XOR<Prisma.FinalVoteUpdateWithoutRecommendationItemInput, Prisma.FinalVoteUncheckedUpdateWithoutRecommendationItemInput>;
};
export type FinalVoteUpdateManyWithWhereWithoutRecommendationItemInput = {
    where: Prisma.FinalVoteScalarWhereInput;
    data: Prisma.XOR<Prisma.FinalVoteUpdateManyMutationInput, Prisma.FinalVoteUncheckedUpdateManyWithoutRecommendationItemInput>;
};
export type FinalVoteCreateManyUserInput = {
    id?: string;
    sessionId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutFinalVotesNestedInput;
    recommendationItem?: Prisma.RecommendationItemUpdateOneRequiredWithoutFinalVotesNestedInput;
};
export type FinalVoteUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteCreateManySessionInput = {
    id?: string;
    userId: string;
    recommendationItemId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFinalVotesNestedInput;
    recommendationItem?: Prisma.RecommendationItemUpdateOneRequiredWithoutFinalVotesNestedInput;
};
export type FinalVoteUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    recommendationItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteCreateManyRecommendationItemInput = {
    id?: string;
    sessionId: string;
    userId: string;
    voteType: $Enums.FinalVoteType;
    createdAt?: Date | string;
};
export type FinalVoteUpdateWithoutRecommendationItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutFinalVotesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutFinalVotesNestedInput;
};
export type FinalVoteUncheckedUpdateWithoutRecommendationItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteUncheckedUpdateManyWithoutRecommendationItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    voteType?: Prisma.EnumFinalVoteTypeFieldUpdateOperationsInput | $Enums.FinalVoteType;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FinalVoteSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    recommendationItemId?: boolean;
    voteType?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["finalVote"]>;
export type FinalVoteSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    recommendationItemId?: boolean;
    voteType?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["finalVote"]>;
export type FinalVoteSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    recommendationItemId?: boolean;
    voteType?: boolean;
    createdAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["finalVote"]>;
export type FinalVoteSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    recommendationItemId?: boolean;
    voteType?: boolean;
    createdAt?: boolean;
};
export type FinalVoteOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "userId" | "recommendationItemId" | "voteType" | "createdAt", ExtArgs["result"]["finalVote"]>;
export type FinalVoteInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
};
export type FinalVoteIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
};
export type FinalVoteIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    recommendationItem?: boolean | Prisma.RecommendationItemDefaultArgs<ExtArgs>;
};
export type $FinalVotePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FinalVote";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        recommendationItem: Prisma.$RecommendationItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        userId: string;
        recommendationItemId: string;
        voteType: $Enums.FinalVoteType;
        createdAt: Date;
    }, ExtArgs["result"]["finalVote"]>;
    composites: {};
};
export type FinalVoteGetPayload<S extends boolean | null | undefined | FinalVoteDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FinalVotePayload, S>;
export type FinalVoteCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FinalVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FinalVoteCountAggregateInputType | true;
};
export interface FinalVoteDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FinalVote'];
        meta: {
            name: 'FinalVote';
        };
    };
    findUnique<T extends FinalVoteFindUniqueArgs>(args: Prisma.SelectSubset<T, FinalVoteFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FinalVoteFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FinalVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FinalVoteFindFirstArgs>(args?: Prisma.SelectSubset<T, FinalVoteFindFirstArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FinalVoteFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FinalVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FinalVoteFindManyArgs>(args?: Prisma.SelectSubset<T, FinalVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FinalVoteCreateArgs>(args: Prisma.SelectSubset<T, FinalVoteCreateArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FinalVoteCreateManyArgs>(args?: Prisma.SelectSubset<T, FinalVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FinalVoteCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FinalVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FinalVoteDeleteArgs>(args: Prisma.SelectSubset<T, FinalVoteDeleteArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FinalVoteUpdateArgs>(args: Prisma.SelectSubset<T, FinalVoteUpdateArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FinalVoteDeleteManyArgs>(args?: Prisma.SelectSubset<T, FinalVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FinalVoteUpdateManyArgs>(args: Prisma.SelectSubset<T, FinalVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FinalVoteUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FinalVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FinalVoteUpsertArgs>(args: Prisma.SelectSubset<T, FinalVoteUpsertArgs<ExtArgs>>): Prisma.Prisma__FinalVoteClient<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FinalVoteCountArgs>(args?: Prisma.Subset<T, FinalVoteCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FinalVoteCountAggregateOutputType> : number>;
    aggregate<T extends FinalVoteAggregateArgs>(args: Prisma.Subset<T, FinalVoteAggregateArgs>): Prisma.PrismaPromise<GetFinalVoteAggregateType<T>>;
    groupBy<T extends FinalVoteGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FinalVoteGroupByArgs['orderBy'];
    } : {
        orderBy?: FinalVoteGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FinalVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFinalVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FinalVoteFieldRefs;
}
export interface Prisma__FinalVoteClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    recommendationItem<T extends Prisma.RecommendationItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RecommendationItemDefaultArgs<ExtArgs>>): Prisma.Prisma__RecommendationItemClient<runtime.Types.Result.GetResult<Prisma.$RecommendationItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FinalVoteFieldRefs {
    readonly id: Prisma.FieldRef<"FinalVote", 'String'>;
    readonly sessionId: Prisma.FieldRef<"FinalVote", 'String'>;
    readonly userId: Prisma.FieldRef<"FinalVote", 'String'>;
    readonly recommendationItemId: Prisma.FieldRef<"FinalVote", 'String'>;
    readonly voteType: Prisma.FieldRef<"FinalVote", 'FinalVoteType'>;
    readonly createdAt: Prisma.FieldRef<"FinalVote", 'DateTime'>;
}
export type FinalVoteFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    where: Prisma.FinalVoteWhereUniqueInput;
};
export type FinalVoteFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    where: Prisma.FinalVoteWhereUniqueInput;
};
export type FinalVoteFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FinalVoteFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FinalVoteFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FinalVoteCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinalVoteCreateInput, Prisma.FinalVoteUncheckedCreateInput>;
};
export type FinalVoteCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FinalVoteCreateManyInput | Prisma.FinalVoteCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FinalVoteCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    data: Prisma.FinalVoteCreateManyInput | Prisma.FinalVoteCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FinalVoteIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FinalVoteUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinalVoteUpdateInput, Prisma.FinalVoteUncheckedUpdateInput>;
    where: Prisma.FinalVoteWhereUniqueInput;
};
export type FinalVoteUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FinalVoteUpdateManyMutationInput, Prisma.FinalVoteUncheckedUpdateManyInput>;
    where?: Prisma.FinalVoteWhereInput;
    limit?: number;
};
export type FinalVoteUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FinalVoteUpdateManyMutationInput, Prisma.FinalVoteUncheckedUpdateManyInput>;
    where?: Prisma.FinalVoteWhereInput;
    limit?: number;
    include?: Prisma.FinalVoteIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FinalVoteUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    where: Prisma.FinalVoteWhereUniqueInput;
    create: Prisma.XOR<Prisma.FinalVoteCreateInput, Prisma.FinalVoteUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FinalVoteUpdateInput, Prisma.FinalVoteUncheckedUpdateInput>;
};
export type FinalVoteDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
    where: Prisma.FinalVoteWhereUniqueInput;
};
export type FinalVoteDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalVoteWhereInput;
    limit?: number;
};
export type FinalVoteDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalVoteSelect<ExtArgs> | null;
    omit?: Prisma.FinalVoteOmit<ExtArgs> | null;
    include?: Prisma.FinalVoteInclude<ExtArgs> | null;
};
