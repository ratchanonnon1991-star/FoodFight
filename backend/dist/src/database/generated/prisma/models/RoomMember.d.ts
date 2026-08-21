import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RoomMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$RoomMemberPayload>;
export type AggregateRoomMember = {
    _count: RoomMemberCountAggregateOutputType | null;
    _min: RoomMemberMinAggregateOutputType | null;
    _max: RoomMemberMaxAggregateOutputType | null;
};
export type RoomMemberMinAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    userId: string | null;
    isReady: boolean | null;
    joinedAt: Date | null;
    leftAt: Date | null;
};
export type RoomMemberMaxAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    userId: string | null;
    isReady: boolean | null;
    joinedAt: Date | null;
    leftAt: Date | null;
};
export type RoomMemberCountAggregateOutputType = {
    id: number;
    roomId: number;
    userId: number;
    isReady: number;
    joinedAt: number;
    leftAt: number;
    _all: number;
};
export type RoomMemberMinAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    isReady?: true;
    joinedAt?: true;
    leftAt?: true;
};
export type RoomMemberMaxAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    isReady?: true;
    joinedAt?: true;
    leftAt?: true;
};
export type RoomMemberCountAggregateInputType = {
    id?: true;
    roomId?: true;
    userId?: true;
    isReady?: true;
    joinedAt?: true;
    leftAt?: true;
    _all?: true;
};
export type RoomMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomMemberWhereInput;
    orderBy?: Prisma.RoomMemberOrderByWithRelationInput | Prisma.RoomMemberOrderByWithRelationInput[];
    cursor?: Prisma.RoomMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RoomMemberCountAggregateInputType;
    _min?: RoomMemberMinAggregateInputType;
    _max?: RoomMemberMaxAggregateInputType;
};
export type GetRoomMemberAggregateType<T extends RoomMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateRoomMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRoomMember[P]> : Prisma.GetScalarType<T[P], AggregateRoomMember[P]>;
};
export type RoomMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomMemberWhereInput;
    orderBy?: Prisma.RoomMemberOrderByWithAggregationInput | Prisma.RoomMemberOrderByWithAggregationInput[];
    by: Prisma.RoomMemberScalarFieldEnum[] | Prisma.RoomMemberScalarFieldEnum;
    having?: Prisma.RoomMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RoomMemberCountAggregateInputType | true;
    _min?: RoomMemberMinAggregateInputType;
    _max?: RoomMemberMaxAggregateInputType;
};
export type RoomMemberGroupByOutputType = {
    id: string;
    roomId: string;
    userId: string;
    isReady: boolean;
    joinedAt: Date;
    leftAt: Date | null;
    _count: RoomMemberCountAggregateOutputType | null;
    _min: RoomMemberMinAggregateOutputType | null;
    _max: RoomMemberMaxAggregateOutputType | null;
};
export type GetRoomMemberGroupByPayload<T extends RoomMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RoomMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RoomMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RoomMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RoomMemberGroupByOutputType[P]>;
}>>;
export type RoomMemberWhereInput = {
    AND?: Prisma.RoomMemberWhereInput | Prisma.RoomMemberWhereInput[];
    OR?: Prisma.RoomMemberWhereInput[];
    NOT?: Prisma.RoomMemberWhereInput | Prisma.RoomMemberWhereInput[];
    id?: Prisma.StringFilter<"RoomMember"> | string;
    roomId?: Prisma.StringFilter<"RoomMember"> | string;
    userId?: Prisma.StringFilter<"RoomMember"> | string;
    isReady?: Prisma.BoolFilter<"RoomMember"> | boolean;
    joinedAt?: Prisma.DateTimeFilter<"RoomMember"> | Date | string;
    leftAt?: Prisma.DateTimeNullableFilter<"RoomMember"> | Date | string | null;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type RoomMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isReady?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    leftAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    room?: Prisma.RoomOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type RoomMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    roomId_userId?: Prisma.RoomMemberRoomIdUserIdCompoundUniqueInput;
    AND?: Prisma.RoomMemberWhereInput | Prisma.RoomMemberWhereInput[];
    OR?: Prisma.RoomMemberWhereInput[];
    NOT?: Prisma.RoomMemberWhereInput | Prisma.RoomMemberWhereInput[];
    roomId?: Prisma.StringFilter<"RoomMember"> | string;
    userId?: Prisma.StringFilter<"RoomMember"> | string;
    isReady?: Prisma.BoolFilter<"RoomMember"> | boolean;
    joinedAt?: Prisma.DateTimeFilter<"RoomMember"> | Date | string;
    leftAt?: Prisma.DateTimeNullableFilter<"RoomMember"> | Date | string | null;
    room?: Prisma.XOR<Prisma.RoomScalarRelationFilter, Prisma.RoomWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "roomId_userId">;
export type RoomMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isReady?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    leftAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.RoomMemberCountOrderByAggregateInput;
    _max?: Prisma.RoomMemberMaxOrderByAggregateInput;
    _min?: Prisma.RoomMemberMinOrderByAggregateInput;
};
export type RoomMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.RoomMemberScalarWhereWithAggregatesInput | Prisma.RoomMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.RoomMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RoomMemberScalarWhereWithAggregatesInput | Prisma.RoomMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"RoomMember"> | string;
    roomId?: Prisma.StringWithAggregatesFilter<"RoomMember"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"RoomMember"> | string;
    isReady?: Prisma.BoolWithAggregatesFilter<"RoomMember"> | boolean;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"RoomMember"> | Date | string;
    leftAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RoomMember"> | Date | string | null;
};
export type RoomMemberCreateInput = {
    id?: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
    room: Prisma.RoomCreateNestedOneWithoutMembersInput;
    user: Prisma.UserCreateNestedOneWithoutRoomMembersInput;
};
export type RoomMemberUncheckedCreateInput = {
    id?: string;
    roomId: string;
    userId: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
};
export type RoomMemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    room?: Prisma.RoomUpdateOneRequiredWithoutMembersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutRoomMembersNestedInput;
};
export type RoomMemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberCreateManyInput = {
    id?: string;
    roomId: string;
    userId: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
};
export type RoomMemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberListRelationFilter = {
    every?: Prisma.RoomMemberWhereInput;
    some?: Prisma.RoomMemberWhereInput;
    none?: Prisma.RoomMemberWhereInput;
};
export type RoomMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RoomMemberRoomIdUserIdCompoundUniqueInput = {
    roomId: string;
    userId: string;
};
export type RoomMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isReady?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    leftAt?: Prisma.SortOrder;
};
export type RoomMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isReady?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    leftAt?: Prisma.SortOrder;
};
export type RoomMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    isReady?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    leftAt?: Prisma.SortOrder;
};
export type RoomMemberCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutUserInput, Prisma.RoomMemberUncheckedCreateWithoutUserInput> | Prisma.RoomMemberCreateWithoutUserInput[] | Prisma.RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutUserInput | Prisma.RoomMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RoomMemberCreateManyUserInputEnvelope;
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
};
export type RoomMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutUserInput, Prisma.RoomMemberUncheckedCreateWithoutUserInput> | Prisma.RoomMemberCreateWithoutUserInput[] | Prisma.RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutUserInput | Prisma.RoomMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RoomMemberCreateManyUserInputEnvelope;
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
};
export type RoomMemberUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutUserInput, Prisma.RoomMemberUncheckedCreateWithoutUserInput> | Prisma.RoomMemberCreateWithoutUserInput[] | Prisma.RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutUserInput | Prisma.RoomMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RoomMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.RoomMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RoomMemberCreateManyUserInputEnvelope;
    set?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    disconnect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    delete?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    update?: Prisma.RoomMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.RoomMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RoomMemberUpdateManyWithWhereWithoutUserInput | Prisma.RoomMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RoomMemberScalarWhereInput | Prisma.RoomMemberScalarWhereInput[];
};
export type RoomMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutUserInput, Prisma.RoomMemberUncheckedCreateWithoutUserInput> | Prisma.RoomMemberCreateWithoutUserInput[] | Prisma.RoomMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutUserInput | Prisma.RoomMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RoomMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.RoomMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RoomMemberCreateManyUserInputEnvelope;
    set?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    disconnect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    delete?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    update?: Prisma.RoomMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.RoomMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RoomMemberUpdateManyWithWhereWithoutUserInput | Prisma.RoomMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RoomMemberScalarWhereInput | Prisma.RoomMemberScalarWhereInput[];
};
export type RoomMemberCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutRoomInput, Prisma.RoomMemberUncheckedCreateWithoutRoomInput> | Prisma.RoomMemberCreateWithoutRoomInput[] | Prisma.RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutRoomInput | Prisma.RoomMemberCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.RoomMemberCreateManyRoomInputEnvelope;
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
};
export type RoomMemberUncheckedCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutRoomInput, Prisma.RoomMemberUncheckedCreateWithoutRoomInput> | Prisma.RoomMemberCreateWithoutRoomInput[] | Prisma.RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutRoomInput | Prisma.RoomMemberCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.RoomMemberCreateManyRoomInputEnvelope;
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
};
export type RoomMemberUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutRoomInput, Prisma.RoomMemberUncheckedCreateWithoutRoomInput> | Prisma.RoomMemberCreateWithoutRoomInput[] | Prisma.RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutRoomInput | Prisma.RoomMemberCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.RoomMemberUpsertWithWhereUniqueWithoutRoomInput | Prisma.RoomMemberUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.RoomMemberCreateManyRoomInputEnvelope;
    set?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    disconnect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    delete?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    update?: Prisma.RoomMemberUpdateWithWhereUniqueWithoutRoomInput | Prisma.RoomMemberUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.RoomMemberUpdateManyWithWhereWithoutRoomInput | Prisma.RoomMemberUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.RoomMemberScalarWhereInput | Prisma.RoomMemberScalarWhereInput[];
};
export type RoomMemberUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.RoomMemberCreateWithoutRoomInput, Prisma.RoomMemberUncheckedCreateWithoutRoomInput> | Prisma.RoomMemberCreateWithoutRoomInput[] | Prisma.RoomMemberUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.RoomMemberCreateOrConnectWithoutRoomInput | Prisma.RoomMemberCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.RoomMemberUpsertWithWhereUniqueWithoutRoomInput | Prisma.RoomMemberUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.RoomMemberCreateManyRoomInputEnvelope;
    set?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    disconnect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    delete?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    connect?: Prisma.RoomMemberWhereUniqueInput | Prisma.RoomMemberWhereUniqueInput[];
    update?: Prisma.RoomMemberUpdateWithWhereUniqueWithoutRoomInput | Prisma.RoomMemberUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.RoomMemberUpdateManyWithWhereWithoutRoomInput | Prisma.RoomMemberUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.RoomMemberScalarWhereInput | Prisma.RoomMemberScalarWhereInput[];
};
export type RoomMemberCreateWithoutUserInput = {
    id?: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
    room: Prisma.RoomCreateNestedOneWithoutMembersInput;
};
export type RoomMemberUncheckedCreateWithoutUserInput = {
    id?: string;
    roomId: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
};
export type RoomMemberCreateOrConnectWithoutUserInput = {
    where: Prisma.RoomMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomMemberCreateWithoutUserInput, Prisma.RoomMemberUncheckedCreateWithoutUserInput>;
};
export type RoomMemberCreateManyUserInputEnvelope = {
    data: Prisma.RoomMemberCreateManyUserInput | Prisma.RoomMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RoomMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RoomMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoomMemberUpdateWithoutUserInput, Prisma.RoomMemberUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RoomMemberCreateWithoutUserInput, Prisma.RoomMemberUncheckedCreateWithoutUserInput>;
};
export type RoomMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RoomMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoomMemberUpdateWithoutUserInput, Prisma.RoomMemberUncheckedUpdateWithoutUserInput>;
};
export type RoomMemberUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RoomMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.RoomMemberUpdateManyMutationInput, Prisma.RoomMemberUncheckedUpdateManyWithoutUserInput>;
};
export type RoomMemberScalarWhereInput = {
    AND?: Prisma.RoomMemberScalarWhereInput | Prisma.RoomMemberScalarWhereInput[];
    OR?: Prisma.RoomMemberScalarWhereInput[];
    NOT?: Prisma.RoomMemberScalarWhereInput | Prisma.RoomMemberScalarWhereInput[];
    id?: Prisma.StringFilter<"RoomMember"> | string;
    roomId?: Prisma.StringFilter<"RoomMember"> | string;
    userId?: Prisma.StringFilter<"RoomMember"> | string;
    isReady?: Prisma.BoolFilter<"RoomMember"> | boolean;
    joinedAt?: Prisma.DateTimeFilter<"RoomMember"> | Date | string;
    leftAt?: Prisma.DateTimeNullableFilter<"RoomMember"> | Date | string | null;
};
export type RoomMemberCreateWithoutRoomInput = {
    id?: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutRoomMembersInput;
};
export type RoomMemberUncheckedCreateWithoutRoomInput = {
    id?: string;
    userId: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
};
export type RoomMemberCreateOrConnectWithoutRoomInput = {
    where: Prisma.RoomMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomMemberCreateWithoutRoomInput, Prisma.RoomMemberUncheckedCreateWithoutRoomInput>;
};
export type RoomMemberCreateManyRoomInputEnvelope = {
    data: Prisma.RoomMemberCreateManyRoomInput | Prisma.RoomMemberCreateManyRoomInput[];
    skipDuplicates?: boolean;
};
export type RoomMemberUpsertWithWhereUniqueWithoutRoomInput = {
    where: Prisma.RoomMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.RoomMemberUpdateWithoutRoomInput, Prisma.RoomMemberUncheckedUpdateWithoutRoomInput>;
    create: Prisma.XOR<Prisma.RoomMemberCreateWithoutRoomInput, Prisma.RoomMemberUncheckedCreateWithoutRoomInput>;
};
export type RoomMemberUpdateWithWhereUniqueWithoutRoomInput = {
    where: Prisma.RoomMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.RoomMemberUpdateWithoutRoomInput, Prisma.RoomMemberUncheckedUpdateWithoutRoomInput>;
};
export type RoomMemberUpdateManyWithWhereWithoutRoomInput = {
    where: Prisma.RoomMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.RoomMemberUpdateManyMutationInput, Prisma.RoomMemberUncheckedUpdateManyWithoutRoomInput>;
};
export type RoomMemberCreateManyUserInput = {
    id?: string;
    roomId: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
};
export type RoomMemberUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    room?: Prisma.RoomUpdateOneRequiredWithoutMembersNestedInput;
};
export type RoomMemberUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberCreateManyRoomInput = {
    id?: string;
    userId: string;
    isReady?: boolean;
    joinedAt?: Date | string;
    leftAt?: Date | string | null;
};
export type RoomMemberUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutRoomMembersNestedInput;
};
export type RoomMemberUncheckedUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberUncheckedUpdateManyWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    isReady?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    leftAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type RoomMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    isReady?: boolean;
    joinedAt?: boolean;
    leftAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomMember"]>;
export type RoomMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    isReady?: boolean;
    joinedAt?: boolean;
    leftAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomMember"]>;
export type RoomMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    isReady?: boolean;
    joinedAt?: boolean;
    leftAt?: boolean;
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["roomMember"]>;
export type RoomMemberSelectScalar = {
    id?: boolean;
    roomId?: boolean;
    userId?: boolean;
    isReady?: boolean;
    joinedAt?: boolean;
    leftAt?: boolean;
};
export type RoomMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roomId" | "userId" | "isReady" | "joinedAt" | "leftAt", ExtArgs["result"]["roomMember"]>;
export type RoomMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type RoomMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.RoomDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $RoomMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RoomMember";
    objects: {
        room: Prisma.$RoomPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        roomId: string;
        userId: string;
        isReady: boolean;
        joinedAt: Date;
        leftAt: Date | null;
    }, ExtArgs["result"]["roomMember"]>;
    composites: {};
};
export type RoomMemberGetPayload<S extends boolean | null | undefined | RoomMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload, S>;
export type RoomMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RoomMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RoomMemberCountAggregateInputType | true;
};
export interface RoomMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RoomMember'];
        meta: {
            name: 'RoomMember';
        };
    };
    findUnique<T extends RoomMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, RoomMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RoomMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RoomMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RoomMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, RoomMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RoomMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RoomMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RoomMemberFindManyArgs>(args?: Prisma.SelectSubset<T, RoomMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RoomMemberCreateArgs>(args: Prisma.SelectSubset<T, RoomMemberCreateArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RoomMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, RoomMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RoomMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RoomMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RoomMemberDeleteArgs>(args: Prisma.SelectSubset<T, RoomMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RoomMemberUpdateArgs>(args: Prisma.SelectSubset<T, RoomMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RoomMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, RoomMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RoomMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, RoomMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RoomMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RoomMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RoomMemberUpsertArgs>(args: Prisma.SelectSubset<T, RoomMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__RoomMemberClient<runtime.Types.Result.GetResult<Prisma.$RoomMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RoomMemberCountArgs>(args?: Prisma.Subset<T, RoomMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RoomMemberCountAggregateOutputType> : number>;
    aggregate<T extends RoomMemberAggregateArgs>(args: Prisma.Subset<T, RoomMemberAggregateArgs>): Prisma.PrismaPromise<GetRoomMemberAggregateType<T>>;
    groupBy<T extends RoomMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RoomMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: RoomMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RoomMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RoomMemberFieldRefs;
}
export interface Prisma__RoomMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    room<T extends Prisma.RoomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomClient<runtime.Types.Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RoomMemberFieldRefs {
    readonly id: Prisma.FieldRef<"RoomMember", 'String'>;
    readonly roomId: Prisma.FieldRef<"RoomMember", 'String'>;
    readonly userId: Prisma.FieldRef<"RoomMember", 'String'>;
    readonly isReady: Prisma.FieldRef<"RoomMember", 'Boolean'>;
    readonly joinedAt: Prisma.FieldRef<"RoomMember", 'DateTime'>;
    readonly leftAt: Prisma.FieldRef<"RoomMember", 'DateTime'>;
}
export type RoomMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    where: Prisma.RoomMemberWhereUniqueInput;
};
export type RoomMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    where: Prisma.RoomMemberWhereUniqueInput;
};
export type RoomMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RoomMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RoomMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type RoomMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomMemberCreateInput, Prisma.RoomMemberUncheckedCreateInput>;
};
export type RoomMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RoomMemberCreateManyInput | Prisma.RoomMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RoomMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    data: Prisma.RoomMemberCreateManyInput | Prisma.RoomMemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RoomMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RoomMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomMemberUpdateInput, Prisma.RoomMemberUncheckedUpdateInput>;
    where: Prisma.RoomMemberWhereUniqueInput;
};
export type RoomMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RoomMemberUpdateManyMutationInput, Prisma.RoomMemberUncheckedUpdateManyInput>;
    where?: Prisma.RoomMemberWhereInput;
    limit?: number;
};
export type RoomMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RoomMemberUpdateManyMutationInput, Prisma.RoomMemberUncheckedUpdateManyInput>;
    where?: Prisma.RoomMemberWhereInput;
    limit?: number;
    include?: Prisma.RoomMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RoomMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    where: Prisma.RoomMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.RoomMemberCreateInput, Prisma.RoomMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RoomMemberUpdateInput, Prisma.RoomMemberUncheckedUpdateInput>;
};
export type RoomMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
    where: Prisma.RoomMemberWhereUniqueInput;
};
export type RoomMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RoomMemberWhereInput;
    limit?: number;
};
export type RoomMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RoomMemberSelect<ExtArgs> | null;
    omit?: Prisma.RoomMemberOmit<ExtArgs> | null;
    include?: Prisma.RoomMemberInclude<ExtArgs> | null;
};
