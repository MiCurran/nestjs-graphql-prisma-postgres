-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "hits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sentAttacks" INTEGER NOT NULL DEFAULT 0;
