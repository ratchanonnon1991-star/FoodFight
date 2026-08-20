-- CreateTable
CREATE TABLE "payment_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentType" TEXT NOT NULL DEFAULT 'PROMPTPAY',
    "accountName" TEXT NOT NULL,
    "promptPayNumber" TEXT NOT NULL,
    "qrCodeUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_accounts_userId_key" ON "payment_accounts"("userId");

-- AddForeignKey
ALTER TABLE "payment_accounts" ADD CONSTRAINT "payment_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
