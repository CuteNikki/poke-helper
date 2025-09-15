/*
  Warnings:

  - You are about to drop the `Counting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Counting" DROP CONSTRAINT "Counting_guildId_fkey";

-- DropTable
DROP TABLE "public"."Counting";

-- CreateTable
CREATE TABLE "public"."User" (
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."UserBirthday" (
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserBirthday_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."GuildBirthday" (
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildBirthday_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "public"."GuildCounting" (
    "guildId" TEXT NOT NULL,
    "resetOnFail" BOOLEAN NOT NULL DEFAULT false,
    "channelId" TEXT NOT NULL,
    "currentNumber" INTEGER NOT NULL DEFAULT 0,
    "currentNumberAt" TIMESTAMP(3),
    "currentNumberMessageId" TEXT,
    "currentNumberByUserId" TEXT,
    "highestNumber" INTEGER NOT NULL DEFAULT 0,
    "highestNumberAt" TIMESTAMP(3),
    "highestNumberByUserId" TEXT,
    "highestNumberMessageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuildCounting_pkey" PRIMARY KEY ("guildId")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuildBirthday_guildId_channelId_key" ON "public"."GuildBirthday"("guildId", "channelId");

-- CreateIndex
CREATE INDEX "GuildCounting_channelId_idx" ON "public"."GuildCounting"("channelId");

-- AddForeignKey
ALTER TABLE "public"."UserBirthday" ADD CONSTRAINT "UserBirthday_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuildBirthday" ADD CONSTRAINT "GuildBirthday_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "public"."Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GuildCounting" ADD CONSTRAINT "GuildCounting_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "public"."Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;
