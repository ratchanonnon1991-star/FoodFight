import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RestaurantSelectionModel = runtime.Types.Result.DefaultSelection<Prisma.$RestaurantSelectionPayload>;
export type AggregateRestaurantSelection = {
    _count: RestaurantSelectionCountAggregateOutputType | null;
    _avg: RestaurantSelectionAvgAggregateOutputType | null;
    _sum: RestaurantSelectionSumAggregateOutputType | null;
    _min: RestaurantSelectionMinAggregateOutputType | null;
    _max: RestaurantSelectionMaxAggregateOutputType | null;
};
export type RestaurantSelectionAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    distanceMeters: number | null;
};
export type RestaurantSelectionSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    distanceMeters: number | null;
};
export type RestaurantSelectionMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    selectedById: string | null;
    externalPlaceId: string | null;
    name: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    distanceMeters: number | null;
    phone: string | null;
    imageUrl: string | null;
    selectedAt: Date | null;
};
export type RestaurantSelectionMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    selectedById: string | null;
    externalPlaceId: string | null;
    name: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    distanceMeters: number | null;
    phone: string | null;
    imageUrl: string | null;
    selectedAt: Date | null;
};
export type RestaurantSelectionCountAggregateOutputType = {
    id: number;
    sessionId: number;
    selectedById: number;
    externalPlaceId: number;
    name: number;
    address: number;
    latitude: number;
    longitude: number;
    distanceMeters: number;
    phone: number;
    openingHours: number;
    imageUrl: number;
    selectedAt: number;
    _all: number;
};
export type RestaurantSelectionAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    distanceMeters?: true;
};
export type RestaurantSelectionSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    distanceMeters?: true;
};
export type RestaurantSelectionMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    selectedById?: true;
    externalPlaceId?: true;
    name?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    distanceMeters?: true;
    phone?: true;
    imageUrl?: true;
    selectedAt?: true;
};
export type RestaurantSelectionMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    selectedById?: true;
    externalPlaceId?: true;
    name?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    distanceMeters?: true;
    phone?: true;
    imageUrl?: true;
    selectedAt?: true;
};
export type RestaurantSelectionCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    selectedById?: true;
    externalPlaceId?: true;
    name?: true;
    address?: true;
    latitude?: true;
    longitude?: true;
    distanceMeters?: true;
    phone?: true;
    openingHours?: true;
    imageUrl?: true;
    selectedAt?: true;
    _all?: true;
};
export type RestaurantSelectionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantSelectionWhereInput;
    orderBy?: Prisma.RestaurantSelectionOrderByWithRelationInput | Prisma.RestaurantSelectionOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RestaurantSelectionCountAggregateInputType;
    _avg?: RestaurantSelectionAvgAggregateInputType;
    _sum?: RestaurantSelectionSumAggregateInputType;
    _min?: RestaurantSelectionMinAggregateInputType;
    _max?: RestaurantSelectionMaxAggregateInputType;
};
export type GetRestaurantSelectionAggregateType<T extends RestaurantSelectionAggregateArgs> = {
    [P in keyof T & keyof AggregateRestaurantSelection]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRestaurantSelection[P]> : Prisma.GetScalarType<T[P], AggregateRestaurantSelection[P]>;
};
export type RestaurantSelectionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantSelectionWhereInput;
    orderBy?: Prisma.RestaurantSelectionOrderByWithAggregationInput | Prisma.RestaurantSelectionOrderByWithAggregationInput[];
    by: Prisma.RestaurantSelectionScalarFieldEnum[] | Prisma.RestaurantSelectionScalarFieldEnum;
    having?: Prisma.RestaurantSelectionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RestaurantSelectionCountAggregateInputType | true;
    _avg?: RestaurantSelectionAvgAggregateInputType;
    _sum?: RestaurantSelectionSumAggregateInputType;
    _min?: RestaurantSelectionMinAggregateInputType;
    _max?: RestaurantSelectionMaxAggregateInputType;
};
export type RestaurantSelectionGroupByOutputType = {
    id: string;
    sessionId: string;
    selectedById: string;
    externalPlaceId: string | null;
    name: string;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    distanceMeters: number | null;
    phone: string | null;
    openingHours: runtime.JsonValue | null;
    imageUrl: string | null;
    selectedAt: Date;
    _count: RestaurantSelectionCountAggregateOutputType | null;
    _avg: RestaurantSelectionAvgAggregateOutputType | null;
    _sum: RestaurantSelectionSumAggregateOutputType | null;
    _min: RestaurantSelectionMinAggregateOutputType | null;
    _max: RestaurantSelectionMaxAggregateOutputType | null;
};
export type GetRestaurantSelectionGroupByPayload<T extends RestaurantSelectionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RestaurantSelectionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RestaurantSelectionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RestaurantSelectionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RestaurantSelectionGroupByOutputType[P]>;
}>>;
export type RestaurantSelectionWhereInput = {
    AND?: Prisma.RestaurantSelectionWhereInput | Prisma.RestaurantSelectionWhereInput[];
    OR?: Prisma.RestaurantSelectionWhereInput[];
    NOT?: Prisma.RestaurantSelectionWhereInput | Prisma.RestaurantSelectionWhereInput[];
    id?: Prisma.StringFilter<"RestaurantSelection"> | string;
    sessionId?: Prisma.StringFilter<"RestaurantSelection"> | string;
    selectedById?: Prisma.StringFilter<"RestaurantSelection"> | string;
    externalPlaceId?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    name?: Prisma.StringFilter<"RestaurantSelection"> | string;
    address?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"RestaurantSelection"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"RestaurantSelection"> | number | null;
    distanceMeters?: Prisma.IntNullableFilter<"RestaurantSelection"> | number | null;
    phone?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    openingHours?: Prisma.JsonNullableFilter<"RestaurantSelection">;
    imageUrl?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    selectedAt?: Prisma.DateTimeFilter<"RestaurantSelection"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    selectedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RestaurantSelectionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    externalPlaceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    openingHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    selectedBy?: Prisma.UserOrderByWithRelationInput;
};
export type RestaurantSelectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId?: string;
    AND?: Prisma.RestaurantSelectionWhereInput | Prisma.RestaurantSelectionWhereInput[];
    OR?: Prisma.RestaurantSelectionWhereInput[];
    NOT?: Prisma.RestaurantSelectionWhereInput | Prisma.RestaurantSelectionWhereInput[];
    selectedById?: Prisma.StringFilter<"RestaurantSelection"> | string;
    externalPlaceId?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    name?: Prisma.StringFilter<"RestaurantSelection"> | string;
    address?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"RestaurantSelection"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"RestaurantSelection"> | number | null;
    distanceMeters?: Prisma.IntNullableFilter<"RestaurantSelection"> | number | null;
    phone?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    openingHours?: Prisma.JsonNullableFilter<"RestaurantSelection">;
    imageUrl?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    selectedAt?: Prisma.DateTimeFilter<"RestaurantSelection"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    selectedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "sessionId">;
export type RestaurantSelectionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    externalPlaceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    openingHours?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
    _count?: Prisma.RestaurantSelectionCountOrderByAggregateInput;
    _avg?: Prisma.RestaurantSelectionAvgOrderByAggregateInput;
    _max?: Prisma.RestaurantSelectionMaxOrderByAggregateInput;
    _min?: Prisma.RestaurantSelectionMinOrderByAggregateInput;
    _sum?: Prisma.RestaurantSelectionSumOrderByAggregateInput;
};
export type RestaurantSelectionScalarWhereWithAggregatesInput = {
    AND?: Prisma.RestaurantSelectionScalarWhereWithAggregatesInput | Prisma.RestaurantSelectionScalarWhereWithAggregatesInput[];
    OR?: Prisma.RestaurantSelectionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RestaurantSelectionScalarWhereWithAggregatesInput | Prisma.RestaurantSelectionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RestaurantSelection"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"RestaurantSelection"> | string;
    selectedById?: Prisma.StringWithAggregatesFilter<"RestaurantSelection"> | string;
    externalPlaceId?: Prisma.StringNullableWithAggregatesFilter<"RestaurantSelection"> | string | null;
    name?: Prisma.StringWithAggregatesFilter<"RestaurantSelection"> | string;
    address?: Prisma.StringNullableWithAggregatesFilter<"RestaurantSelection"> | string | null;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"RestaurantSelection"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"RestaurantSelection"> | number | null;
    distanceMeters?: Prisma.IntNullableWithAggregatesFilter<"RestaurantSelection"> | number | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"RestaurantSelection"> | string | null;
    openingHours?: Prisma.JsonNullableWithAggregatesFilter<"RestaurantSelection">;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"RestaurantSelection"> | string | null;
    selectedAt?: Prisma.DateTimeWithAggregatesFilter<"RestaurantSelection"> | Date | string;
};
export type RestaurantSelectionCreateInput = {
    id?: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutRestaurantSelectionInput;
    selectedBy: Prisma.UserCreateNestedOneWithoutSelectedRestaurantsInput;
};
export type RestaurantSelectionUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    selectedById: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
};
export type RestaurantSelectionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutRestaurantSelectionNestedInput;
    selectedBy?: Prisma.UserUpdateOneRequiredWithoutSelectedRestaurantsNestedInput;
};
export type RestaurantSelectionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantSelectionCreateManyInput = {
    id?: string;
    sessionId: string;
    selectedById: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
};
export type RestaurantSelectionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantSelectionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantSelectionListRelationFilter = {
    every?: Prisma.RestaurantSelectionWhereInput;
    some?: Prisma.RestaurantSelectionWhereInput;
    none?: Prisma.RestaurantSelectionWhereInput;
};
export type RestaurantSelectionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RestaurantSelectionNullableScalarRelationFilter = {
    is?: Prisma.RestaurantSelectionWhereInput | null;
    isNot?: Prisma.RestaurantSelectionWhereInput | null;
};
export type RestaurantSelectionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    externalPlaceId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    openingHours?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
};
export type RestaurantSelectionAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrder;
};
export type RestaurantSelectionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    externalPlaceId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
};
export type RestaurantSelectionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    selectedById?: Prisma.SortOrder;
    externalPlaceId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    selectedAt?: Prisma.SortOrder;
};
export type RestaurantSelectionSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    distanceMeters?: Prisma.SortOrder;
};
export type RestaurantSelectionCreateNestedManyWithoutSelectedByInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.RestaurantSelectionCreateWithoutSelectedByInput[] | Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput | Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput[];
    createMany?: Prisma.RestaurantSelectionCreateManySelectedByInputEnvelope;
    connect?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
};
export type RestaurantSelectionUncheckedCreateNestedManyWithoutSelectedByInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.RestaurantSelectionCreateWithoutSelectedByInput[] | Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput | Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput[];
    createMany?: Prisma.RestaurantSelectionCreateManySelectedByInputEnvelope;
    connect?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
};
export type RestaurantSelectionUpdateManyWithoutSelectedByNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.RestaurantSelectionCreateWithoutSelectedByInput[] | Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput | Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput[];
    upsert?: Prisma.RestaurantSelectionUpsertWithWhereUniqueWithoutSelectedByInput | Prisma.RestaurantSelectionUpsertWithWhereUniqueWithoutSelectedByInput[];
    createMany?: Prisma.RestaurantSelectionCreateManySelectedByInputEnvelope;
    set?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    disconnect?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    delete?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    connect?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    update?: Prisma.RestaurantSelectionUpdateWithWhereUniqueWithoutSelectedByInput | Prisma.RestaurantSelectionUpdateWithWhereUniqueWithoutSelectedByInput[];
    updateMany?: Prisma.RestaurantSelectionUpdateManyWithWhereWithoutSelectedByInput | Prisma.RestaurantSelectionUpdateManyWithWhereWithoutSelectedByInput[];
    deleteMany?: Prisma.RestaurantSelectionScalarWhereInput | Prisma.RestaurantSelectionScalarWhereInput[];
};
export type RestaurantSelectionUncheckedUpdateManyWithoutSelectedByNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput> | Prisma.RestaurantSelectionCreateWithoutSelectedByInput[] | Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput[];
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput | Prisma.RestaurantSelectionCreateOrConnectWithoutSelectedByInput[];
    upsert?: Prisma.RestaurantSelectionUpsertWithWhereUniqueWithoutSelectedByInput | Prisma.RestaurantSelectionUpsertWithWhereUniqueWithoutSelectedByInput[];
    createMany?: Prisma.RestaurantSelectionCreateManySelectedByInputEnvelope;
    set?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    disconnect?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    delete?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    connect?: Prisma.RestaurantSelectionWhereUniqueInput | Prisma.RestaurantSelectionWhereUniqueInput[];
    update?: Prisma.RestaurantSelectionUpdateWithWhereUniqueWithoutSelectedByInput | Prisma.RestaurantSelectionUpdateWithWhereUniqueWithoutSelectedByInput[];
    updateMany?: Prisma.RestaurantSelectionUpdateManyWithWhereWithoutSelectedByInput | Prisma.RestaurantSelectionUpdateManyWithWhereWithoutSelectedByInput[];
    deleteMany?: Prisma.RestaurantSelectionScalarWhereInput | Prisma.RestaurantSelectionScalarWhereInput[];
};
export type RestaurantSelectionCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSessionInput;
    connect?: Prisma.RestaurantSelectionWhereUniqueInput;
};
export type RestaurantSelectionUncheckedCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSessionInput;
    connect?: Prisma.RestaurantSelectionWhereUniqueInput;
};
export type RestaurantSelectionUpdateOneWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.RestaurantSelectionUpsertWithoutSessionInput;
    disconnect?: Prisma.RestaurantSelectionWhereInput | boolean;
    delete?: Prisma.RestaurantSelectionWhereInput | boolean;
    connect?: Prisma.RestaurantSelectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantSelectionUpdateToOneWithWhereWithoutSessionInput, Prisma.RestaurantSelectionUpdateWithoutSessionInput>, Prisma.RestaurantSelectionUncheckedUpdateWithoutSessionInput>;
};
export type RestaurantSelectionUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.RestaurantSelectionCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.RestaurantSelectionUpsertWithoutSessionInput;
    disconnect?: Prisma.RestaurantSelectionWhereInput | boolean;
    delete?: Prisma.RestaurantSelectionWhereInput | boolean;
    connect?: Prisma.RestaurantSelectionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantSelectionUpdateToOneWithWhereWithoutSessionInput, Prisma.RestaurantSelectionUpdateWithoutSessionInput>, Prisma.RestaurantSelectionUncheckedUpdateWithoutSessionInput>;
};
export type RestaurantSelectionCreateWithoutSelectedByInput = {
    id?: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutRestaurantSelectionInput;
};
export type RestaurantSelectionUncheckedCreateWithoutSelectedByInput = {
    id?: string;
    sessionId: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
};
export type RestaurantSelectionCreateOrConnectWithoutSelectedByInput = {
    where: Prisma.RestaurantSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput>;
};
export type RestaurantSelectionCreateManySelectedByInputEnvelope = {
    data: Prisma.RestaurantSelectionCreateManySelectedByInput | Prisma.RestaurantSelectionCreateManySelectedByInput[];
    skipDuplicates?: boolean;
};
export type RestaurantSelectionUpsertWithWhereUniqueWithoutSelectedByInput = {
    where: Prisma.RestaurantSelectionWhereUniqueInput;
    update: Prisma.XOR<Prisma.RestaurantSelectionUpdateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedUpdateWithoutSelectedByInput>;
    create: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSelectedByInput>;
};
export type RestaurantSelectionUpdateWithWhereUniqueWithoutSelectedByInput = {
    where: Prisma.RestaurantSelectionWhereUniqueInput;
    data: Prisma.XOR<Prisma.RestaurantSelectionUpdateWithoutSelectedByInput, Prisma.RestaurantSelectionUncheckedUpdateWithoutSelectedByInput>;
};
export type RestaurantSelectionUpdateManyWithWhereWithoutSelectedByInput = {
    where: Prisma.RestaurantSelectionScalarWhereInput;
    data: Prisma.XOR<Prisma.RestaurantSelectionUpdateManyMutationInput, Prisma.RestaurantSelectionUncheckedUpdateManyWithoutSelectedByInput>;
};
export type RestaurantSelectionScalarWhereInput = {
    AND?: Prisma.RestaurantSelectionScalarWhereInput | Prisma.RestaurantSelectionScalarWhereInput[];
    OR?: Prisma.RestaurantSelectionScalarWhereInput[];
    NOT?: Prisma.RestaurantSelectionScalarWhereInput | Prisma.RestaurantSelectionScalarWhereInput[];
    id?: Prisma.StringFilter<"RestaurantSelection"> | string;
    sessionId?: Prisma.StringFilter<"RestaurantSelection"> | string;
    selectedById?: Prisma.StringFilter<"RestaurantSelection"> | string;
    externalPlaceId?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    name?: Prisma.StringFilter<"RestaurantSelection"> | string;
    address?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    latitude?: Prisma.FloatNullableFilter<"RestaurantSelection"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"RestaurantSelection"> | number | null;
    distanceMeters?: Prisma.IntNullableFilter<"RestaurantSelection"> | number | null;
    phone?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    openingHours?: Prisma.JsonNullableFilter<"RestaurantSelection">;
    imageUrl?: Prisma.StringNullableFilter<"RestaurantSelection"> | string | null;
    selectedAt?: Prisma.DateTimeFilter<"RestaurantSelection"> | Date | string;
};
export type RestaurantSelectionCreateWithoutSessionInput = {
    id?: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
    selectedBy: Prisma.UserCreateNestedOneWithoutSelectedRestaurantsInput;
};
export type RestaurantSelectionUncheckedCreateWithoutSessionInput = {
    id?: string;
    selectedById: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
};
export type RestaurantSelectionCreateOrConnectWithoutSessionInput = {
    where: Prisma.RestaurantSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSessionInput>;
};
export type RestaurantSelectionUpsertWithoutSessionInput = {
    update: Prisma.XOR<Prisma.RestaurantSelectionUpdateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.RestaurantSelectionCreateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedCreateWithoutSessionInput>;
    where?: Prisma.RestaurantSelectionWhereInput;
};
export type RestaurantSelectionUpdateToOneWithWhereWithoutSessionInput = {
    where?: Prisma.RestaurantSelectionWhereInput;
    data: Prisma.XOR<Prisma.RestaurantSelectionUpdateWithoutSessionInput, Prisma.RestaurantSelectionUncheckedUpdateWithoutSessionInput>;
};
export type RestaurantSelectionUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    selectedBy?: Prisma.UserUpdateOneRequiredWithoutSelectedRestaurantsNestedInput;
};
export type RestaurantSelectionUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    selectedById?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantSelectionCreateManySelectedByInput = {
    id?: string;
    sessionId: string;
    externalPlaceId?: string | null;
    name: string;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    distanceMeters?: number | null;
    phone?: string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: string | null;
    selectedAt?: Date | string;
};
export type RestaurantSelectionUpdateWithoutSelectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutRestaurantSelectionNestedInput;
};
export type RestaurantSelectionUncheckedUpdateWithoutSelectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantSelectionUncheckedUpdateManyWithoutSelectedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    externalPlaceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    address?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    distanceMeters?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    openingHours?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    selectedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantSelectionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    selectedById?: boolean;
    externalPlaceId?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    distanceMeters?: boolean;
    phone?: boolean;
    openingHours?: boolean;
    imageUrl?: boolean;
    selectedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurantSelection"]>;
export type RestaurantSelectionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    selectedById?: boolean;
    externalPlaceId?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    distanceMeters?: boolean;
    phone?: boolean;
    openingHours?: boolean;
    imageUrl?: boolean;
    selectedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurantSelection"]>;
export type RestaurantSelectionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    selectedById?: boolean;
    externalPlaceId?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    distanceMeters?: boolean;
    phone?: boolean;
    openingHours?: boolean;
    imageUrl?: boolean;
    selectedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurantSelection"]>;
export type RestaurantSelectionSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    selectedById?: boolean;
    externalPlaceId?: boolean;
    name?: boolean;
    address?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    distanceMeters?: boolean;
    phone?: boolean;
    openingHours?: boolean;
    imageUrl?: boolean;
    selectedAt?: boolean;
};
export type RestaurantSelectionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "selectedById" | "externalPlaceId" | "name" | "address" | "latitude" | "longitude" | "distanceMeters" | "phone" | "openingHours" | "imageUrl" | "selectedAt", ExtArgs["result"]["restaurantSelection"]>;
export type RestaurantSelectionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RestaurantSelectionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RestaurantSelectionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    selectedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RestaurantSelectionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RestaurantSelection";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        selectedBy: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        selectedById: string;
        externalPlaceId: string | null;
        name: string;
        address: string | null;
        latitude: number | null;
        longitude: number | null;
        distanceMeters: number | null;
        phone: string | null;
        openingHours: runtime.JsonValue | null;
        imageUrl: string | null;
        selectedAt: Date;
    }, ExtArgs["result"]["restaurantSelection"]>;
    composites: {};
};
export type RestaurantSelectionGetPayload<S extends boolean | null | undefined | RestaurantSelectionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload, S>;
export type RestaurantSelectionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RestaurantSelectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RestaurantSelectionCountAggregateInputType | true;
};
export interface RestaurantSelectionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RestaurantSelection'];
        meta: {
            name: 'RestaurantSelection';
        };
    };
    findUnique<T extends RestaurantSelectionFindUniqueArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RestaurantSelectionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RestaurantSelectionFindFirstArgs>(args?: Prisma.SelectSubset<T, RestaurantSelectionFindFirstArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RestaurantSelectionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RestaurantSelectionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RestaurantSelectionFindManyArgs>(args?: Prisma.SelectSubset<T, RestaurantSelectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RestaurantSelectionCreateArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionCreateArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RestaurantSelectionCreateManyArgs>(args?: Prisma.SelectSubset<T, RestaurantSelectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RestaurantSelectionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RestaurantSelectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RestaurantSelectionDeleteArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionDeleteArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RestaurantSelectionUpdateArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionUpdateArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RestaurantSelectionDeleteManyArgs>(args?: Prisma.SelectSubset<T, RestaurantSelectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RestaurantSelectionUpdateManyArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RestaurantSelectionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RestaurantSelectionUpsertArgs>(args: Prisma.SelectSubset<T, RestaurantSelectionUpsertArgs<ExtArgs>>): Prisma.Prisma__RestaurantSelectionClient<runtime.Types.Result.GetResult<Prisma.$RestaurantSelectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RestaurantSelectionCountArgs>(args?: Prisma.Subset<T, RestaurantSelectionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RestaurantSelectionCountAggregateOutputType> : number>;
    aggregate<T extends RestaurantSelectionAggregateArgs>(args: Prisma.Subset<T, RestaurantSelectionAggregateArgs>): Prisma.PrismaPromise<GetRestaurantSelectionAggregateType<T>>;
    groupBy<T extends RestaurantSelectionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RestaurantSelectionGroupByArgs['orderBy'];
    } : {
        orderBy?: RestaurantSelectionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RestaurantSelectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantSelectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RestaurantSelectionFieldRefs;
}
export interface Prisma__RestaurantSelectionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    selectedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RestaurantSelectionFieldRefs {
    readonly id: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly sessionId: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly selectedById: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly externalPlaceId: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly name: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly address: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly latitude: Prisma.FieldRef<"RestaurantSelection", 'Float'>;
    readonly longitude: Prisma.FieldRef<"RestaurantSelection", 'Float'>;
    readonly distanceMeters: Prisma.FieldRef<"RestaurantSelection", 'Int'>;
    readonly phone: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly openingHours: Prisma.FieldRef<"RestaurantSelection", 'Json'>;
    readonly imageUrl: Prisma.FieldRef<"RestaurantSelection", 'String'>;
    readonly selectedAt: Prisma.FieldRef<"RestaurantSelection", 'DateTime'>;
}
export type RestaurantSelectionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where: Prisma.RestaurantSelectionWhereUniqueInput;
};
export type RestaurantSelectionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where: Prisma.RestaurantSelectionWhereUniqueInput;
};
export type RestaurantSelectionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where?: Prisma.RestaurantSelectionWhereInput;
    orderBy?: Prisma.RestaurantSelectionOrderByWithRelationInput | Prisma.RestaurantSelectionOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantSelectionScalarFieldEnum | Prisma.RestaurantSelectionScalarFieldEnum[];
};
export type RestaurantSelectionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where?: Prisma.RestaurantSelectionWhereInput;
    orderBy?: Prisma.RestaurantSelectionOrderByWithRelationInput | Prisma.RestaurantSelectionOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantSelectionScalarFieldEnum | Prisma.RestaurantSelectionScalarFieldEnum[];
};
export type RestaurantSelectionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where?: Prisma.RestaurantSelectionWhereInput;
    orderBy?: Prisma.RestaurantSelectionOrderByWithRelationInput | Prisma.RestaurantSelectionOrderByWithRelationInput[];
    cursor?: Prisma.RestaurantSelectionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RestaurantSelectionScalarFieldEnum | Prisma.RestaurantSelectionScalarFieldEnum[];
};
export type RestaurantSelectionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RestaurantSelectionCreateInput, Prisma.RestaurantSelectionUncheckedCreateInput>;
};
export type RestaurantSelectionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RestaurantSelectionCreateManyInput | Prisma.RestaurantSelectionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RestaurantSelectionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    data: Prisma.RestaurantSelectionCreateManyInput | Prisma.RestaurantSelectionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RestaurantSelectionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RestaurantSelectionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RestaurantSelectionUpdateInput, Prisma.RestaurantSelectionUncheckedUpdateInput>;
    where: Prisma.RestaurantSelectionWhereUniqueInput;
};
export type RestaurantSelectionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RestaurantSelectionUpdateManyMutationInput, Prisma.RestaurantSelectionUncheckedUpdateManyInput>;
    where?: Prisma.RestaurantSelectionWhereInput;
    limit?: number;
};
export type RestaurantSelectionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RestaurantSelectionUpdateManyMutationInput, Prisma.RestaurantSelectionUncheckedUpdateManyInput>;
    where?: Prisma.RestaurantSelectionWhereInput;
    limit?: number;
    include?: Prisma.RestaurantSelectionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RestaurantSelectionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where: Prisma.RestaurantSelectionWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantSelectionCreateInput, Prisma.RestaurantSelectionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RestaurantSelectionUpdateInput, Prisma.RestaurantSelectionUncheckedUpdateInput>;
};
export type RestaurantSelectionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
    where: Prisma.RestaurantSelectionWhereUniqueInput;
};
export type RestaurantSelectionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantSelectionWhereInput;
    limit?: number;
};
export type RestaurantSelectionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RestaurantSelectionSelect<ExtArgs> | null;
    omit?: Prisma.RestaurantSelectionOmit<ExtArgs> | null;
    include?: Prisma.RestaurantSelectionInclude<ExtArgs> | null;
};
