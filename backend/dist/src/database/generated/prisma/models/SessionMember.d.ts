import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SessionMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$SessionMemberPayload>;
export type AggregateSessionMember = {
    _count: SessionMemberCountAggregateOutputType | null;
    _min: SessionMemberMinAggregateOutputType | null;
    _max: SessionMemberMaxAggregateOutputType | null;
};
export type SessionMemberMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    role: $Enums.SessionMemberRole | null;
    joinedAt: Date | null;
};
export type SessionMemberMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    userId: string | null;
    role: $Enums.SessionMemberRole | null;
    joinedAt: Date | null;
};
export type SessionMemberCountAggregateOutputType = {
    id: number;
    sessionId: number;
    userId: number;
    role: number;
    joinedAt: number;
    _all: number;
};
export type SessionMemberMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
};
export type SessionMemberMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
};
export type SessionMemberCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
    _all?: true;
};
export type SessionMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionMemberWhereInput;
    orderBy?: Prisma.SessionMemberOrderByWithRelationInput | Prisma.SessionMemberOrderByWithRelationInput[];
    cursor?: Prisma.SessionMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SessionMemberCountAggregateInputType;
    _min?: SessionMemberMinAggregateInputType;
    _max?: SessionMemberMaxAggregateInputType;
};
export type GetSessionMemberAggregateType<T extends SessionMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateSessionMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSessionMember[P]> : Prisma.GetScalarType<T[P], AggregateSessionMember[P]>;
};
export type SessionMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionMemberWhereInput;
    orderBy?: Prisma.SessionMemberOrderByWithAggregationInput | Prisma.SessionMemberOrderByWithAggregationInput[];
    by: Prisma.SessionMemberScalarFieldEnum[] | Prisma.SessionMemberScalarFieldEnum;
    having?: Prisma.SessionMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SessionMemberCountAggregateInputType | true;
    _min?: SessionMemberMinAggregateInputType;
    _max?: SessionMemberMaxAggregateInputType;
};
export type SessionMemberGroupByOutputType = {
    id: string;
    sessionId: string;
    userId: string;
    role: $Enums.SessionMemberRole;
    joinedAt: Date;
    _count: SessionMemberCountAggregateOutputType | null;
    _min: SessionMemberMinAggregateOutputType | null;
    _max: SessionMemberMaxAggregateOutputType | null;
};
export type GetSessionMemberGroupByPayload<T extends SessionMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SessionMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SessionMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SessionMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SessionMemberGroupByOutputType[P]>;
}>>;
export type SessionMemberWhereInput = {
    AND?: Prisma.SessionMemberWhereInput | Prisma.SessionMemberWhereInput[];
    OR?: Prisma.SessionMemberWhereInput[];
    NOT?: Prisma.SessionMemberWhereInput | Prisma.SessionMemberWhereInput[];
    id?: Prisma.StringFilter<"SessionMember"> | string;
    sessionId?: Prisma.StringFilter<"SessionMember"> | string;
    userId?: Prisma.StringFilter<"SessionMember"> | string;
    role?: Prisma.EnumSessionMemberRoleFilter<"SessionMember"> | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFilter<"SessionMember"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type SessionMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type SessionMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId_userId?: Prisma.SessionMemberSessionIdUserIdCompoundUniqueInput;
    AND?: Prisma.SessionMemberWhereInput | Prisma.SessionMemberWhereInput[];
    OR?: Prisma.SessionMemberWhereInput[];
    NOT?: Prisma.SessionMemberWhereInput | Prisma.SessionMemberWhereInput[];
    sessionId?: Prisma.StringFilter<"SessionMember"> | string;
    userId?: Prisma.StringFilter<"SessionMember"> | string;
    role?: Prisma.EnumSessionMemberRoleFilter<"SessionMember"> | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFilter<"SessionMember"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "sessionId_userId">;
export type SessionMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    _count?: Prisma.SessionMemberCountOrderByAggregateInput;
    _max?: Prisma.SessionMemberMaxOrderByAggregateInput;
    _min?: Prisma.SessionMemberMinOrderByAggregateInput;
};
export type SessionMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.SessionMemberScalarWhereWithAggregatesInput | Prisma.SessionMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.SessionMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SessionMemberScalarWhereWithAggregatesInput | Prisma.SessionMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SessionMember"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"SessionMember"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SessionMember"> | string;
    role?: Prisma.EnumSessionMemberRoleWithAggregatesFilter<"SessionMember"> | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"SessionMember"> | Date | string;
};
export type SessionMemberCreateInput = {
    id?: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutMembersInput;
    user: Prisma.UserCreateNestedOneWithoutSessionMembersInput;
};
export type SessionMemberUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    userId: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
};
export type SessionMemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutMembersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutSessionMembersNestedInput;
};
export type SessionMemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberCreateManyInput = {
    id?: string;
    sessionId: string;
    userId: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
};
export type SessionMemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberListRelationFilter = {
    every?: Prisma.SessionMemberWhereInput;
    some?: Prisma.SessionMemberWhereInput;
    none?: Prisma.SessionMemberWhereInput;
};
export type SessionMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SessionMemberSessionIdUserIdCompoundUniqueInput = {
    sessionId: string;
    userId: string;
};
export type SessionMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type SessionMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type SessionMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type SessionMemberCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutUserInput, Prisma.SessionMemberUncheckedCreateWithoutUserInput> | Prisma.SessionMemberCreateWithoutUserInput[] | Prisma.SessionMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutUserInput | Prisma.SessionMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SessionMemberCreateManyUserInputEnvelope;
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
};
export type SessionMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutUserInput, Prisma.SessionMemberUncheckedCreateWithoutUserInput> | Prisma.SessionMemberCreateWithoutUserInput[] | Prisma.SessionMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutUserInput | Prisma.SessionMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SessionMemberCreateManyUserInputEnvelope;
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
};
export type SessionMemberUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutUserInput, Prisma.SessionMemberUncheckedCreateWithoutUserInput> | Prisma.SessionMemberCreateWithoutUserInput[] | Prisma.SessionMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutUserInput | Prisma.SessionMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SessionMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.SessionMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SessionMemberCreateManyUserInputEnvelope;
    set?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    disconnect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    delete?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    update?: Prisma.SessionMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.SessionMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SessionMemberUpdateManyWithWhereWithoutUserInput | Prisma.SessionMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SessionMemberScalarWhereInput | Prisma.SessionMemberScalarWhereInput[];
};
export type SessionMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutUserInput, Prisma.SessionMemberUncheckedCreateWithoutUserInput> | Prisma.SessionMemberCreateWithoutUserInput[] | Prisma.SessionMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutUserInput | Prisma.SessionMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SessionMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.SessionMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SessionMemberCreateManyUserInputEnvelope;
    set?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    disconnect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    delete?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    update?: Prisma.SessionMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.SessionMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SessionMemberUpdateManyWithWhereWithoutUserInput | Prisma.SessionMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SessionMemberScalarWhereInput | Prisma.SessionMemberScalarWhereInput[];
};
export type SessionMemberCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutSessionInput, Prisma.SessionMemberUncheckedCreateWithoutSessionInput> | Prisma.SessionMemberCreateWithoutSessionInput[] | Prisma.SessionMemberUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutSessionInput | Prisma.SessionMemberCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.SessionMemberCreateManySessionInputEnvelope;
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
};
export type SessionMemberUncheckedCreateNestedManyWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutSessionInput, Prisma.SessionMemberUncheckedCreateWithoutSessionInput> | Prisma.SessionMemberCreateWithoutSessionInput[] | Prisma.SessionMemberUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutSessionInput | Prisma.SessionMemberCreateOrConnectWithoutSessionInput[];
    createMany?: Prisma.SessionMemberCreateManySessionInputEnvelope;
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
};
export type SessionMemberUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutSessionInput, Prisma.SessionMemberUncheckedCreateWithoutSessionInput> | Prisma.SessionMemberCreateWithoutSessionInput[] | Prisma.SessionMemberUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutSessionInput | Prisma.SessionMemberCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.SessionMemberUpsertWithWhereUniqueWithoutSessionInput | Prisma.SessionMemberUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.SessionMemberCreateManySessionInputEnvelope;
    set?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    disconnect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    delete?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    update?: Prisma.SessionMemberUpdateWithWhereUniqueWithoutSessionInput | Prisma.SessionMemberUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.SessionMemberUpdateManyWithWhereWithoutSessionInput | Prisma.SessionMemberUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.SessionMemberScalarWhereInput | Prisma.SessionMemberScalarWhereInput[];
};
export type SessionMemberUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.SessionMemberCreateWithoutSessionInput, Prisma.SessionMemberUncheckedCreateWithoutSessionInput> | Prisma.SessionMemberCreateWithoutSessionInput[] | Prisma.SessionMemberUncheckedCreateWithoutSessionInput[];
    connectOrCreate?: Prisma.SessionMemberCreateOrConnectWithoutSessionInput | Prisma.SessionMemberCreateOrConnectWithoutSessionInput[];
    upsert?: Prisma.SessionMemberUpsertWithWhereUniqueWithoutSessionInput | Prisma.SessionMemberUpsertWithWhereUniqueWithoutSessionInput[];
    createMany?: Prisma.SessionMemberCreateManySessionInputEnvelope;
    set?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    disconnect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    delete?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    connect?: Prisma.SessionMemberWhereUniqueInput | Prisma.SessionMemberWhereUniqueInput[];
    update?: Prisma.SessionMemberUpdateWithWhereUniqueWithoutSessionInput | Prisma.SessionMemberUpdateWithWhereUniqueWithoutSessionInput[];
    updateMany?: Prisma.SessionMemberUpdateManyWithWhereWithoutSessionInput | Prisma.SessionMemberUpdateManyWithWhereWithoutSessionInput[];
    deleteMany?: Prisma.SessionMemberScalarWhereInput | Prisma.SessionMemberScalarWhereInput[];
};
export type EnumSessionMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.SessionMemberRole;
};
export type SessionMemberCreateWithoutUserInput = {
    id?: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutMembersInput;
};
export type SessionMemberUncheckedCreateWithoutUserInput = {
    id?: string;
    sessionId: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
};
export type SessionMemberCreateOrConnectWithoutUserInput = {
    where: Prisma.SessionMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessionMemberCreateWithoutUserInput, Prisma.SessionMemberUncheckedCreateWithoutUserInput>;
};
export type SessionMemberCreateManyUserInputEnvelope = {
    data: Prisma.SessionMemberCreateManyUserInput | Prisma.SessionMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SessionMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SessionMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.SessionMemberUpdateWithoutUserInput, Prisma.SessionMemberUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SessionMemberCreateWithoutUserInput, Prisma.SessionMemberUncheckedCreateWithoutUserInput>;
};
export type SessionMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SessionMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.SessionMemberUpdateWithoutUserInput, Prisma.SessionMemberUncheckedUpdateWithoutUserInput>;
};
export type SessionMemberUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SessionMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.SessionMemberUpdateManyMutationInput, Prisma.SessionMemberUncheckedUpdateManyWithoutUserInput>;
};
export type SessionMemberScalarWhereInput = {
    AND?: Prisma.SessionMemberScalarWhereInput | Prisma.SessionMemberScalarWhereInput[];
    OR?: Prisma.SessionMemberScalarWhereInput[];
    NOT?: Prisma.SessionMemberScalarWhereInput | Prisma.SessionMemberScalarWhereInput[];
    id?: Prisma.StringFilter<"SessionMember"> | string;
    sessionId?: Prisma.StringFilter<"SessionMember"> | string;
    userId?: Prisma.StringFilter<"SessionMember"> | string;
    role?: Prisma.EnumSessionMemberRoleFilter<"SessionMember"> | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFilter<"SessionMember"> | Date | string;
};
export type SessionMemberCreateWithoutSessionInput = {
    id?: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSessionMembersInput;
};
export type SessionMemberUncheckedCreateWithoutSessionInput = {
    id?: string;
    userId: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
};
export type SessionMemberCreateOrConnectWithoutSessionInput = {
    where: Prisma.SessionMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessionMemberCreateWithoutSessionInput, Prisma.SessionMemberUncheckedCreateWithoutSessionInput>;
};
export type SessionMemberCreateManySessionInputEnvelope = {
    data: Prisma.SessionMemberCreateManySessionInput | Prisma.SessionMemberCreateManySessionInput[];
    skipDuplicates?: boolean;
};
export type SessionMemberUpsertWithWhereUniqueWithoutSessionInput = {
    where: Prisma.SessionMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.SessionMemberUpdateWithoutSessionInput, Prisma.SessionMemberUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.SessionMemberCreateWithoutSessionInput, Prisma.SessionMemberUncheckedCreateWithoutSessionInput>;
};
export type SessionMemberUpdateWithWhereUniqueWithoutSessionInput = {
    where: Prisma.SessionMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.SessionMemberUpdateWithoutSessionInput, Prisma.SessionMemberUncheckedUpdateWithoutSessionInput>;
};
export type SessionMemberUpdateManyWithWhereWithoutSessionInput = {
    where: Prisma.SessionMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.SessionMemberUpdateManyMutationInput, Prisma.SessionMemberUncheckedUpdateManyWithoutSessionInput>;
};
export type SessionMemberCreateManyUserInput = {
    id?: string;
    sessionId: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
};
export type SessionMemberUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutMembersNestedInput;
};
export type SessionMemberUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberCreateManySessionInput = {
    id?: string;
    userId: string;
    role: $Enums.SessionMemberRole;
    joinedAt?: Date | string;
};
export type SessionMemberUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSessionMembersNestedInput;
};
export type SessionMemberUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberUncheckedUpdateManyWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumSessionMemberRoleFieldUpdateOperationsInput | $Enums.SessionMemberRole;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SessionMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sessionMember"]>;
export type SessionMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sessionMember"]>;
export type SessionMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sessionMember"]>;
export type SessionMemberSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
};
export type SessionMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "userId" | "role" | "joinedAt", ExtArgs["result"]["sessionMember"]>;
export type SessionMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SessionMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SessionMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SessionMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SessionMember";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        userId: string;
        role: $Enums.SessionMemberRole;
        joinedAt: Date;
    }, ExtArgs["result"]["sessionMember"]>;
    composites: {};
};
export type SessionMemberGetPayload<S extends boolean | null | undefined | SessionMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload, S>;
export type SessionMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SessionMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SessionMemberCountAggregateInputType | true;
};
export interface SessionMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SessionMember'];
        meta: {
            name: 'SessionMember';
        };
    };
    findUnique<T extends SessionMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, SessionMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SessionMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SessionMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SessionMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, SessionMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SessionMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SessionMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SessionMemberFindManyArgs>(args?: Prisma.SelectSubset<T, SessionMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SessionMemberCreateArgs>(args: Prisma.SelectSubset<T, SessionMemberCreateArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SessionMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, SessionMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SessionMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SessionMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SessionMemberDeleteArgs>(args: Prisma.SelectSubset<T, SessionMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SessionMemberUpdateArgs>(args: Prisma.SelectSubset<T, SessionMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SessionMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, SessionMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SessionMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, SessionMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SessionMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SessionMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SessionMemberUpsertArgs>(args: Prisma.SelectSubset<T, SessionMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__SessionMemberClient<runtime.Types.Result.GetResult<Prisma.$SessionMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SessionMemberCountArgs>(args?: Prisma.Subset<T, SessionMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SessionMemberCountAggregateOutputType> : number>;
    aggregate<T extends SessionMemberAggregateArgs>(args: Prisma.Subset<T, SessionMemberAggregateArgs>): Prisma.PrismaPromise<GetSessionMemberAggregateType<T>>;
    groupBy<T extends SessionMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SessionMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: SessionMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SessionMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SessionMemberFieldRefs;
}
export interface Prisma__SessionMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SessionMemberFieldRefs {
    readonly id: Prisma.FieldRef<"SessionMember", 'String'>;
    readonly sessionId: Prisma.FieldRef<"SessionMember", 'String'>;
    readonly userId: Prisma.FieldRef<"SessionMember", 'String'>;
    readonly role: Prisma.FieldRef<"SessionMember", 'SessionMemberRole'>;
    readonly joinedAt: Prisma.FieldRef<"SessionMember", 'DateTime'>;
}
export type SessionMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    where: Prisma.SessionMemberWhereUniqueInput;
};
export type SessionMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    where: Prisma.SessionMemberWhereUniqueInput;
};
export type SessionMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SessionMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SessionMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type SessionMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessionMemberCreateInput, Prisma.SessionMemberUncheckedCreateInput>;
};
export type SessionMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SessionMemberCreateManyInput | Prisma.SessionMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SessionMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    data: Prisma.SessionMemberCreateManyInput | Prisma.SessionMemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SessionMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SessionMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessionMemberUpdateInput, Prisma.SessionMemberUncheckedUpdateInput>;
    where: Prisma.SessionMemberWhereUniqueInput;
};
export type SessionMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SessionMemberUpdateManyMutationInput, Prisma.SessionMemberUncheckedUpdateManyInput>;
    where?: Prisma.SessionMemberWhereInput;
    limit?: number;
};
export type SessionMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SessionMemberUpdateManyMutationInput, Prisma.SessionMemberUncheckedUpdateManyInput>;
    where?: Prisma.SessionMemberWhereInput;
    limit?: number;
    include?: Prisma.SessionMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SessionMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    where: Prisma.SessionMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.SessionMemberCreateInput, Prisma.SessionMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SessionMemberUpdateInput, Prisma.SessionMemberUncheckedUpdateInput>;
};
export type SessionMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
    where: Prisma.SessionMemberWhereUniqueInput;
};
export type SessionMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SessionMemberWhereInput;
    limit?: number;
};
export type SessionMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SessionMemberSelect<ExtArgs> | null;
    omit?: Prisma.SessionMemberOmit<ExtArgs> | null;
    include?: Prisma.SessionMemberInclude<ExtArgs> | null;
};
