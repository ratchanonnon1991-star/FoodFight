import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type FoodFightSessionModel = runtime.Types.Result.DefaultSelection<Prisma.$FoodFightSessionPayload>;
export type AggregateFoodFightSession = {
    _count: FoodFightSessionCountAggregateOutputType | null;
    _min: FoodFightSessionMinAggregateOutputType | null;
    _max: FoodFightSessionMaxAggregateOutputType | null;
};
export type FoodFightSessionMinAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    status: $Enums.FoodFightStatus | null;
    startedAt: Date | null;
    finalizedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodFightSessionMaxAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    status: $Enums.FoodFightStatus | null;
    startedAt: Date | null;
    finalizedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodFightSessionCountAggregateOutputType = {
    id: number;
    roomId: number;
    status: number;
    startedAt: number;
    finalizedAt: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FoodFightSessionMinAggregateInputType = {
    id?: true;
    roomId?: true;
    status?: true;
    startedAt?: true;
    finalizedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodFightSessionMaxAggregateInputType = {
    id?: true;
    roomId?: true;
    status?: true;
    startedAt?: true;
    finalizedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodFightSessionCountAggregateInputType = {
    id?: true;
    roomId?: true;
    status?: true;
    startedAt?: true;
    finalizedAt?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FoodFightSessionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodFightSessionWhereInput;
    orderBy?: Prisma.FoodFightSessionOrderByWithRelationInput | Prisma.FoodFightSessionOrderByWithRelationInput[];
    cursor?: Prisma.FoodFightSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | FoodFightSessionCountAggregateInputType;
    _min?: FoodFightSessionMinAggregateInputType;
    _max?: FoodFightSessionMaxAggregateInputType;
};
export type GetFoodFightSessionAggregateType<T extends FoodFightSessionAggregateArgs> = {
    [P in keyof T & keyof AggregateFoodFightSession]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFoodFightSession[P]> : Prisma.GetScalarType<T[P], AggregateFoodFightSession[P]>;
};
export type FoodFightSessionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodFightSessionWhereInput;
    orderBy?: Prisma.FoodFightSessionOrderByWithAggregationInput | Prisma.FoodFightSessionOrderByWithAggregationInput[];
    by: Prisma.FoodFightSessionScalarFieldEnum[] | Prisma.FoodFightSessionScalarFieldEnum;
    having?: Prisma.FoodFightSessionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FoodFightSessionCountAggregateInputType | true;
    _min?: FoodFightSessionMinAggregateInputType;
    _max?: FoodFightSessionMaxAggregateInputType;
};
export type FoodFightSessionGroupByOutputType = {
    id: string;
    roomId: string;
    status: $Enums.FoodFightStatus;
    startedAt: Date;
    finalizedAt: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FoodFightSessionCountAggregateOutputType | null;
    _min: FoodFightSessionMinAggregateOutputType | null;
    _max: FoodFightSessionMaxAggregateOutputType | null;
};
export type GetFoodFightSessionGroupByPayload<T extends FoodFightSessionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FoodFightSessionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FoodFightSessionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FoodFightSessionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FoodFightSessionGroupByOutputType[P]>;
}>>;
export type FoodFightSessionWhereInput = {
    AND?: Prisma.FoodFightSessionWhereInput | Prisma.FoodFightSessionWhereInput[];
    OR?: Prisma.FoodFightSessionWhereInput[];
    NOT?: Prisma.FoodFightSessionWhereInput | Prisma.FoodFightSessionWhereInput[];
    id?: Prisma.StringFilter<"FoodFightSession"> | string;
    roomId?: Prisma.StringFilter<"FoodFightSession"> | string;
    status?: Prisma.EnumFoodFightStatusFilter<"FoodFightSession"> | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFilter<"FoodFightSession"> | Date | string;
    finalizedAt?: Prisma.DateTimeNullableFilter<"FoodFightSession"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"FoodFightSession"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FoodFightSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodFightSession"> | Date | string;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    members?: Prisma.SessionMemberListRelationFilter;
    preferences?: Prisma.MealPreferenceListRelationFilter;
    recommendationRounds?: Prisma.RecommendationRoundListRelationFilter;
    finalVotes?: Prisma.FinalVoteListRelationFilter;
    finalSelection?: Prisma.XOR<Prisma.FinalSelectionNullableScalarRelationFilter, Prisma.FinalSelectionWhereInput> | null;
    restaurantRecommendations?: Prisma.RestaurantRecommendationListRelationFilter;
    restaurantSelection?: Prisma.XOR<Prisma.RestaurantSelectionNullableScalarRelationFilter, Prisma.RestaurantSelectionWhereInput> | null;
    bill?: Prisma.XOR<Prisma.BillNullableScalarRelationFilter, Prisma.BillWhereInput> | null;
};
export type FoodFightSessionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finalizedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    room?: Prisma.RoomOrderByWithRelationInput;
    members?: Prisma.SessionMemberOrderByRelationAggregateInput;
    preferences?: Prisma.MealPreferenceOrderByRelationAggregateInput;
    recommendationRounds?: Prisma.RecommendationRoundOrderByRelationAggregateInput;
    finalVotes?: Prisma.FinalVoteOrderByRelationAggregateInput;
    finalSelection?: Prisma.FinalSelectionOrderByWithRelationInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationOrderByRelationAggregateInput;
    restaurantSelection?: Prisma.RestaurantSelectionOrderByWithRelationInput;
    bill?: Prisma.BillOrderByWithRelationInput;
};
export type FoodFightSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    roomId?: string;
    AND?: Prisma.FoodFightSessionWhereInput | Prisma.FoodFightSessionWhereInput[];
    OR?: Prisma.FoodFightSessionWhereInput[];
    NOT?: Prisma.FoodFightSessionWhereInput | Prisma.FoodFightSessionWhereInput[];
    status?: Prisma.EnumFoodFightStatusFilter<"FoodFightSession"> | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFilter<"FoodFightSession"> | Date | string;
    finalizedAt?: Prisma.DateTimeNullableFilter<"FoodFightSession"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableFilter<"FoodFightSession"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"FoodFightSession"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodFightSession"> | Date | string;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    members?: Prisma.SessionMemberListRelationFilter;
    preferences?: Prisma.MealPreferenceListRelationFilter;
    recommendationRounds?: Prisma.RecommendationRoundListRelationFilter;
    finalVotes?: Prisma.FinalVoteListRelationFilter;
    finalSelection?: Prisma.XOR<Prisma.FinalSelectionNullableScalarRelationFilter, Prisma.FinalSelectionWhereInput> | null;
    restaurantRecommendations?: Prisma.RestaurantRecommendationListRelationFilter;
    restaurantSelection?: Prisma.XOR<Prisma.RestaurantSelectionNullableScalarRelationFilter, Prisma.RestaurantSelectionWhereInput> | null;
    bill?: Prisma.XOR<Prisma.BillNullableScalarRelationFilter, Prisma.BillWhereInput> | null;
}, "id" | "roomId">;
export type FoodFightSessionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finalizedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FoodFightSessionCountOrderByAggregateInput;
    _max?: Prisma.FoodFightSessionMaxOrderByAggregateInput;
    _min?: Prisma.FoodFightSessionMinOrderByAggregateInput;
};
export type FoodFightSessionScalarWhereWithAggregatesInput = {
    AND?: Prisma.FoodFightSessionScalarWhereWithAggregatesInput | Prisma.FoodFightSessionScalarWhereWithAggregatesInput[];
    OR?: Prisma.FoodFightSessionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FoodFightSessionScalarWhereWithAggregatesInput | Prisma.FoodFightSessionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FoodFightSession"> | string;
    roomId?: Prisma.StringWithAggregatesFilter<"FoodFightSession"> | string;
    status?: Prisma.EnumFoodFightStatusWithAggregatesFilter<"FoodFightSession"> | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeWithAggregatesFilter<"FoodFightSession"> | Date | string;
    finalizedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FoodFightSession"> | Date | string | null;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"FoodFightSession"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FoodFightSession"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FoodFightSession"> | Date | string;
};
export type FoodFightSessionCreateInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateManyInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodFightSessionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodFightSessionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodFightSessionNullableScalarRelationFilter = {
    is?: Prisma.FoodFightSessionWhereInput | null;
    isNot?: Prisma.FoodFightSessionWhereInput | null;
};
export type FoodFightSessionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finalizedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodFightSessionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finalizedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodFightSessionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    startedAt?: Prisma.SortOrder;
    finalizedAt?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodFightSessionScalarRelationFilter = {
    is?: Prisma.FoodFightSessionWhereInput;
    isNot?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionCreateNestedOneWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRoomInput, Prisma.FoodFightSessionUncheckedCreateWithoutRoomInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRoomInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUncheckedCreateNestedOneWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRoomInput, Prisma.FoodFightSessionUncheckedCreateWithoutRoomInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRoomInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRoomInput, Prisma.FoodFightSessionUncheckedCreateWithoutRoomInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRoomInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutRoomInput;
    disconnect?: Prisma.FoodFightSessionWhereInput | boolean;
    delete?: Prisma.FoodFightSessionWhereInput | boolean;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutRoomInput, Prisma.FoodFightSessionUpdateWithoutRoomInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutRoomInput>;
};
export type FoodFightSessionUncheckedUpdateOneWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRoomInput, Prisma.FoodFightSessionUncheckedCreateWithoutRoomInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRoomInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutRoomInput;
    disconnect?: Prisma.FoodFightSessionWhereInput | boolean;
    delete?: Prisma.FoodFightSessionWhereInput | boolean;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutRoomInput, Prisma.FoodFightSessionUpdateWithoutRoomInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutRoomInput>;
};
export type EnumFoodFightStatusFieldUpdateOperationsInput = {
    set?: $Enums.FoodFightStatus;
};
export type FoodFightSessionCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutMembersInput, Prisma.FoodFightSessionUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutMembersInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutMembersInput, Prisma.FoodFightSessionUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutMembersInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutMembersInput, Prisma.FoodFightSessionUpdateWithoutMembersInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutMembersInput>;
};
export type FoodFightSessionCreateNestedOneWithoutPreferencesInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutPreferencesInput, Prisma.FoodFightSessionUncheckedCreateWithoutPreferencesInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutPreferencesInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutPreferencesNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutPreferencesInput, Prisma.FoodFightSessionUncheckedCreateWithoutPreferencesInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutPreferencesInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutPreferencesInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutPreferencesInput, Prisma.FoodFightSessionUpdateWithoutPreferencesInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutPreferencesInput>;
};
export type FoodFightSessionCreateNestedOneWithoutRecommendationRoundsInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRecommendationRoundsInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRecommendationRoundsInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutRecommendationRoundsNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRecommendationRoundsInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRecommendationRoundsInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutRecommendationRoundsInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUpdateWithoutRecommendationRoundsInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutRecommendationRoundsInput>;
};
export type FoodFightSessionCreateNestedOneWithoutFinalVotesInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalVotesInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalVotesInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutFinalVotesInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutFinalVotesNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalVotesInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalVotesInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutFinalVotesInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutFinalVotesInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutFinalVotesInput, Prisma.FoodFightSessionUpdateWithoutFinalVotesInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutFinalVotesInput>;
};
export type FoodFightSessionCreateNestedOneWithoutFinalSelectionInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalSelectionInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutFinalSelectionInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutFinalSelectionNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalSelectionInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutFinalSelectionInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutFinalSelectionInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutFinalSelectionInput, Prisma.FoodFightSessionUpdateWithoutFinalSelectionInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutFinalSelectionInput>;
};
export type FoodFightSessionCreateNestedOneWithoutRestaurantRecommendationsInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantRecommendationsInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRestaurantRecommendationsInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutRestaurantRecommendationsNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantRecommendationsInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRestaurantRecommendationsInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutRestaurantRecommendationsInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUpdateWithoutRestaurantRecommendationsInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutRestaurantRecommendationsInput>;
};
export type FoodFightSessionCreateNestedOneWithoutRestaurantSelectionInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantSelectionInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRestaurantSelectionInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutRestaurantSelectionNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantSelectionInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutRestaurantSelectionInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutRestaurantSelectionInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUpdateWithoutRestaurantSelectionInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutRestaurantSelectionInput>;
};
export type FoodFightSessionCreateNestedOneWithoutBillInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutBillInput, Prisma.FoodFightSessionUncheckedCreateWithoutBillInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutBillInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateOneRequiredWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutBillInput, Prisma.FoodFightSessionUncheckedCreateWithoutBillInput>;
    connectOrCreate?: Prisma.FoodFightSessionCreateOrConnectWithoutBillInput;
    upsert?: Prisma.FoodFightSessionUpsertWithoutBillInput;
    connect?: Prisma.FoodFightSessionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodFightSessionUpdateToOneWithWhereWithoutBillInput, Prisma.FoodFightSessionUpdateWithoutBillInput>, Prisma.FoodFightSessionUncheckedUpdateWithoutBillInput>;
};
export type FoodFightSessionCreateWithoutRoomInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutRoomInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutRoomInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRoomInput, Prisma.FoodFightSessionUncheckedCreateWithoutRoomInput>;
};
export type FoodFightSessionUpsertWithoutRoomInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRoomInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRoomInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRoomInput, Prisma.FoodFightSessionUncheckedCreateWithoutRoomInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutRoomInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRoomInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRoomInput>;
};
export type FoodFightSessionUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutMembersInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutMembersInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutMembersInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutMembersInput, Prisma.FoodFightSessionUncheckedCreateWithoutMembersInput>;
};
export type FoodFightSessionUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutMembersInput, Prisma.FoodFightSessionUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutMembersInput, Prisma.FoodFightSessionUncheckedCreateWithoutMembersInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutMembersInput, Prisma.FoodFightSessionUncheckedUpdateWithoutMembersInput>;
};
export type FoodFightSessionUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutPreferencesInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutPreferencesInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutPreferencesInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutPreferencesInput, Prisma.FoodFightSessionUncheckedCreateWithoutPreferencesInput>;
};
export type FoodFightSessionUpsertWithoutPreferencesInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutPreferencesInput, Prisma.FoodFightSessionUncheckedUpdateWithoutPreferencesInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutPreferencesInput, Prisma.FoodFightSessionUncheckedCreateWithoutPreferencesInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutPreferencesInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutPreferencesInput, Prisma.FoodFightSessionUncheckedUpdateWithoutPreferencesInput>;
};
export type FoodFightSessionUpdateWithoutPreferencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutPreferencesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutRecommendationRoundsInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutRecommendationRoundsInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutRecommendationRoundsInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRecommendationRoundsInput>;
};
export type FoodFightSessionUpsertWithoutRecommendationRoundsInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRecommendationRoundsInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRecommendationRoundsInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutRecommendationRoundsInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRecommendationRoundsInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRecommendationRoundsInput>;
};
export type FoodFightSessionUpdateWithoutRecommendationRoundsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutRecommendationRoundsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutFinalVotesInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutFinalVotesInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutFinalVotesInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalVotesInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalVotesInput>;
};
export type FoodFightSessionUpsertWithoutFinalVotesInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutFinalVotesInput, Prisma.FoodFightSessionUncheckedUpdateWithoutFinalVotesInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalVotesInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalVotesInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutFinalVotesInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutFinalVotesInput, Prisma.FoodFightSessionUncheckedUpdateWithoutFinalVotesInput>;
};
export type FoodFightSessionUpdateWithoutFinalVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutFinalVotesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutFinalSelectionInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutFinalSelectionInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutFinalSelectionInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalSelectionInput>;
};
export type FoodFightSessionUpsertWithoutFinalSelectionInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutFinalSelectionInput, Prisma.FoodFightSessionUncheckedUpdateWithoutFinalSelectionInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutFinalSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutFinalSelectionInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutFinalSelectionInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutFinalSelectionInput, Prisma.FoodFightSessionUncheckedUpdateWithoutFinalSelectionInput>;
};
export type FoodFightSessionUpdateWithoutFinalSelectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutFinalSelectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutRestaurantRecommendationsInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutRestaurantRecommendationsInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutRestaurantRecommendationsInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantRecommendationsInput>;
};
export type FoodFightSessionUpsertWithoutRestaurantRecommendationsInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRestaurantRecommendationsInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantRecommendationsInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutRestaurantRecommendationsInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRestaurantRecommendationsInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRestaurantRecommendationsInput>;
};
export type FoodFightSessionUpdateWithoutRestaurantRecommendationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutRestaurantRecommendationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutRestaurantSelectionInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    bill?: Prisma.BillCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutRestaurantSelectionInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    bill?: Prisma.BillUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutRestaurantSelectionInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantSelectionInput>;
};
export type FoodFightSessionUpsertWithoutRestaurantSelectionInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRestaurantSelectionInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUncheckedCreateWithoutRestaurantSelectionInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutRestaurantSelectionInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutRestaurantSelectionInput, Prisma.FoodFightSessionUncheckedUpdateWithoutRestaurantSelectionInput>;
};
export type FoodFightSessionUpdateWithoutRestaurantSelectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    bill?: Prisma.BillUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutRestaurantSelectionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    bill?: Prisma.BillUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCreateWithoutBillInput = {
    id?: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    room: Prisma.RoomCreateNestedOneWithoutSessionInput;
    members?: Prisma.SessionMemberCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionUncheckedCreateWithoutBillInput = {
    id?: string;
    roomId: string;
    status?: $Enums.FoodFightStatus;
    startedAt?: Date | string;
    finalizedAt?: Date | string | null;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.SessionMemberUncheckedCreateNestedManyWithoutSessionInput;
    preferences?: Prisma.MealPreferenceUncheckedCreateNestedManyWithoutSessionInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedCreateNestedManyWithoutSessionInput;
    finalVotes?: Prisma.FinalVoteUncheckedCreateNestedManyWithoutSessionInput;
    finalSelection?: Prisma.FinalSelectionUncheckedCreateNestedOneWithoutSessionInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedCreateNestedManyWithoutSessionInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput;
};
export type FoodFightSessionCreateOrConnectWithoutBillInput = {
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutBillInput, Prisma.FoodFightSessionUncheckedCreateWithoutBillInput>;
};
export type FoodFightSessionUpsertWithoutBillInput = {
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutBillInput, Prisma.FoodFightSessionUncheckedUpdateWithoutBillInput>;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateWithoutBillInput, Prisma.FoodFightSessionUncheckedCreateWithoutBillInput>;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type FoodFightSessionUpdateToOneWithWhereWithoutBillInput = {
    where?: Prisma.FoodFightSessionWhereInput;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateWithoutBillInput, Prisma.FoodFightSessionUncheckedUpdateWithoutBillInput>;
};
export type FoodFightSessionUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.RoomUpdateOneRequiredWithoutSessionNestedInput;
    members?: Prisma.SessionMemberUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionUncheckedUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumFoodFightStatusFieldUpdateOperationsInput | $Enums.FoodFightStatus;
    startedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    finalizedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.SessionMemberUncheckedUpdateManyWithoutSessionNestedInput;
    preferences?: Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput;
    recommendationRounds?: Prisma.RecommendationRoundUncheckedUpdateManyWithoutSessionNestedInput;
    finalVotes?: Prisma.FinalVoteUncheckedUpdateManyWithoutSessionNestedInput;
    finalSelection?: Prisma.FinalSelectionUncheckedUpdateOneWithoutSessionNestedInput;
    restaurantRecommendations?: Prisma.RestaurantRecommendationUncheckedUpdateManyWithoutSessionNestedInput;
    restaurantSelection?: Prisma.RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput;
};
export type FoodFightSessionCountOutputType = {
    members: number;
    preferences: number;
    recommendationRounds: number;
    finalVotes: number;
    restaurantRecommendations: number;
};
export type FoodFightSessionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | FoodFightSessionCountOutputTypeCountMembersArgs;
    preferences?: boolean | FoodFightSessionCountOutputTypeCountPreferencesArgs;
    recommendationRounds?: boolean | FoodFightSessionCountOutputTypeCountRecommendationRoundsArgs;
    finalVotes?: boolean | FoodFightSessionCountOutputTypeCountFinalVotesArgs;
    restaurantRecommendations?: boolean | FoodFightSessionCountOutputTypeCountRestaurantRecommendationsArgs;
};
export type FoodFightSessionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionCountOutputTypeSelect<ExtArgs> | null;
};
export type FoodFightSessionCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionMemberWhereInput;
};
export type FoodFightSessionCountOutputTypeCountPreferencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MealPreferenceWhereInput;
};
export type FoodFightSessionCountOutputTypeCountRecommendationRoundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RecommendationRoundWhereInput;
};
export type FoodFightSessionCountOutputTypeCountFinalVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FinalVoteWhereInput;
};
export type FoodFightSessionCountOutputTypeCountRestaurantRecommendationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantRecommendationWhereInput;
};
export type FoodFightSessionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    finalizedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    members?: boolean | Prisma.FoodFightSession$membersArgs<ExtArgs>;
    preferences?: boolean | Prisma.FoodFightSession$preferencesArgs<ExtArgs>;
    recommendationRounds?: boolean | Prisma.FoodFightSession$recommendationRoundsArgs<ExtArgs>;
    finalVotes?: boolean | Prisma.FoodFightSession$finalVotesArgs<ExtArgs>;
    finalSelection?: boolean | Prisma.FoodFightSession$finalSelectionArgs<ExtArgs>;
    restaurantRecommendations?: boolean | Prisma.FoodFightSession$restaurantRecommendationsArgs<ExtArgs>;
    restaurantSelection?: boolean | Prisma.FoodFightSession$restaurantSelectionArgs<ExtArgs>;
    bill?: boolean | Prisma.FoodFightSession$billArgs<ExtArgs>;
    _count?: boolean | Prisma.FoodFightSessionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodFightSession"]>;
export type FoodFightSessionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    finalizedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodFightSession"]>;
export type FoodFightSessionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    finalizedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodFightSession"]>;
export type FoodFightSessionSelectScalar = {
    id?: boolean;
    roomId?: boolean;
    status?: boolean;
    startedAt?: boolean;
    finalizedAt?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FoodFightSessionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roomId" | "status" | "startedAt" | "finalizedAt" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["foodFightSession"]>;
export type FoodFightSessionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    members?: boolean | Prisma.FoodFightSession$membersArgs<ExtArgs>;
    preferences?: boolean | Prisma.FoodFightSession$preferencesArgs<ExtArgs>;
    recommendationRounds?: boolean | Prisma.FoodFightSession$recommendationRoundsArgs<ExtArgs>;
    finalVotes?: boolean | Prisma.FoodFightSession$finalVotesArgs<ExtArgs>;
    finalSelection?: boolean | Prisma.FoodFightSession$finalSelectionArgs<ExtArgs>;
    restaurantRecommendations?: boolean | Prisma.FoodFightSession$restaurantRecommendationsArgs<ExtArgs>;
    restaurantSelection?: boolean | Prisma.FoodFightSession$restaurantSelectionArgs<ExtArgs>;
    bill?: boolean | Prisma.FoodFightSession$billArgs<ExtArgs>;
    _count?: boolean | Prisma.FoodFightSessionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FoodFightSessionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
};
export type FoodFightSessionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
};
export type $FoodFightSessionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FoodFightSession";
    objects: {
        room: Prisma.$RoomPayload<ExtArgs>;
        members: Prisma.$SessionMemberPayload<ExtArgs>[];
        preferences: Prisma.$MealPreferencePayload<ExtArgs>[];
        recommendationRounds: Prisma.$RecommendationRoundPayload<ExtArgs>[];
        finalVotes: Prisma.$FinalVotePayload<ExtArgs>[];
        finalSelection: Prisma.$FinalSelectionPayload<ExtArgs> | null;
        restaurantRecommendations: Prisma.$RestaurantRecommendationPayload<ExtArgs>[];
        restaurantSelection: Prisma.$RestaurantSelectionPayload<ExtArgs> | null;
        bill: Prisma.$BillPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        roomId: string;
        status: $Enums.FoodFightStatus;
        startedAt: Date;
        finalizedAt: Date | null;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["foodFightSession"]>;
    composites: {};
};
export type FoodFightSessionGetPayload<S extends boolean | null | undefined | FoodFightSessionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload, S>;
export type FoodFightSessionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FoodFightSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FoodFightSessionCountAggregateInputType | true;
};
export interface FoodFightSessionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FoodFightSession'];
        meta: {
            name: 'FoodFightSession';
        };
    };
    findUnique<T extends FoodFightSessionFindUniqueArgs>(args: Prisma.SelectSubset<T, FoodFightSessionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends FoodFightSessionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FoodFightSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends FoodFightSessionFindFirstArgs>(args?: Prisma.SelectSubset<T, FoodFightSessionFindFirstArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends FoodFightSessionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FoodFightSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends FoodFightSessionFindManyArgs>(args?: Prisma.SelectSubset<T, FoodFightSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends FoodFightSessionCreateArgs>(args: Prisma.SelectSubset<T, FoodFightSessionCreateArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends FoodFightSessionCreateManyArgs>(args?: Prisma.SelectSubset<T, FoodFightSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends FoodFightSessionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FoodFightSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends FoodFightSessionDeleteArgs>(args: Prisma.SelectSubset<T, FoodFightSessionDeleteArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends FoodFightSessionUpdateArgs>(args: Prisma.SelectSubset<T, FoodFightSessionUpdateArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends FoodFightSessionDeleteManyArgs>(args?: Prisma.SelectSubset<T, FoodFightSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends FoodFightSessionUpdateManyArgs>(args: Prisma.SelectSubset<T, FoodFightSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends FoodFightSessionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FoodFightSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends FoodFightSessionUpsertArgs>(args: Prisma.SelectSubset<T, FoodFightSessionUpsertArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends FoodFightSessionCountArgs>(args?: Prisma.Subset<T, FoodFightSessionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FoodFightSessionCountAggregateOutputType> : number>;
    aggregate<T extends FoodFightSessionAggregateArgs>(args: Prisma.Subset<T, FoodFightSessionAggregateArgs>): Prisma.PrismaPromise<GetFoodFightSessionAggregateType<T>>;
    groupBy<T extends FoodFightSessionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FoodFightSessionGroupByArgs['orderBy'];
    } : {
        orderBy?: FoodFightSessionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FoodFightSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodFightSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: FoodFightSessionFieldRefs;
}
export interface Prisma__FoodFightSessionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    room<T extends Prisma.RoomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    members<T extends Prisma.FoodFightSession$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    preferences<T extends Prisma.FoodFightSession$preferencesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$preferencesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    recommendationRounds<T extends Prisma.FoodFightSession$recommendationRoundsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$recommendationRoundsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RecommendationRoundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    finalVotes<T extends Prisma.FoodFightSession$finalVotesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$finalVotesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FinalVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    finalSelection<T extends Prisma.FoodFightSession$finalSelectionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$finalSelectionArgs<ExtArgs>>): Prisma.Prisma__FinalSelectionClient<runtime.Types.Result.GetResult<Prisma.$FinalSelectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    restaurantRecommendations<T extends Prisma.FoodFightSession$restaurantRecommendationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$restaurantRecommendationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantRecommendationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    restaurantSelection<T extends Prisma.FoodFightSession$restaurantSelectionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$restaurantSelectionArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    bill<T extends Prisma.FoodFightSession$billArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSession$billArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface FoodFightSessionFieldRefs {
    readonly id: Prisma.FieldRef<"FoodFightSession", 'String'>;
    readonly roomId: Prisma.FieldRef<"FoodFightSession", 'String'>;
    readonly status: Prisma.FieldRef<"FoodFightSession", 'FoodFightStatus'>;
    readonly startedAt: Prisma.FieldRef<"FoodFightSession", 'DateTime'>;
    readonly finalizedAt: Prisma.FieldRef<"FoodFightSession", 'DateTime'>;
    readonly completedAt: Prisma.FieldRef<"FoodFightSession", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"FoodFightSession", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FoodFightSession", 'DateTime'>;
}
export type FoodFightSessionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where?: Prisma.FoodFightSessionWhereInput;
    orderBy?: Prisma.FoodFightSessionOrderByWithRelationInput | Prisma.FoodFightSessionOrderByWithRelationInput[];
    cursor?: Prisma.FoodFightSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodFightSessionScalarFieldEnum | Prisma.FoodFightSessionScalarFieldEnum[];
};
export type FoodFightSessionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where?: Prisma.FoodFightSessionWhereInput;
    orderBy?: Prisma.FoodFightSessionOrderByWithRelationInput | Prisma.FoodFightSessionOrderByWithRelationInput[];
    cursor?: Prisma.FoodFightSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodFightSessionScalarFieldEnum | Prisma.FoodFightSessionScalarFieldEnum[];
};
export type FoodFightSessionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where?: Prisma.FoodFightSessionWhereInput;
    orderBy?: Prisma.FoodFightSessionOrderByWithRelationInput | Prisma.FoodFightSessionOrderByWithRelationInput[];
    cursor?: Prisma.FoodFightSessionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FoodFightSessionScalarFieldEnum | Prisma.FoodFightSessionScalarFieldEnum[];
};
export type FoodFightSessionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FoodFightSessionCreateInput, Prisma.FoodFightSessionUncheckedCreateInput>;
};
export type FoodFightSessionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.FoodFightSessionCreateManyInput | Prisma.FoodFightSessionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type FoodFightSessionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    data: Prisma.FoodFightSessionCreateManyInput | Prisma.FoodFightSessionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.FoodFightSessionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type FoodFightSessionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateInput, Prisma.FoodFightSessionUncheckedUpdateInput>;
    where: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateManyMutationInput, Prisma.FoodFightSessionUncheckedUpdateManyInput>;
    where?: Prisma.FoodFightSessionWhereInput;
    limit?: number;
};
export type FoodFightSessionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.FoodFightSessionUpdateManyMutationInput, Prisma.FoodFightSessionUncheckedUpdateManyInput>;
    where?: Prisma.FoodFightSessionWhereInput;
    limit?: number;
    include?: Prisma.FoodFightSessionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type FoodFightSessionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where: Prisma.FoodFightSessionWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodFightSessionCreateInput, Prisma.FoodFightSessionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.FoodFightSessionUpdateInput, Prisma.FoodFightSessionUncheckedUpdateInput>;
};
export type FoodFightSessionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where: Prisma.FoodFightSessionWhereUniqueInput;
};
export type FoodFightSessionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodFightSessionWhereInput;
    limit?: number;
};
export type FoodFightSession$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    where?: Prisma.SessionMemberWhereInput;
    orderBy?: Prisma.SessionMemberOrderByWithRelationInput | Prisma.SessionMemberOrderByWithRelationInput[];
    cursor?: Prisma.SessionMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SessionMemberScalarFieldEnum | Prisma.SessionMemberScalarFieldEnum[];
};
export type FoodFightSession$preferencesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    where?: Prisma.MealPreferenceWhereInput;
    orderBy?: Prisma.MealPreferenceOrderByWithRelationInput | Prisma.MealPreferenceOrderByWithRelationInput[];
    cursor?: Prisma.MealPreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MealPreferenceScalarFieldEnum | Prisma.MealPreferenceScalarFieldEnum[];
};
export type FoodFightSession$recommendationRoundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FoodFightSession$finalVotesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type FoodFightSession$finalSelectionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FinalSelectionSelect<ExtArgs> | null;
    omit?: Prisma.FinalSelectionOmit<ExtArgs> | null;
    include?: Prisma.FinalSelectionInclude<ExtArgs> | null;
    where?: Prisma.FinalSelectionWhereInput;
};
export type FoodFightSession$restaurantRecommendationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantRecommendationSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantRecommendationOmit<ExtArgs> | null;
    include?: Prisma.RestaurantRecommendationInclude<ExtArgs> | null;
    where?: Prisma.RestaurantRecommendationWhereInput;
    orderBy?: Prisma.RestaurantRecommendationOrderByWithRelationInput | Prisma.RestaurantRecommendationOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantRecommendationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantRecommendationScalarFieldEnum | Prisma.RestaurantRecommendationScalarFieldEnum[];
};
export type FoodFightSession$restaurantSelectionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where?: Prisma.RestaurantSelectionWhereInput;
};
export type FoodFightSession$billArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where?: Prisma.BillWhereInput;
};
export type FoodFightSessionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
};
