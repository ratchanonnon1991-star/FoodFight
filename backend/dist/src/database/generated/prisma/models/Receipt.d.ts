import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReceiptModel = runtime.Types.Result.DefaultSelection<Prisma.$ReceiptPayload>;
export type AggregateReceipt = {
    _count: ReceiptCountAggregateOutputType | null;
    _min: ReceiptMinAggregateOutputType | null;
    _max: ReceiptMaxAggregateOutputType | null;
};
export type ReceiptMinAggregateOutputType = {
    id: string | null;
    billId: string | null;
    imageUrl: string | null;
    ocrStatus: $Enums.OcrStatus | null;
    rawOcrText: string | null;
    uploadedAt: Date | null;
    updatedAt: Date | null;
};
export type ReceiptMaxAggregateOutputType = {
    id: string | null;
    billId: string | null;
    imageUrl: string | null;
    ocrStatus: $Enums.OcrStatus | null;
    rawOcrText: string | null;
    uploadedAt: Date | null;
    updatedAt: Date | null;
};
export type ReceiptCountAggregateOutputType = {
    id: number;
    billId: number;
    imageUrl: number;
    ocrStatus: number;
    rawOcrText: number;
    parsedData: number;
    uploadedAt: number;
    updatedAt: number;
    _all: number;
};
export type ReceiptMinAggregateInputType = {
    id?: true;
    billId?: true;
    imageUrl?: true;
    ocrStatus?: true;
    rawOcrText?: true;
    uploadedAt?: true;
    updatedAt?: true;
};
export type ReceiptMaxAggregateInputType = {
    id?: true;
    billId?: true;
    imageUrl?: true;
    ocrStatus?: true;
    rawOcrText?: true;
    uploadedAt?: true;
    updatedAt?: true;
};
export type ReceiptCountAggregateInputType = {
    id?: true;
    billId?: true;
    imageUrl?: true;
    ocrStatus?: true;
    rawOcrText?: true;
    parsedData?: true;
    uploadedAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ReceiptAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithRelationInput | Prisma.ReceiptOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReceiptCountAggregateInputType;
    _min?: ReceiptMinAggregateInputType;
    _max?: ReceiptMaxAggregateInputType;
};
export type GetReceiptAggregateType<T extends ReceiptAggregateArgs> = {
    [P in keyof T & keyof AggregateReceipt]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReceipt[P]> : Prisma.GetScalarType<T[P], AggregateReceipt[P]>;
};
export type ReceiptGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithAggregationInput | Prisma.ReceiptOrderByWithAggregationInput[];
    by: Prisma.ReceiptScalarFieldEnum[] | Prisma.ReceiptScalarFieldEnum;
    having?: Prisma.ReceiptScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReceiptCountAggregateInputType | true;
    _min?: ReceiptMinAggregateInputType;
    _max?: ReceiptMaxAggregateInputType;
};
export type ReceiptGroupByOutputType = {
    id: string;
    billId: string;
    imageUrl: string;
    ocrStatus: $Enums.OcrStatus;
    rawOcrText: string | null;
    parsedData: runtime.JsonValue | null;
    uploadedAt: Date;
    updatedAt: Date;
    _count: ReceiptCountAggregateOutputType | null;
    _min: ReceiptMinAggregateOutputType | null;
    _max: ReceiptMaxAggregateOutputType | null;
};
export type GetReceiptGroupByPayload<T extends ReceiptGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReceiptGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReceiptGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReceiptGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReceiptGroupByOutputType[P]>;
}>>;
export type ReceiptWhereInput = {
    AND?: Prisma.ReceiptWhereInput | Prisma.ReceiptWhereInput[];
    OR?: Prisma.ReceiptWhereInput[];
    NOT?: Prisma.ReceiptWhereInput | Prisma.ReceiptWhereInput[];
    id?: Prisma.StringFilter<"Receipt"> | string;
    billId?: Prisma.StringFilter<"Receipt"> | string;
    imageUrl?: Prisma.StringFilter<"Receipt"> | string;
    ocrStatus?: Prisma.EnumOcrStatusFilter<"Receipt"> | $Enums.OcrStatus;
    rawOcrText?: Prisma.StringNullableFilter<"Receipt"> | string | null;
    parsedData?: Prisma.JsonNullableFilter<"Receipt">;
    uploadedAt?: Prisma.DateTimeFilter<"Receipt"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Receipt"> | Date | string;
    bill?: Prisma.XOR<Prisma.BillScalarRelationFilter, Prisma.BillWhereInput>;
};
export type ReceiptOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    ocrStatus?: Prisma.SortOrder;
    rawOcrText?: Prisma.SortOrderInput | Prisma.SortOrder;
    parsedData?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    bill?: Prisma.BillOrderByWithRelationInput;
};
export type ReceiptWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    billId?: string;
    AND?: Prisma.ReceiptWhereInput | Prisma.ReceiptWhereInput[];
    OR?: Prisma.ReceiptWhereInput[];
    NOT?: Prisma.ReceiptWhereInput | Prisma.ReceiptWhereInput[];
    imageUrl?: Prisma.StringFilter<"Receipt"> | string;
    ocrStatus?: Prisma.EnumOcrStatusFilter<"Receipt"> | $Enums.OcrStatus;
    rawOcrText?: Prisma.StringNullableFilter<"Receipt"> | string | null;
    parsedData?: Prisma.JsonNullableFilter<"Receipt">;
    uploadedAt?: Prisma.DateTimeFilter<"Receipt"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Receipt"> | Date | string;
    bill?: Prisma.XOR<Prisma.BillScalarRelationFilter, Prisma.BillWhereInput>;
}, "id" | "billId">;
export type ReceiptOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    ocrStatus?: Prisma.SortOrder;
    rawOcrText?: Prisma.SortOrderInput | Prisma.SortOrder;
    parsedData?: Prisma.SortOrderInput | Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ReceiptCountOrderByAggregateInput;
    _max?: Prisma.ReceiptMaxOrderByAggregateInput;
    _min?: Prisma.ReceiptMinOrderByAggregateInput;
};
export type ReceiptScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReceiptScalarWhereWithAggregatesInput | Prisma.ReceiptScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReceiptScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReceiptScalarWhereWithAggregatesInput | Prisma.ReceiptScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Receipt"> | string;
    billId?: Prisma.StringWithAggregatesFilter<"Receipt"> | string;
    imageUrl?: Prisma.StringWithAggregatesFilter<"Receipt"> | string;
    ocrStatus?: Prisma.EnumOcrStatusWithAggregatesFilter<"Receipt"> | $Enums.OcrStatus;
    rawOcrText?: Prisma.StringNullableWithAggregatesFilter<"Receipt"> | string | null;
    parsedData?: Prisma.JsonNullableWithAggregatesFilter<"Receipt">;
    uploadedAt?: Prisma.DateTimeWithAggregatesFilter<"Receipt"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Receipt"> | Date | string;
};
export type ReceiptCreateInput = {
    id?: string;
    imageUrl: string;
    ocrStatus?: $Enums.OcrStatus;
    rawOcrText?: string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Date | string;
    updatedAt?: Date | string;
    bill: Prisma.BillCreateNestedOneWithoutReceiptInput;
};
export type ReceiptUncheckedCreateInput = {
    id?: string;
    billId: string;
    imageUrl: string;
    ocrStatus?: $Enums.OcrStatus;
    rawOcrText?: string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    ocrStatus?: Prisma.EnumOcrStatusFieldUpdateOperationsInput | $Enums.OcrStatus;
    rawOcrText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    bill?: Prisma.BillUpdateOneRequiredWithoutReceiptNestedInput;
};
export type ReceiptUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    ocrStatus?: Prisma.EnumOcrStatusFieldUpdateOperationsInput | $Enums.OcrStatus;
    rawOcrText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptCreateManyInput = {
    id?: string;
    billId: string;
    imageUrl: string;
    ocrStatus?: $Enums.OcrStatus;
    rawOcrText?: string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    ocrStatus?: Prisma.EnumOcrStatusFieldUpdateOperationsInput | $Enums.OcrStatus;
    rawOcrText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    billId?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    ocrStatus?: Prisma.EnumOcrStatusFieldUpdateOperationsInput | $Enums.OcrStatus;
    rawOcrText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptNullableScalarRelationFilter = {
    is?: Prisma.ReceiptWhereInput | null;
    isNot?: Prisma.ReceiptWhereInput | null;
};
export type ReceiptCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    ocrStatus?: Prisma.SortOrder;
    rawOcrText?: Prisma.SortOrder;
    parsedData?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReceiptMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    ocrStatus?: Prisma.SortOrder;
    rawOcrText?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReceiptMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    billId?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    ocrStatus?: Prisma.SortOrder;
    rawOcrText?: Prisma.SortOrder;
    uploadedAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ReceiptCreateNestedOneWithoutBillInput = {
    create?: Prisma.XOR<Prisma.ReceiptCreateWithoutBillInput, Prisma.ReceiptUncheckedCreateWithoutBillInput>;
    connectOrCreate?: Prisma.ReceiptCreateOrConnectWithoutBillInput;
    connect?: Prisma.ReceiptWhereUniqueInput;
};
export type ReceiptUncheckedCreateNestedOneWithoutBillInput = {
    create?: Prisma.XOR<Prisma.ReceiptCreateWithoutBillInput, Prisma.ReceiptUncheckedCreateWithoutBillInput>;
    connectOrCreate?: Prisma.ReceiptCreateOrConnectWithoutBillInput;
    connect?: Prisma.ReceiptWhereUniqueInput;
};
export type ReceiptUpdateOneWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.ReceiptCreateWithoutBillInput, Prisma.ReceiptUncheckedCreateWithoutBillInput>;
    connectOrCreate?: Prisma.ReceiptCreateOrConnectWithoutBillInput;
    upsert?: Prisma.ReceiptUpsertWithoutBillInput;
    disconnect?: Prisma.ReceiptWhereInput | boolean;
    delete?: Prisma.ReceiptWhereInput | boolean;
    connect?: Prisma.ReceiptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReceiptUpdateToOneWithWhereWithoutBillInput, Prisma.ReceiptUpdateWithoutBillInput>, Prisma.ReceiptUncheckedUpdateWithoutBillInput>;
};
export type ReceiptUncheckedUpdateOneWithoutBillNestedInput = {
    create?: Prisma.XOR<Prisma.ReceiptCreateWithoutBillInput, Prisma.ReceiptUncheckedCreateWithoutBillInput>;
    connectOrCreate?: Prisma.ReceiptCreateOrConnectWithoutBillInput;
    upsert?: Prisma.ReceiptUpsertWithoutBillInput;
    disconnect?: Prisma.ReceiptWhereInput | boolean;
    delete?: Prisma.ReceiptWhereInput | boolean;
    connect?: Prisma.ReceiptWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReceiptUpdateToOneWithWhereWithoutBillInput, Prisma.ReceiptUpdateWithoutBillInput>, Prisma.ReceiptUncheckedUpdateWithoutBillInput>;
};
export type EnumOcrStatusFieldUpdateOperationsInput = {
    set?: $Enums.OcrStatus;
};
export type ReceiptCreateWithoutBillInput = {
    id?: string;
    imageUrl: string;
    ocrStatus?: $Enums.OcrStatus;
    rawOcrText?: string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptUncheckedCreateWithoutBillInput = {
    id?: string;
    imageUrl: string;
    ocrStatus?: $Enums.OcrStatus;
    rawOcrText?: string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Date | string;
    updatedAt?: Date | string;
};
export type ReceiptCreateOrConnectWithoutBillInput = {
    where: Prisma.ReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReceiptCreateWithoutBillInput, Prisma.ReceiptUncheckedCreateWithoutBillInput>;
};
export type ReceiptUpsertWithoutBillInput = {
    update: Prisma.XOR<Prisma.ReceiptUpdateWithoutBillInput, Prisma.ReceiptUncheckedUpdateWithoutBillInput>;
    create: Prisma.XOR<Prisma.ReceiptCreateWithoutBillInput, Prisma.ReceiptUncheckedCreateWithoutBillInput>;
    where?: Prisma.ReceiptWhereInput;
};
export type ReceiptUpdateToOneWithWhereWithoutBillInput = {
    where?: Prisma.ReceiptWhereInput;
    data: Prisma.XOR<Prisma.ReceiptUpdateWithoutBillInput, Prisma.ReceiptUncheckedUpdateWithoutBillInput>;
};
export type ReceiptUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    ocrStatus?: Prisma.EnumOcrStatusFieldUpdateOperationsInput | $Enums.OcrStatus;
    rawOcrText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptUncheckedUpdateWithoutBillInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    ocrStatus?: Prisma.EnumOcrStatusFieldUpdateOperationsInput | $Enums.OcrStatus;
    rawOcrText?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    parsedData?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    uploadedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReceiptSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    imageUrl?: boolean;
    ocrStatus?: boolean;
    rawOcrText?: boolean;
    parsedData?: boolean;
    uploadedAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["receipt"]>;
export type ReceiptSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    imageUrl?: boolean;
    ocrStatus?: boolean;
    rawOcrText?: boolean;
    parsedData?: boolean;
    uploadedAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["receipt"]>;
export type ReceiptSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    billId?: boolean;
    imageUrl?: boolean;
    ocrStatus?: boolean;
    rawOcrText?: boolean;
    parsedData?: boolean;
    uploadedAt?: boolean;
    updatedAt?: boolean;
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["receipt"]>;
export type ReceiptSelectScalar = {
    id?: boolean;
    billId?: boolean;
    imageUrl?: boolean;
    ocrStatus?: boolean;
    rawOcrText?: boolean;
    parsedData?: boolean;
    uploadedAt?: boolean;
    updatedAt?: boolean;
};
export type ReceiptOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "billId" | "imageUrl" | "ocrStatus" | "rawOcrText" | "parsedData" | "uploadedAt" | "updatedAt", ExtArgs["result"]["receipt"]>;
export type ReceiptInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
};
export type ReceiptIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
};
export type ReceiptIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    bill?: boolean | Prisma.BillDefaultArgs<ExtArgs>;
};
export type $ReceiptPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Receipt";
    objects: {
        bill: Prisma.$BillPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        billId: string;
        imageUrl: string;
        ocrStatus: $Enums.OcrStatus;
        rawOcrText: string | null;
        parsedData: runtime.JsonValue | null;
        uploadedAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["receipt"]>;
    composites: {};
};
export type ReceiptGetPayload<S extends boolean | null | undefined | ReceiptDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReceiptPayload, S>;
export type ReceiptCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReceiptFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReceiptCountAggregateInputType | true;
};
export interface ReceiptDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Receipt'];
        meta: {
            name: 'Receipt';
        };
    };
    findUnique<T extends ReceiptFindUniqueArgs>(args: Prisma.SelectSubset<T, ReceiptFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReceiptFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReceiptFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReceiptFindFirstArgs>(args?: Prisma.SelectSubset<T, ReceiptFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReceiptFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReceiptFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReceiptFindManyArgs>(args?: Prisma.SelectSubset<T, ReceiptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReceiptCreateArgs>(args: Prisma.SelectSubset<T, ReceiptCreateArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReceiptCreateManyArgs>(args?: Prisma.SelectSubset<T, ReceiptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReceiptCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReceiptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReceiptDeleteArgs>(args: Prisma.SelectSubset<T, ReceiptDeleteArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReceiptUpdateArgs>(args: Prisma.SelectSubset<T, ReceiptUpdateArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReceiptDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReceiptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReceiptUpdateManyArgs>(args: Prisma.SelectSubset<T, ReceiptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReceiptUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReceiptUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReceiptUpsertArgs>(args: Prisma.SelectSubset<T, ReceiptUpsertArgs<ExtArgs>>): Prisma.Prisma__ReceiptClient<runtime.Types.Result.GetResult<Prisma.$ReceiptPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReceiptCountArgs>(args?: Prisma.Subset<T, ReceiptCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReceiptCountAggregateOutputType> : number>;
    aggregate<T extends ReceiptAggregateArgs>(args: Prisma.Subset<T, ReceiptAggregateArgs>): Prisma.PrismaPromise<GetReceiptAggregateType<T>>;
    groupBy<T extends ReceiptGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReceiptGroupByArgs['orderBy'];
    } : {
        orderBy?: ReceiptGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReceiptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReceiptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReceiptFieldRefs;
}
export interface Prisma__ReceiptClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    bill<T extends Prisma.BillDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.BillDefaultArgs<ExtArgs>>): Prisma.Prisma__BillClient<runtime.Types.Result.GetResult<Prisma.$BillPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReceiptFieldRefs {
    readonly id: Prisma.FieldRef<"Receipt", 'String'>;
    readonly billId: Prisma.FieldRef<"Receipt", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Receipt", 'String'>;
    readonly ocrStatus: Prisma.FieldRef<"Receipt", 'OcrStatus'>;
    readonly rawOcrText: Prisma.FieldRef<"Receipt", 'String'>;
    readonly parsedData: Prisma.FieldRef<"Receipt", 'Json'>;
    readonly uploadedAt: Prisma.FieldRef<"Receipt", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Receipt", 'DateTime'>;
}
export type ReceiptFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where: Prisma.ReceiptWhereUniqueInput;
};
export type ReceiptFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where: Prisma.ReceiptWhereUniqueInput;
};
export type ReceiptFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithRelationInput | Prisma.ReceiptOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReceiptScalarFieldEnum | Prisma.ReceiptScalarFieldEnum[];
};
export type ReceiptFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithRelationInput | Prisma.ReceiptOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReceiptScalarFieldEnum | Prisma.ReceiptScalarFieldEnum[];
};
export type ReceiptFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where?: Prisma.ReceiptWhereInput;
    orderBy?: Prisma.ReceiptOrderByWithRelationInput | Prisma.ReceiptOrderByWithRelationInput[];
    cursor?: Prisma.ReceiptWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReceiptScalarFieldEnum | Prisma.ReceiptScalarFieldEnum[];
};
export type ReceiptCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReceiptCreateInput, Prisma.ReceiptUncheckedCreateInput>;
};
export type ReceiptCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReceiptCreateManyInput | Prisma.ReceiptCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReceiptCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    data: Prisma.ReceiptCreateManyInput | Prisma.ReceiptCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReceiptIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReceiptUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReceiptUpdateInput, Prisma.ReceiptUncheckedUpdateInput>;
    where: Prisma.ReceiptWhereUniqueInput;
};
export type ReceiptUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReceiptUpdateManyMutationInput, Prisma.ReceiptUncheckedUpdateManyInput>;
    where?: Prisma.ReceiptWhereInput;
    limit?: number;
};
export type ReceiptUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReceiptUpdateManyMutationInput, Prisma.ReceiptUncheckedUpdateManyInput>;
    where?: Prisma.ReceiptWhereInput;
    limit?: number;
    include?: Prisma.ReceiptIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReceiptUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where: Prisma.ReceiptWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReceiptCreateInput, Prisma.ReceiptUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReceiptUpdateInput, Prisma.ReceiptUncheckedUpdateInput>;
};
export type ReceiptDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
    where: Prisma.ReceiptWhereUniqueInput;
};
export type ReceiptDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReceiptWhereInput;
    limit?: number;
};
export type ReceiptDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReceiptSelect<ExtArgs> | null;
    omit?: Prisma.ReceiptOmit<ExtArgs> | null;
    include?: Prisma.ReceiptInclude<ExtArgs> | null;
};
