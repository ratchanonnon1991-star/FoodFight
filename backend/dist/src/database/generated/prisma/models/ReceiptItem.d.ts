import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReceiptItemModel = runtime.Types.Result.DefaultSelection<Prisma.$ReceiptItemPayload>;
export type AggregateReceiptItem = {
    _count: ReceiptItemCountAggregateOutputType | null;
    _avg: ReceiptItemAvgAggregateOutputType | null;
    _sum: ReceiptItemSumAggregateOutputType | null;
    _min: ReceiptItemMinAggregateOutputType | null;
    _max: ReceiptItemMaxAggregateOutputType | null;
};
export type ReceiptItemAvgAggregateOutputType = {
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalPrice: runtime.Decimal | null;
};
export type ReceiptItemSumAggregateOutputType = {
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalPrice: runtime.Decimal | null;
};
export type ReceiptItemMinAggregateOutputType = {
    id: string | null;
    billId: string | null;
    name: string | null;
    imageUrl: string | null;
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalPrice: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReceiptItemMaxAggregateOutputType = {
    id: string | null;
    billId: string | null;
    name: string | null;
    imageUrl: string | null;
    quantity: number | null;
    unitPrice: runtime.Decimal | null;
    totalPrice: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ReceiptItemCountAggregateOutputType = {
    id: number;
    billId: number;
    name: number;
    imageUrl: number;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ReceiptItemAvgAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
};
export type ReceiptItemSumAggregateInputType = {
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
};
export type ReceiptItemMinAggregateInputType = {
    id?: true;
    billId?: true;
    name?: true;
    imageUrl?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReceiptItemMaxAggregateInputType = {
    id?: true;
    billId?: true;
    name?: true;
    imageUrl?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ReceiptItemCountAggregateInputType = {
    id?: true;
    billId?: true;
    name?: true;
    imageUrl?: true;
    quantity?: true;
    unitPrice?: true;
    totalPrice?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReceiptItemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptItemWhereInput;
    orderBy?: Prisma.ReceiptItemOrderByWithRelationInput | Prisma.ReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReceiptItemCountAggregateInputType;
    _avg?: ReceiptItemAvgAggregateInputType;
    _sum?: ReceiptItemSumAggregateInputType;
    _min?: ReceiptItemMinAggregateInputType;
    _max?: ReceiptItemMaxAggregateInputType;
};
export type GetReceiptItemAggregateType<T extends ReceiptItemAggregateArgs> = {
    [P in keyof T & keyof AggregateReceiptItem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReceiptItem[P]> : Prisma.GetScalarType<T[P], AggregateReceiptItem[P]>;
};
export type ReceiptItemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptItemWhereInput;
    orderBy?: Prisma.ReceiptItemOrderByWithAggregationInput | Prisma.ReceiptItemOrderByWithAggregationInput[];
    by: Prisma.ReceiptItemScalarFieldEnum[] | Prisma.ReceiptItemScalarFieldEnum;
    having?: Prisma.ReceiptItemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReceiptItemCountAggregateInputType | true;
    _avg?: ReceiptItemAvgAggregateInputType;
    _sum?: ReceiptItemSumAggregateInputType;
    _min?: ReceiptItemMinAggregateInputType;
    _max?: ReceiptItemMaxAggregateInputType;
};
export type ReceiptItemGroupByOutputType = {
    id: string;
    billId: string;
    name: string;
    imageUrl: string | null;
    quantity: number;
    unitPrice: runtime.Decimal;
    totalPrice: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: ReceiptItemCountAggregateOutputType | null;
    _avg: ReceiptItemAvgAggregateOutputType | null;
    _sum: ReceiptItemSumAggregateOutputType | null;
    _min: ReceiptItemMinAggregateOutputType | null;
    _max: ReceiptItemMaxAggregateOutputType | null;
};
export type GetReceiptItemGroupByPayload<T extends ReceiptItemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReceiptItemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReceiptItemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReceiptItemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReceiptItemGroupByOutputType[P]>;
}>>;
export type ReceiptItemWhereInput = {
    AND?: Prisma.ReceiptItemWhereInput | Prisma.ReceiptItemWhereInput[];
    OR?: Prisma.ReceiptItemWhereInput[];
    NOT?: Prisma.ReceiptItemWhereInput | Prisma.ReceiptItemWhereInput[];
    id?: Prisma.StringFilter<"ReceiptItem"> | string;
    billId?: Prisma.StringFilter<"ReceiptItem"> | string;
    name?: Prisma.StringFilter<"ReceiptItem"> | string;
    imageUrl?: Prisma.StringNullableFilter<"ReceiptItem"> | string | null;
    quantity?: Prisma.IntFilter<"ReceiptItem"> | number;
    unitPrice?: Prisma.DecimalFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ReceiptItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReceiptItem"> | Date | string;
    bill?: Prisma.XOR<Prisma.BillScalarRelationFilter, Prisma.BillWhereInput>;
    shares?: Prisma.ItemShareListRelationFilter;
};
export type ReceiptItemOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bill?: Prisma.BillOrderByWithRelationInput;
    shares?: Prisma.ItemShareOrderByRelationAggregateInput;
};
export type ReceiptItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ReceiptItemWhereInput | Prisma.ReceiptItemWhereInput[];
    OR?: Prisma.ReceiptItemWhereInput[];
    NOT?: Prisma.ReceiptItemWhereInput | Prisma.ReceiptItemWhereInput[];
    billId?: Prisma.StringFilter<"ReceiptItem"> | string;
    name?: Prisma.StringFilter<"ReceiptItem"> | string;
    imageUrl?: Prisma.StringNullableFilter<"ReceiptItem"> | string | null;
    quantity?: Prisma.IntFilter<"ReceiptItem"> | number;
    unitPrice?: Prisma.DecimalFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ReceiptItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReceiptItem"> | Date | string;
    bill?: Prisma.XOR<Prisma.BillScalarRelationFilter, Prisma.BillWhereInput>;
    shares?: Prisma.ItemShareListRelationFilter;
}, "id">;
export type ReceiptItemOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReceiptItemCountOrderByAggregateInput;
    _avg?: Prisma.ReceiptItemAvgOrderByAggregateInput;
    _max?: Prisma.ReceiptItemMaxOrderByAggregateInput;
    _min?: Prisma.ReceiptItemMinOrderByAggregateInput;
    _sum?: Prisma.ReceiptItemSumOrderByAggregateInput;
};
export type ReceiptItemScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReceiptItemScalarWhereWithAggregatesInput | Prisma.ReceiptItemScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReceiptItemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReceiptItemScalarWhereWithAggregatesInput | Prisma.ReceiptItemScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ReceiptItem"> | string;
    billId?: Prisma.StringWithAggregatesFilter<"ReceiptItem"> | string;
    name?: Prisma.StringWithAggregatesFilter<"ReceiptItem"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"ReceiptItem"> | string | null;
    quantity?: Prisma.IntWithAggregatesFilter<"ReceiptItem"> | number;
    unitPrice?: Prisma.DecimalWithAggregatesFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalWithAggregatesFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ReceiptItem"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ReceiptItem"> | Date | string;
};
export type ReceiptItemCreateInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bill: Prisma.BillCreateNestedOneWithoutItemsInput;
    shares?: Prisma.ItemShareCreateNestedManyWithoutReceiptItemInput;
};
export type ReceiptItemUncheckedCreateInput = {
    id?: string;
    billId: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shares?: Prisma.ItemShareUncheckedCreateNestedManyWithoutReceiptItemInput;
};
export type ReceiptItemUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bill?: Prisma.BillUpdateOneRequiredWithoutItemsNestedInput;
    shares?: Prisma.ItemShareUpdateManyWithoutReceiptItemNestedInput;
};
export type ReceiptItemUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shares?: Prisma.ItemShareUncheckedUpdateManyWithoutReceiptItemNestedInput;
};
export type ReceiptItemCreateManyInput = {
    id?: string;
    billId: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptItemUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptItemUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptItemListRelationFilter = {
    every?: Prisma.ReceiptItemWhereInput;
    some?: Prisma.ReceiptItemWhereInput;
    none?: Prisma.ReceiptItemWhereInput;
};
export type ReceiptItemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReceiptItemCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReceiptItemAvgOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
};
export type ReceiptItemMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReceiptItemMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReceiptItemSumOrderByAggregateInput = {
    quantity?: Prisma.SortOrder;
    unitPrice?: Prisma.SortOrder;
    totalPrice?: Prisma.SortOrder;
};
export type ReceiptItemScalarRelationFilter = {
    is?: Prisma.ReceiptItemWhereInput;
    isNot?: Prisma.ReceiptItemWhereInput;
};
export type ReceiptItemCreateNestedManyWithoutBillInput = {
    create?: Prisma.XOR<Prisma.ReceiptItemCreateWithoutBillInput, Prisma.ReceiptItemUncheckedCreateWithoutBillInput> | Prisma.ReceiptItemCreateWithoutBillInput[] | Prisma.ReceiptItemUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.ReceiptItemCreateOrConnectWithoutBillInput | Prisma.ReceiptItemCreateOrConnectWithoutBillInput[];
    createMany?: Prisma.ReceiptItemCreateManyBillInputEnvelope;
    connect?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
};
export type ReceiptItemUncheckedCreateNestedManyWithoutBillInput = {
    create?: Prisma.XOR<Prisma.ReceiptItemCreateWithoutBillInput, Prisma.ReceiptItemUncheckedCreateWithoutBillInput> | Prisma.ReceiptItemCreateWithoutBillInput[] | Prisma.ReceiptItemUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.ReceiptItemCreateOrConnectWithoutBillInput | Prisma.ReceiptItemCreateOrConnectWithoutBillInput[];
    createMany?: Prisma.ReceiptItemCreateManyBillInputEnvelope;
    connect?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
};
export type ReceiptItemUpdateManyWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.ReceiptItemCreateWithoutBillInput, Prisma.ReceiptItemUncheckedCreateWithoutBillInput> | Prisma.ReceiptItemCreateWithoutBillInput[] | Prisma.ReceiptItemUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.ReceiptItemCreateOrConnectWithoutBillInput | Prisma.ReceiptItemCreateOrConnectWithoutBillInput[];
    upsert?: Prisma.ReceiptItemUpsertWithWhereUniqueWithoutBillInput | Prisma.ReceiptItemUpsertWithWhereUniqueWithoutBillInput[];
    createMany?: Prisma.ReceiptItemCreateManyBillInputEnvelope;
    set?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    delete?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    connect?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    update?: Prisma.ReceiptItemUpdateWithWhereUniqueWithoutBillInput | Prisma.ReceiptItemUpdateWithWhereUniqueWithoutBillInput[];
    updateMany?: Prisma.ReceiptItemUpdateManyWithWhereWithoutBillInput | Prisma.ReceiptItemUpdateManyWithWhereWithoutBillInput[];
    deleteMany?: Prisma.ReceiptItemScalarWhereInput | Prisma.ReceiptItemScalarWhereInput[];
};
export type ReceiptItemUncheckedUpdateManyWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.ReceiptItemCreateWithoutBillInput, Prisma.ReceiptItemUncheckedCreateWithoutBillInput> | Prisma.ReceiptItemCreateWithoutBillInput[] | Prisma.ReceiptItemUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.ReceiptItemCreateOrConnectWithoutBillInput | Prisma.ReceiptItemCreateOrConnectWithoutBillInput[];
    upsert?: Prisma.ReceiptItemUpsertWithWhereUniqueWithoutBillInput | Prisma.ReceiptItemUpsertWithWhereUniqueWithoutBillInput[];
    createMany?: Prisma.ReceiptItemCreateManyBillInputEnvelope;
    set?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    disconnect?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    delete?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    connect?: Prisma.ReceiptItemWhereUniqueInput | Prisma.ReceiptItemWhereUniqueInput[];
    update?: Prisma.ReceiptItemUpdateWithWhereUniqueWithoutBillInput | Prisma.ReceiptItemUpdateWithWhereUniqueWithoutBillInput[];
    updateMany?: Prisma.ReceiptItemUpdateManyWithWhereWithoutBillInput | Prisma.ReceiptItemUpdateManyWithWhereWithoutBillInput[];
    deleteMany?: Prisma.ReceiptItemScalarWhereInput | Prisma.ReceiptItemScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ReceiptItemCreateNestedOneWithoutSharesInput = {
    create?: Prisma.XOR<Prisma.ReceiptItemCreateWithoutSharesInput, Prisma.ReceiptItemUncheckedCreateWithoutSharesInput>;
    connectOrCreate?: Prisma.ReceiptItemCreateOrConnectWithoutSharesInput;
    connect?: Prisma.ReceiptItemWhereUniqueInput;
};
export type ReceiptItemUpdateOneRequiredWithoutSharesNestedInput = {
    create?: Prisma.XOR<Prisma.ReceiptItemCreateWithoutSharesInput, Prisma.ReceiptItemUncheckedCreateWithoutSharesInput>;
    connectOrCreate?: Prisma.ReceiptItemCreateOrConnectWithoutSharesInput;
    upsert?: Prisma.ReceiptItemUpsertWithoutSharesInput;
    connect?: Prisma.ReceiptItemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReceiptItemUpdateToOneWithWhereWithoutSharesInput, Prisma.ReceiptItemUpdateWithoutSharesInput>, Prisma.ReceiptItemUncheckedUpdateWithoutSharesInput>;
};
export type ReceiptItemCreateWithoutBillInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shares?: Prisma.ItemShareCreateNestedManyWithoutReceiptItemInput;
};
export type ReceiptItemUncheckedCreateWithoutBillInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    shares?: Prisma.ItemShareUncheckedCreateNestedManyWithoutReceiptItemInput;
};
export type ReceiptItemCreateOrConnectWithoutBillInput = {
    where: Prisma.ReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReceiptItemCreateWithoutBillInput, Prisma.ReceiptItemUncheckedCreateWithoutBillInput>;
};
export type ReceiptItemCreateManyBillInputEnvelope = {
    data: Prisma.ReceiptItemCreateManyBillInput | Prisma.ReceiptItemCreateManyBillInput[];
    skipDuplicates?: boolean;
};
export type ReceiptItemUpsertWithWhereUniqueWithoutBillInput = {
    where: Prisma.ReceiptItemWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReceiptItemUpdateWithoutBillInput, Prisma.ReceiptItemUncheckedUpdateWithoutBillInput>;
    create: Prisma.XOR<Prisma.ReceiptItemCreateWithoutBillInput, Prisma.ReceiptItemUncheckedCreateWithoutBillInput>;
};
export type ReceiptItemUpdateWithWhereUniqueWithoutBillInput = {
    where: Prisma.ReceiptItemWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReceiptItemUpdateWithoutBillInput, Prisma.ReceiptItemUncheckedUpdateWithoutBillInput>;
};
export type ReceiptItemUpdateManyWithWhereWithoutBillInput = {
    where: Prisma.ReceiptItemScalarWhereInput;
    data: Prisma.XOR<Prisma.ReceiptItemUpdateManyMutationInput, Prisma.ReceiptItemUncheckedUpdateManyWithoutBillInput>;
};
export type ReceiptItemScalarWhereInput = {
    AND?: Prisma.ReceiptItemScalarWhereInput | Prisma.ReceiptItemScalarWhereInput[];
    OR?: Prisma.ReceiptItemScalarWhereInput[];
    NOT?: Prisma.ReceiptItemScalarWhereInput | Prisma.ReceiptItemScalarWhereInput[];
    id?: Prisma.StringFilter<"ReceiptItem"> | string;
    billId?: Prisma.StringFilter<"ReceiptItem"> | string;
    name?: Prisma.StringFilter<"ReceiptItem"> | string;
    imageUrl?: Prisma.StringNullableFilter<"ReceiptItem"> | string | null;
    quantity?: Prisma.IntFilter<"ReceiptItem"> | number;
    unitPrice?: Prisma.DecimalFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFilter<"ReceiptItem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"ReceiptItem"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ReceiptItem"> | Date | string;
};
export type ReceiptItemCreateWithoutSharesInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bill: Prisma.BillCreateNestedOneWithoutItemsInput;
};
export type ReceiptItemUncheckedCreateWithoutSharesInput = {
    id?: string;
    billId: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptItemCreateOrConnectWithoutSharesInput = {
    where: Prisma.ReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReceiptItemCreateWithoutSharesInput, Prisma.ReceiptItemUncheckedCreateWithoutSharesInput>;
};
export type ReceiptItemUpsertWithoutSharesInput = {
    update: Prisma.XOR<Prisma.ReceiptItemUpdateWithoutSharesInput, Prisma.ReceiptItemUncheckedUpdateWithoutSharesInput>;
    create: Prisma.XOR<Prisma.ReceiptItemCreateWithoutSharesInput, Prisma.ReceiptItemUncheckedCreateWithoutSharesInput>;
    where?: Prisma.ReceiptItemWhereInput;
};
export type ReceiptItemUpdateToOneWithWhereWithoutSharesInput = {
    where?: Prisma.ReceiptItemWhereInput;
    data: Prisma.XOR<Prisma.ReceiptItemUpdateWithoutSharesInput, Prisma.ReceiptItemUncheckedUpdateWithoutSharesInput>;
};
export type ReceiptItemUpdateWithoutSharesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bill?: Prisma.BillUpdateOneRequiredWithoutItemsNestedInput;
};
export type ReceiptItemUncheckedUpdateWithoutSharesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptItemCreateManyBillInput = {
    id?: string;
    name: string;
    imageUrl?: string | null;
    quantity?: number;
    unitPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptItemUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shares?: Prisma.ItemShareUpdateManyWithoutReceiptItemNestedInput;
};
export type ReceiptItemUncheckedUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    shares?: Prisma.ItemShareUncheckedUpdateManyWithoutReceiptItemNestedInput;
};
export type ReceiptItemUncheckedUpdateManyWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    quantity?: Prisma.IntFieldUpdateOperationsInput | number;
    unitPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    totalPrice?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptItemCountOutputType = {
    shares: number;
};
export type ReceiptItemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    shares?: boolean | ReceiptItemCountOutputTypeCountSharesArgs;
};
export type ReceiptItemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemCountOutputTypeSelect<ExtArgs> | null;
};
export type ReceiptItemCountOutputTypeCountSharesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ItemShareWhereInput;
};
export type ReceiptItemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalPrice?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    shares?: boolean | Prisma.ReceiptItem$sharesArgs<ExtArgs>;
    _count?: boolean | Prisma.ReceiptItemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["receiptItem"]>;
export type ReceiptItemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalPrice?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["receiptItem"]>;
export type ReceiptItemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalPrice?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["receiptItem"]>;
export type ReceiptItemSelectScalar = {
    id?: boolean;
    billId?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    quantity?: boolean;
    unitPrice?: boolean;
    totalPrice?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ReceiptItemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "billId" | "name" | "imageUrl" | "quantity" | "unitPrice" | "totalPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["receiptItem"]>;
export type ReceiptItemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    shares?: boolean | Prisma.ReceiptItem$sharesArgs<ExtArgs>;
    _count?: boolean | Prisma.ReceiptItemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ReceiptItemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
};
export type ReceiptItemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
};
export type $ReceiptItemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ReceiptItem";
    objects: {
        bill: Prisma.$BillPayload<ExtArgs>;
        shares: Prisma.$ItemSharePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        billId: string;
        name: string;
        imageUrl: string | null;
        quantity: number;
        unitPrice: runtime.Decimal;
        totalPrice: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["receiptItem"]>;
    composites: {};
};
export type ReceiptItemGetPayload<S extends boolean | null | undefined | ReceiptItemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload, S>;
export type ReceiptItemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReceiptItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReceiptItemCountAggregateInputType | true;
};
export interface ReceiptItemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ReceiptItem'];
        meta: {
            name: 'ReceiptItem';
        };
    };
    findUnique<T extends ReceiptItemFindUniqueArgs>(args: Prisma.SelectSubset<T, ReceiptItemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReceiptItemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReceiptItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReceiptItemFindFirstArgs>(args?: Prisma.SelectSubset<T, ReceiptItemFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReceiptItemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReceiptItemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReceiptItemFindManyArgs>(args?: Prisma.SelectSubset<T, ReceiptItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReceiptItemCreateArgs>(args: Prisma.SelectSubset<T, ReceiptItemCreateArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReceiptItemCreateManyArgs>(args?: Prisma.SelectSubset<T, ReceiptItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReceiptItemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReceiptItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReceiptItemDeleteArgs>(args: Prisma.SelectSubset<T, ReceiptItemDeleteArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReceiptItemUpdateArgs>(args: Prisma.SelectSubset<T, ReceiptItemUpdateArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReceiptItemDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReceiptItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReceiptItemUpdateManyArgs>(args: Prisma.SelectSubset<T, ReceiptItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReceiptItemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReceiptItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReceiptItemUpsertArgs>(args: Prisma.SelectSubset<T, ReceiptItemUpsertArgs<ExtArgs>>): Prisma.Prisma__ReceiptItemClient<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReceiptItemCountArgs>(args?: Prisma.Subset<T, ReceiptItemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReceiptItemCountAggregateOutputType> : number>;
    aggregate<T extends ReceiptItemAggregateArgs>(args: Prisma.Subset<T, ReceiptItemAggregateArgs>): Prisma.PrismaPromise<GetReceiptItemAggregateType<T>>;
    groupBy<T extends ReceiptItemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReceiptItemGroupByArgs['orderBy'];
    } : {
        orderBy?: ReceiptItemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReceiptItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReceiptItemFieldRefs;
}
export interface Prisma__ReceiptItemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bill<T extends Prisma.BillDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BillDefaultArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    shares<T extends Prisma.ReceiptItem$sharesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ReceiptItem$sharesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ItemSharePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReceiptItemFieldRefs {
    readonly id: Prisma.FieldRef<"ReceiptItem", 'String'>;
    readonly billId: Prisma.FieldRef<"ReceiptItem", 'String'>;
    readonly name: Prisma.FieldRef<"ReceiptItem", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"ReceiptItem", 'String'>;
    readonly quantity: Prisma.FieldRef<"ReceiptItem", 'Int'>;
    readonly unitPrice: Prisma.FieldRef<"ReceiptItem", 'Decimal'>;
    readonly totalPrice: Prisma.FieldRef<"ReceiptItem", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"ReceiptItem", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ReceiptItem", 'DateTime'>;
}
export type ReceiptItemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where: Prisma.ReceiptItemWhereUniqueInput;
};
export type ReceiptItemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where: Prisma.ReceiptItemWhereUniqueInput;
};
export type ReceiptItemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.ReceiptItemWhereInput;
    orderBy?: Prisma.ReceiptItemOrderByWithRelationInput | Prisma.ReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReceiptItemScalarFieldEnum | Prisma.ReceiptItemScalarFieldEnum[];
};
export type ReceiptItemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.ReceiptItemWhereInput;
    orderBy?: Prisma.ReceiptItemOrderByWithRelationInput | Prisma.ReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReceiptItemScalarFieldEnum | Prisma.ReceiptItemScalarFieldEnum[];
};
export type ReceiptItemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where?: Prisma.ReceiptItemWhereInput;
    orderBy?: Prisma.ReceiptItemOrderByWithRelationInput | Prisma.ReceiptItemOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReceiptItemScalarFieldEnum | Prisma.ReceiptItemScalarFieldEnum[];
};
export type ReceiptItemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReceiptItemCreateInput, Prisma.ReceiptItemUncheckedCreateInput>;
};
export type ReceiptItemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReceiptItemCreateManyInput | Prisma.ReceiptItemCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReceiptItemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    data: Prisma.ReceiptItemCreateManyInput | Prisma.ReceiptItemCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReceiptItemIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReceiptItemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReceiptItemUpdateInput, Prisma.ReceiptItemUncheckedUpdateInput>;
    where: Prisma.ReceiptItemWhereUniqueInput;
};
export type ReceiptItemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReceiptItemUpdateManyMutationInput, Prisma.ReceiptItemUncheckedUpdateManyInput>;
    where?: Prisma.ReceiptItemWhereInput;
    limit?: number;
};
export type ReceiptItemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReceiptItemUpdateManyMutationInput, Prisma.ReceiptItemUncheckedUpdateManyInput>;
    where?: Prisma.ReceiptItemWhereInput;
    limit?: number;
    include?: Prisma.ReceiptItemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReceiptItemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where: Prisma.ReceiptItemWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReceiptItemCreateInput, Prisma.ReceiptItemUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReceiptItemUpdateInput, Prisma.ReceiptItemUncheckedUpdateInput>;
};
export type ReceiptItemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
    where: Prisma.ReceiptItemWhereUniqueInput;
};
export type ReceiptItemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptItemWhereInput;
    limit?: number;
};
export type ReceiptItem$sharesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReceiptItemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptItemSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptItemOmit<ExtArgs> | null;
    include?: Prisma.ReceiptItemInclude<ExtArgs> | null;
};
