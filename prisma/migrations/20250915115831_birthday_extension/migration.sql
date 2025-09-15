-- AlterTable
ALTER TABLE "public"."UserBirthday" ADD COLUMN     "announceInGuildIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "announceInGuildsByDefault" BOOLEAN NOT NULL DEFAULT false;
