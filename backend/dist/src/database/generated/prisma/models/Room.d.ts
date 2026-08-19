import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RoomModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomPayload>;
export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null;
    _avg: RoomAvgAggregateOutputType | null;
    _sum: RoomSumAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
};
export type RoomAvgAggregateOutputType = {
    maxMembers: number | null;
    latitude: number | null;
    longitude: number | null;
    searchRadiusKm: number | null;
};
export type RoomSumAggregateOutputType = {
    maxMembers: number | null;
    latitude: number | null;
    longitude: number | null;
    searchRadiusKm: number | null;
};
export type RoomMinAggregateOutputType = {
    id: string | null;
    hostId: string | null;
    name: string | null;
    roomCode: string | null;
    inviteToken: string | null;
    maxMembers: number | null;
    locationName: string | null;
    latitude: number | null;
    longitude: number | null;
    searchRadiusKm: number | null;
    scheduledAt: Date | null;
    status: $Enums.RoomStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RoomMaxAggregateOutputType = {
    id: string | null;
    hostId: string | null;
    name: string | null;
    roomCode: string | null;
    inviteToken: string | null;
    maxMembers: number | null;
    locationName: string | null;
    latitude: number | null;
    longitude: number | null;
    searchRadiusKm: number | null;
    scheduledAt: Date | null;
    status: $Enums.RoomStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RoomCountAggregateOutputType = {
    id: number;
    hostId: number;
    name: number;
    roomCode: number;
    inviteToken: number;
    maxMembers: number;
    locationName: number;
    latitude: number;
    longitude: number;
    searchRadiusKm: number;
    scheduledAt: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RoomAvgAggregateInputType = {
    maxMembers?: true;
    latitude?: true;
    longitude?: true;
    searchRadiusKm?: true;
};
export type RoomSumAggregateInputType = {
    maxMembers?: true;
    latitude?: true;
    longitude?: true;
    searchRadiusKm?: true;
};
export type RoomMinAggregateInputType = {
    id?: true;
    hostId?: true;
    name?: true;
    roomCode?: true;
    inviteToken?: true;
    maxMembers?: true;
    locationName?: true;
    latitude?: true;
    longitude?: true;
    searchRadiusKm?: true;
    scheduledAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RoomMaxAggregateInputType = {
    id?: true;
    hostId?: true;
    name?: true;
    roomCode?: true;
    inviteToken?: true;
    maxMembers?: true;
    locationName?: true;
    latitude?: true;
    longitude?: true;
    searchRadiusKm?: true;
    scheduledAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RoomCountAggregateInputType = {
    id?: true;
    hostId?: true;
    name?: true;
    roomCode?: true;
    inviteToken?: true;
    maxMembers?: true;
    locationName?: true;
    latitude?: true;
    longitude?: true;
    searchRadiusKm?: true;
    scheduledAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RoomAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RoomCountAggregateInputType;
    _avg?: RoomAvgAggregateInputType;
    _sum?: RoomSumAggregateInputType;
    _min?: RoomMinAggregateInputType;
    _max?: RoomMaxAggregateInputType;
};
export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
    [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoom[P]> : Prisma.GetScalarType<T[P], AggregateRoom[P]>;
};
export type RoomGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithAggregationInput | Prisma.RoomOrderByWithAggregationInput[];
    by: Prisma.RoomScalarFieldEnum[] | Prisma.RoomScalarFieldEnum;
    having?: Prisma.RoomScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomCountAggregateInputType | true;
    _avg?: RoomAvgAggregateInputType;
    _sum?: RoomSumAggregateInputType;
    _min?: RoomMinAggregateInputType;
    _max?: RoomMaxAggregateInputType;
};
export type RoomGroupByOutputType = {
    id: string;
    hostId: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude: number | null;
    longitude: number | null;
    searchRadiusKm: number;
    scheduledAt: Date;
    status: $Enums.RoomStatus;
    createdAt: Date;
    updatedAt: Date;
    _count: RoomCountAggregateOutputType | null;
    _avg: RoomAvgAggregateOutputType | null;
    _sum: RoomSumAggregateOutputType | null;
    _min: RoomMinAggregateOutputType | null;
    _max: RoomMaxAggregateOutputType | null;
};
export type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomGroupByOutputType[P]>;
}>>;
export type RoomWhereInput = {
    AND?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    OR?: Prisma.RoomWhereInput[];
    NOT?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    id?: Prisma.StringFilter<"Room"> | string;
    hostId?: Prisma.StringFilter<"Room"> | string;
    name?: Prisma.StringFilter<"Room"> | string;
    roomCode?: Prisma.StringFilter<"Room"> | string;
    inviteToken?: Prisma.StringFilter<"Room"> | string;
    maxMembers?: Prisma.IntFilter<"Room"> | number;
    locationName?: Prisma.StringFilter<"Room"> | string;
    latitude?: Prisma.FloatNullableFilter<"Room"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Room"> | number | null;
    searchRadiusKm?: Prisma.IntFilter<"Room"> | number;
    scheduledAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    status?: Prisma.EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    host?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    members?: Prisma.RoomMemberListRelationFilter;
    session?: Prisma.XOR<Prisma.FoodFightSessionNullableScalarRelationFilter, Prisma.FoodFightSessionWhereInput> | null;
};
export type RoomOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomCode?: Prisma.SortOrder;
    inviteToken?: Prisma.SortOrder;
    maxMembers?: Prisma.SortOrder;
    locationName?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    host?: Prisma.UserOrderByWithRelationInput;
    members?: Prisma.RoomMemberOrderByRelationAggregateInput;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
};
export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    roomCode?: string;
    inviteToken?: string;
    AND?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    OR?: Prisma.RoomWhereInput[];
    NOT?: Prisma.RoomWhereInput | Prisma.RoomWhereInput[];
    hostId?: Prisma.StringFilter<"Room"> | string;
    name?: Prisma.StringFilter<"Room"> | string;
    maxMembers?: Prisma.IntFilter<"Room"> | number;
    locationName?: Prisma.StringFilter<"Room"> | string;
    latitude?: Prisma.FloatNullableFilter<"Room"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Room"> | number | null;
    searchRadiusKm?: Prisma.IntFilter<"Room"> | number;
    scheduledAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    status?: Prisma.EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    host?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    members?: Prisma.RoomMemberListRelationFilter;
    session?: Prisma.XOR<Prisma.FoodFightSessionNullableScalarRelationFilter, Prisma.FoodFightSessionWhereInput> | null;
}, "id" | "roomCode" | "inviteToken">;
export type RoomOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomCode?: Prisma.SortOrder;
    inviteToken?: Prisma.SortOrder;
    maxMembers?: Prisma.SortOrder;
    locationName?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RoomCountOrderByAggregateInput;
    _avg?: Prisma.RoomAvgOrderByAggregateInput;
    _max?: Prisma.RoomMaxOrderByAggregateInput;
    _min?: Prisma.RoomMinOrderByAggregateInput;
    _sum?: Prisma.RoomSumOrderByAggregateInput;
};
export type RoomScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomScalarWhereWithAggregatesInput | Prisma.RoomScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomScalarWhereWithAggregatesInput | Prisma.RoomScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    hostId?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    roomCode?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    inviteToken?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    maxMembers?: Prisma.IntWithAggregatesFilter<"Room"> | number;
    locationName?: Prisma.StringWithAggregatesFilter<"Room"> | string;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"Room"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"Room"> | number | null;
    searchRadiusKm?: Prisma.IntWithAggregatesFilter<"Room"> | number;
    scheduledAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
    status?: Prisma.EnumRoomStatusWithAggregatesFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Room"> | Date | string;
};
export type RoomCreateInput = {
    id?: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutHostedRoomsInput;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    session?: Prisma.FoodFightSessionCreateNestedOneWithoutRoomInput;
};
export type RoomUncheckedCreateInput = {
    id?: string;
    hostId: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    session?: Prisma.FoodFightSessionUncheckedCreateNestedOneWithoutRoomInput;
};
export type RoomUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutHostedRoomsNestedInput;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    session?: Prisma.FoodFightSessionUpdateOneWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    session?: Prisma.FoodFightSessionUncheckedUpdateOneWithoutRoomNestedInput;
};
export type RoomCreateManyInput = {
    id?: string;
    hostId: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RoomUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomListRelationFilter = {
    every?: Prisma.RoomWhereInput;
    some?: Prisma.RoomWhereInput;
    none?: Prisma.RoomWhereInput;
};
export type RoomOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoomCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomCode?: Prisma.SortOrder;
    inviteToken?: Prisma.SortOrder;
    maxMembers?: Prisma.SortOrder;
    locationName?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomAvgOrderByAggregateInput = {
    maxMembers?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
};
export type RoomMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomCode?: Prisma.SortOrder;
    inviteToken?: Prisma.SortOrder;
    maxMembers?: Prisma.SortOrder;
    locationName?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    roomCode?: Prisma.SortOrder;
    inviteToken?: Prisma.SortOrder;
    maxMembers?: Prisma.SortOrder;
    locationName?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
    scheduledAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RoomSumOrderByAggregateInput = {
    maxMembers?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    searchRadiusKm?: Prisma.SortOrder;
};
export type RoomScalarRelationFilter = {
    is?: Prisma.RoomWhereInput;
    isNot?: Prisma.RoomWhereInput;
};
export type RoomCreateNestedManyWithoutHostInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHostInput, Prisma.RoomUncheckedCreateWithoutHostInput> | Prisma.RoomCreateWithoutHostInput[] | Prisma.RoomUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHostInput | Prisma.RoomCreateOrConnectWithoutHostInput[];
    createMany?: Prisma.RoomCreateManyHostInputEnvelope;
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
};
export type RoomUncheckedCreateNestedManyWithoutHostInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHostInput, Prisma.RoomUncheckedCreateWithoutHostInput> | Prisma.RoomCreateWithoutHostInput[] | Prisma.RoomUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHostInput | Prisma.RoomCreateOrConnectWithoutHostInput[];
    createMany?: Prisma.RoomCreateManyHostInputEnvelope;
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
};
export type RoomUpdateManyWithoutHostNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHostInput, Prisma.RoomUncheckedCreateWithoutHostInput> | Prisma.RoomCreateWithoutHostInput[] | Prisma.RoomUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHostInput | Prisma.RoomCreateOrConnectWithoutHostInput[];
    upsert?: Prisma.RoomUpsertWithWhereUniqueWithoutHostInput | Prisma.RoomUpsertWithWhereUniqueWithoutHostInput[];
    createMany?: Prisma.RoomCreateManyHostInputEnvelope;
    set?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    disconnect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    delete?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    update?: Prisma.RoomUpdateWithWhereUniqueWithoutHostInput | Prisma.RoomUpdateWithWhereUniqueWithoutHostInput[];
    updateMany?: Prisma.RoomUpdateManyWithWhereWithoutHostInput | Prisma.RoomUpdateManyWithWhereWithoutHostInput[];
    deleteMany?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
};
export type RoomUncheckedUpdateManyWithoutHostNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutHostInput, Prisma.RoomUncheckedCreateWithoutHostInput> | Prisma.RoomCreateWithoutHostInput[] | Prisma.RoomUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutHostInput | Prisma.RoomCreateOrConnectWithoutHostInput[];
    upsert?: Prisma.RoomUpsertWithWhereUniqueWithoutHostInput | Prisma.RoomUpsertWithWhereUniqueWithoutHostInput[];
    createMany?: Prisma.RoomCreateManyHostInputEnvelope;
    set?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    disconnect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    delete?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    connect?: Prisma.RoomWhereUniqueInput | Prisma.RoomWhereUniqueInput[];
    update?: Prisma.RoomUpdateWithWhereUniqueWithoutHostInput | Prisma.RoomUpdateWithWhereUniqueWithoutHostInput[];
    updateMany?: Prisma.RoomUpdateManyWithWhereWithoutHostInput | Prisma.RoomUpdateManyWithWhereWithoutHostInput[];
    deleteMany?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumRoomStatusFieldUpdateOperationsInput = {
    set?: $Enums.RoomStatus;
};
export type RoomCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutMembersInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.RoomUpsertWithoutMembersInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutMembersInput, Prisma.RoomUpdateWithoutMembersInput>, Prisma.RoomUncheckedUpdateWithoutMembersInput>;
};
export type RoomCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutSessionInput, Prisma.RoomUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutSessionInput;
    connect?: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateOneRequiredWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.RoomCreateWithoutSessionInput, Prisma.RoomUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.RoomCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.RoomUpsertWithoutSessionInput;
    connect?: Prisma.RoomWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RoomUpdateToOneWithWhereWithoutSessionInput, Prisma.RoomUpdateWithoutSessionInput>, Prisma.RoomUncheckedUpdateWithoutSessionInput>;
};
export type RoomCreateWithoutHostInput = {
    id?: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
    session?: Prisma.FoodFightSessionCreateNestedOneWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutHostInput = {
    id?: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
    session?: Prisma.FoodFightSessionUncheckedCreateNestedOneWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutHostInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutHostInput, Prisma.RoomUncheckedCreateWithoutHostInput>;
};
export type RoomCreateManyHostInputEnvelope = {
    data: Prisma.RoomCreateManyHostInput | Prisma.RoomCreateManyHostInput[];
    skipDuplicates?: boolean;
};
export type RoomUpsertWithWhereUniqueWithoutHostInput = {
    where: Prisma.RoomWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoomUpdateWithoutHostInput, Prisma.RoomUncheckedUpdateWithoutHostInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutHostInput, Prisma.RoomUncheckedCreateWithoutHostInput>;
};
export type RoomUpdateWithWhereUniqueWithoutHostInput = {
    where: Prisma.RoomWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutHostInput, Prisma.RoomUncheckedUpdateWithoutHostInput>;
};
export type RoomUpdateManyWithWhereWithoutHostInput = {
    where: Prisma.RoomScalarWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyWithoutHostInput>;
};
export type RoomScalarWhereInput = {
    AND?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
    OR?: Prisma.RoomScalarWhereInput[];
    NOT?: Prisma.RoomScalarWhereInput | Prisma.RoomScalarWhereInput[];
    id?: Prisma.StringFilter<"Room"> | string;
    hostId?: Prisma.StringFilter<"Room"> | string;
    name?: Prisma.StringFilter<"Room"> | string;
    roomCode?: Prisma.StringFilter<"Room"> | string;
    inviteToken?: Prisma.StringFilter<"Room"> | string;
    maxMembers?: Prisma.IntFilter<"Room"> | number;
    locationName?: Prisma.StringFilter<"Room"> | string;
    latitude?: Prisma.FloatNullableFilter<"Room"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Room"> | number | null;
    searchRadiusKm?: Prisma.IntFilter<"Room"> | number;
    scheduledAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    status?: Prisma.EnumRoomStatusFilter<"Room"> | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Room"> | Date | string;
};
export type RoomCreateWithoutMembersInput = {
    id?: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutHostedRoomsInput;
    session?: Prisma.FoodFightSessionCreateNestedOneWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutMembersInput = {
    id?: string;
    hostId: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session?: Prisma.FoodFightSessionUncheckedCreateNestedOneWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutMembersInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
};
export type RoomUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutMembersInput, Prisma.RoomUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutMembersInput, Prisma.RoomUncheckedCreateWithoutMembersInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutMembersInput, Prisma.RoomUncheckedUpdateWithoutMembersInput>;
};
export type RoomUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutHostedRoomsNestedInput;
    session?: Prisma.FoodFightSessionUpdateOneWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUncheckedUpdateOneWithoutRoomNestedInput;
};
export type RoomCreateWithoutSessionInput = {
    id?: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutHostedRoomsInput;
    members?: Prisma.RoomMemberCreateNestedManyWithoutRoomInput;
};
export type RoomUncheckedCreateWithoutSessionInput = {
    id?: string;
    hostId: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.RoomMemberUncheckedCreateNestedManyWithoutRoomInput;
};
export type RoomCreateOrConnectWithoutSessionInput = {
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateWithoutSessionInput, Prisma.RoomUncheckedCreateWithoutSessionInput>;
};
export type RoomUpsertWithoutSessionInput = {
    update: Prisma.XOR<Prisma.RoomUpdateWithoutSessionInput, Prisma.RoomUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.RoomCreateWithoutSessionInput, Prisma.RoomUncheckedCreateWithoutSessionInput>;
    where?: Prisma.RoomWhereInput;
};
export type RoomUpdateToOneWithWhereWithoutSessionInput = {
    where?: Prisma.RoomWhereInput;
    data: Prisma.XOR<Prisma.RoomUpdateWithoutSessionInput, Prisma.RoomUncheckedUpdateWithoutSessionInput>;
};
export type RoomUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutHostedRoomsNestedInput;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
};
export type RoomCreateManyHostInput = {
    id?: string;
    name: string;
    roomCode: string;
    inviteToken: string;
    maxMembers: number;
    locationName: string;
    latitude?: number | null;
    longitude?: number | null;
    searchRadiusKm: number;
    scheduledAt: Date | string;
    status?: $Enums.RoomStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RoomUpdateWithoutHostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.RoomMemberUpdateManyWithoutRoomNestedInput;
    session?: Prisma.FoodFightSessionUpdateOneWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateWithoutHostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.RoomMemberUncheckedUpdateManyWithoutRoomNestedInput;
    session?: Prisma.FoodFightSessionUncheckedUpdateOneWithoutRoomNestedInput;
};
export type RoomUncheckedUpdateManyWithoutHostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    roomCode?: Prisma.StringFieldUpdateOperationsInput | string;
    inviteToken?: Prisma.StringFieldUpdateOperationsInput | string;
    maxMembers?: Prisma.IntFieldUpdateOperationsInput | number;
    locationName?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    searchRadiusKm?: Prisma.IntFieldUpdateOperationsInput | number;
    scheduledAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumRoomStatusFieldUpdateOperationsInput | $Enums.RoomStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RoomCountOutputType = {
    members: number;
};
export type RoomCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | RoomCountOutputTypeCountMembersArgs;
};
export type RoomCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomCountOutputTypeSelect<ExtArgs> | null;
};
export type RoomCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomMemberWhereInput;
};
export type RoomSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    name?: boolean;
    roomCode?: boolean;
    inviteToken?: boolean;
    maxMembers?: boolean;
    locationName?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    searchRadiusKm?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    members?: boolean | Prisma.Room$membersArgs<ExtArgs>;
    session?: boolean | Prisma.Room$sessionArgs<ExtArgs>;
    _count?: boolean | Prisma.RoomCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    name?: boolean;
    roomCode?: boolean;
    inviteToken?: boolean;
    maxMembers?: boolean;
    locationName?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    searchRadiusKm?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    name?: boolean;
    roomCode?: boolean;
    inviteToken?: boolean;
    maxMembers?: boolean;
    locationName?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    searchRadiusKm?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["room"]>;
export type RoomSelectScalar = {
    id?: boolean;
    hostId?: boolean;
    name?: boolean;
    roomCode?: boolean;
    inviteToken?: boolean;
    maxMembers?: boolean;
    locationName?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    searchRadiusKm?: boolean;
    scheduledAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RoomOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hostId" | "name" | "roomCode" | "inviteToken" | "maxMembers" | "locationName" | "latitude" | "longitude" | "searchRadiusKm" | "scheduledAt" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>;
export type RoomInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    members?: boolean | Prisma.Room$membersArgs<ExtArgs>;
    session?: boolean | Prisma.Room$sessionArgs<ExtArgs>;
    _count?: boolean | Prisma.RoomCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RoomIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RoomPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Room";
    objects: {
        host: Prisma.$UserPayload<ExtArgs>;
        members: Prisma.$RoomMemberPayload<ExtArgs>[];
        session: Prisma.$FoodFightSessionPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hostId: string;
        name: string;
        roomCode: string;
        inviteToken: string;
        maxMembers: number;
        locationName: string;
        latitude: number | null;
        longitude: number | null;
        searchRadiusKm: number;
        scheduledAt: Date;
        status: $Enums.RoomStatus;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["room"]>;
    composites: {};
};
export type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomPayload, S>;
export type RoomCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomCountAggregateInputType | true;
};
export interface RoomDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Room'];
        meta: {
            name: 'Room';
        };
    };
    findUnique<T extends RoomFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RoomFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RoomFindManyArgs>(args?: Prisma.SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RoomCreateArgs>(args: Prisma.SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RoomCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RoomDeleteArgs>(args: Prisma.SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RoomUpdateArgs>(args: Prisma.SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RoomDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RoomUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RoomUpsertArgs>(args: Prisma.SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RoomCountArgs>(args?: Prisma.Subset<T, RoomCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomCountAggregateOutputType> : number>;
    aggregate<T extends RoomAggregateArgs>(args: Prisma.Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>;
    groupBy<T extends RoomGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RoomFieldRefs;
}
export interface Prisma__RoomClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    host<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    members<T extends Prisma.Room$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    session<T extends Prisma.Room$sessionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Room$sessionArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RoomFieldRefs {
    readonly id: Prisma.FieldRef<"Room", 'String'>;
    readonly hostId: Prisma.FieldRef<"Room", 'String'>;
    readonly name: Prisma.FieldRef<"Room", 'String'>;
    readonly roomCode: Prisma.FieldRef<"Room", 'String'>;
    readonly inviteToken: Prisma.FieldRef<"Room", 'String'>;
    readonly maxMembers: Prisma.FieldRef<"Room", 'Int'>;
    readonly locationName: Prisma.FieldRef<"Room", 'String'>;
    readonly latitude: Prisma.FieldRef<"Room", 'Float'>;
    readonly longitude: Prisma.FieldRef<"Room", 'Float'>;
    readonly searchRadiusKm: Prisma.FieldRef<"Room", 'Int'>;
    readonly scheduledAt: Prisma.FieldRef<"Room", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Room", 'RoomStatus'>;
    readonly createdAt: Prisma.FieldRef<"Room", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Room", 'DateTime'>;
}
export type RoomFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
export type RoomFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
export type RoomFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput | Prisma.RoomOrderByWithRelationInput[];
    cursor?: Prisma.RoomWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomScalarFieldEnum | Prisma.RoomScalarFieldEnum[];
};
export type RoomCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomCreateInput, Prisma.RoomUncheckedCreateInput>;
};
export type RoomCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RoomCreateManyInput | Prisma.RoomCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoomCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    data: Prisma.RoomCreateManyInput | Prisma.RoomCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RoomIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RoomUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomUpdateInput, Prisma.RoomUncheckedUpdateInput>;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyInput>;
    where?: Prisma.RoomWhereInput;
    limit?: number;
};
export type RoomUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomUpdateManyMutationInput, Prisma.RoomUncheckedUpdateManyInput>;
    where?: Prisma.RoomWhereInput;
    limit?: number;
    include?: Prisma.RoomIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RoomUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomCreateInput, Prisma.RoomUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoomUpdateInput, Prisma.RoomUncheckedUpdateInput>;
};
export type RoomDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
    where: Prisma.RoomWhereUniqueInput;
};
export type RoomDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomWhereInput;
    limit?: number;
};
export type Room$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    where?: Prisma.RoomMemberWhereInput;
    orderBy?: Prisma.RoomMemberOrderByWithRelationInput | Prisma.RoomMemberOrderByWithRelationInput[];
    cursor?: Prisma.RoomMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RoomMemberScalarFieldEnum | Prisma.RoomMemberScalarFieldEnum[];
};
export type Room$sessionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.FoodFightSessionSelect<ExtArgs> | null;
    omit?: Prisma.FoodFightSessionOmit<ExtArgs> | null;
    include?: Prisma.FoodFightSessionInclude<ExtArgs> | null;
    where?: Prisma.FoodFightSessionWhereInput;
};
export type RoomDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomSelect<ExtArgs> | null;
    omit?: Prisma.RoomOmit<ExtArgs> | null;
    include?: Prisma.RoomInclude<ExtArgs> | null;
};
