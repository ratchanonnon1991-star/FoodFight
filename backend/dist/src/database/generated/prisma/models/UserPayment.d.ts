import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type UserPaymentModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPaymentPayload>;
export type AggregateUserPayment = {
    _count: UserPaymentCountAggregateOutputType | null;
    _avg: UserPaymentAvgAggregateOutputType | null;
    _sum: UserPaymentSumAggregateOutputType | null;
    _min: UserPaymentMinAggregateOutputType | null;
    _max: UserPaymentMaxAggregateOutputType | null;
};
export type UserPaymentAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type UserPaymentSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type UserPaymentMinAggregateOutputType = {
    id: string | null;
    billId: string | null;
    userId: string | null;
    amount: runtime.Decimal | null;
    status: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserPaymentMaxAggregateOutputType = {
    id: string | null;
    billId: string | null;
    userId: string | null;
    amount: runtime.Decimal | null;
    status: $Enums.PaymentStatus | null;
    paidAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserPaymentCountAggregateOutputType = {
    id: number;
    billId: number;
    userId: number;
    amount: number;
    status: number;
    paidAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserPaymentAvgAggregateInputType = {
    amount?: true;
};
export type UserPaymentSumAggregateInputType = {
    amount?: true;
};
export type UserPaymentMinAggregateInputType = {
    id?: true;
    billId?: true;
    userId?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserPaymentMaxAggregateInputType = {
    id?: true;
    billId?: true;
    userId?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserPaymentCountAggregateInputType = {
    id?: true;
    billId?: true;
    userId?: true;
    amount?: true;
    status?: true;
    paidAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserPaymentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPaymentWhereInput;
    orderBy?: Prisma.UserPaymentOrderByWithRelationInput | Prisma.UserPaymentOrderByWithRelationInput[];
    cursor?: Prisma.UserPaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | UserPaymentCountAggregateInputType;
    _avg?: UserPaymentAvgAggregateInputType;
    _sum?: UserPaymentSumAggregateInputType;
    _min?: UserPaymentMinAggregateInputType;
    _max?: UserPaymentMaxAggregateInputType;
};
export type GetUserPaymentAggregateType<T extends UserPaymentAggregateArgs> = {
    [P in keyof T & keyof AggregateUserPayment]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserPayment[P]> : Prisma.GetScalarType<T[P], AggregateUserPayment[P]>;
};
export type UserPaymentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPaymentWhereInput;
    orderBy?: Prisma.UserPaymentOrderByWithAggregationInput | Prisma.UserPaymentOrderByWithAggregationInput[];
    by: Prisma.UserPaymentScalarFieldEnum[] | Prisma.UserPaymentScalarFieldEnum;
    having?: Prisma.UserPaymentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserPaymentCountAggregateInputType | true;
    _avg?: UserPaymentAvgAggregateInputType;
    _sum?: UserPaymentSumAggregateInputType;
    _min?: UserPaymentMinAggregateInputType;
    _max?: UserPaymentMaxAggregateInputType;
};
export type UserPaymentGroupByOutputType = {
    id: string;
    billId: string;
    userId: string;
    amount: runtime.Decimal;
    status: $Enums.PaymentStatus;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserPaymentCountAggregateOutputType | null;
    _avg: UserPaymentAvgAggregateOutputType | null;
    _sum: UserPaymentSumAggregateOutputType | null;
    _min: UserPaymentMinAggregateOutputType | null;
    _max: UserPaymentMaxAggregateOutputType | null;
};
export type GetUserPaymentGroupByPayload<T extends UserPaymentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserPaymentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserPaymentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserPaymentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserPaymentGroupByOutputType[P]>;
}>>;
export type UserPaymentWhereInput = {
    AND?: Prisma.UserPaymentWhereInput | Prisma.UserPaymentWhereInput[];
    OR?: Prisma.UserPaymentWhereInput[];
    NOT?: Prisma.UserPaymentWhereInput | Prisma.UserPaymentWhereInput[];
    id?: Prisma.StringFilter<"UserPayment"> | string;
    billId?: Prisma.StringFilter<"UserPayment"> | string;
    userId?: Prisma.StringFilter<"UserPayment"> | string;
    amount?: Prisma.DecimalFilter<"UserPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFilter<"UserPayment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"UserPayment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserPayment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserPayment"> | Date | string;
    bill?: Prisma.XOR<Prisma.BillScalarRelationFilter, Prisma.BillWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type UserPaymentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bill?: Prisma.BillOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type UserPaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    billId_userId?: Prisma.UserPaymentBillIdUserIdCompoundUniqueInput;
    AND?: Prisma.UserPaymentWhereInput | Prisma.UserPaymentWhereInput[];
    OR?: Prisma.UserPaymentWhereInput[];
    NOT?: Prisma.UserPaymentWhereInput | Prisma.UserPaymentWhereInput[];
    billId?: Prisma.StringFilter<"UserPayment"> | string;
    userId?: Prisma.StringFilter<"UserPayment"> | string;
    amount?: Prisma.DecimalFilter<"UserPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFilter<"UserPayment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"UserPayment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserPayment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserPayment"> | Date | string;
    bill?: Prisma.XOR<Prisma.BillScalarRelationFilter, Prisma.BillWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "billId_userId">;
export type UserPaymentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserPaymentCountOrderByAggregateInput;
    _avg?: Prisma.UserPaymentAvgOrderByAggregateInput;
    _max?: Prisma.UserPaymentMaxOrderByAggregateInput;
    _min?: Prisma.UserPaymentMinOrderByAggregateInput;
    _sum?: Prisma.UserPaymentSumOrderByAggregateInput;
};
export type UserPaymentScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserPaymentScalarWhereWithAggregatesInput | Prisma.UserPaymentScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserPaymentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserPaymentScalarWhereWithAggregatesInput | Prisma.UserPaymentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserPayment"> | string;
    billId?: Prisma.StringWithAggregatesFilter<"UserPayment"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserPayment"> | string;
    amount?: Prisma.DecimalWithAggregatesFilter<"UserPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusWithAggregatesFilter<"UserPayment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableWithAggregatesFilter<"UserPayment"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserPayment"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"UserPayment"> | Date | string;
};
export type UserPaymentCreateInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bill: Prisma.BillCreateNestedOneWithoutPaymentsInput;
    user: Prisma.UserCreateNestedOneWithoutPaymentsInput;
};
export type UserPaymentUncheckedCreateInput = {
    id?: string;
    billId: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPaymentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bill?: Prisma.BillUpdateOneRequiredWithoutPaymentsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type UserPaymentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentCreateManyInput = {
    id?: string;
    billId: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPaymentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentListRelationFilter = {
    every?: Prisma.UserPaymentWhereInput;
    some?: Prisma.UserPaymentWhereInput;
    none?: Prisma.UserPaymentWhereInput;
};
export type UserPaymentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserPaymentBillIdUserIdCompoundUniqueInput = {
    billId: string;
    userId: string;
};
export type UserPaymentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserPaymentAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type UserPaymentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserPaymentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paidAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserPaymentSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type UserPaymentCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutUserInput, Prisma.UserPaymentUncheckedCreateWithoutUserInput> | Prisma.UserPaymentCreateWithoutUserInput[] | Prisma.UserPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutUserInput | Prisma.UserPaymentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserPaymentCreateManyUserInputEnvelope;
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
};
export type UserPaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutUserInput, Prisma.UserPaymentUncheckedCreateWithoutUserInput> | Prisma.UserPaymentCreateWithoutUserInput[] | Prisma.UserPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutUserInput | Prisma.UserPaymentCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserPaymentCreateManyUserInputEnvelope;
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
};
export type UserPaymentUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutUserInput, Prisma.UserPaymentUncheckedCreateWithoutUserInput> | Prisma.UserPaymentCreateWithoutUserInput[] | Prisma.UserPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutUserInput | Prisma.UserPaymentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserPaymentUpsertWithWhereUniqueWithoutUserInput | Prisma.UserPaymentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserPaymentCreateManyUserInputEnvelope;
    set?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    disconnect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    delete?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    update?: Prisma.UserPaymentUpdateWithWhereUniqueWithoutUserInput | Prisma.UserPaymentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserPaymentUpdateManyWithWhereWithoutUserInput | Prisma.UserPaymentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserPaymentScalarWhereInput | Prisma.UserPaymentScalarWhereInput[];
};
export type UserPaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutUserInput, Prisma.UserPaymentUncheckedCreateWithoutUserInput> | Prisma.UserPaymentCreateWithoutUserInput[] | Prisma.UserPaymentUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutUserInput | Prisma.UserPaymentCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserPaymentUpsertWithWhereUniqueWithoutUserInput | Prisma.UserPaymentUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserPaymentCreateManyUserInputEnvelope;
    set?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    disconnect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    delete?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    update?: Prisma.UserPaymentUpdateWithWhereUniqueWithoutUserInput | Prisma.UserPaymentUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserPaymentUpdateManyWithWhereWithoutUserInput | Prisma.UserPaymentUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserPaymentScalarWhereInput | Prisma.UserPaymentScalarWhereInput[];
};
export type UserPaymentCreateNestedManyWithoutBillInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutBillInput, Prisma.UserPaymentUncheckedCreateWithoutBillInput> | Prisma.UserPaymentCreateWithoutBillInput[] | Prisma.UserPaymentUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutBillInput | Prisma.UserPaymentCreateOrConnectWithoutBillInput[];
    createMany?: Prisma.UserPaymentCreateManyBillInputEnvelope;
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
};
export type UserPaymentUncheckedCreateNestedManyWithoutBillInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutBillInput, Prisma.UserPaymentUncheckedCreateWithoutBillInput> | Prisma.UserPaymentCreateWithoutBillInput[] | Prisma.UserPaymentUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutBillInput | Prisma.UserPaymentCreateOrConnectWithoutBillInput[];
    createMany?: Prisma.UserPaymentCreateManyBillInputEnvelope;
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
};
export type UserPaymentUpdateManyWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutBillInput, Prisma.UserPaymentUncheckedCreateWithoutBillInput> | Prisma.UserPaymentCreateWithoutBillInput[] | Prisma.UserPaymentUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutBillInput | Prisma.UserPaymentCreateOrConnectWithoutBillInput[];
    upsert?: Prisma.UserPaymentUpsertWithWhereUniqueWithoutBillInput | Prisma.UserPaymentUpsertWithWhereUniqueWithoutBillInput[];
    createMany?: Prisma.UserPaymentCreateManyBillInputEnvelope;
    set?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    disconnect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    delete?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    update?: Prisma.UserPaymentUpdateWithWhereUniqueWithoutBillInput | Prisma.UserPaymentUpdateWithWhereUniqueWithoutBillInput[];
    updateMany?: Prisma.UserPaymentUpdateManyWithWhereWithoutBillInput | Prisma.UserPaymentUpdateManyWithWhereWithoutBillInput[];
    deleteMany?: Prisma.UserPaymentScalarWhereInput | Prisma.UserPaymentScalarWhereInput[];
};
export type UserPaymentUncheckedUpdateManyWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.UserPaymentCreateWithoutBillInput, Prisma.UserPaymentUncheckedCreateWithoutBillInput> | Prisma.UserPaymentCreateWithoutBillInput[] | Prisma.UserPaymentUncheckedCreateWithoutBillInput[];
    connectOrCreate?: Prisma.UserPaymentCreateOrConnectWithoutBillInput | Prisma.UserPaymentCreateOrConnectWithoutBillInput[];
    upsert?: Prisma.UserPaymentUpsertWithWhereUniqueWithoutBillInput | Prisma.UserPaymentUpsertWithWhereUniqueWithoutBillInput[];
    createMany?: Prisma.UserPaymentCreateManyBillInputEnvelope;
    set?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    disconnect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    delete?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    connect?: Prisma.UserPaymentWhereUniqueInput | Prisma.UserPaymentWhereUniqueInput[];
    update?: Prisma.UserPaymentUpdateWithWhereUniqueWithoutBillInput | Prisma.UserPaymentUpdateWithWhereUniqueWithoutBillInput[];
    updateMany?: Prisma.UserPaymentUpdateManyWithWhereWithoutBillInput | Prisma.UserPaymentUpdateManyWithWhereWithoutBillInput[];
    deleteMany?: Prisma.UserPaymentScalarWhereInput | Prisma.UserPaymentScalarWhereInput[];
};
export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus;
};
export type UserPaymentCreateWithoutUserInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    bill: Prisma.BillCreateNestedOneWithoutPaymentsInput;
};
export type UserPaymentUncheckedCreateWithoutUserInput = {
    id?: string;
    billId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPaymentCreateOrConnectWithoutUserInput = {
    where: Prisma.UserPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserPaymentCreateWithoutUserInput, Prisma.UserPaymentUncheckedCreateWithoutUserInput>;
};
export type UserPaymentCreateManyUserInputEnvelope = {
    data: Prisma.UserPaymentCreateManyUserInput | Prisma.UserPaymentCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserPaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserPaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserPaymentUpdateWithoutUserInput, Prisma.UserPaymentUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserPaymentCreateWithoutUserInput, Prisma.UserPaymentUncheckedCreateWithoutUserInput>;
};
export type UserPaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserPaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserPaymentUpdateWithoutUserInput, Prisma.UserPaymentUncheckedUpdateWithoutUserInput>;
};
export type UserPaymentUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserPaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.UserPaymentUpdateManyMutationInput, Prisma.UserPaymentUncheckedUpdateManyWithoutUserInput>;
};
export type UserPaymentScalarWhereInput = {
    AND?: Prisma.UserPaymentScalarWhereInput | Prisma.UserPaymentScalarWhereInput[];
    OR?: Prisma.UserPaymentScalarWhereInput[];
    NOT?: Prisma.UserPaymentScalarWhereInput | Prisma.UserPaymentScalarWhereInput[];
    id?: Prisma.StringFilter<"UserPayment"> | string;
    billId?: Prisma.StringFilter<"UserPayment"> | string;
    userId?: Prisma.StringFilter<"UserPayment"> | string;
    amount?: Prisma.DecimalFilter<"UserPayment"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFilter<"UserPayment"> | $Enums.PaymentStatus;
    paidAt?: Prisma.DateTimeNullableFilter<"UserPayment"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"UserPayment"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"UserPayment"> | Date | string;
};
export type UserPaymentCreateWithoutBillInput = {
    id?: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPaymentsInput;
};
export type UserPaymentUncheckedCreateWithoutBillInput = {
    id?: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPaymentCreateOrConnectWithoutBillInput = {
    where: Prisma.UserPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserPaymentCreateWithoutBillInput, Prisma.UserPaymentUncheckedCreateWithoutBillInput>;
};
export type UserPaymentCreateManyBillInputEnvelope = {
    data: Prisma.UserPaymentCreateManyBillInput | Prisma.UserPaymentCreateManyBillInput[];
    skipDuplicates?: boolean;
};
export type UserPaymentUpsertWithWhereUniqueWithoutBillInput = {
    where: Prisma.UserPaymentWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserPaymentUpdateWithoutBillInput, Prisma.UserPaymentUncheckedUpdateWithoutBillInput>;
    create: Prisma.XOR<Prisma.UserPaymentCreateWithoutBillInput, Prisma.UserPaymentUncheckedCreateWithoutBillInput>;
};
export type UserPaymentUpdateWithWhereUniqueWithoutBillInput = {
    where: Prisma.UserPaymentWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserPaymentUpdateWithoutBillInput, Prisma.UserPaymentUncheckedUpdateWithoutBillInput>;
};
export type UserPaymentUpdateManyWithWhereWithoutBillInput = {
    where: Prisma.UserPaymentScalarWhereInput;
    data: Prisma.XOR<Prisma.UserPaymentUpdateManyMutationInput, Prisma.UserPaymentUncheckedUpdateManyWithoutBillInput>;
};
export type UserPaymentCreateManyUserInput = {
    id?: string;
    billId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPaymentUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bill?: Prisma.BillUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type UserPaymentUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentCreateManyBillInput = {
    id?: string;
    userId: string;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: $Enums.PaymentStatus;
    paidAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserPaymentUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPaymentsNestedInput;
};
export type UserPaymentUncheckedUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentUncheckedUpdateManyWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    status?: Prisma.EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus;
    paidAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserPaymentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    userId?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userPayment"]>;
export type UserPaymentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    userId?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userPayment"]>;
export type UserPaymentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    userId?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userPayment"]>;
export type UserPaymentSelectScalar = {
    id?: boolean;
    billId?: boolean;
    userId?: boolean;
    amount?: boolean;
    status?: boolean;
    paidAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserPaymentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "billId" | "userId" | "amount" | "status" | "paidAt" | "createdAt" | "updatedAt", ExtArgs["result"]["userPayment"]>;
export type UserPaymentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserPaymentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type UserPaymentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $UserPaymentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserPayment";
    objects: {
        bill: Prisma.$BillPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        billId: string;
        userId: string;
        amount: runtime.Decimal;
        status: $Enums.PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["userPayment"]>;
    composites: {};
};
export type UserPaymentGetPayload<S extends boolean | null | undefined | UserPaymentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload, S>;
export type UserPaymentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserPaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserPaymentCountAggregateInputType | true;
};
export interface UserPaymentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserPayment'];
        meta: {
            name: 'UserPayment';
        };
    };
    findUnique<T extends UserPaymentFindUniqueArgs>(args: Prisma.SelectSubset<T, UserPaymentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends UserPaymentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserPaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends UserPaymentFindFirstArgs>(args?: Prisma.SelectSubset<T, UserPaymentFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends UserPaymentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserPaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends UserPaymentFindManyArgs>(args?: Prisma.SelectSubset<T, UserPaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends UserPaymentCreateArgs>(args: Prisma.SelectSubset<T, UserPaymentCreateArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends UserPaymentCreateManyArgs>(args?: Prisma.SelectSubset<T, UserPaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends UserPaymentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserPaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends UserPaymentDeleteArgs>(args: Prisma.SelectSubset<T, UserPaymentDeleteArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends UserPaymentUpdateArgs>(args: Prisma.SelectSubset<T, UserPaymentUpdateArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends UserPaymentDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserPaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends UserPaymentUpdateManyArgs>(args: Prisma.SelectSubset<T, UserPaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends UserPaymentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserPaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends UserPaymentUpsertArgs>(args: Prisma.SelectSubset<T, UserPaymentUpsertArgs<ExtArgs>>): Prisma.Prisma__UserPaymentClient<runtime.Types.Result.GetResult<Prisma.$UserPaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends UserPaymentCountArgs>(args?: Prisma.Subset<T, UserPaymentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserPaymentCountAggregateOutputType> : number>;
    aggregate<T extends UserPaymentAggregateArgs>(args: Prisma.Subset<T, UserPaymentAggregateArgs>): Prisma.PrismaPromise<GetUserPaymentAggregateType<T>>;
    groupBy<T extends UserPaymentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserPaymentGroupByArgs['orderBy'];
    } : {
        orderBy?: UserPaymentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserPaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: UserPaymentFieldRefs;
}
export interface Prisma__UserPaymentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bill<T extends Prisma.BillDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BillDefaultArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface UserPaymentFieldRefs {
    readonly id: Prisma.FieldRef<"UserPayment", 'String'>;
    readonly billId: Prisma.FieldRef<"UserPayment", 'String'>;
    readonly userId: Prisma.FieldRef<"UserPayment", 'String'>;
    readonly amount: Prisma.FieldRef<"UserPayment", 'Decimal'>;
    readonly status: Prisma.FieldRef<"UserPayment", 'PaymentStatus'>;
    readonly paidAt: Prisma.FieldRef<"UserPayment", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"UserPayment", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"UserPayment", 'DateTime'>;
}
export type UserPaymentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    where: Prisma.UserPaymentWhereUniqueInput;
};
export type UserPaymentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    where: Prisma.UserPaymentWhereUniqueInput;
};
export type UserPaymentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserPaymentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserPaymentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type UserPaymentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserPaymentCreateInput, Prisma.UserPaymentUncheckedCreateInput>;
};
export type UserPaymentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.UserPaymentCreateManyInput | Prisma.UserPaymentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type UserPaymentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    data: Prisma.UserPaymentCreateManyInput | Prisma.UserPaymentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.UserPaymentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type UserPaymentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserPaymentUpdateInput, Prisma.UserPaymentUncheckedUpdateInput>;
    where: Prisma.UserPaymentWhereUniqueInput;
};
export type UserPaymentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.UserPaymentUpdateManyMutationInput, Prisma.UserPaymentUncheckedUpdateManyInput>;
    where?: Prisma.UserPaymentWhereInput;
    limit?: number;
};
export type UserPaymentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.UserPaymentUpdateManyMutationInput, Prisma.UserPaymentUncheckedUpdateManyInput>;
    where?: Prisma.UserPaymentWhereInput;
    limit?: number;
    include?: Prisma.UserPaymentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type UserPaymentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    where: Prisma.UserPaymentWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserPaymentCreateInput, Prisma.UserPaymentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.UserPaymentUpdateInput, Prisma.UserPaymentUncheckedUpdateInput>;
};
export type UserPaymentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
    where: Prisma.UserPaymentWhereUniqueInput;
};
export type UserPaymentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserPaymentWhereInput;
    limit?: number;
};
export type UserPaymentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserPaymentSelect<ExtArgs> | null;
    omit?: Prisma.UserPaymentOmit<ExtArgs> | null;
    include?: Prisma.UserPaymentInclude<ExtArgs> | null;
};
