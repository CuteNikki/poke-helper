-- CreateTable
CREATE TABLE "Guild" (
    "guildId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guild_pkey" PRIMARY KEY ("guildId")
);

-- CreateTable
CREATE TABLE "Counting" (
    "id" SERIAL NOT NULL,
    "guildId" TEXT NOT NULL,
    "resetOnFail" BOOLEAN NOT NULL DEFAULT false,
    "channelId" TEXT NOT NULL,
    "currentNumber" INTEGER NOT NULL DEFAULT 0,
    "currentNumberAt" TIMESTAMP(3),
    "currentNumberByUserId" TEXT,
    "highestNumber" INTEGER NOT NULL DEFAULT 0,
    "highestNumberAt" TIMESTAMP(3),
    "highestNumberByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Counting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counting_guildId_key" ON "Counting"("guildId");

-- CreateIndex
CREATE INDEX "Counting_channelId_idx" ON "Counting"("channelId");

-- AddForeignKey
ALTER TABLE "Counting" ADD CONSTRAINT "Counting_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("guildId") ON DELETE RESTRICT ON UPDATE CASCADE;
