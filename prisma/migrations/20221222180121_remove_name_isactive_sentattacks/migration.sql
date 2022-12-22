/*
  Warnings:

  - You are about to drop the column `isActive` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `sentAttacks` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "isActive",
DROP COLUMN "name",
DROP COLUMN "sentAttacks";
