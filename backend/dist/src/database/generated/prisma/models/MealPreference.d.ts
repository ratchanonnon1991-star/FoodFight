import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type MealPreferenceModel = runtime.Types.Result.DefaultSelection<Prisma.$MealPreferencePayload>;
export type AggregateMealPreference = {
    _count: MealPreferenceCountAggregateOutputType | null;
    _min: MealPreferenceMinAggregateOutputType | null;
    _max: MealPreferenceMaxAggregateOutputType | null;
};
export type MealPreferenceMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    otherCookingType: string | null;
    otherCuisine: string | null;
    otherIngredient: string | null;
    budgetRange: $Enums.MealBudgetRange | null;
    otherRestaurantStyle: string | null;
    otherNote: string | null;
    submittedAt: Date | null;
    updatedAt: Date | null;
};
export type MealPreferenceMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    otherCookingType: string | null;
    otherCuisine: string | null;
    otherIngredient: string | null;
    budgetRange: $Enums.MealBudgetRange | null;
    otherRestaurantStyle: string | null;
    otherNote: string | null;
    submittedAt: Date | null;
    updatedAt: Date | null;
};
export type MealPreferenceCountAggregateOutputType = {
    id: number;
    sessionId: number;
    userId: number;
    cookingTypes: number;
    otherCookingType: number;
    cuisines: number;
    otherCuisine: number;
    ingredients: number;
    otherIngredient: number;
    budgetRange: number;
    restaurantStyles: number;
    otherRestaurantStyle: number;
    otherNote: number;
    submittedAt: number;
    updatedAt: number;
    _all: number;
};
export type MealPreferenceMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    otherCookingType?: true;
    otherCuisine?: true;
    otherIngredient?: true;
    budgetRange?: true;
    otherRestaurantStyle?: true;
    otherNote?: true;
    submittedAt?: true;
    updatedAt?: true;
};
export type MealPreferenceMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    otherCookingType?: true;
    otherCuisine?: true;
    otherIngredient?: true;
    budgetRange?: true;
    otherRestaurantStyle?: true;
    otherNote?: true;
    submittedAt?: true;
    updatedAt?: true;
};
export type MealPreferenceCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    cookingTypes?: true;
    otherCookingType?: true;
    cuisines?: true;
    otherCuisine?: true;
    ingredients?: true;
    otherIngredient?: true;
    budgetRange?: true;
    restaurantStyles?: true;
    otherRestaurantStyle?: true;
    otherNote?: true;
    submittedAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type MealPreferenceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MealPreferenceWhereInput;
    orderBy?: Prisma.MealPreferenceOrderByWithRelationInput | Prisma.MealPreferenceOrderByWithRelationInput[];
    cursor?: Prisma.MealPreferenceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | MealPreferenceCountAggregateInputType;
    _min?: MealPreferenceMinAggregateInputType;
    _max?: MealPreferenceMaxAggregateInputType;
};
export type GetMealPreferenceAggregateType<T extends MealPreferenceAggregateArgs> = {
    [P in keyof T & keyof AggregateMealPreference]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMealPreference[P]> : Prisma.GetScalarType<T[P], AggregateMealPreference[P]>;
};
export type MealPreferenceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MealPreferenceWhereInput;
    orderBy?: Prisma.MealPreferenceOrderByWithAggregationInput | Prisma.MealPreferenceOrderByWithAggregationInput[];
    by: Prisma.MealPreferenceScalarFieldEnum[] | Prisma.MealPreferenceScalarFieldEnum;
    having?: Prisma.MealPreferenceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MealPreferenceCountAggregateInputType | true;
    _min?: MealPreferenceMinAggregateInputType;
    _max?: MealPreferenceMaxAggregateInputType;
};
export type MealPreferenceGroupByOutputType = {
    id: string;
    sessionId: string;
    userId: string;
    cookingTypes: string[];
    otherCookingType: string | null;
    cuisines: string[];
    otherCuisine: string | null;
    ingredients: string[];
    otherIngredient: string | null;
    budgetRange: $Enums.MealBudgetRange | null;
    restaurantStyles: string[];
    otherRestaurantStyle: string | null;
    otherNote: string | null;
    submittedAt: Date;
    updatedAt: Date;
    _count: MealPreferenceCountAggregateOutputType | null;
    _min: MealPreferenceMinAggregateOutputType | null;
    _max: MealPreferenceMaxAggregateOutputType | null;
};
export type GetMealPreferenceGroupByPayload<T extends MealPreferenceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MealPreferenceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MealPreferenceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MealPreferenceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MealPreferenceGroupByOutputType[P]>;
}>>;
export type MealPreferenceWhereInput = {
    AND?: Prisma.MealPreferenceWhereInput | Prisma.MealPreferenceWhereInput[];
    OR?: Prisma.MealPreferenceWhereInput[];
    NOT?: Prisma.MealPreferenceWhereInput | Prisma.MealPreferenceWhereInput[];
    id?: Prisma.StringFilter<"MealPreference"> | string;
    sessionId?: Prisma.StringFilter<"MealPreference"> | string;
    userId?: Prisma.StringFilter<"MealPreference"> | string;
    cookingTypes?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCookingType?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    cuisines?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCuisine?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    ingredients?: Prisma.StringNullableListFilter<"MealPreference">;
    otherIngredient?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    budgetRange?: Prisma.EnumMealBudgetRangeNullableFilter<"MealPreference"> | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.StringNullableListFilter<"MealPreference">;
    otherRestaurantStyle?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    otherNote?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    submittedAt?: Prisma.DateTimeFilter<"MealPreference"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MealPreference"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type MealPreferenceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cookingTypes?: Prisma.SortOrder;
    otherCookingType?: Prisma.SortOrderInput | Prisma.SortOrder;
    cuisines?: Prisma.SortOrder;
    otherCuisine?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredients?: Prisma.SortOrder;
    otherIngredient?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetRange?: Prisma.SortOrderInput | Prisma.SortOrder;
    restaurantStyles?: Prisma.SortOrder;
    otherRestaurantStyle?: Prisma.SortOrderInput | Prisma.SortOrder;
    otherNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type MealPreferenceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId_userId?: Prisma.MealPreferenceSessionIdUserIdCompoundUniqueInput;
    AND?: Prisma.MealPreferenceWhereInput | Prisma.MealPreferenceWhereInput[];
    OR?: Prisma.MealPreferenceWhereInput[];
    NOT?: Prisma.MealPreferenceWhereInput | Prisma.MealPreferenceWhereInput[];
    sessionId?: Prisma.StringFilter<"MealPreference"> | string;
    userId?: Prisma.StringFilter<"MealPreference"> | string;
    cookingTypes?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCookingType?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    cuisines?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCuisine?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    ingredients?: Prisma.StringNullableListFilter<"MealPreference">;
    otherIngredient?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    budgetRange?: Prisma.EnumMealBudgetRangeNullableFilter<"MealPreference"> | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.StringNullableListFilter<"MealPreference">;
    otherRestaurantStyle?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    otherNote?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    submittedAt?: Prisma.DateTimeFilter<"MealPreference"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MealPreference"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "sessionId_userId">;
export type MealPreferenceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cookingTypes?: Prisma.SortOrder;
    otherCookingType?: Prisma.SortOrderInput | Prisma.SortOrder;
    cuisines?: Prisma.SortOrder;
    otherCuisine?: Prisma.SortOrderInput | Prisma.SortOrder;
    ingredients?: Prisma.SortOrder;
    otherIngredient?: Prisma.SortOrderInput | Prisma.SortOrder;
    budgetRange?: Prisma.SortOrderInput | Prisma.SortOrder;
    restaurantStyles?: Prisma.SortOrder;
    otherRestaurantStyle?: Prisma.SortOrderInput | Prisma.SortOrder;
    otherNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.MealPreferenceCountOrderByAggregateInput;
    _max?: Prisma.MealPreferenceMaxOrderByAggregateInput;
    _min?: Prisma.MealPreferenceMinOrderByAggregateInput;
};
export type MealPreferenceScalarWhereWithAggregatesInput = {
    AND?: Prisma.MealPreferenceScalarWhereWithAggregatesInput | Prisma.MealPreferenceScalarWhereWithAggregatesInput[];
    OR?: Prisma.MealPreferenceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MealPreferenceScalarWhereWithAggregatesInput | Prisma.MealPreferenceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MealPreference"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"MealPreference"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"MealPreference"> | string;
    cookingTypes?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCookingType?: Prisma.StringNullableWithAggregatesFilter<"MealPreference"> | string | null;
    cuisines?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCuisine?: Prisma.StringNullableWithAggregatesFilter<"MealPreference"> | string | null;
    ingredients?: Prisma.StringNullableListFilter<"MealPreference">;
    otherIngredient?: Prisma.StringNullableWithAggregatesFilter<"MealPreference"> | string | null;
    budgetRange?: Prisma.EnumMealBudgetRangeNullableWithAggregatesFilter<"MealPreference"> | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.StringNullableListFilter<"MealPreference">;
    otherRestaurantStyle?: Prisma.StringNullableWithAggregatesFilter<"MealPreference"> | string | null;
    otherNote?: Prisma.StringNullableWithAggregatesFilter<"MealPreference"> | string | null;
    submittedAt?: Prisma.DateTimeWithAggregatesFilter<"MealPreference"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"MealPreference"> | Date | string;
};
export type MealPreferenceCreateInput = {
    id?: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutPreferencesInput;
    user: Prisma.UserCreateNestedOneWithoutMealPreferencesInput;
};
export type MealPreferenceUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    userId: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
};
export type MealPreferenceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutPreferencesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutMealPreferencesNestedInput;
};
export type MealPreferenceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceCreateManyInput = {
    id?: string;
    sessionId: string;
    userId: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
};
export type MealPreferenceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceListRelationFilter = {
    every?: Prisma.MealPreferenceWhereInput;
    some?: Prisma.MealPreferenceWhereInput;
    none?: Prisma.MealPreferenceWhereInput;
};
export type MealPreferenceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MealPreferenceSessionIdUserIdCompoundUniqueInput = {
    sessionId: string;
    userId: string;
};
export type MealPreferenceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    cookingTypes?: Prisma.SortOrder;
    otherCookingType?: Prisma.SortOrder;
    cuisines?: Prisma.SortOrder;
    otherCuisine?: Prisma.SortOrder;
    ingredients?: Prisma.SortOrder;
    otherIngredient?: Prisma.SortOrder;
    budgetRange?: Prisma.SortOrder;
    restaurantStyles?: Prisma.SortOrder;
    otherRestaurantStyle?: Prisma.SortOrder;
    otherNote?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MealPreferenceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otherCookingType?: Prisma.SortOrder;
    otherCuisine?: Prisma.SortOrder;
    otherIngredient?: Prisma.SortOrder;
    budgetRange?: Prisma.SortOrder;
    otherRestaurantStyle?: Prisma.SortOrder;
    otherNote?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MealPreferenceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    otherCookingType?: Prisma.SortOrder;
    otherCuisine?: Prisma.SortOrder;
    otherIngredient?: Prisma.SortOrder;
    budgetRange?: Prisma.SortOrder;
    otherRestaurantStyle?: Prisma.SortOrder;
    otherNote?: Prisma.SortOrder;
    submittedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type MealPreferenceCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutUserInput, Prisma.MealPreferenceUncheckedCreateWithoutUserInput> | Prisma.MealPreferenceCreateWithoutUserInput[] | Prisma.MealPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutUserInput | Prisma.MealPreferenceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.MealPreferenceCreateManyUserInputEnvelope;
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
};
export type MealPreferenceUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutUserInput, Prisma.MealPreferenceUncheckedCreateWithoutUserInput> | Prisma.MealPreferenceCreateWithoutUserInput[] | Prisma.MealPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutUserInput | Prisma.MealPreferenceCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.MealPreferenceCreateManyUserInputEnvelope;
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
};
export type MealPreferenceUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutUserInput, Prisma.MealPreferenceUncheckedCreateWithoutUserInput> | Prisma.MealPreferenceCreateWithoutUserInput[] | Prisma.MealPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutUserInput | Prisma.MealPreferenceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.MealPreferenceUpsertWithWhereUniqueWithoutUserInput | Prisma.MealPreferenceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.MealPreferenceCreateManyUserInputEnvelope;
    set?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    disconnect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    delete?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    update?: Prisma.MealPreferenceUpdateWithWhereUniqueWithoutUserInput | Prisma.MealPreferenceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.MealPreferenceUpdateManyWithWhereWithoutUserInput | Prisma.MealPreferenceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.MealPreferenceScalarWhereInput | Prisma.MealPreferenceScalarWhereInput[];
};
export type MealPreferenceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutUserInput, Prisma.MealPreferenceUncheckedCreateWithoutUserInput> | Prisma.MealPreferenceCreateWithoutUserInput[] | Prisma.MealPreferenceUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutUserInput | Prisma.MealPreferenceCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.MealPreferenceUpsertWithWhereUniqueWithoutUserInput | Prisma.MealPreferenceUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.MealPreferenceCreateManyUserInputEnvelope;
    set?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    disconnect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    delete?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    update?: Prisma.MealPreferenceUpdateWithWhereUniqueWithoutUserInput | Prisma.MealPreferenceUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.MealPreferenceUpdateManyWithWhereWithoutUserInput | Prisma.MealPreferenceUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.MealPreferenceScalarWhereInput | Prisma.MealPreferenceScalarWhereInput[];
};
export type MealPreferenceCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutSessionInput, Prisma.MealPreferenceUncheckedCreateWithoutSessionInput> | Prisma.MealPreferenceCreateWithoutSessionInput[] | Prisma.MealPreferenceUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutSessionInput | Prisma.MealPreferenceCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.MealPreferenceCreateManySessionInputEnvelope;
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
};
export type MealPreferenceUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutSessionInput, Prisma.MealPreferenceUncheckedCreateWithoutSessionInput> | Prisma.MealPreferenceCreateWithoutSessionInput[] | Prisma.MealPreferenceUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutSessionInput | Prisma.MealPreferenceCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.MealPreferenceCreateManySessionInputEnvelope;
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
};
export type MealPreferenceUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutSessionInput, Prisma.MealPreferenceUncheckedCreateWithoutSessionInput> | Prisma.MealPreferenceCreateWithoutSessionInput[] | Prisma.MealPreferenceUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutSessionInput | Prisma.MealPreferenceCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.MealPreferenceUpsertWithWhereUniqueWithoutSessionInput | Prisma.MealPreferenceUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.MealPreferenceCreateManySessionInputEnvelope;
    set?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    disconnect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    delete?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    update?: Prisma.MealPreferenceUpdateWithWhereUniqueWithoutSessionInput | Prisma.MealPreferenceUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.MealPreferenceUpdateManyWithWhereWithoutSessionInput | Prisma.MealPreferenceUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.MealPreferenceScalarWhereInput | Prisma.MealPreferenceScalarWhereInput[];
};
export type MealPreferenceUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.MealPreferenceCreateWithoutSessionInput, Prisma.MealPreferenceUncheckedCreateWithoutSessionInput> | Prisma.MealPreferenceCreateWithoutSessionInput[] | Prisma.MealPreferenceUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.MealPreferenceCreateOrConnectWithoutSessionInput | Prisma.MealPreferenceCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.MealPreferenceUpsertWithWhereUniqueWithoutSessionInput | Prisma.MealPreferenceUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.MealPreferenceCreateManySessionInputEnvelope;
    set?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    disconnect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    delete?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    connect?: Prisma.MealPreferenceWhereUniqueInput | Prisma.MealPreferenceWhereUniqueInput[];
    update?: Prisma.MealPreferenceUpdateWithWhereUniqueWithoutSessionInput | Prisma.MealPreferenceUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.MealPreferenceUpdateManyWithWhereWithoutSessionInput | Prisma.MealPreferenceUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.MealPreferenceScalarWhereInput | Prisma.MealPreferenceScalarWhereInput[];
};
export type MealPreferenceCreatecookingTypesInput = {
    set: string[];
};
export type MealPreferenceCreatecuisinesInput = {
    set: string[];
};
export type MealPreferenceCreateingredientsInput = {
    set: string[];
};
export type MealPreferenceCreaterestaurantStylesInput = {
    set: string[];
};
export type MealPreferenceUpdatecookingTypesInput = {
    set?: string[];
    push?: string | string[];
};
export type MealPreferenceUpdatecuisinesInput = {
    set?: string[];
    push?: string | string[];
};
export type MealPreferenceUpdateingredientsInput = {
    set?: string[];
    push?: string | string[];
};
export type NullableEnumMealBudgetRangeFieldUpdateOperationsInput = {
    set?: $Enums.MealBudgetRange | null;
};
export type MealPreferenceUpdaterestaurantStylesInput = {
    set?: string[];
    push?: string | string[];
};
export type MealPreferenceCreateWithoutUserInput = {
    id?: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutPreferencesInput;
};
export type MealPreferenceUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionId: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
};
export type MealPreferenceCreateOrConnectWithoutUserInput = {
    where: Prisma.MealPreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MealPreferenceCreateWithoutUserInput, Prisma.MealPreferenceUncheckedCreateWithoutUserInput>;
};
export type MealPreferenceCreateManyUserInputEnvelope = {
    data: Prisma.MealPreferenceCreateManyUserInput | Prisma.MealPreferenceCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type MealPreferenceUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.MealPreferenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.MealPreferenceUpdateWithoutUserInput, Prisma.MealPreferenceUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.MealPreferenceCreateWithoutUserInput, Prisma.MealPreferenceUncheckedCreateWithoutUserInput>;
};
export type MealPreferenceUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.MealPreferenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.MealPreferenceUpdateWithoutUserInput, Prisma.MealPreferenceUncheckedUpdateWithoutUserInput>;
};
export type MealPreferenceUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.MealPreferenceScalarWhereInput;
    data: Prisma.XOR<Prisma.MealPreferenceUpdateManyMutationInput, Prisma.MealPreferenceUncheckedUpdateManyWithoutUserInput>;
};
export type MealPreferenceScalarWhereInput = {
    AND?: Prisma.MealPreferenceScalarWhereInput | Prisma.MealPreferenceScalarWhereInput[];
    OR?: Prisma.MealPreferenceScalarWhereInput[];
    NOT?: Prisma.MealPreferenceScalarWhereInput | Prisma.MealPreferenceScalarWhereInput[];
    id?: Prisma.StringFilter<"MealPreference"> | string;
    sessionId?: Prisma.StringFilter<"MealPreference"> | string;
    userId?: Prisma.StringFilter<"MealPreference"> | string;
    cookingTypes?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCookingType?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    cuisines?: Prisma.StringNullableListFilter<"MealPreference">;
    otherCuisine?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    ingredients?: Prisma.StringNullableListFilter<"MealPreference">;
    otherIngredient?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    budgetRange?: Prisma.EnumMealBudgetRangeNullableFilter<"MealPreference"> | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.StringNullableListFilter<"MealPreference">;
    otherRestaurantStyle?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    otherNote?: Prisma.StringNullableFilter<"MealPreference"> | string | null;
    submittedAt?: Prisma.DateTimeFilter<"MealPreference"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"MealPreference"> | Date | string;
};
export type MealPreferenceCreateWithoutSessionInput = {
    id?: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutMealPreferencesInput;
};
export type MealPreferenceUncheckedCreateWithoutSessionInput = {
    id?: string;
    userId: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
};
export type MealPreferenceCreateOrConnectWithoutSessionInput = {
    where: Prisma.MealPreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MealPreferenceCreateWithoutSessionInput, Prisma.MealPreferenceUncheckedCreateWithoutSessionInput>;
};
export type MealPreferenceCreateManySessionInputEnvelope = {
    data: Prisma.MealPreferenceCreateManySessionInput | Prisma.MealPreferenceCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type MealPreferenceUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.MealPreferenceWhereUniqueInput;
    update: Prisma.XOR<Prisma.MealPreferenceUpdateWithoutSessionInput, Prisma.MealPreferenceUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.MealPreferenceCreateWithoutSessionInput, Prisma.MealPreferenceUncheckedCreateWithoutSessionInput>;
};
export type MealPreferenceUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.MealPreferenceWhereUniqueInput;
    data: Prisma.XOR<Prisma.MealPreferenceUpdateWithoutSessionInput, Prisma.MealPreferenceUncheckedUpdateWithoutSessionInput>;
};
export type MealPreferenceUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.MealPreferenceScalarWhereInput;
    data: Prisma.XOR<Prisma.MealPreferenceUpdateManyMutationInput, Prisma.MealPreferenceUncheckedUpdateManyWithoutSessionInput>;
};
export type MealPreferenceCreateManyUserInput = {
    id?: string;
    sessionId: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
};
export type MealPreferenceUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutPreferencesNestedInput;
};
export type MealPreferenceUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceCreateManySessionInput = {
    id?: string;
    userId: string;
    cookingTypes?: Prisma.MealPreferenceCreatecookingTypesInput | string[];
    otherCookingType?: string | null;
    cuisines?: Prisma.MealPreferenceCreatecuisinesInput | string[];
    otherCuisine?: string | null;
    ingredients?: Prisma.MealPreferenceCreateingredientsInput | string[];
    otherIngredient?: string | null;
    budgetRange?: $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceCreaterestaurantStylesInput | string[];
    otherRestaurantStyle?: string | null;
    otherNote?: string | null;
    submittedAt?: Date | string;
    updatedAt?: Date | string;
};
export type MealPreferenceUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutMealPreferencesNestedInput;
};
export type MealPreferenceUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    cookingTypes?: Prisma.MealPreferenceUpdatecookingTypesInput | string[];
    otherCookingType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisines?: Prisma.MealPreferenceUpdatecuisinesInput | string[];
    otherCuisine?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ingredients?: Prisma.MealPreferenceUpdateingredientsInput | string[];
    otherIngredient?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    budgetRange?: Prisma.NullableEnumMealBudgetRangeFieldUpdateOperationsInput | $Enums.MealBudgetRange | null;
    restaurantStyles?: Prisma.MealPreferenceUpdaterestaurantStylesInput | string[];
    otherRestaurantStyle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    otherNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    submittedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type MealPreferenceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    cookingTypes?: boolean;
    otherCookingType?: boolean;
    cuisines?: boolean;
    otherCuisine?: boolean;
    ingredients?: boolean;
    otherIngredient?: boolean;
    budgetRange?: boolean;
    restaurantStyles?: boolean;
    otherRestaurantStyle?: boolean;
    otherNote?: boolean;
    submittedAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mealPreference"]>;
export type MealPreferenceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    cookingTypes?: boolean;
    otherCookingType?: boolean;
    cuisines?: boolean;
    otherCuisine?: boolean;
    ingredients?: boolean;
    otherIngredient?: boolean;
    budgetRange?: boolean;
    restaurantStyles?: boolean;
    otherRestaurantStyle?: boolean;
    otherNote?: boolean;
    submittedAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mealPreference"]>;
export type MealPreferenceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    cookingTypes?: boolean;
    otherCookingType?: boolean;
    cuisines?: boolean;
    otherCuisine?: boolean;
    ingredients?: boolean;
    otherIngredient?: boolean;
    budgetRange?: boolean;
    restaurantStyles?: boolean;
    otherRestaurantStyle?: boolean;
    otherNote?: boolean;
    submittedAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["mealPreference"]>;
export type MealPreferenceSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    cookingTypes?: boolean;
    otherCookingType?: boolean;
    cuisines?: boolean;
    otherCuisine?: boolean;
    ingredients?: boolean;
    otherIngredient?: boolean;
    budgetRange?: boolean;
    restaurantStyles?: boolean;
    otherRestaurantStyle?: boolean;
    otherNote?: boolean;
    submittedAt?: boolean;
    updatedAt?: boolean;
};
export type MealPreferenceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "userId" | "cookingTypes" | "otherCookingType" | "cuisines" | "otherCuisine" | "ingredients" | "otherIngredient" | "budgetRange" | "restaurantStyles" | "otherRestaurantStyle" | "otherNote" | "submittedAt" | "updatedAt", ExtArgs["result"]["mealPreference"]>;
export type MealPreferenceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MealPreferenceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type MealPreferenceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $MealPreferencePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MealPreference";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        userId: string;
        cookingTypes: string[];
        otherCookingType: string | null;
        cuisines: string[];
        otherCuisine: string | null;
        ingredients: string[];
        otherIngredient: string | null;
        budgetRange: $Enums.MealBudgetRange | null;
        restaurantStyles: string[];
        otherRestaurantStyle: string | null;
        otherNote: string | null;
        submittedAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["mealPreference"]>;
    composites: {};
};
export type MealPreferenceGetPayload<S extends boolean | null | undefined | MealPreferenceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload, S>;
export type MealPreferenceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MealPreferenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MealPreferenceCountAggregateInputType | true;
};
export interface MealPreferenceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MealPreference'];
        meta: {
            name: 'MealPreference';
        };
    };
    findUnique<T extends MealPreferenceFindUniqueArgs>(args: Prisma.SelectSubset<T, MealPreferenceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends MealPreferenceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MealPreferenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends MealPreferenceFindFirstArgs>(args?: Prisma.SelectSubset<T, MealPreferenceFindFirstArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends MealPreferenceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MealPreferenceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends MealPreferenceFindManyArgs>(args?: Prisma.SelectSubset<T, MealPreferenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends MealPreferenceCreateArgs>(args: Prisma.SelectSubset<T, MealPreferenceCreateArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends MealPreferenceCreateManyArgs>(args?: Prisma.SelectSubset<T, MealPreferenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends MealPreferenceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MealPreferenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends MealPreferenceDeleteArgs>(args: Prisma.SelectSubset<T, MealPreferenceDeleteArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends MealPreferenceUpdateArgs>(args: Prisma.SelectSubset<T, MealPreferenceUpdateArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends MealPreferenceDeleteManyArgs>(args?: Prisma.SelectSubset<T, MealPreferenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends MealPreferenceUpdateManyArgs>(args: Prisma.SelectSubset<T, MealPreferenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends MealPreferenceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MealPreferenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends MealPreferenceUpsertArgs>(args: Prisma.SelectSubset<T, MealPreferenceUpsertArgs<ExtArgs>>): Prisma.Prisma__MealPreferenceClient<runtime.Types.Result.GetResult<Prisma.$MealPreferencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends MealPreferenceCountArgs>(args?: Prisma.Subset<T, MealPreferenceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MealPreferenceCountAggregateOutputType> : number>;
    aggregate<T extends MealPreferenceAggregateArgs>(args: Prisma.Subset<T, MealPreferenceAggregateArgs>): Prisma.PrismaPromise<GetMealPreferenceAggregateType<T>>;
    groupBy<T extends MealPreferenceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MealPreferenceGroupByArgs['orderBy'];
    } : {
        orderBy?: MealPreferenceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MealPreferenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMealPreferenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: MealPreferenceFieldRefs;
}
export interface Prisma__MealPreferenceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface MealPreferenceFieldRefs {
    readonly id: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly sessionId: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly userId: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly cookingTypes: Prisma.FieldRef<"MealPreference", 'String[]'>;
    readonly otherCookingType: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly cuisines: Prisma.FieldRef<"MealPreference", 'String[]'>;
    readonly otherCuisine: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly ingredients: Prisma.FieldRef<"MealPreference", 'String[]'>;
    readonly otherIngredient: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly budgetRange: Prisma.FieldRef<"MealPreference", 'MealBudgetRange'>;
    readonly restaurantStyles: Prisma.FieldRef<"MealPreference", 'String[]'>;
    readonly otherRestaurantStyle: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly otherNote: Prisma.FieldRef<"MealPreference", 'String'>;
    readonly submittedAt: Prisma.FieldRef<"MealPreference", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"MealPreference", 'DateTime'>;
}
export type MealPreferenceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    where: Prisma.MealPreferenceWhereUniqueInput;
};
export type MealPreferenceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    where: Prisma.MealPreferenceWhereUniqueInput;
};
export type MealPreferenceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MealPreferenceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MealPreferenceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type MealPreferenceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MealPreferenceCreateInput, Prisma.MealPreferenceUncheckedCreateInput>;
};
export type MealPreferenceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.MealPreferenceCreateManyInput | Prisma.MealPreferenceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type MealPreferenceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    data: Prisma.MealPreferenceCreateManyInput | Prisma.MealPreferenceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.MealPreferenceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type MealPreferenceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MealPreferenceUpdateInput, Prisma.MealPreferenceUncheckedUpdateInput>;
    where: Prisma.MealPreferenceWhereUniqueInput;
};
export type MealPreferenceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.MealPreferenceUpdateManyMutationInput, Prisma.MealPreferenceUncheckedUpdateManyInput>;
    where?: Prisma.MealPreferenceWhereInput;
    limit?: number;
};
export type MealPreferenceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.MealPreferenceUpdateManyMutationInput, Prisma.MealPreferenceUncheckedUpdateManyInput>;
    where?: Prisma.MealPreferenceWhereInput;
    limit?: number;
    include?: Prisma.MealPreferenceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type MealPreferenceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    where: Prisma.MealPreferenceWhereUniqueInput;
    create: Prisma.XOR<Prisma.MealPreferenceCreateInput, Prisma.MealPreferenceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.MealPreferenceUpdateInput, Prisma.MealPreferenceUncheckedUpdateInput>;
};
export type MealPreferenceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
    where: Prisma.MealPreferenceWhereUniqueInput;
};
export type MealPreferenceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MealPreferenceWhereInput;
    limit?: number;
};
export type MealPreferenceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.MealPreferenceSelect<ExtArgs> | null;
    omit?: Prisma.MealPreferenceOmit<ExtArgs> | null;
    include?: Prisma.MealPreferenceInclude<ExtArgs> | null;
};
