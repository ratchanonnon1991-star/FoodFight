-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'LINE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RoomStatus" AS ENUM ('LOBBY', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "FoodFightStatus" AS ENUM ('COLLECTING_PREFERENCES', 'GENERATING_RECOMMENDATIONS', 'VOTING', 'FINAL_VOTE', 'FINALIZED', 'RESTAURANT_RECOMMENDATION', 'RESTAURANT_SELECTION', 'BILLING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SessionMemberRole" AS ENUM ('HOST', 'MEMBER');

-- CreateEnum
CREATE TYPE "MealBudgetRange" AS ENUM ('UNDER_200', 'BETWEEN_200_400', 'BETWEEN_400_600', 'ABOVE_600', 'ANY');

-- CreateEnum
CREATE TYPE "RecommendationRoundStatus" AS ENUM ('GENERATING', 'VOTING', 'COMPLETED');

-- CreateEnum
CREATE TYPE "VoteAction" AS ENUM ('OK', 'PASS');

-- CreateEnum
CREATE TYPE "FinalVoteType" AS ENUM ('TIE_BREAK', 'FOUR_MENU_FINAL');

-- CreateEnum
CREATE TYPE "FinalSelectionMethod" AS ENUM ('OK_MAJORITY', 'FINAL_VOTE', 'HOST_TIE_BREAK');

-- CreateEnum
CREATE TYPE "RestaurantRecommendationStatus" AS ENUM ('ACTIVE', 'SELECTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "BillStatus" AS ENUM ('DRAFT', 'SPLITTING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID');

-- CreateEnum
CREATE TYPE "OcrStatus" AS ENUM ('NOT_USED', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "AuthProvider" NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "otpHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "resendAvailableAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_resets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "resendAvailableAt" TIMESTAMP(3) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_resets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "allergies" TEXT[],
    "otherAllergies" TEXT,
    "restrictions" TEXT[],
    "otherRestrictions" TEXT,
    "additionalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "roomCode" TEXT NOT NULL,
    "inviteToken" TEXT NOT NULL,
    "maxMembers" INTEGER NOT NULL,
    "locationName" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "searchRadiusKm" INTEGER NOT NULL,
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "status" "RoomStatus" NOT NULL DEFAULT 'LOBBY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room_members" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isReady" BOOLEAN NOT NULL DEFAULT false,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leftAt" TIMESTAMP(3),

    CONSTRAINT "room_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foodfight_sessions" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "status" "FoodFightStatus" NOT NULL DEFAULT 'COLLECTING_PREFERENCES',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finalizedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foodfight_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session_members" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "SessionMemberRole" NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "session_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_preferences" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cookingTypes" TEXT[],
    "otherCookingType" TEXT,
    "cuisines" TEXT[],
    "otherCuisine" TEXT,
    "ingredients" TEXT[],
    "otherIngredient" TEXT,
    "budgetRange" "MealBudgetRange",
    "restaurantStyles" TEXT[],
    "otherRestaurantStyle" TEXT,
    "otherNote" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendation_rounds" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "roundNumber" INTEGER NOT NULL,
    "status" "RecommendationRoundStatus" NOT NULL DEFAULT 'GENERATING',
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "recommendation_rounds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recommendation_items" (
    "id" TEXT NOT NULL,
    "recommendationRoundId" TEXT NOT NULL,
    "menuName" TEXT NOT NULL,
    "description" TEXT,
    "reason" TEXT,
    "imageUrl" TEXT,
    "recommendationScore" DOUBLE PRECISION,
    "metadata" JSONB,
    "displayOrder" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recommendation_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "recommendationItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" "VoteAction" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_votes" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recommendationItemId" TEXT NOT NULL,
    "voteType" "FinalVoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "final_votes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "final_selections" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "recommendationItemId" TEXT NOT NULL,
    "selectedById" TEXT,
    "method" "FinalSelectionMethod" NOT NULL,
    "selectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "final_selections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_recommendations" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "externalPlaceId" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "distanceMeters" INTEGER,
    "phone" TEXT,
    "openingHours" JSONB,
    "imageUrl" TEXT,
    "finalMenuMatch" BOOLEAN NOT NULL DEFAULT false,
    "varietyScore" DOUBLE PRECISION,
    "groupCompatibilityScore" DOUBLE PRECISION,
    "rankingScore" DOUBLE PRECISION,
    "reason" TEXT,
    "status" "RestaurantRecommendationStatus" NOT NULL DEFAULT 'ACTIVE',
    "displayOrder" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "restaurant_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_selections" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "selectedById" TEXT NOT NULL,
    "externalPlaceId" TEXT,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "distanceMeters" INTEGER,
    "phone" TEXT,
    "openingHours" JSONB,
    "imageUrl" TEXT,
    "selectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_selections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "status" "BillStatus" NOT NULL DEFAULT 'DRAFT',
    "subtotal" DECIMAL(10,2),
    "serviceCharge" DECIMAL(10,2),
    "tax" DECIMAL(10,2),
    "discount" DECIMAL(10,2),
    "totalAmount" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipts" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "ocrStatus" "OcrStatus" NOT NULL DEFAULT 'NOT_USED',
    "rawOcrText" TEXT,
    "parsedData" JSONB,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "receipt_items" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "receipt_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_shares" (
    "id" TEXT NOT NULL,
    "receiptItemId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_payments" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_provider_key" ON "accounts"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "email_verifications_userId_key" ON "email_verifications"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "password_resets_tokenHash_key" ON "password_resets"("tokenHash");

-- CreateIndex
CREATE INDEX "password_resets_userId_idx" ON "password_resets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "food_profiles_userId_key" ON "food_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_roomCode_key" ON "rooms"("roomCode");

-- CreateIndex
CREATE UNIQUE INDEX "rooms_inviteToken_key" ON "rooms"("inviteToken");

-- CreateIndex
CREATE INDEX "rooms_hostId_idx" ON "rooms"("hostId");

-- CreateIndex
CREATE INDEX "rooms_status_idx" ON "rooms"("status");

-- CreateIndex
CREATE INDEX "room_members_roomId_idx" ON "room_members"("roomId");

-- CreateIndex
CREATE INDEX "room_members_userId_idx" ON "room_members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "room_members_roomId_userId_key" ON "room_members"("roomId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "foodfight_sessions_roomId_key" ON "foodfight_sessions"("roomId");

-- CreateIndex
CREATE INDEX "foodfight_sessions_status_idx" ON "foodfight_sessions"("status");

-- CreateIndex
CREATE INDEX "session_members_sessionId_idx" ON "session_members"("sessionId");

-- CreateIndex
CREATE INDEX "session_members_userId_idx" ON "session_members"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_members_sessionId_userId_key" ON "session_members"("sessionId", "userId");

-- CreateIndex
CREATE INDEX "meal_preferences_sessionId_idx" ON "meal_preferences"("sessionId");

-- CreateIndex
CREATE INDEX "meal_preferences_userId_idx" ON "meal_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "meal_preferences_sessionId_userId_key" ON "meal_preferences"("sessionId", "userId");

-- CreateIndex
CREATE INDEX "recommendation_rounds_sessionId_idx" ON "recommendation_rounds"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "recommendation_rounds_sessionId_roundNumber_key" ON "recommendation_rounds"("sessionId", "roundNumber");

-- CreateIndex
CREATE INDEX "recommendation_items_recommendationRoundId_idx" ON "recommendation_items"("recommendationRoundId");

-- CreateIndex
CREATE INDEX "votes_recommendationItemId_idx" ON "votes"("recommendationItemId");

-- CreateIndex
CREATE INDEX "votes_userId_idx" ON "votes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "votes_recommendationItemId_userId_key" ON "votes"("recommendationItemId", "userId");

-- CreateIndex
CREATE INDEX "final_votes_sessionId_idx" ON "final_votes"("sessionId");

-- CreateIndex
CREATE INDEX "final_votes_userId_idx" ON "final_votes"("userId");

-- CreateIndex
CREATE INDEX "final_votes_recommendationItemId_idx" ON "final_votes"("recommendationItemId");

-- CreateIndex
CREATE UNIQUE INDEX "final_votes_sessionId_userId_voteType_key" ON "final_votes"("sessionId", "userId", "voteType");

-- CreateIndex
CREATE UNIQUE INDEX "final_selections_sessionId_key" ON "final_selections"("sessionId");

-- CreateIndex
CREATE INDEX "final_selections_recommendationItemId_idx" ON "final_selections"("recommendationItemId");

-- CreateIndex
CREATE INDEX "final_selections_selectedById_idx" ON "final_selections"("selectedById");

-- CreateIndex
CREATE INDEX "restaurant_recommendations_sessionId_idx" ON "restaurant_recommendations"("sessionId");

-- CreateIndex
CREATE INDEX "restaurant_recommendations_externalPlaceId_idx" ON "restaurant_recommendations"("externalPlaceId");

-- CreateIndex
CREATE INDEX "restaurant_recommendations_status_idx" ON "restaurant_recommendations"("status");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_selections_sessionId_key" ON "restaurant_selections"("sessionId");

-- CreateIndex
CREATE INDEX "restaurant_selections_externalPlaceId_idx" ON "restaurant_selections"("externalPlaceId");

-- CreateIndex
CREATE INDEX "restaurant_selections_selectedById_idx" ON "restaurant_selections"("selectedById");

-- CreateIndex
CREATE UNIQUE INDEX "bills_sessionId_key" ON "bills"("sessionId");

-- CreateIndex
CREATE INDEX "bills_createdById_idx" ON "bills"("createdById");

-- CreateIndex
CREATE INDEX "bills_status_idx" ON "bills"("status");

-- CreateIndex
CREATE UNIQUE INDEX "receipts_billId_key" ON "receipts"("billId");

-- CreateIndex
CREATE INDEX "receipt_items_billId_idx" ON "receipt_items"("billId");

-- CreateIndex
CREATE INDEX "item_shares_receiptItemId_idx" ON "item_shares"("receiptItemId");

-- CreateIndex
CREATE INDEX "item_shares_userId_idx" ON "item_shares"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "item_shares_receiptItemId_userId_key" ON "item_shares"("receiptItemId", "userId");

-- CreateIndex
CREATE INDEX "user_payments_billId_idx" ON "user_payments"("billId");

-- CreateIndex
CREATE INDEX "user_payments_userId_idx" ON "user_payments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_payments_billId_userId_key" ON "user_payments"("billId", "userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_verifications" ADD CONSTRAINT "email_verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_resets" ADD CONSTRAINT "password_resets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_profiles" ADD CONSTRAINT "food_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_members" ADD CONSTRAINT "room_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foodfight_sessions" ADD CONSTRAINT "foodfight_sessions_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_members" ADD CONSTRAINT "session_members_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session_members" ADD CONSTRAINT "session_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_preferences" ADD CONSTRAINT "meal_preferences_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_preferences" ADD CONSTRAINT "meal_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendation_rounds" ADD CONSTRAINT "recommendation_rounds_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recommendation_items" ADD CONSTRAINT "recommendation_items_recommendationRoundId_fkey" FOREIGN KEY ("recommendationRoundId") REFERENCES "recommendation_rounds"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_recommendationItemId_fkey" FOREIGN KEY ("recommendationItemId") REFERENCES "recommendation_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_votes" ADD CONSTRAINT "final_votes_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_votes" ADD CONSTRAINT "final_votes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_votes" ADD CONSTRAINT "final_votes_recommendationItemId_fkey" FOREIGN KEY ("recommendationItemId") REFERENCES "recommendation_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_selections" ADD CONSTRAINT "final_selections_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_selections" ADD CONSTRAINT "final_selections_recommendationItemId_fkey" FOREIGN KEY ("recommendationItemId") REFERENCES "recommendation_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "final_selections" ADD CONSTRAINT "final_selections_selectedById_fkey" FOREIGN KEY ("selectedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_recommendations" ADD CONSTRAINT "restaurant_recommendations_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_selections" ADD CONSTRAINT "restaurant_selections_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant_selections" ADD CONSTRAINT "restaurant_selections_selectedById_fkey" FOREIGN KEY ("selectedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "foodfight_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receipt_items" ADD CONSTRAINT "receipt_items_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_shares" ADD CONSTRAINT "item_shares_receiptItemId_fkey" FOREIGN KEY ("receiptItemId") REFERENCES "receipt_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_shares" ADD CONSTRAINT "item_shares_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payments" ADD CONSTRAINT "user_payments_billId_fkey" FOREIGN KEY ("billId") REFERENCES "bills"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payments" ADD CONSTRAINT "user_payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
