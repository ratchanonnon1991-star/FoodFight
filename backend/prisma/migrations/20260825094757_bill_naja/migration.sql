-- AlterEnum
ALTER TYPE "BillStatus" ADD VALUE 'CLOSED';

-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "closedAt" TIMESTAMP(3);
