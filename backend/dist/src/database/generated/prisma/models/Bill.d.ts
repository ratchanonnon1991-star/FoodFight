import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type BillModel = runtime.Types.Result.DefaultSelection<Prisma.$BillPayload>;
export type AggregateBill = {
    _count: BillCountAggregateOutputType | null;
    _avg: BillAvgAggregateOutputType | null;
    _sum: BillSumAggregateOutputType | null;
    _min: BillMinAggregateOutputType | null;
    _max: BillMaxAggregateOutputType | null;
};
export type BillAvgAggregateOutputType = {
    subtotal: runtime.Decimal | null;
    serviceCharge: runtime.Decimal | null;
    tax: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
};
export type BillSumAggregateOutputType = {
    subtotal: runtime.Decimal | null;
    serviceCharge: runtime.Decimal | null;
    tax: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
};
export type BillMinAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    createdById: string | null;
    status: $Enums.BillStatus | null;
    subtotal: runtime.Decimal | null;
    serviceCharge: runtime.Decimal | null;
    tax: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BillMaxAggregateOutputType = {
    id: string | null;
    sessionId: string | null;
    createdById: string | null;
    status: $Enums.BillStatus | null;
    subtotal: runtime.Decimal | null;
    serviceCharge: runtime.Decimal | null;
    tax: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    closedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type BillCountAggregateOutputType = {
    id: number;
    sessionId: number;
    createdById: number;
    status: number;
    subtotal: number;
    serviceCharge: number;
    tax: number;
    discount: number;
    totalAmount: number;
    closedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type BillAvgAggregateInputType = {
    subtotal?: true;
    serviceCharge?: true;
    tax?: true;
    discount?: true;
    totalAmount?: true;
};
export type BillSumAggregateInputType = {
    subtotal?: true;
    serviceCharge?: true;
    tax?: true;
    discount?: true;
    totalAmount?: true;
};
export type BillMinAggregateInputType = {
    id?: true;
    sessionId?: true;
    createdById?: true;
    status?: true;
    subtotal?: true;
    serviceCharge?: true;
    tax?: true;
    discount?: true;
    totalAmount?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BillMaxAggregateInputType = {
    id?: true;
    sessionId?: true;
    createdById?: true;
    status?: true;
    subtotal?: true;
    serviceCharge?: true;
    tax?: true;
    discount?: true;
    totalAmount?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type BillCountAggregateInputType = {
    id?: true;
    sessionId?: true;
    createdById?: true;
    status?: true;
    subtotal?: true;
    serviceCharge?: true;
    tax?: true;
    discount?: true;
    totalAmount?: true;
    closedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type BillAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillWhereInput;
    orderBy?: Prisma.BillOrderByWithRelationInput | Prisma.BillOrderByWithRelationInput[];
    cursor?: Prisma.BillWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | BillCountAggregateInputType;
    _avg?: BillAvgAggregateInputType;
    _sum?: BillSumAggregateInputType;
    _min?: BillMinAggregateInputType;
    _max?: BillMaxAggregateInputType;
};
export type GetBillAggregateType<T extends BillAggregateArgs> = {
    [P in keyof T & keyof AggregateBill]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBill[P]> : Prisma.GetScalarType<T[P], AggregateBill[P]>;
};
export type BillGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillWhereInput;
    orderBy?: Prisma.BillOrderByWithAggregationInput | Prisma.BillOrderByWithAggregationInput[];
    by: Prisma.BillScalarFieldEnum[] | Prisma.BillScalarFieldEnum;
    having?: Prisma.BillScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BillCountAggregateInputType | true;
    _avg?: BillAvgAggregateInputType;
    _sum?: BillSumAggregateInputType;
    _min?: BillMinAggregateInputType;
    _max?: BillMaxAggregateInputType;
};
export type BillGroupByOutputType = {
    id: string;
    sessionId: string;
    createdById: string;
    status: $Enums.BillStatus;
    subtotal: runtime.Decimal | null;
    serviceCharge: runtime.Decimal | null;
    tax: runtime.Decimal | null;
    discount: runtime.Decimal | null;
    totalAmount: runtime.Decimal | null;
    closedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: BillCountAggregateOutputType | null;
    _avg: BillAvgAggregateOutputType | null;
    _sum: BillSumAggregateOutputType | null;
    _min: BillMinAggregateOutputType | null;
    _max: BillMaxAggregateOutputType | null;
};
export type GetBillGroupByPayload<T extends BillGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BillGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BillGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BillGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BillGroupByOutputType[P]>;
}>>;
export type BillWhereInput = {
    AND?: Prisma.BillWhereInput | Prisma.BillWhereInput[];
    OR?: Prisma.BillWhereInput[];
    NOT?: Prisma.BillWhereInput | Prisma.BillWhereInput[];
    id?: Prisma.StringFilter<"Bill"> | string;
    sessionId?: Prisma.StringFilter<"Bill"> | string;
    createdById?: Prisma.StringFilter<"Bill"> | string;
    status?: Prisma.EnumBillStatusFilter<"Bill"> | $Enums.BillStatus;
    subtotal?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"Bill"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Bill"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bill"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    receipt?: Prisma.XOR<Prisma.ReceiptNullableScalarRelationFilter, Prisma.ReceiptWhereInput> | null;
    items?: Prisma.ReceiptItemListRelationFilter;
    payments?: Prisma.UserPaymentListRelationFilter;
};
export type BillOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrderInput | Prisma.SortOrder;
    tax?: Prisma.SortOrderInput | Prisma.SortOrder;
    discount?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    session?: Prisma.FoodFightSessionOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    receipt?: Prisma.ReceiptOrderByWithRelationInput;
    items?: Prisma.ReceiptItemOrderByRelationAggregateInput;
    payments?: Prisma.UserPaymentOrderByRelationAggregateInput;
};
export type BillWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    sessionId?: string;
    AND?: Prisma.BillWhereInput | Prisma.BillWhereInput[];
    OR?: Prisma.BillWhereInput[];
    NOT?: Prisma.BillWhereInput | Prisma.BillWhereInput[];
    createdById?: Prisma.StringFilter<"Bill"> | string;
    status?: Prisma.EnumBillStatusFilter<"Bill"> | $Enums.BillStatus;
    subtotal?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"Bill"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Bill"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bill"> | Date | string;
    session?: Prisma.XOR<Prisma.FoodFightSessionScalarRelationFilter, Prisma.FoodFightSessionWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    receipt?: Prisma.XOR<Prisma.ReceiptNullableScalarRelationFilter, Prisma.ReceiptWhereInput> | null;
    items?: Prisma.ReceiptItemListRelationFilter;
    payments?: Prisma.UserPaymentListRelationFilter;
}, "id" | "sessionId">;
export type BillOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrderInput | Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrderInput | Prisma.SortOrder;
    tax?: Prisma.SortOrderInput | Prisma.SortOrder;
    discount?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalAmount?: Prisma.SortOrderInput | Prisma.SortOrder;
    closedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.BillCountOrderByAggregateInput;
    _avg?: Prisma.BillAvgOrderByAggregateInput;
    _max?: Prisma.BillMaxOrderByAggregateInput;
    _min?: Prisma.BillMinOrderByAggregateInput;
    _sum?: Prisma.BillSumOrderByAggregateInput;
};
export type BillScalarWhereWithAggregatesInput = {
    AND?: Prisma.BillScalarWhereWithAggregatesInput | Prisma.BillScalarWhereWithAggregatesInput[];
    OR?: Prisma.BillScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BillScalarWhereWithAggregatesInput | Prisma.BillScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Bill"> | string;
    sessionId?: Prisma.StringWithAggregatesFilter<"Bill"> | string;
    createdById?: Prisma.StringWithAggregatesFilter<"Bill"> | string;
    status?: Prisma.EnumBillStatusWithAggregatesFilter<"Bill"> | $Enums.BillStatus;
    subtotal?: Prisma.DecimalNullableWithAggregatesFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.DecimalNullableWithAggregatesFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.DecimalNullableWithAggregatesFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.DecimalNullableWithAggregatesFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableWithAggregatesFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Bill"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Bill"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Bill"> | Date | string;
};
export type BillCreateInput = {
    id?: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutBillInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedBillsInput;
    receipt?: Prisma.ReceiptCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentCreateNestedManyWithoutBillInput;
};
export type BillUncheckedCreateInput = {
    id?: string;
    sessionId: string;
    createdById: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipt?: Prisma.ReceiptUncheckedCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemUncheckedCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentUncheckedCreateNestedManyWithoutBillInput;
};
export type BillUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutBillNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedBillsNestedInput;
    receipt?: Prisma.ReceiptUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.ReceiptUncheckedUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUncheckedUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUncheckedUpdateManyWithoutBillNestedInput;
};
export type BillCreateManyInput = {
    id?: string;
    sessionId: string;
    createdById: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillListRelationFilter = {
    every?: Prisma.BillWhereInput;
    some?: Prisma.BillWhereInput;
    none?: Prisma.BillWhereInput;
};
export type BillOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type BillNullableScalarRelationFilter = {
    is?: Prisma.BillWhereInput | null;
    isNot?: Prisma.BillWhereInput | null;
};
export type BillCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrder;
    tax?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillAvgOrderByAggregateInput = {
    subtotal?: Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrder;
    tax?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
};
export type BillMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrder;
    tax?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    sessionId?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    subtotal?: Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrder;
    tax?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
    closedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type BillSumOrderByAggregateInput = {
    subtotal?: Prisma.SortOrder;
    serviceCharge?: Prisma.SortOrder;
    tax?: Prisma.SortOrder;
    discount?: Prisma.SortOrder;
    totalAmount?: Prisma.SortOrder;
};
export type BillScalarRelationFilter = {
    is?: Prisma.BillWhereInput;
    isNot?: Prisma.BillWhereInput;
};
export type BillCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutCreatedByInput, Prisma.BillUncheckedCreateWithoutCreatedByInput> | Prisma.BillCreateWithoutCreatedByInput[] | Prisma.BillUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutCreatedByInput | Prisma.BillCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.BillCreateManyCreatedByInputEnvelope;
    connect?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
};
export type BillUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutCreatedByInput, Prisma.BillUncheckedCreateWithoutCreatedByInput> | Prisma.BillCreateWithoutCreatedByInput[] | Prisma.BillUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutCreatedByInput | Prisma.BillCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.BillCreateManyCreatedByInputEnvelope;
    connect?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
};
export type BillUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutCreatedByInput, Prisma.BillUncheckedCreateWithoutCreatedByInput> | Prisma.BillCreateWithoutCreatedByInput[] | Prisma.BillUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutCreatedByInput | Prisma.BillCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.BillUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.BillUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.BillCreateManyCreatedByInputEnvelope;
    set?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    disconnect?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    delete?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    connect?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    update?: Prisma.BillUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.BillUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.BillUpdateManyWithWhereWithoutCreatedByInput | Prisma.BillUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.BillScalarWhereInput | Prisma.BillScalarWhereInput[];
};
export type BillUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutCreatedByInput, Prisma.BillUncheckedCreateWithoutCreatedByInput> | Prisma.BillCreateWithoutCreatedByInput[] | Prisma.BillUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutCreatedByInput | Prisma.BillCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.BillUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.BillUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.BillCreateManyCreatedByInputEnvelope;
    set?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    disconnect?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    delete?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    connect?: Prisma.BillWhereUniqueInput | Prisma.BillWhereUniqueInput[];
    update?: Prisma.BillUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.BillUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.BillUpdateManyWithWhereWithoutCreatedByInput | Prisma.BillUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.BillScalarWhereInput | Prisma.BillScalarWhereInput[];
};
export type BillCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutSessionInput, Prisma.BillUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutSessionInput;
    connect?: Prisma.BillWhereUniqueInput;
};
export type BillUncheckedCreateNestedOneWithoutSessionInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutSessionInput, Prisma.BillUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutSessionInput;
    connect?: Prisma.BillWhereUniqueInput;
};
export type BillUpdateOneWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutSessionInput, Prisma.BillUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.BillUpsertWithoutSessionInput;
    disconnect?: Prisma.BillWhereInput | boolean;
    delete?: Prisma.BillWhereInput | boolean;
    connect?: Prisma.BillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillUpdateToOneWithWhereWithoutSessionInput, Prisma.BillUpdateWithoutSessionInput>, Prisma.BillUncheckedUpdateWithoutSessionInput>;
};
export type BillUncheckedUpdateOneWithoutSessionNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutSessionInput, Prisma.BillUncheckedCreateWithoutSessionInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutSessionInput;
    upsert?: Prisma.BillUpsertWithoutSessionInput;
    disconnect?: Prisma.BillWhereInput | boolean;
    delete?: Prisma.BillWhereInput | boolean;
    connect?: Prisma.BillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillUpdateToOneWithWhereWithoutSessionInput, Prisma.BillUpdateWithoutSessionInput>, Prisma.BillUncheckedUpdateWithoutSessionInput>;
};
export type EnumBillStatusFieldUpdateOperationsInput = {
    set?: $Enums.BillStatus;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type BillCreateNestedOneWithoutReceiptInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutReceiptInput, Prisma.BillUncheckedCreateWithoutReceiptInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutReceiptInput;
    connect?: Prisma.BillWhereUniqueInput;
};
export type BillUpdateOneRequiredWithoutReceiptNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutReceiptInput, Prisma.BillUncheckedCreateWithoutReceiptInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutReceiptInput;
    upsert?: Prisma.BillUpsertWithoutReceiptInput;
    connect?: Prisma.BillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillUpdateToOneWithWhereWithoutReceiptInput, Prisma.BillUpdateWithoutReceiptInput>, Prisma.BillUncheckedUpdateWithoutReceiptInput>;
};
export type BillCreateNestedOneWithoutItemsInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutItemsInput, Prisma.BillUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutItemsInput;
    connect?: Prisma.BillWhereUniqueInput;
};
export type BillUpdateOneRequiredWithoutItemsNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutItemsInput, Prisma.BillUncheckedCreateWithoutItemsInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutItemsInput;
    upsert?: Prisma.BillUpsertWithoutItemsInput;
    connect?: Prisma.BillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillUpdateToOneWithWhereWithoutItemsInput, Prisma.BillUpdateWithoutItemsInput>, Prisma.BillUncheckedUpdateWithoutItemsInput>;
};
export type BillCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutPaymentsInput, Prisma.BillUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.BillWhereUniqueInput;
};
export type BillUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.BillCreateWithoutPaymentsInput, Prisma.BillUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.BillCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.BillUpsertWithoutPaymentsInput;
    connect?: Prisma.BillWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BillUpdateToOneWithWhereWithoutPaymentsInput, Prisma.BillUpdateWithoutPaymentsInput>, Prisma.BillUncheckedUpdateWithoutPaymentsInput>;
};
export type BillCreateWithoutCreatedByInput = {
    id?: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutBillInput;
    receipt?: Prisma.ReceiptCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentCreateNestedManyWithoutBillInput;
};
export type BillUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    sessionId: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipt?: Prisma.ReceiptUncheckedCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemUncheckedCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentUncheckedCreateNestedManyWithoutBillInput;
};
export type BillCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.BillWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillCreateWithoutCreatedByInput, Prisma.BillUncheckedCreateWithoutCreatedByInput>;
};
export type BillCreateManyCreatedByInputEnvelope = {
    data: Prisma.BillCreateManyCreatedByInput | Prisma.BillCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type BillUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.BillWhereUniqueInput;
    update: Prisma.XOR<Prisma.BillUpdateWithoutCreatedByInput, Prisma.BillUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.BillCreateWithoutCreatedByInput, Prisma.BillUncheckedCreateWithoutCreatedByInput>;
};
export type BillUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.BillWhereUniqueInput;
    data: Prisma.XOR<Prisma.BillUpdateWithoutCreatedByInput, Prisma.BillUncheckedUpdateWithoutCreatedByInput>;
};
export type BillUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.BillScalarWhereInput;
    data: Prisma.XOR<Prisma.BillUpdateManyMutationInput, Prisma.BillUncheckedUpdateManyWithoutCreatedByInput>;
};
export type BillScalarWhereInput = {
    AND?: Prisma.BillScalarWhereInput | Prisma.BillScalarWhereInput[];
    OR?: Prisma.BillScalarWhereInput[];
    NOT?: Prisma.BillScalarWhereInput | Prisma.BillScalarWhereInput[];
    id?: Prisma.StringFilter<"Bill"> | string;
    sessionId?: Prisma.StringFilter<"Bill"> | string;
    createdById?: Prisma.StringFilter<"Bill"> | string;
    status?: Prisma.EnumBillStatusFilter<"Bill"> | $Enums.BillStatus;
    subtotal?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.DecimalNullableFilter<"Bill"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.DateTimeNullableFilter<"Bill"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Bill"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Bill"> | Date | string;
};
export type BillCreateWithoutSessionInput = {
    id?: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedBillsInput;
    receipt?: Prisma.ReceiptCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentCreateNestedManyWithoutBillInput;
};
export type BillUncheckedCreateWithoutSessionInput = {
    id?: string;
    createdById: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipt?: Prisma.ReceiptUncheckedCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemUncheckedCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentUncheckedCreateNestedManyWithoutBillInput;
};
export type BillCreateOrConnectWithoutSessionInput = {
    where: Prisma.BillWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillCreateWithoutSessionInput, Prisma.BillUncheckedCreateWithoutSessionInput>;
};
export type BillUpsertWithoutSessionInput = {
    update: Prisma.XOR<Prisma.BillUpdateWithoutSessionInput, Prisma.BillUncheckedUpdateWithoutSessionInput>;
    create: Prisma.XOR<Prisma.BillCreateWithoutSessionInput, Prisma.BillUncheckedCreateWithoutSessionInput>;
    where?: Prisma.BillWhereInput;
};
export type BillUpdateToOneWithWhereWithoutSessionInput = {
    where?: Prisma.BillWhereInput;
    data: Prisma.XOR<Prisma.BillUpdateWithoutSessionInput, Prisma.BillUncheckedUpdateWithoutSessionInput>;
};
export type BillUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedBillsNestedInput;
    receipt?: Prisma.ReceiptUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateWithoutSessionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.ReceiptUncheckedUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUncheckedUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUncheckedUpdateManyWithoutBillNestedInput;
};
export type BillCreateWithoutReceiptInput = {
    id?: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutBillInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedBillsInput;
    items?: Prisma.ReceiptItemCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentCreateNestedManyWithoutBillInput;
};
export type BillUncheckedCreateWithoutReceiptInput = {
    id?: string;
    sessionId: string;
    createdById: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    items?: Prisma.ReceiptItemUncheckedCreateNestedManyWithoutBillInput;
    payments?: Prisma.UserPaymentUncheckedCreateNestedManyWithoutBillInput;
};
export type BillCreateOrConnectWithoutReceiptInput = {
    where: Prisma.BillWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillCreateWithoutReceiptInput, Prisma.BillUncheckedCreateWithoutReceiptInput>;
};
export type BillUpsertWithoutReceiptInput = {
    update: Prisma.XOR<Prisma.BillUpdateWithoutReceiptInput, Prisma.BillUncheckedUpdateWithoutReceiptInput>;
    create: Prisma.XOR<Prisma.BillCreateWithoutReceiptInput, Prisma.BillUncheckedCreateWithoutReceiptInput>;
    where?: Prisma.BillWhereInput;
};
export type BillUpdateToOneWithWhereWithoutReceiptInput = {
    where?: Prisma.BillWhereInput;
    data: Prisma.XOR<Prisma.BillUpdateWithoutReceiptInput, Prisma.BillUncheckedUpdateWithoutReceiptInput>;
};
export type BillUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutBillNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedBillsNestedInput;
    items?: Prisma.ReceiptItemUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateWithoutReceiptInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    items?: Prisma.ReceiptItemUncheckedUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUncheckedUpdateManyWithoutBillNestedInput;
};
export type BillCreateWithoutItemsInput = {
    id?: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutBillInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedBillsInput;
    receipt?: Prisma.ReceiptCreateNestedOneWithoutBillInput;
    payments?: Prisma.UserPaymentCreateNestedManyWithoutBillInput;
};
export type BillUncheckedCreateWithoutItemsInput = {
    id?: string;
    sessionId: string;
    createdById: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipt?: Prisma.ReceiptUncheckedCreateNestedOneWithoutBillInput;
    payments?: Prisma.UserPaymentUncheckedCreateNestedManyWithoutBillInput;
};
export type BillCreateOrConnectWithoutItemsInput = {
    where: Prisma.BillWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillCreateWithoutItemsInput, Prisma.BillUncheckedCreateWithoutItemsInput>;
};
export type BillUpsertWithoutItemsInput = {
    update: Prisma.XOR<Prisma.BillUpdateWithoutItemsInput, Prisma.BillUncheckedUpdateWithoutItemsInput>;
    create: Prisma.XOR<Prisma.BillCreateWithoutItemsInput, Prisma.BillUncheckedCreateWithoutItemsInput>;
    where?: Prisma.BillWhereInput;
};
export type BillUpdateToOneWithWhereWithoutItemsInput = {
    where?: Prisma.BillWhereInput;
    data: Prisma.XOR<Prisma.BillUpdateWithoutItemsInput, Prisma.BillUncheckedUpdateWithoutItemsInput>;
};
export type BillUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutBillNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedBillsNestedInput;
    receipt?: Prisma.ReceiptUpdateOneWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateWithoutItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.ReceiptUncheckedUpdateOneWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUncheckedUpdateManyWithoutBillNestedInput;
};
export type BillCreateWithoutPaymentsInput = {
    id?: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    session: Prisma.FoodFightSessionCreateNestedOneWithoutBillInput;
    createdBy: Prisma.UserCreateNestedOneWithoutCreatedBillsInput;
    receipt?: Prisma.ReceiptCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemCreateNestedManyWithoutBillInput;
};
export type BillUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    sessionId: string;
    createdById: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    receipt?: Prisma.ReceiptUncheckedCreateNestedOneWithoutBillInput;
    items?: Prisma.ReceiptItemUncheckedCreateNestedManyWithoutBillInput;
};
export type BillCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.BillWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillCreateWithoutPaymentsInput, Prisma.BillUncheckedCreateWithoutPaymentsInput>;
};
export type BillUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.BillUpdateWithoutPaymentsInput, Prisma.BillUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.BillCreateWithoutPaymentsInput, Prisma.BillUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.BillWhereInput;
};
export type BillUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.BillWhereInput;
    data: Prisma.XOR<Prisma.BillUpdateWithoutPaymentsInput, Prisma.BillUncheckedUpdateWithoutPaymentsInput>;
};
export type BillUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutBillNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutCreatedBillsNestedInput;
    receipt?: Prisma.ReceiptUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.ReceiptUncheckedUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUncheckedUpdateManyWithoutBillNestedInput;
};
export type BillCreateManyCreatedByInput = {
    id?: string;
    sessionId: string;
    status?: $Enums.BillStatus;
    subtotal?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type BillUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    session?: Prisma.FoodFightSessionUpdateOneRequiredWithoutBillNestedInput;
    receipt?: Prisma.ReceiptUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    receipt?: Prisma.ReceiptUncheckedUpdateOneWithoutBillNestedInput;
    items?: Prisma.ReceiptItemUncheckedUpdateManyWithoutBillNestedInput;
    payments?: Prisma.UserPaymentUncheckedUpdateManyWithoutBillNestedInput;
};
export type BillUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    sessionId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumBillStatusFieldUpdateOperationsInput | $Enums.BillStatus;
    subtotal?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    serviceCharge?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    tax?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    discount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    totalAmount?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    closedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type BillCountOutputType = {
    items: number;
    payments: number;
};
export type BillCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    items?: boolean | BillCountOutputTypeCountItemsArgs;
    payments?: boolean | BillCountOutputTypeCountPaymentsArgs;
};
export type BillCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillCountOutputTypeSelect<ExtArgs> | null;
};
export type BillCountOutputTypeCountItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptItemWhereInput;
};
export type BillCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPaymentWhereInput;
};
export type BillSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    createdById?: boolean;
    status?: boolean;
    subtotal?: boolean;
    serviceCharge?: boolean;
    tax?: boolean;
    discount?: boolean;
    totalAmount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.Bill$receiptArgs<ExtArgs>;
    items?: boolean | Prisma.Bill$itemsArgs<ExtArgs>;
    payments?: boolean | Prisma.Bill$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.BillCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bill"]>;
export type BillSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    createdById?: boolean;
    status?: boolean;
    subtotal?: boolean;
    serviceCharge?: boolean;
    tax?: boolean;
    discount?: boolean;
    totalAmount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bill"]>;
export type BillSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    sessionId?: boolean;
    createdById?: boolean;
    status?: boolean;
    subtotal?: boolean;
    serviceCharge?: boolean;
    tax?: boolean;
    discount?: boolean;
    totalAmount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["bill"]>;
export type BillSelectScalar = {
    id?: boolean;
    sessionId?: boolean;
    createdById?: boolean;
    status?: boolean;
    subtotal?: boolean;
    serviceCharge?: boolean;
    tax?: boolean;
    discount?: boolean;
    totalAmount?: boolean;
    closedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type BillOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "sessionId" | "createdById" | "status" | "subtotal" | "serviceCharge" | "tax" | "discount" | "totalAmount" | "closedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["bill"]>;
export type BillInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    receipt?: boolean | Prisma.Bill$receiptArgs<ExtArgs>;
    items?: boolean | Prisma.Bill$itemsArgs<ExtArgs>;
    payments?: boolean | Prisma.Bill$paymentsArgs<ExtArgs>;
    _count?: boolean | Prisma.BillCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BillIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type BillIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    session?: boolean | Prisma.FoodFightSessionDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $BillPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Bill";
    objects: {
        session: Prisma.$FoodFightSessionPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        receipt: Prisma.$ReceiptPayload<ExtArgs> | null;
        items: Prisma.$ReceiptItemPayload<ExtArgs>[];
        payments: Prisma.$UserPaymentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        sessionId: string;
        createdById: string;
        status: $Enums.BillStatus;
        subtotal: runtime.Decimal | null;
        serviceCharge: runtime.Decimal | null;
        tax: runtime.Decimal | null;
        discount: runtime.Decimal | null;
        totalAmount: runtime.Decimal | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["bill"]>;
    composites: {};
};
export type BillGetPayload<S extends boolean | null | undefined | BillDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BillPayload, S>;
export type BillCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BillFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BillCountAggregateInputType | true;
};
export interface BillDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Bill'];
        meta: {
            name: 'Bill';
        };
    };
    findUnique<T extends BillFindUniqueArgs>(args: Prisma.SelectSubset<T, BillFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends BillFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BillFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends BillFindFirstArgs>(args?: Prisma.SelectSubset<T, BillFindFirstArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends BillFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BillFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends BillFindManyArgs>(args?: Prisma.SelectSubset<T, BillFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends BillCreateArgs>(args: Prisma.SelectSubset<T, BillCreateArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends BillCreateManyArgs>(args?: Prisma.SelectSubset<T, BillCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends BillCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BillCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends BillDeleteArgs>(args: Prisma.SelectSubset<T, BillDeleteArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends BillUpdateArgs>(args: Prisma.SelectSubset<T, BillUpdateArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends BillDeleteManyArgs>(args?: Prisma.SelectSubset<T, BillDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends BillUpdateManyArgs>(args: Prisma.SelectSubset<T, BillUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends BillUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BillUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends BillUpsertArgs>(args: Prisma.SelectSubset<T, BillUpsertArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends BillCountArgs>(args?: Prisma.Subset<T, BillCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BillCountAggregateOutputType> : number>;
    aggregate<T extends BillAggregateArgs>(args: Prisma.Subset<T, BillAggregateArgs>): Prisma.PrismaPromise<GetBillAggregateType<T>>;
    groupBy<T extends BillGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BillGroupByArgs['orderBy'];
    } : {
        orderBy?: BillGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BillGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: BillFieldRefs;
}
export interface Prisma__BillClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    session<T extends Prisma.FoodFightSessionDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodFightSessionDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodFightSessionClient<runtime.Types.Result.GetResult<Prisma.$FoodFightSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    receipt<T extends Prisma.Bill$receiptArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bill$receiptArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    items<T extends Prisma.Bill$itemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bill$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payments<T extends Prisma.Bill$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Bill$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface BillFieldRefs {
    readonly id: Prisma.FieldRef<"Bill", 'String'>;
    readonly sessionId: Prisma.FieldRef<"Bill", 'String'>;
    readonly createdById: Prisma.FieldRef<"Bill", 'String'>;
    readonly status: Prisma.FieldRef<"Bill", 'BillStatus'>;
    readonly subtotal: Prisma.FieldRef<"Bill", 'Decimal'>;
    readonly serviceCharge: Prisma.FieldRef<"Bill", 'Decimal'>;
    readonly tax: Prisma.FieldRef<"Bill", 'Decimal'>;
    readonly discount: Prisma.FieldRef<"Bill", 'Decimal'>;
    readonly totalAmount: Prisma.FieldRef<"Bill", 'Decimal'>;
    readonly closedAt: Prisma.FieldRef<"Bill", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Bill", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Bill", 'DateTime'>;
}
export type BillFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where: Prisma.BillWhereUniqueInput;
};
export type BillFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where: Prisma.BillWhereUniqueInput;
};
export type BillFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where?: Prisma.BillWhereInput;
    orderBy?: Prisma.BillOrderByWithRelationInput | Prisma.BillOrderByWithRelationInput[];
    cursor?: Prisma.BillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillScalarFieldEnum | Prisma.BillScalarFieldEnum[];
};
export type BillFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where?: Prisma.BillWhereInput;
    orderBy?: Prisma.BillOrderByWithRelationInput | Prisma.BillOrderByWithRelationInput[];
    cursor?: Prisma.BillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillScalarFieldEnum | Prisma.BillScalarFieldEnum[];
};
export type BillFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where?: Prisma.BillWhereInput;
    orderBy?: Prisma.BillOrderByWithRelationInput | Prisma.BillOrderByWithRelationInput[];
    cursor?: Prisma.BillWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BillScalarFieldEnum | Prisma.BillScalarFieldEnum[];
};
export type BillCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillCreateInput, Prisma.BillUncheckedCreateInput>;
};
export type BillCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.BillCreateManyInput | Prisma.BillCreateManyInput[];
    skipDuplicates?: boolean;
};
export type BillCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    data: Prisma.BillCreateManyInput | Prisma.BillCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.BillIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type BillUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillUpdateInput, Prisma.BillUncheckedUpdateInput>;
    where: Prisma.BillWhereUniqueInput;
};
export type BillUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.BillUpdateManyMutationInput, Prisma.BillUncheckedUpdateManyInput>;
    where?: Prisma.BillWhereInput;
    limit?: number;
};
export type BillUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.BillUpdateManyMutationInput, Prisma.BillUncheckedUpdateManyInput>;
    where?: Prisma.BillWhereInput;
    limit?: number;
    include?: Prisma.BillIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type BillUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where: Prisma.BillWhereUniqueInput;
    create: Prisma.XOR<Prisma.BillCreateInput, Prisma.BillUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.BillUpdateInput, Prisma.BillUncheckedUpdateInput>;
};
export type BillDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
    where: Prisma.BillWhereUniqueInput;
};
export type BillDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BillWhereInput;
    limit?: number;
};
export type Bill$receiptArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where?: Prisma.ReceiptWhereInput;
};
export type Bill$itemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Bill$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    where?: Prisma.UserPaymentWhereInput;
    orderBy?: Prisma.UserPaymentOrderByWithRelationInput | Prisma.UserPaymentOrderByWithRelationInput[];
    cursor?: Prisma.UserPaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserPaymentScalarFieldEnum | Prisma.UserPaymentScalarFieldEnum[];
};
export type BillDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.BillSelect<ExtArgs> | null;
    omit?: Prisma.BillOmit<ExtArgs> | null;
    include?: Prisma.BillInclude<ExtArgs> | null;
};
