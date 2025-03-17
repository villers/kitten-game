/*
  Warnings:

  - You are about to drop the column `agilityStat` on the `Kitten` table. All the data in the column will be lost.
  - You are about to drop the column `enduranceStat` on the `Kitten` table. All the data in the column will be lost.
  - You are about to drop the column `speedStat` on the `Kitten` table. All the data in the column will be lost.
  - You are about to drop the column `strengthStat` on the `Kitten` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Kitten" DROP COLUMN "agilityStat",
DROP COLUMN "enduranceStat",
DROP COLUMN "speedStat",
DROP COLUMN "strengthStat";
