/*
  Warnings:

  - You are about to drop the column `message` on the `NewsletterEntry` table. All the data in the column will be lost.
  - The `source` column on the `NewsletterEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `NewsletterEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "NewsletterStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED');

-- CreateEnum
CREATE TYPE "NewsletterSource" AS ENUM ('GUEST', 'USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BroadcastStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "DeliveryStatus" AS ENUM ('SENT', 'FAILED');

-- AlterTable
ALTER TABLE "NewsletterEntry" DROP COLUMN "message",
DROP COLUMN "source",
ADD COLUMN     "source" "NewsletterSource" NOT NULL DEFAULT 'GUEST',
DROP COLUMN "status",
ADD COLUMN     "status" "NewsletterStatus" NOT NULL DEFAULT 'ACTIVE';

-- CreateTable
CREATE TABLE "Newsletter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterBroadcast" (
    "id" TEXT NOT NULL,
    "newsletterId" TEXT NOT NULL,
    "status" "BroadcastStatus" NOT NULL DEFAULT 'PENDING',
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterBroadcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsletterDeliveryLog" (
    "id" TEXT NOT NULL,
    "broadcastId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" "DeliveryStatus" NOT NULL,
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsletterDeliveryLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsletterBroadcast_status_idx" ON "NewsletterBroadcast"("status");

-- CreateIndex
CREATE INDEX "NewsletterDeliveryLog_email_idx" ON "NewsletterDeliveryLog"("email");

-- CreateIndex
CREATE INDEX "NewsletterEntry_email_idx" ON "NewsletterEntry"("email");

-- CreateIndex
CREATE INDEX "NewsletterEntry_status_idx" ON "NewsletterEntry"("status");

-- AddForeignKey
ALTER TABLE "NewsletterBroadcast" ADD CONSTRAINT "NewsletterBroadcast_newsletterId_fkey" FOREIGN KEY ("newsletterId") REFERENCES "Newsletter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsletterDeliveryLog" ADD CONSTRAINT "NewsletterDeliveryLog_broadcastId_fkey" FOREIGN KEY ("broadcastId") REFERENCES "NewsletterBroadcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
