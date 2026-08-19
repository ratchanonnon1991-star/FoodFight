import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ItemShareModel = runtime.Types.Result.DefaultSelection<Prisma.$ItemSharePayload>;
export type AggregateItemShare = {
    _count: ItemShareCountAggregateOutputType | null;
    _avg: ItemShareAvgAggregateOutputType | null;
    _sum: ItemShareSumAggregateOutputType | null;
    _min: ItemShareMinAggregateOutputType | null;
    _max: ItemShareMaxAggregateOutputType | null;
};
export type ItemShareAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type ItemShareSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type ItemShareMinAggregateOutputType = {
    id: string | null;
    receiptItemId: string | null;
    userId: string | null;
    amount: runtime.Decimal | null;
    createdAt: Date | null;
};
export type ItemShareMaxAggregateOutputType = {
    id: string | null;
    receiptItemId: string | null;
    userId: string | null;
    amount: runtime.Decimal | null;
    createdAt: Date | null;
};
export type ItemShareCountAggregateOutputType = {
    id: number;
    receiptItemId: number;
    userId: number;
    amount: number;
    createdAt: number;
    _all: number;
};
export type ItemShareAvgAggregateInputType = {
    amount?: true;
};
export type ItemShareSumAggregateInputType = {
    amount?: true;
};
export type ItemShareMinAggregateInputType = {
    id?: true;
    receiptItemId?: true;
    userId?: true;
    amount?: true;
    createdAt?: true;
};
export type ItemShareMaxAggregateInputType = {
    id?: true;
    receiptItemId?: true;
    userId?: true;
    amount?: true;
    createdAt?: true;
};
export type ItemShareCountAggregateInputType = {
    id?: true;
    receiptItemId?: true;
    userId?: true;
    amount?: true;
    createdAt?: true;
    _all?: true;
};
export type ItemShareAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ItemShareWhereInput;
    orderBy?: Prisma.ItemShareOrderByWithRelationInput | Prisma.ItemShareOrderByWithRelationInput[];
    cursor?: Prisma.ItemShareWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ItemShareCountAggregateInputType;
    _avg?: ItemShareAvgAggregateInputType;
    _sum?: ItemShareSumAggregateInputType;
    _min?: ItemShareMinAggregateInputType;
    _max?: ItemShareMaxAggregateInputType;
};
export type GetItemShareAggregateType<T extends ItemShareAggregateArgs> = {
    [P in keyof T & keyof AggregateItemShare]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateItemShare[P]> : Prisma.GetScalarType<T[P], AggregateItemShare[P]>;
};
export type ItemShareGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ItemShareWhereInput;
    orderBy?: Prisma.ItemShareOrderByWithAggregationInput | Prisma.ItemShareOrderByWithAggregationInput[];
    by: Prisma.ItemShareScalarFieldEnum[] | Prisma.ItemShareScalarFieldEnum;
    having?: Prisma.ItemShareScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ItemShareCountAggregateInputType | true;
    _avg?: ItemShareAvgAggregateInputType;
    _sum?: ItemShareSumAggregateInputType;
    _min?: ItemShareMinAggregateInputType;
    _max?: ItemShareMaxAggregateInputType;
};
export type ItemShareGroupByOutputType = {
    id: string;
    receiptItemId: string;
    userId: string;
    amount: runtime.Decimal;
    createdAt: Date;
    _count: ItemShareCountAggregateOutputType | null;
    _avg: ItemShareAvgAggregateOutputType | null;
    _sum: ItemShareSumAggregateOutputType | null;
    _min: ItemShareMinAggregateOutputType | null;
    _max: ItemShareMaxAggregateOutputType | null;
};
export type GetItemShareGroupByPayload<T extends ItemShareGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ItemShareGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ItemShareGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ItemShareGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ItemShareGroupByOutputType[P]>;
}>>;
export type ItemShareWhereInput = {
    AND?: Prisma.ItemShareWhereInput | Prisma.ItemShareWhereInput[];
    OR?: Prisma.ItemShareWhereInput[];
    NOT?: Prisma.ItemShareWhereInput | Prisma.ItemShareWhereInput[];
    id?: Prisma.StringFilter<"ItemShare"> | string;
    receiptItemId?: Prisma.StringFilter<"ItemShare"> | string;
    userId?: Prisma.StringFilter<"ItemShare"> | string;
    amount?: Prisma.DecimalFilter<"ItemShare"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ItemShare"> | Date | string;
    receiptItem?: Prisma.XOR<Prisma.ReceiptItemScalarRelationFilter, Prisma.ReceiptItemWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ItemShareOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    receiptItemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    receiptItem?: Prisma.ReceiptItemOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ItemShareWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    receiptItemId_userId?: Prisma.ItemShareReceiptItemIdUserIdCompoundUniqueInput;
    AND?: Prisma.ItemShareWhereInput | Prisma.ItemShareWhereInput[];
    OR?: Prisma.ItemShareWhereInput[];
    NOT?: Prisma.ItemShareWhereInput | Prisma.ItemShareWhereInput[];
    receiptItemId?: Prisma.StringFilter<"ItemShare"> | string;
    userId?: Prisma.StringFilter<"ItemShare"> | string;
    amount?: Prisma.DecimalFilter<"ItemShare"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ItemShare"> | Date | string;
    receiptItem?: Prisma.XOR<Prisma.ReceiptItemScalarRelationFilter, Prisma.ReceiptItemWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "receiptItemId_userId">;
export type ItemShareOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    receiptItemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ItemShareCountOrderByAggregateInput;
    _avg?: Prisma.ItemShareAvgOrderByAggregateInput;
    _max?: Prisma.ItemShareMaxOrderByAggregateInput;
    _min?: Prisma.ItemShareMinOrderByAggregateInput;
    _sum?: Prisma.ItemShareSumOrderByAggregateInput;
};
export type ItemShareScalarWhereWithAggregatesInput = {
    AND?: Prisma.ItemShareScalarWhereWithAggregatesInput | Prisma.ItemShareScalarWhereWithAggregatesInput[];
    OR?: Prisma.ItemShareScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ItemShareScalarWhereWithAggregatesInput | Prisma.ItemShareScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ItemShare"> | string;
    receiptItemId?: Prisma.StringWithAggregatesFilter<"ItemShare"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ItemShare"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"ItemShare"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ItemShare"> | Date | string;
};
export type ItemShareCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    receiptItem: Prisma.ReceiptItemCreateNestedOneWithoutSharesInput;
    user: Prisma.UserCreateNestedOneWithoutItemSharesInput;
};
export type ItemShareUncheckedCreateInput = {
    id?: string;
    receiptItemId: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ItemShareUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptItem?: Prisma.ReceiptItemUpdateOneRequiredWithoutSharesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutItemSharesNestedInput;
};
export type ItemShareUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareCreateManyInput = {
    id?: string;
    receiptItemId: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ItemShareUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareListRelationFilter = {
    every?: Prisma.ItemShareWhereInput;
    some?: Prisma.ItemShareWhereInput;
    none?: Prisma.ItemShareWhereInput;
};
export type ItemShareOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ItemShareReceiptItemIdUserIdCompoundUniqueInput = {
    receiptItemId: string;
    userId: string;
};
export type ItemShareCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptItemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ItemShareAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type ItemShareMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptItemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ItemShareMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    receiptItemId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ItemShareSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type ItemShareCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutUserInput, Prisma.ItemShareUncheckedCreateWithoutUserInput> | Prisma.ItemShareCreateWithoutUserInput[] | Prisma.ItemShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutUserInput | Prisma.ItemShareCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ItemShareCreateManyUserInputEnvelope;
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
};
export type ItemShareUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutUserInput, Prisma.ItemShareUncheckedCreateWithoutUserInput> | Prisma.ItemShareCreateWithoutUserInput[] | Prisma.ItemShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutUserInput | Prisma.ItemShareCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ItemShareCreateManyUserInputEnvelope;
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
};
export type ItemShareUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutUserInput, Prisma.ItemShareUncheckedCreateWithoutUserInput> | Prisma.ItemShareCreateWithoutUserInput[] | Prisma.ItemShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutUserInput | Prisma.ItemShareCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ItemShareUpsertWithWhereUniqueWithoutUserInput | Prisma.ItemShareUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ItemShareCreateManyUserInputEnvelope;
    set?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    disconnect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    delete?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    update?: Prisma.ItemShareUpdateWithWhereUniqueWithoutUserInput | Prisma.ItemShareUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ItemShareUpdateManyWithWhereWithoutUserInput | Prisma.ItemShareUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ItemShareScalarWhereInput | Prisma.ItemShareScalarWhereInput[];
};
export type ItemShareUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutUserInput, Prisma.ItemShareUncheckedCreateWithoutUserInput> | Prisma.ItemShareCreateWithoutUserInput[] | Prisma.ItemShareUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutUserInput | Prisma.ItemShareCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ItemShareUpsertWithWhereUniqueWithoutUserInput | Prisma.ItemShareUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ItemShareCreateManyUserInputEnvelope;
    set?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    disconnect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    delete?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    update?: Prisma.ItemShareUpdateWithWhereUniqueWithoutUserInput | Prisma.ItemShareUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ItemShareUpdateManyWithWhereWithoutUserInput | Prisma.ItemShareUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ItemShareScalarWhereInput | Prisma.ItemShareScalarWhereInput[];
};
export type ItemShareCreateNestedManyWithoutReceiptItemInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutReceiptItemInput, Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput> | Prisma.ItemShareCreateWithoutReceiptItemInput[] | Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput | Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput[];
    createMany?: Prisma.ItemShareCreateManyReceiptItemInputEnvelope;
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
};
export type ItemShareUncheckedCreateNestedManyWithoutReceiptItemInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutReceiptItemInput, Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput> | Prisma.ItemShareCreateWithoutReceiptItemInput[] | Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput | Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput[];
    createMany?: Prisma.ItemShareCreateManyReceiptItemInputEnvelope;
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
};
export type ItemShareUpdateManyWithoutReceiptItemNestedInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutReceiptItemInput, Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput> | Prisma.ItemShareCreateWithoutReceiptItemInput[] | Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput | Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput[];
    upsert?: Prisma.ItemShareUpsertWithWhereUniqueWithoutReceiptItemInput | Prisma.ItemShareUpsertWithWhereUniqueWithoutReceiptItemInput[];
    createMany?: Prisma.ItemShareCreateManyReceiptItemInputEnvelope;
    set?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    disconnect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    delete?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    update?: Prisma.ItemShareUpdateWithWhereUniqueWithoutReceiptItemInput | Prisma.ItemShareUpdateWithWhereUniqueWithoutReceiptItemInput[];
    updateMany?: Prisma.ItemShareUpdateManyWithWhereWithoutReceiptItemInput | Prisma.ItemShareUpdateManyWithWhereWithoutReceiptItemInput[];
    deleteMany?: Prisma.ItemShareScalarWhereInput | Prisma.ItemShareScalarWhereInput[];
};
export type ItemShareUncheckedUpdateManyWithoutReceiptItemNestedInput = {
    create?: Prisma.XOR<Prisma.ItemShareCreateWithoutReceiptItemInput, Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput> | Prisma.ItemShareCreateWithoutReceiptItemInput[] | Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput[];
    connectOrCreate?: Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput | Prisma.ItemShareCreateOrConnectWithoutReceiptItemInput[];
    upsert?: Prisma.ItemShareUpsertWithWhereUniqueWithoutReceiptItemInput | Prisma.ItemShareUpsertWithWhereUniqueWithoutReceiptItemInput[];
    createMany?: Prisma.ItemShareCreateManyReceiptItemInputEnvelope;
    set?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    disconnect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    delete?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    connect?: Prisma.ItemShareWhereUniqueInput | Prisma.ItemShareWhereUniqueInput[];
    update?: Prisma.ItemShareUpdateWithWhereUniqueWithoutReceiptItemInput | Prisma.ItemShareUpdateWithWhereUniqueWithoutReceiptItemInput[];
    updateMany?: Prisma.ItemShareUpdateManyWithWhereWithoutReceiptItemInput | Prisma.ItemShareUpdateManyWithWhereWithoutReceiptItemInput[];
    deleteMany?: Prisma.ItemShareScalarWhereInput | Prisma.ItemShareScalarWhereInput[];
};
export type ItemShareCreateWithoutUserInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    receiptItem: Prisma.ReceiptItemCreateNestedOneWithoutSharesInput;
};
export type ItemShareUncheckedCreateWithoutUserInput = {
    id?: string;
    receiptItemId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ItemShareCreateOrConnectWithoutUserInput = {
    where: Prisma.ItemShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.ItemShareCreateWithoutUserInput, Prisma.ItemShareUncheckedCreateWithoutUserInput>;
};
export type ItemShareCreateManyUserInputEnvelope = {
    data: Prisma.ItemShareCreateManyUserInput | Prisma.ItemShareCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ItemShareUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ItemShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.ItemShareUpdateWithoutUserInput, Prisma.ItemShareUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ItemShareCreateWithoutUserInput, Prisma.ItemShareUncheckedCreateWithoutUserInput>;
};
export type ItemShareUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ItemShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.ItemShareUpdateWithoutUserInput, Prisma.ItemShareUncheckedUpdateWithoutUserInput>;
};
export type ItemShareUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ItemShareScalarWhereInput;
    data: Prisma.XOR<Prisma.ItemShareUpdateManyMutationInput, Prisma.ItemShareUncheckedUpdateManyWithoutUserInput>;
};
export type ItemShareScalarWhereInput = {
    AND?: Prisma.ItemShareScalarWhereInput | Prisma.ItemShareScalarWhereInput[];
    OR?: Prisma.ItemShareScalarWhereInput[];
    NOT?: Prisma.ItemShareScalarWhereInput | Prisma.ItemShareScalarWhereInput[];
    id?: Prisma.StringFilter<"ItemShare"> | string;
    receiptItemId?: Prisma.StringFilter<"ItemShare"> | string;
    userId?: Prisma.StringFilter<"ItemShare"> | string;
    amount?: Prisma.DecimalFilter<"ItemShare"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ItemShare"> | Date | string;
};
export type ItemShareCreateWithoutReceiptItemInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutItemSharesInput;
};
export type ItemShareUncheckedCreateWithoutReceiptItemInput = {
    id?: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ItemShareCreateOrConnectWithoutReceiptItemInput = {
    where: Prisma.ItemShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.ItemShareCreateWithoutReceiptItemInput, Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput>;
};
export type ItemShareCreateManyReceiptItemInputEnvelope = {
    data: Prisma.ItemShareCreateManyReceiptItemInput | Prisma.ItemShareCreateManyReceiptItemInput[];
    skipDuplicates?: boolean;
};
export type ItemShareUpsertWithWhereUniqueWithoutReceiptItemInput = {
    where: Prisma.ItemShareWhereUniqueInput;
    update: Prisma.XOR<Prisma.ItemShareUpdateWithoutReceiptItemInput, Prisma.ItemShareUncheckedUpdateWithoutReceiptItemInput>;
    create: Prisma.XOR<Prisma.ItemShareCreateWithoutReceiptItemInput, Prisma.ItemShareUncheckedCreateWithoutReceiptItemInput>;
};
export type ItemShareUpdateWithWhereUniqueWithoutReceiptItemInput = {
    where: Prisma.ItemShareWhereUniqueInput;
    data: Prisma.XOR<Prisma.ItemShareUpdateWithoutReceiptItemInput, Prisma.ItemShareUncheckedUpdateWithoutReceiptItemInput>;
};
export type ItemShareUpdateManyWithWhereWithoutReceiptItemInput = {
    where: Prisma.ItemShareScalarWhereInput;
    data: Prisma.XOR<Prisma.ItemShareUpdateManyMutationInput, Prisma.ItemShareUncheckedUpdateManyWithoutReceiptItemInput>;
};
export type ItemShareCreateManyUserInput = {
    id?: string;
    receiptItemId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ItemShareUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receiptItem?: Prisma.ReceiptItemUpdateOneRequiredWithoutSharesNestedInput;
};
export type ItemShareUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    receiptItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareCreateManyReceiptItemInput = {
    id?: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
};
export type ItemShareUpdateWithoutReceiptItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutItemSharesNestedInput;
};
export type ItemShareUncheckedUpdateWithoutReceiptItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareUncheckedUpdateManyWithoutReceiptItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ItemShareSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptItemId?: boolean;
    userId?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    receiptItem?: boolean | Prisma.ReceiptItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["itemShare"]>;
export type ItemShareSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptItemId?: boolean;
    userId?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    receiptItem?: boolean | Prisma.ReceiptItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["itemShare"]>;
export type ItemShareSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    receiptItemId?: boolean;
    userId?: boolean;
    amount?: boolean;
    createdAt?: boolean;
    receiptItem?: boolean | Prisma.ReceiptItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["itemShare"]>;
export type ItemShareSelectScalar = {
    id?: boolean;
    receiptItemId?: boolean;
    userId?: boolean;
    amount?: boolean;
    createdAt?: boolean;
};
export type ItemShareOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "receiptItemId" | "userId" | "amount" | "createdAt", ExtArgs["result"]["itemShare"]>;
export type ItemShareInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptItem?: boolean | Prisma.ReceiptItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ItemShareIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptItem?: boolean | Prisma.ReceiptItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ItemShareIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    receiptItem?: boolean | Prisma.ReceiptItemDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ItemSharePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ItemShare";
    objects: {
        receiptItem: Prisma.$ReceiptItemPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        receiptItemId: string;
        userId: string;
        amount: runtime.Decimal;
        createdAt: Date;
    }, ExtArgs["result"]["itemShare"]>;
    composites: {};
};
export type ItemShareGetPayload<S extends boolean | null | undefined | ItemShareDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ItemSharePayload, S>;
export type ItemShareCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ItemShareFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ItemShareCountAggregateInputType | true;
};
export interface ItemShareDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ItemShare'];
        meta: {
            name: 'ItemShare';
        };
    };
    findUnique<T extends ItemShareFindUniqueArgs>(args: Prisma.SelectSubset<T, ItemShareFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ItemShareFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ItemShareFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ItemShareFindFirstArgs>(args?: Prisma.SelectSubset<T, ItemShareFindFirstArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ItemShareFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ItemShareFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ItemShareFindManyArgs>(args?: Prisma.SelectSubset<T, ItemShareFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ItemShareCreateArgs>(args: Prisma.SelectSubset<T, ItemShareCreateArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ItemShareCreateManyArgs>(args?: Prisma.SelectSubset<T, ItemShareCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ItemShareCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ItemShareCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ItemShareDeleteArgs>(args: Prisma.SelectSubset<T, ItemShareDeleteArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ItemShareUpdateArgs>(args: Prisma.SelectSubset<T, ItemShareUpdateArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ItemShareDeleteManyArgs>(args?: Prisma.SelectSubset<T, ItemShareDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ItemShareUpdateManyArgs>(args: Prisma.SelectSubset<T, ItemShareUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ItemShareUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ItemShareUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ItemShareUpsertArgs>(args: Prisma.SelectSubset<T, ItemShareUpsertArgs<ExtArgs>>): Prisma.Prisma__ItemShareClient<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ItemShareCountArgs>(args?: Prisma.Subset<T, ItemShareCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ItemShareCountAggregateOutputType> : number>;
    aggregate<T extends ItemShareAggregateArgs>(args: Prisma.Subset<T, ItemShareAggregateArgs>): Prisma.PrismaPromise<GetItemShareAggregateType<T>>;
    groupBy<T extends ItemShareGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ItemShareGroupByArgs['orderBy'];
    } : {
        orderBy?: ItemShareGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ItemShareGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemShareGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ItemShareFieldRefs;
}
export interface Prisma__ItemShareClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    receiptItem<T extends Prisma.ReceiptItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReceiptItemDefaultArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ItemShareFieldRefs {
    readonly id: Prisma.FieldRef<"ItemShare", 'String'>;
    readonly receiptItemId: Prisma.FieldRef<"ItemShare", 'String'>;
    readonly userId: Prisma.FieldRef<"ItemShare", 'String'>;
    readonly amount: Prisma.FieldRef<"ItemShare", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"ItemShare", 'DateTime'>;
}
export type ItemShareFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where: Prisma.ItemShareWhereUniqueInput;
};
export type ItemShareFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where: Prisma.ItemShareWhereUniqueInput;
};
export type ItemShareFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where?: Prisma.ItemShareWhereInput;
    orderBy?: Prisma.ItemShareOrderByWithRelationInput | Prisma.ItemShareOrderByWithRelationInput[];
    cursor?: Prisma.ItemShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ItemShareScalarFieldEnum | Prisma.ItemShareScalarFieldEnum[];
};
export type ItemShareFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where?: Prisma.ItemShareWhereInput;
    orderBy?: Prisma.ItemShareOrderByWithRelationInput | Prisma.ItemShareOrderByWithRelationInput[];
    cursor?: Prisma.ItemShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ItemShareScalarFieldEnum | Prisma.ItemShareScalarFieldEnum[];
};
export type ItemShareFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where?: Prisma.ItemShareWhereInput;
    orderBy?: Prisma.ItemShareOrderByWithRelationInput | Prisma.ItemShareOrderByWithRelationInput[];
    cursor?: Prisma.ItemShareWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ItemShareScalarFieldEnum | Prisma.ItemShareScalarFieldEnum[];
};
export type ItemShareCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ItemShareCreateInput, Prisma.ItemShareUncheckedCreateInput>;
};
export type ItemShareCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ItemShareCreateManyInput | Prisma.ItemShareCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ItemShareCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    data: Prisma.ItemShareCreateManyInput | Prisma.ItemShareCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ItemShareIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ItemShareUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ItemShareUpdateInput, Prisma.ItemShareUncheckedUpdateInput>;
    where: Prisma.ItemShareWhereUniqueInput;
};
export type ItemShareUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ItemShareUpdateManyMutationInput, Prisma.ItemShareUncheckedUpdateManyInput>;
    where?: Prisma.ItemShareWhereInput;
    limit?: number;
};
export type ItemShareUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ItemShareUpdateManyMutationInput, Prisma.ItemShareUncheckedUpdateManyInput>;
    where?: Prisma.ItemShareWhereInput;
    limit?: number;
    include?: Prisma.ItemShareIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ItemShareUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where: Prisma.ItemShareWhereUniqueInput;
    create: Prisma.XOR<Prisma.ItemShareCreateInput, Prisma.ItemShareUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ItemShareUpdateInput, Prisma.ItemShareUncheckedUpdateInput>;
};
export type ItemShareDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
    where: Prisma.ItemShareWhereUniqueInput;
};
export type ItemShareDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ItemShareWhereInput;
    limit?: number;
};
export type ItemShareDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ItemShareSelect<ExtArgs> | null;
    omit?: Prisma.ItemShareOmit<ExtArgs> | null;
    include?: Prisma.ItemShareInclude<ExtArgs> | null;
};
