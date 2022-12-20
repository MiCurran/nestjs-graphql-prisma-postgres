/*
  Warnings:

  - You are about to drop the column `health` on the `Player` table. All the data in the column will be lost.
  - Added the required column `gameId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "health",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sentAttacks" INTEGER NOT NULL DEFAULT 0;
